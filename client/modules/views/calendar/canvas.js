'use strict';

/**
 * Module dependencies
 */

var EventComponent = require('./canvas/event');
var React = require('react');

/**
 * Render a canvas filled with events.
 *
 *  require('./canvas')({events: [{"start": 150, "end": 200}]})
 *
 * @props {Object} [event]
 * @api public
 */
 
module.exports = React.createClass({
  displayName: 'Canvas',

  /**
   * Sort an array of events
   *
   * Sorts the eventArray object based on start times, if a conflict
   * occurs the conflicting pairs are sorted by end time
   *
   * @params {Object} [event]
   * @return {Object}
   * @api private
   */

  eventSorter: function(eventArray) {
    eventArray.sort(function(a, b) {
      if(a.start < b.start) return -1;
      if(a.start > b.start) return 1;

      // if equal start, determine order by end times
      if(a.end < b.end) return -1;
      if(a.end > b.end) return 1;

      return 0;
    });

    return eventArray;
  },

  /**
   * Compare events and determine if they're neighbours.
   *
   * Renders an array of elements neighbouring the target node +
   * the target node.
   *
   * @params {Object} [event]
   * @return {Number}
   * @api private
   */

  eventInspector: function(eventArray) {
    var pathMatrix = [];

    eventArray.forEach(function(eventZero, indexZero) {
      var tmpArray = [];

      eventArray.forEach(function(eventOne, indexOne){
        // check if events overlap
        if (eventOne.start < eventZero.end && eventZero.start < eventOne.end) {
          tmpArray.push(indexOne);
        }
      });

      pathMatrix.push(tmpArray);
    });

    return pathMatrix;
  },

  /**
   * Clean up item paths.
   *
   * Check if elements in each array of paths are neighbours of one another. If
   * not the element gets kicked out.
   *
   * @param {Number} [[path]]
   * @return {Object}
   * @api private
   */

  rowInspector: function (pathMatrix) {
    // remove faulty arrays
    var tmpMatrix = [];

    // iterate over each array
    pathMatrix.forEach(function(elementZero, indexZero) {

      // iterate over each character in an array
      var tmpArray = [];
      elementZero.forEach(function(elementOne, indexOne) {

        // determine if elementOne should be pushed to the array
        var push = false;
        if (tmpArray == false) {
          push = true;
        } else {
          var pushCounter = 0;

          // iterate over the tmpArray
          tmpArray.forEach(function(elementTwo, indexTwo) {

            // iterate over all elements in the elementOne row
            pathMatrix[elementOne].forEach(function(elementThree, indexThree) {
              if (elementThree === elementTwo) {
                pushCounter++;
              }
            });

            if (pushCounter == tmpArray.length) push = true;
          });
        }

        // push elementOne to widthArray
        if (push) tmpArray.push(elementOne);
      });

      tmpMatrix.push(tmpArray);
    });

    return tmpMatrix;
  },

  /**
   * Remove duplicate paths.
   *
   * @params {Object} [[path]]
   * @return {Boolean}
   * @api private
   */

  dupRemover: function(pathMatrix) {
    pathMatrix.forEach(function(elementZero, indexZero) {
      pathMatrix.forEach(function(elementOne, indexOne) {
        
        // assume equality unless proven otherwise
        var equivalent = true;
        elementZero.forEach(function(elementTwo, indexTwo) {
          
          // make sure elements are same length
          if (elementOne.length !== elementZero.length) {
            equivalent = false;
          }
          
          // make sure elements are identical
          if (elementTwo !== elementOne[indexTwo] || indexOne === indexZero) {
            equivalent = false;
          }
        });
        
        // splice duplicate rows from array
        if (equivalent) {
          pathMatrix.splice(indexZero, 1);
        }
      });
    });

    return pathMatrix;
  },

  /** 
   * Compute event width.
   *
   * @param {Object} [event]
   * @param {Number} [[path]]
   * @return {Object}
   * @api private
   */

  computeWidth: function(eventArray, pathMatrix) {
    pathMatrix.forEach(function(eventZero, indexZero) {
      var width = 0;
      var counter = 0;

      eventZero.forEach(function(eventOne, indexOne) {
        if (!eventArray[eventOne].width) {
          eventArray[eventOne].width = (100 - width) / (eventZero.length - counter);
        } else {
          width += eventArray[eventOne].width;
          counter++;
        }
      });
    });

    return eventArray;
  },

  /**
   * Compute margin
   *
   * @param {Object} [event]
   * @param {Number} [[path]]
   * @return {Object}
   * @api private
   */

  computeMargin: function(eventArray, pathMatrix) {
    pathMatrix.forEach(function(elementZero, indexZero) {
      var length = 0;
      elementZero.forEach(function(elementOne, indexOne) {
        var event = eventArray[elementOne];

        if (event.left) {
          if (indexOne == 0) length = (length + event.left) % 100;
          length = (length + event.width) % 100;
        } else {
          // rounding magic because floats aren't true numbers
          if (length >= 99) length = Math.ceil(length) % 100;
          event.left = length;
          length = (length + event.width) % 100;
        }
      });
    });

    return eventArray;
  },

  /**
   * Churn out elements to be rendered.
   *
   * @param {Object} [event]
   * @param {Object} [width]
   * @return {Object}
   * @api private
   */

  composeElement: function(eventArray, canvasWidth) {
    var matrix = [];

    eventArray.forEach(function(eventZero, indexZero) {
      matrix.push(EventComponent({
        key: indexZero,
        start: eventZero.start, 
        end: eventZero.end, 
        width: (eventZero.width / 100) * canvasWidth,
        left: ((eventZero.left / 100) * canvasWidth) + 10
      }));
    });

    return matrix;
  },

  /**
   * Execute all functions in order.
   *
   * @props {Number} canvasWidth
   * @props {Object} events
   * @api private
   */

  render: function() {
    var canvasWidth = this.props.canvasWidth - 20 || 600;
    var eventArray = this.props.events;
    var pathMatrix = [];
    var matrix = [];

    // Sort the array
    eventArray = this.eventSorter(eventArray);

    // Compute raw item paths.
    pathMatrix = this.eventInspector(eventArray);

    // Clean up item paths.
    pathMatrix = this.rowInspector(pathMatrix);

    // Remove duplicate paths.
    pathMatrix = this.dupRemover(pathMatrix);

    // Compute item size.
    eventArray = this.computeWidth(eventArray, pathMatrix);

    // Compute margin.
    eventArray = this.computeMargin(eventArray, pathMatrix);

    // Churn out completed components to matrix.
    matrix = this.composeElement(eventArray, canvasWidth);

    // Return events to be rendered.
    return (
      React.DOM.div({className: 'calendar-canvas gray-bg_canvas gray-border'}, matrix)
    );
  }
});