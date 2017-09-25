import Ember from 'ember';
import BaseService from './base-service';
import Zone from '../models/zone';
import config from '../config/environment';

export default BaseService.extend({
    all: function(zoom, minutes) {
        var zones = Ember.A([]);
        this.ajax({ url: `/zones/${zoom}/${minutes}`, type: "GET" }).then(function(data) {
            data.forEach(function(zone) {
                zones.addObject(Zone.create(zone));
            });
        });
        return zones;
    }
});