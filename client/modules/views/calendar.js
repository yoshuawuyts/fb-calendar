'use strict';

/**
 * Module dependencies
 */

var TimeIndicatorComponent = require('./calendar/timeIndicator');
var HeaderComponent = require('./header/header.js');
var CanvasComponent = require('./calendar/canvas');
var React = require('react');

/**
 * Export 'renderComponent'
 */

module.exports = renderComponent;


/**
 * Calendar component
 *
 * @props {Array} events
 * @props {Number} start
 * @props {Number} end
 */

var CalendarComponent = React.createClass({

  render: function() {

    return (
      React.DOM.div( null,
        HeaderComponent(),
        React.DOM.div({className: 'calendar-wrapper grid row'},
          TimeIndicatorComponent({start: this.props.start, end: this.props.end}),
          CanvasComponent({events: this.props.events})
        )
      )
    );
  }
});

/**
 * Render component in DOM
 *
 * @params {Array} events 
 * @params {Number} start Value between 0 and 2400
 * @params {Number} end Value between 0 and 2400
 * @api public
 */

function renderComponent (events, start, end) {
  start = start || 900;
  end = end || 2100;
  React.renderComponent(CalendarComponent( {events: events, start: start, end: end} ), document.getElementById('root'));
}