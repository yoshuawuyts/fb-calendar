'use strict';

/**
 * Module dependencies
 */

var React = require('react');

/**
 * Render a header
 *
 * @api public
 */
 
module.exports = React.createClass({
  
  displayName: 'Menu',

  /**
   * React component
   */

  render: function() {
    return (
      React.DOM.header({className: 'blue-bg_fb blue-border_fb'}, 
        React.DOM.h1({className: 'header-logo white'}, 'facebook')
      )
    );
  }
});