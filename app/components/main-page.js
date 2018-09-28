import Ember from 'ember';
import moment from 'moment';
import Packet from '../models/packet';
import _ from 'lodash';

export default Ember.Component.extend({
    trail_colors: ['#F40000', '#000103', '#8E9AAF', '#4B5043', '#60B2E5', '#CD5334', '#84DD63', '#000103', '#1C77C3', '#D63AF9'],

    // API services
    trackerService: Ember.inject.service(),
    zoneService: Ember.inject.service(),
    packetService: Ember.inject.service(),

    // Icon service
    iconService: Ember.inject.service(),

    map: null,

    // General map stats
    last_update: 0,
    lat: 45,
    lng: 20,
    zoom: 4,
    boundary: {
        lat_from: 0,
        lat_to: 0,
        lng_from: 0,
        lng_to: 0
    },
    old_boundary: {
        lat_from: 0,
        lat_to: 0,
        lng_from: 0,
        lng_to: 0
    },

    // Filtering options
    show_from_last_options: ['15 minutes', '30 minutes', '1 hour', '3 hours', '6 hours', '12 hours', '1 day', '2 days', '7 days'],
    show_from_last: '1 hour',    
    show_from_last_minutes: 60,
    show_from_last_changed: Ember.observer('show_from_last', function() {
        let options_to_minutes = {
            '15 minutes': 15, 
            '30 minutes': 30, 
            '1 hour'    : 60, 
            '3 hours'   : 180, 
            '6 hours'   : 360,
            '12 hours'  : 720,
            '1 day'     : 1440,
            '2 days'    : 2880,
            '7 days'    : 10080
        };

        let new_minutes = options_to_minutes[this.get('show_from_last')];
        let old_minutes = this.get('show_from_last_minutes');

        if(new_minutes < old_minutes)
            this.set('packets', []);

        this.set('show_from_last_minutes', new_minutes);    
        this.update_zones();
        this.set('update_position_override', true);
        this.update_positions();
    }),
    last_seen_callsign: '',
    last_seen: {status: ''},
    filter_callsign: '',
    filtering_by_callsign: false,   
    show_trail: false,
    show_trail_changed: Ember.observer('show_trail', 'packets.[]', 'zoom', function() {
        this.set('trails', []);

        if(this.get('show_trail')) {      
            let callsign_packets = this.get('packets')
                .sortBy('created_at')
                .filter((p) => p.from === this.get('filter_callsign'));

            let current_trail = [];
            for(let i = 0; i < callsign_packets.length; i++) {
                let packet = callsign_packets[i];

                if(i == 0) {
                    current_trail.push(packet);
                } else {
                    let packet_time = moment(packet.created_at);
                    let previous_packet_time = moment(callsign_packets[i - 1].created_at);

                    let time_difference = packet_time.diff(previous_packet_time, 'minutes');
                    if(time_difference >= 30) {
                        this.get('trails').push(current_trail.map((p) => { return {lat: p.latitude, lng: p.longitude} }));
                        current_trail = [packet];
                    } else {
                        current_trail.push(packet);
                    }
                }
            }
            this.get('trails').push(current_trail.map((p) => { return {lat: p.latitude, lng: p.longitude} }));
        }
    }),
    trails: [],

    // Zone and tracker related
    get_bounding_box_coords(obj, spec_property, spec_property_map) {
        let mapped = {
            rect: [
                {lat: obj.lat_from, lng: obj.long_from},
                {lat: obj.lat_to,   lng: obj.long_from},
                {lat: obj.lat_to,   lng: obj.long_to},
                {lat: obj.lat_from, lng: obj.long_to},
            ]
        };
        mapped[spec_property_map] = obj[spec_property];

        return mapped;
    },

    // Tracker related
    trackers: [],
    show_trackers: false,
    trackers_zones_refresh_time: 30000,    
    tracker_zones: Ember.computed('trackers.[]', function() {
        let self = this;
        return this.get('trackers').map(function(t) {
            return self.get_bounding_box_coords(t, 'name', 'name');
        });
    }),

    // Zone related
    zones_z4: [],
    zones_z7: [],

    zone_z4_clusters: Ember.computed('zones_z4.[]', function() {
        let self = this;
        return this.get('zones_z4').map(function(z) {
            return self.get_bounding_box_coords(z, 'zone_count', 'zone_count');
        });
    }),
    zone_z7_clusters: Ember.computed('zones_z7.[]', function() {
        let self = this;
        return this.get('zones_z7').map(function(z) {
            return self.get_bounding_box_coords(z, 'zone_count', 'zone_count');
        });
    }),

    zone_z4_counts: Ember.computed.mapBy('zone_z4_clusters', 'zone_count'),
    zone_z7_counts: Ember.computed.mapBy('zone_z7_clusters', 'zone_count'),

    zone_z4_max: Ember.computed.max('zone_z4_counts'), 
    zone_z7_max: Ember.computed.max('zone_z7_counts'),

    // Current shown on-screen data
    selected_packet: null,
    packets: [],
    packets_with_icons: Ember.computed('packets.[]', function() {
        let packets = this.get('packets');
        let packets_with_icons = _.orderBy(packets, ['created_at'], ['desc']);
        packets_with_icons = _.uniqBy(packets_with_icons, function(p) {
            return p.from + '_' + p.object_name;
        });

        return packets_with_icons;
    }),
    last_refresh_at: 0,
    update_position_override: false,
    auto_packet_update: 5000,

    // Sidebar visible
    sidebar_visible: true,

    update_positions() {
        let self = this;
        let override = this.get('update_position_override');

        // Has it been more than the refresh time?
        let last_refresh_at = this.get('last_refresh_at');

        if(last_refresh_at !== 0) {
            var milliseconds_since_last_update = moment.duration(moment().diff(last_refresh_at)).asMilliseconds();
            if(milliseconds_since_last_update >= this.get('auto_packet_update'))
                override = true;
        }

        if(this.get('zoom') > 6) {
            let boundary = this.get('boundary');

            if(!this.is_boundary_inside_old_boundary(boundary) || this.is_old_boundary_empty(boundary) || override) {
                this.set('update_position_override', false);

                this.set('old_boundary', this.get('boundary'));

                let request = {
                    'minutes': this.get('show_from_last_minutes'),
                    'lat_from': boundary.lat_from,
                    'lat_to': boundary.lat_to,
                    'long_from': boundary.lng_from,
                    'long_to': boundary.lng_to
                };

                if(this.get('filtering_by_callsign')) {
                    request.filter = 'callsign';
                    request.callsign = this.get('filter_callsign');
                } else {
                    request.filter = 'no';
                }

                this.get('packetService').get_positions(request).then(function(data) {
                    let packets = self.get('packets');
                    
                    data.forEach(function(packet) {
                        if(packets.findBy('hash', packet.hash) === undefined) {
                            let new_packet = Packet.create(packet);

                            //if(!self.get('show_trail')) {
                            //    packets.removeObjects(packets.filter(p => p.from === new_packet.from));
                            //}

                            new_packet.icon = L.icon(self.get('iconService').get_icon(new_packet.symbol_table, new_packet.symbol, self.get('zoom')));
                            packets.addObject(new_packet);
                        }
                    });
                });

                this.set('last_refresh_at', moment());
                Ember.run.later(() => { self.update_positions(); }, this.get('auto_packet_update') + 1);
            }
        }
    },

    is_boundary_inside_old_boundary(boundary) {
        let old_boundary = this.get('old_boundary');

        return boundary.lat_from <= old_boundary.lat_from &&
               boundary.lat_to >= old_boundary.lat_to &&
               boundary.lng_from >= old_boundary.lng_from &&
               boundary.lng_to <= old_boundary.lng_to;
    },

    is_old_boundary_empty(boundary) {
        return boundary.lat_from >= 0 &&
               boundary.lat_to   <= 0 &&
               boundary.lng_from >= 0 &&
               boundary.lng_to   <= 0;
    },


    update_trackers() {
        console.log("Updating trackers...");
        this.set('trackers', this.get('trackerService').all());
    },

    update_zones() {
        let zoom = this.get('zoom');
        let last_minutes = this.get('show_from_last_minutes');

        this.set('zones_z4', this.get('zoneService').all(4, last_minutes));
        this.set('zones_z7', this.get('zoneService').all(7, last_minutes));

    },

    update_zones_and_trackers() {
        let self = this;

        this.set('last_update', moment());
        this.update_trackers();
        this.update_zones();
        this.clear_old_packets();
        Ember.run.later(() => { self.update_zones_and_trackers(); }, this.get('trackers_zones_refresh_time'));
    },

    clear_old_packets() {
        let packets = this.get('packets');
        if(packets.length > 2000) {
            packets = packets.slice(1000);
        }
    },

    init() {
        let self = this;

        this._super(...arguments);
        this.set('last_update', moment());
        this.update_zones_and_trackers();
    },

    actions: {
        click_marker(packet) {
            this.set('selected_packet', packet);
        },

        filter_by_callsign() {
            this.set('filtering_by_callsign', true);
            this.set('packets', []);
            this.set('update_position_override', true);
            this.update_positions();
        },

        stop_filtering_by_callsign() {
            this.set('filtering_by_callsign', false);
            this.set('show_trail', false);
            this.set('update_position_override', true);
            this.set('packets', []);
            this.update_positions();
        },

        get_last_seen() {
            let self = this;
            let callsign = this.get('last_seen_callsign');
            if(callsign.length > 0) {
                this.get('packetService').get_last_seen(callsign).then(function(data) {
                    self.set('last_seen', data);
                    if(data.status == 'ok') {
                        self.get('map').flyTo(new L.LatLng(data.lat, data.lng), 14);
                    }
                });
            }
        },

        update_center(e) {
            let self = this;
            Ember.run.next(() => {
                let center = e.target.getCenter();
                let bounds = e.target.getBounds();
                self.set('lat', center.lat);
                self.set('lng', center.lng);
                self.set('boundary', {
                    lat_from: bounds.getNorth(),
                    lat_to: bounds.getSouth(),
                    lng_from: bounds.getWest(),
                    lng_to: bounds.getEast()
                });
            });

            Ember.run.debounce(this, this.update_positions, 300);
        },

        update_zoom(e) {
            this.set('zoom', e.target.getZoom());
        },

        toggle_show_trackers() {
            this.toggleProperty('show_trackers');
        },

        toggle_sidebar() {
            this.toggleProperty('sidebar_visible');
        },

        initMap(e) {
            let map = e.target;
            L.control.scale().addTo(map);
            this.set('map', map);
        }
    }
});
