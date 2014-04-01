/*eslint no-unused-expressions: 0*/
'use strict';

/**
 * Module dependencies
 */

var canvas = require('../client/modules/views/calendar/canvas');
var unsortedArray = require('./unsortedArrays/unsorted.json');
var widthMatrix1 = require('./widthMatrixes/matrix1.json');
var widthMatrix2 = require('./widthMatrixes/matrix2.json');
var widthMatrix3 = require('./widthMatrixes/matrix3.json');
var sortedArray = require('./unsortedArrays/sorted.json');
var pathMatrix1 = require('./pathMatrixes/matrix1.json');
var pathMatrix2 = require('./pathMatrixes/matrix2.json');
var pathMatrix3 = require('./pathMatrixes/matrix3.json');
var dupArray1 = require('./duplicatePaths/array1.json');
var dupArray2 = require('./duplicatePaths/array2.json');
var dupArray3 = require('./duplicatePaths/array3.json');
var widthArray1 = require('./widthArrays/array1.json');
var widthArray2 = require('./widthArrays/array2.json');
var widthArray3 = require('./widthArrays/array3.json');
var debug = require('debug')('calendar:canvas');
var base1 = require('./baseArrays/array1.json');
var base2 = require('./baseArrays/array2.json');
var base3 = require('./baseArrays/array3.json');
var should = require('should');

/**
 * Tests
 */

describe('canvas', function () {

  /**
   * eventSorter
   */

  describe('#eventSorter()', function() {
    var eventSorter = canvas.originalSpec.eventSorter;

    it('should exist', function(done) {
      eventSorter.should.exist;
      done();
    });

    it('should sort arrays', function (done) {
      var unsorted = eventSorter(unsortedArray);
      sortedArray.forEach(function(elementOne, indexOne) {
        unsortedArray[indexOne].start.should.equal(elementOne.start);
        unsortedArray[indexOne].end.should.equal(elementOne.end);
      });
      done();
    });
  });

  /**
   * eventInspector
   */

  describe('#eventInspector()', function() {
    var eventInspector = canvas.originalSpec.eventInspector;

    it('should exist', function(done){
      eventInspector.should.exist;
      done();
    });

    var pathMatrix = [eventInspector(base1), eventInspector(base2), eventInspector(base3)];
    var comparedMatrix = [pathMatrix1, pathMatrix2, pathMatrix3];

    pathMatrix.forEach(function(elementZero, indexZero) {

      describe('array' + indexZero, function () {
        it('should return an array of numbers', function (done) {
          elementZero.forEach(function(elementOne, indexOne) {
            elementOne.forEach(function(elementTwo, indexTwo) {
              elementTwo.should.be.type('number');
            });
          });
          done();
        });

        it('should return the correct array of numbers', function (done) {
          elementZero.forEach(function(elementOne, indexOne) {
            elementOne.forEach(function(elementTwo, indexTwo) {
              elementTwo.should.equal(comparedMatrix[indexZero][indexOne][indexTwo]);
            });
          });
          done();
        });
      });
    });
  });

  /**
   * rowInspector
   */

  describe('#rowInspector()', function() {
    var rowInspector = canvas.originalSpec.rowInspector;

    it('should exist', function(done){
     rowInspector.should.exist;
     done();
    });

    var pathMatrix = [rowInspector(pathMatrix1), rowInspector(pathMatrix2), rowInspector(pathMatrix3)];
    var comparedArray = [dupArray1, dupArray2, dupArray3];

    pathMatrix.forEach(function(elementZero, indexZero) {

      describe('array' + indexZero, function () {   
        it('should clean up item paths', function (done) {
          comparedArray[indexZero].forEach(function(elementOne, indexOne) {
            elementOne.forEach(function(elementTwo, indexTwo) {
              pathMatrix[indexZero][indexOne][indexTwo].should.equal(elementTwo);
            });
          }); 
          done();
        });
      });
    });
  });

  /**
   * dupRemover
   */

  describe('#rowInspector()', function() {
    var dupRemover = canvas.originalSpec.dupRemover;

    it('should exist', function(done){
      dupRemover.should.exist;
      done();
    });

    it('should remove duplicate paths', function (done) {
      var dupArray = dupRemover(dupArray3);
      widthMatrix3.forEach(function(elementZero, indexZero) {
        elementZero.forEach(function(elementOne, indexOne) {
          dupArray[indexZero][indexOne].should.equal(elementOne);
        });
      });
      done();
    });
  });

  /**
   * computeWidth
   */

  describe('#computeWidth()', function() {
    var computeWidth = canvas.originalSpec.computeWidth;

    it('should exist', function(done){
      computeWidth.should.exist;
      done();
    });

    var eventArray = [
      computeWidth(base1, widthMatrix1), 
      computeWidth(base2, widthMatrix2), 
      computeWidth(base3, widthMatrix3)
    ];

    var comparedArray = [
      [100, 50, 50, 25, 25, 50], 
      [100, 33, 33, 33, 33],
      [100, 50, 50, 25, 25, 12.5, 12.5]
    ];

    eventArray.forEach(function(elementZero, indexZero) {
      describe('array ' + indexZero, function () {

        it('should assign a width to all items', function(done) {
          elementZero.forEach(function(elementOne) {
            elementOne.width.should.be.ok;
          });
          done();
        });

        it('should assign the correct width to all items', function(done) {         
          elementZero.forEach(function(elementOne, indexOne) {
            // case #2 implodes the world by dividing by three; round that sucker.
            if (indexZero != 1) {
              elementOne.width.should.equal(comparedArray[indexZero][indexOne]);
            } else {
              Math.round(elementOne.width).should.equal(comparedArray[indexZero][indexOne]);
            }
          });
          done();
        });
      });
    });
  });

  /**
   * computeMargin
   */

  describe('#computeMargin', function () {
    var computeMargin = canvas.originalSpec.computeMargin;

    it('should exist', function (done) {
      computeMargin.should.exist;
      done();
    });

    var widthArray = [
      computeMargin(widthArray1, widthMatrix1),
      computeMargin(widthArray2, widthMatrix2),
      computeMargin(widthArray3, widthMatrix3)
    ];

    var comparedArray = [
      [0, 0, 50, 0, 25, 50],
      [0, 0, 33, 67, 0],
      [0, 0, 50, 0, 25, 25, 37.5]
    ];

    widthArray.forEach(function(elementZero, indexZero) {
      describe('array1', function () {
        it('should assign the correct margin to all items', function (done) {
          elementZero.forEach(function(elementOne, indexOne) {
            // case #2 implodes the world by dividing by three; round that sucker.
            if (indexZero != 1) {
              elementOne.left.should.equal(comparedArray[indexZero][indexOne]);
            } else {
              Math.round(elementOne.left).should.equal(comparedArray[indexZero][indexOne]); 
            }
          });
          done();
        });
      });
    });
  });

  /**
   * composeElement
   */

  describe('#composeElement()', function(){
    var composeElement = canvas.originalSpec.composeElement;

    it('should exist', function(done){
      composeElement.should.exist;
      done();
    });
  });
});