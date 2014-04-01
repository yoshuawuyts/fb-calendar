'use strict';

/**
 * Module dependencies
 */

var TimeComponent = require('./timeIndicator/timeUnit');
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
  displayName: 'Time indicator',

  /**
   * Render component
   *
   * @api private
   */

  render: function() {
    var rows = [];

    for (var i = this.props.start, end = this.props.end; i <= end; i += 50) {

      // alternate between large and small tags
      if (i % 100 == 0) {
        rows.push(TimeComponent({key: i, time: i, verbose: true}));
      } else {
        rows.push(TimeComponent({key: i, time: i, verbose: false}));
      }
    }

    return (
      React.DOM.div({className: 'calendar-timeIndicator'}, rows)
    );
  }
});