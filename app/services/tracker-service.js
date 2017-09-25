import Ember from 'ember';
import BaseService from './base-service';
import Tracker from '../models/tracker';
import config from '../config/environment';

export default BaseService.extend({
    all: function() {
        var trackers = Ember.A([]);
        this.ajax({ url: `/trackers`, type: "GET" }).then(function(data) {
            data.forEach(function(tracker) {
                trackers.addObject(Tracker.create(tracker));
            });
        });
        return trackers;
    }
});