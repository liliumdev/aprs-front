import Ember from 'ember';

export default Ember.Route.extend({
    trackerService: Ember.inject.service(),
    zoneService: Ember.inject.service(),

    model: function(params, transition) {
        return Ember.RSVP.hash({
            trackers: this.get('trackerService').all(),
            zones_z4: this.get('zoneService').all(4, 60),
            zones_z7: this.get('zoneService').all(7, 60)
        });
    },
});
