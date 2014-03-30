'use strict';

/**
 * Module dependencies
 */

var calendarComponent = require('./views/calendar');
var eventData = require('./resources/events.json');
var React = require('react');

/**
 * Call 'calendar' component with default values.
 *
 * In a complete application the static JSON file would be 
 * replaced with data from a DB.
 */

calendarComponent(eventData);

/**
 * Expose 'calendarComponent' to window. 
 * 
 * Needed for testing the layout from the console,
 * when called it replaces the previous instance of
 * 'calendarComponent'.
 *
 *  layOutDay([{start: 12, end: 200}, {start: 50, end: 400}]);
 *
 * @params {Array} events
 * @params {Number}
 * @params {Number}
 * @api public
 */

window.layOutDay = function(events, start, end) {
  calendarComponent(events, start, end);
};
