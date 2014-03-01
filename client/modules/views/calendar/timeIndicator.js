'use strict';

/**
 * Module dependencies
 */

var timeComponent = require('./timeIndicator/timeUnit');
var React = require('react');

/**
 * Render a bunch of timestamps alternating between
 * large and small tags.
 *
 * @params {Number} start
 * @params {Number} end
 * @api public
 */
 
module.exports = React.createClass({
  displayName: 'Canvas',

  /**
   * React component
   */

  render: function() {
    var start = this.props.start;
    var end = this.props.end;
    var rows = [];

    // render time stamps
    for (var i = start; i <= end; i += 50) {

      // alternate between large and small tags
      if (i % 100 == 0) {
        rows.push(timeComponent({time: i, verbose: true}));
      } else {
        rows.push(timeComponent({time: i, verbose: false}));
      }
    }

    return (
      React.DOM.div({className: 'calendar-timeIndicator'}, rows)
    );
  }
});