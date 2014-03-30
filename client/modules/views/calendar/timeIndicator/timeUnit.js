'use strict';

/**
 * Module dependencies
 */

var React = require('react');

/**
 * Render a div with hours, minutes and optional AM/PM.
 *
 * @props {Number} time Time between 0 and 2400
 * @props {Boolean} verbose Make it supersize?
 * @api public
 */
 
module.exports = React.createClass({
  displayName: 'Time unit',

  /**
   * Split hours ':' minutes.
   *
   * @param {Number} time
   * @param {Boolean} oClock
   * @return {String}
   * @api private
   */

  timeSplitter: function(time, oClock) {

    // make sure it's '12.00' and not '00.00'
    if (time >= 1300) {time = time % 1200;}

    // fetch first two digits
    time = time.toString().split('').reverse().join('').substring(2,4);

    // insert ':' + ('00' or '30') accordingly
    if (oClock) {
      return time.split('').reverse().join('') + ':' + '00';
    }
    return time.split('').reverse().join('') + ':' + '30';
  },

  /**
   * Is it noon yet?
   *
   * @param {Number} time
   * @return {String}
   * @api private
   */

  midDay: function(time) {
    if (time < 1200) {return 'AM';}
    return 'PM';
  },

  /**
   * React component
   *
   * @props {Number} time Time between 0 and 2400
   * @props {Boolean} verbose
   * @api private
   */

  render: function() {

    if (this.props.verbose) {
      return (
        React.DOM.div({className: 'calendar-timeUnit row'},
          React.DOM.span({className: 'bold gray_text_bold calendar-timeUnit_large'}, this.timeSplitter(this.props.time, true)),
          React.DOM.span({className: 'gray_text'}, this.midDay(this.props.time))
        )
      );
    }

    return (
      React.DOM.div({className: 'calendar-timeUnit row'},
        React.DOM.span({className: 'gray_text'},  this.timeSplitter(this.props.time, false))
      )
    );
  }
});