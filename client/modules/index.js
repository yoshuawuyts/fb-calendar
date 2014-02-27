'use strict';

/**
 * Module dependencies
 */

var calendarView = require('./views/calendar');

/**
 * Router
 *
 * If it were a larger project this would be the 
 * correct way to start. Adding additional views
 * should be made very easy.
 *
 * Replace with 'calendarView()' for correctness
 * in assignment scope.
 */

var Router = Backbone.Router.extend({
  routes: {
    '': 'calendar'
  },
  calendar: function() { calendarView();}
});

var router = new Router();

/**
 * Options
 */

Backbone.history.start({
  pushState: true
});