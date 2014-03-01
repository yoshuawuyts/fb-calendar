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
   * Compare events and determine if they're neighbours
   *
   * @params {Object} [event]
   * @return {Boolean}
   * @api private
   */

  eventInspector: function(eventArray) {
    var boolMatrix = [];

    eventArray.forEach(function(eventZero, indexZero) {
      var tmpArray = [];

      eventArray.forEach(function(eventOne, indexOne){

        // don't check yourself, this is no place for introspection
        if (indexOne != indexZero) {

          // check if events overlapCount
          if (eventOne.start < eventZero.end && eventZero.start < eventOne.end) {
            tmpArray.push(true);
          } else {
            tmpArray.push(false);
          }

        } else {
          tmpArray.push(false);
        }
      });

      boolMatrix.push(tmpArray);
    });

    return boolMatrix;
  },

  /**
   * Compute neighbouring rows
   *
   * Calculate rows of neighbouring elements -> remove duplicates -> enforce
   * correctness in rows.
   *
   * @param {Object} [event]
   * @param {Object} [boolMatrix]
   * @return {Object}
   * @api private
   */

  rowInspector: function (boolMatrix) {
    var pathMatrix = [];

    // calculate rows
    boolMatrix.forEach(function(elementZero, indexZero) {
      var widthElement = [];
      elementZero.forEach(function(elementOne, indexOne) {
        
        // add overlapping elements to the matrix
        if (elementOne == true) {
          widthElement.push(indexOne);
        }
        
        // add self to list
        if (indexOne == indexZero) {
          widthElement.push(indexZero);
        }
      });
      pathMatrix.push(widthElement);
    });

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

    pathMatrix = tmpMatrix;

    // remove duplicate rows
    pathMatrix.forEach(function(elementZero, indexZero) {
      pathMatrix.forEach(function(elementOne, indexOne) {
        
        // guilty unless proven otherwise
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
   * Compute width
   *
   * @param {Object} [event]
   * @param {Object} [pathArray]
   * @param {Number} canvasWidth
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
   * @param {Number} canvasWidth
   * @return {Object}
   * @api private
   */

  computeMargin: function(eventArray, pathMatrix) {
    console.log(pathMatrix);

    pathMatrix.forEach(function(elementZero, indexZero) {
      var length = 0;
      elementZero.forEach(function(elementOne, indexOne) {
        var event = eventArray[elementOne];

        if (event.left) {
          if (indexOne == 0) length = (length + event.left) % 100;
          length = (length + event.width) % 100;
        } else {
          if (length >= 99) length = Math.round(length) % 100;
          event.left = length;
          length = (length + event.width) % 100;
        }
      });
    });
    console.log(eventArray);
    return eventArray;
  },

  /**
   * Churn out elements to be rendered
   *
   * @param {Object} [event]
   * @param {Object} [width]
   * @param {Object} [leftMargin]
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
   * @api public
   */

  render: function() {
    var canvasWidth = this.props.canvasWidth - 20 || 600;
    var eventArray = this.props.events;
    var boolMatrix = [];
    var pathMatrix = [];
    var matrix = [];

    // Sort the array
    eventArray = this.eventSorter(eventArray);

    // Compute neighbour positions.
    boolMatrix = this.eventInspector(eventArray);

    // Compute item paths.
    pathMatrix = this.rowInspector(boolMatrix);

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