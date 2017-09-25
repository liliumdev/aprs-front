import Ember from 'ember';
import $ from 'jquery';
import config from '../config/environment';

export default Ember.Service.extend({
    ajax: function(params) {
        params.url = `${config.apiHost}/${params.url}`;

        return $.ajax(params);
    }
});