'use strict';

/**
 * Module dependencies
 */

/*
 * Template
 */
 
module.exports = React.createClass({
  
  displayName: 'Menu',

  render: function() {
    return (
      React.DOM.header({className: 'blue-bg_fb blue-border_fb'}, 
        React.DOM.h1({className: 'header-logo white'}, 'facebook')
      )
    );
  }
});