'use strict';

/*
 * Template
 *
 */
 
module.exports = React.createClass({
  
  displayName: 'Event',

  eventStyle: {
    top: 200,
    height: 100
  },

  render: function() {
    return (
      React.DOM.div({className: 'event white-bg', style: this.eventStyle},
        React.DOM.div({className: 'event-indicator blue-bg_fb'}),
        React.DOM.div({className: 'column gray-border'},
          React.DOM.p({className: 'bold blue_fb'}, 'Sample Item'),
          React.DOM.p({className: 'gray_text_event'}, 'Sample Location')
        )
      )
    );
  }
});