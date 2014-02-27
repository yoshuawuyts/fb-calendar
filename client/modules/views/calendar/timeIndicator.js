'use strict';

/**
 * Module dependencies
 */

/*
 * Template
 */
 
module.exports = React.createClass({
  
  displayName: 'Canvas',

  render: function() {
    return (
      React.DOM.div({className: 'calendar-timeIndicator'},
        React.DOM.div({className: 'calendar-timeUnit row'},
          React.DOM.span({className: 'bold gray_text_bold'}, '9:00'),
          React.DOM.span({className: 'gray_text'}, 'AM')
        ),
        React.DOM.div({className: 'calendar-timeUnit row'},
          React.DOM.span({className: 'gray_text'}, '9:30')
        )
      )
    );
  }
});