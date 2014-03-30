'use strict';

/**
 * Module dependencies
 */

var React = require('react');

/**
 * Render an event component.
 *
 * @props {Number} start
 * @props {Number} left
 * @props {Number} end
 * @props {Number} height
 * @props {Number} width
 * @api public
 */
 
module.exports = React.createClass({
  displayName: 'Event',

  /**
   * Calculate the height of the element.
   *
   * @params {Number} start
   * @params {Number} end
   * @return {Number}
   * @api private
   */

  height: function(start, end) {
    var height = (end - start);
    return height;
  },

  /**
   * Render component
   *
   * @props {Number} key
   * @props {Number} start
   * @props {Number} end
   * @props {Number} left
   * @api private
   */

  render: function() {
    var eventStyles = {
      top: this.props.start, 
      left: this.props.left,
      height: this.height(this.props.start, this.props.end), 
      width: this.props.width
    };

    return (
      React.DOM.div({className: 'event white-bg', style: eventStyles},
        React.DOM.div({className: 'event-indicator blue-bg_fb'}),
        React.DOM.div({className: 'column gray-border'},
          React.DOM.p({className: 'bold blue_fb'}, 'Sample Item'),
          React.DOM.p({className: 'gray_text_event'}, 'Sample Location')
        )
      )
    );
  }
});