'use strict';

/**
 * Module dependencies
 */

var timeIndicatorComponent = require('./calendar/timeIndicator');
var headerComponent = require('./header/header.js');
var canvasComponent = require('./calendar/canvas');

/**
 * Render
 *
 * The render function gets exported to be called from the
 * router.
 */

module.exports = function(target) {
  React.renderComponent(template(), document.getElementById('root'));
};

/**
 * Template
 */

var template = React.createClass({

  getDefaultProps: function () {
  },

  render: function() {
    return (
      React.DOM.div( null,
        headerComponent(),
        React.DOM.div({className: 'calendar-wrapper grid row'},
          timeIndicatorComponent(),
          canvasComponent()
        )
      )
    );
  }
});