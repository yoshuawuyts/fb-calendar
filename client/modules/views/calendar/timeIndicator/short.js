'use strict';

/*
 * Template
 */
 
module.exports = React.createClass({
  
  displayName: 'Short time unit',

  /**
   * Split hours ':' minutes
   */

  timeSplitter: function(time) {
    var splitSign = ':';
    
    // Make sure it's '12.00' and not '00.00'
    if (time >= 1300) time = time%1200;

    // Iterate over numbers from back to front, insert splitSign.
    // Remember we're working in a mirror (reverse())
    time = '03' + splitSign + time.toString().split('').reverse().join('').substring(2,4);
    time = time.split('').reverse().join('');

    return time;
  },

  render: function() {
    return (
      React.DOM.div({className: 'calendar-timeUnit row'},
        React.DOM.span({className: 'gray_text'},  this.timeSplitter(this.props.time))
      )
    );
  }
});