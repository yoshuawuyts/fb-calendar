'use strict';

/**
 * Module dependencies
 */

var eventComponent = require('./canvas/event');

/*
 * Template
 *
 */
 
module.exports = React.createClass({
  
  displayName: 'Canvas',

  render: function() {
    return (
      React.DOM.div({className: 'calendar-canvas gray-bg_canvas gray-border'},
        React.DOM.div({className: 'row'},
          eventComponent({top: 100, height: 400}),
          eventComponent({top: 100, height: 400}),
          eventComponent({top: 100, height: 400})
        )
      )
    );
  }
});