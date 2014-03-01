'use strict';

/*
 * Template
 *
 * arguments: {time}
 */
 
module.exports = React.createClass({
  
  displayName: 'Verbose time unit',

  /**
   * Split hours ':' minutes
   */

  timeSplitter: function(time) {
    var splitSign = ':';

    // Make sure it's '12.00' and not '00.00'
    if (time >= 1300) time = time%1200;

    // Iterate over numbers from back to front, insert splitSign
    time = time.toString().split('').reverse().join('').substring(0,2) + splitSign + time.toString().split('').reverse().join('').substring(2,4);
    time = time.split('').reverse().join('');

    return time;
  },

  /**
   * Is it noon yet?
   *
   * Could be replaced by a terniary, but
   * this is more readable.
   */

  midDay: function(time) {
    if (time < 1200) return 'AM'
    return 'PM'
  },

  render: function() {
    return (
      React.DOM.div({className: 'calendar-timeUnit row'},
        React.DOM.span({className: 'bold gray_text_bold'}, this.timeSplitter(this.props.time)),
        React.DOM.span({className: 'gray_text'}, this.midDay(this.props.time))
      )
    );
  }
});