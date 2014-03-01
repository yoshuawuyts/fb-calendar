'use strict';

/**
 * Module dependencies
 *
 * Arguments: {start, end}
 */

var verboseComponent = require('./timeIndicator/verbose');
var shortComponent = require('./timeIndicator/short');

/*
 * Template
 */
 
module.exports = React.createClass({
  
  displayName: 'Canvas',

  render: function() {

    var start = this.props.start;
    var end = this.props.end;
    var rows = [];

    /**
     * Render ALL the timestamps
     */

    for(var i = start; i <= end; i += 50) {

      // Alternate between small and large tags
      if (i%100 == 0) {
        rows.push(verboseComponent({time: i}));
      } else {
        rows.push(shortComponent({time: i}));
      }
    };

    return (
      React.DOM.div({className: 'calendar-timeIndicator'}, rows)
    );
  }
});