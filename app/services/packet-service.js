import Ember from 'ember';
import BaseService from './base-service';
import Packet from '../models/packet';
import config from '../config/environment';

export default BaseService.extend({
    positions: function(params) {
        var packets = Ember.A([]);
        this.ajax({ url: `/positions`, type: "POST", data: params}).then(function(data) {
            data.forEach(function(packet) {
                packets.addObject(Packet.create(packet));
            });
        });
        return packets;
    },

    get_positions: function(params) {
        return this.ajax({ url: `/positions`, type: "POST", data: params});
    },

    get_last_seen: function(callsign) {
        return this.ajax({ url: `/last-seen/${callsign}`, type: "GET"});
    }
});