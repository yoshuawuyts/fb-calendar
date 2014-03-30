/*eslint no-unused-expressions: 0*/
'use strict';

/**
 * Module dependencies
 */

var canvas = require('../client/modules/views/calendar/canvas');
var widthMatrix1 = require('./widthMatrixes/matrix1.json');
var widthMatrix2 = require('./widthMatrixes/matrix2.json');
var widthMatrix3 = require('./widthMatrixes/matrix3.json');
var boolMatrix1 = require('./boolMatrixes/matrix1.json');
var boolMatrix2 = require('./boolMatrixes/matrix2.json');
var boolMatrix3 = require('./boolMatrixes/matrix3.json');
var widthArray1 = require('./widthArrays/array1.json');
var widthArray2 = require('./widthArrays/array2.json');
var widthArray3 = require('./widthArrays/array3.json');
var debug = require('debug')('calendar:canvas');
var base1 = require('./baseArrays/array1.json');
var base2 = require('./baseArrays/array2.json');
var base3 = require('./baseArrays/array3.json');
var should = require('should');

/**
 * Initialize variables
 */

var eventArray1;
var eventArray2;

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

    describe('array1', function () {
      var boolMatrix = eventInspector(base1);

      it('should return a matrix of booleans', function (done) {
        boolMatrix.forEach(function(elementZero) {
          elementZero.forEach(function(elementOne) {
            elementOne.should.be.type('boolean');
          });
        });
        done();
      });

      it('should return the correct matrix of booleans', function (done) {
        boolMatrix.forEach(function(elementZero, indexZero) {
          elementZero.forEach(function(elementOne, indexOne) {
            elementOne.should.equal(boolMatrix1[indexZero][indexOne]);
          });
        });
        done();
      });
    });

    describe('array2', function () {
      var boolMatrix = eventInspector(base2);

      it('should return a matrix of booleans', function (done) {
        boolMatrix.forEach(function(elementZero) {
          elementZero.forEach(function(elementOne) {
            elementOne.should.be.type('boolean');
          });
        });
        done();
      });

      it('should return the correct matrix of booleans', function (done) {
        boolMatrix.forEach(function(elementZero, indexZero) {
          elementZero.forEach(function(elementOne, indexOne) {
            elementOne.should.equal(boolMatrix2[indexZero][indexOne]);
          });
        });
        done();
      });
    });

    describe('array3', function () {
      var boolMatrix = eventInspector(base3);

      it('should return a matrix of booleans', function (done) {
        boolMatrix.forEach(function(elementZero) {
          elementZero.forEach(function(elementOne) {
            elementOne.should.be.type('boolean');
          });
        });
        done();
      });

      it('should return the correct matrix of booleans', function (done) {
        boolMatrix.forEach(function(elementZero, indexZero) {
          elementZero.forEach(function(elementOne, indexOne) {
            elementOne.should.equal(boolMatrix3[indexZero][indexOne]);
          });
        });
        done();
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

    describe('array1', function() {
      var widthMatrix = rowInspector(boolMatrix1);

      it('should return an array of arrays', function (done) {
        widthMatrix.forEach(function(elementZero, indexZero) {
          elementZero.forEach(function(elementOne) {
            elementOne.should.be.type('number');
          });
        });
        done();
      });

      it('should return the correct array', function (done) {
        widthMatrix1.forEach(function(elementZero, indexZero) {
          elementZero.forEach(function(elementOne, indexOne) {
            elementOne.should.equal(widthMatrix[indexZero][indexOne]);
          });
        });
        done();
      });
    });

    describe('array2', function() {
      var widthMatrix = rowInspector(boolMatrix2);

      it('should return an array of arrays', function (done) {
        widthMatrix2.forEach(function(elementZero, indexZero) {
          elementZero.forEach(function(elementOne) {
            elementOne.should.be.type('number');
          });
        });
        done();
      });

      it('should return the correct array', function (done) {
        widthMatrix2.forEach(function(elementZero, indexZero) {
          elementZero.forEach(function(elementOne, indexOne) {
            elementOne.should.equal(widthMatrix[indexZero][indexOne]);
          });
        });
        done();
      });
    });

    describe('array3', function() {
      var widthMatrix = rowInspector(boolMatrix3);

      it('should return an array of arrays', function (done) {
        widthMatrix.forEach(function(elementZero, indexZero) {
          elementZero.forEach(function(elementOne) {
            elementOne.should.be.type('number');
          });
        });
        done();
      });

      it('should return the correct array', function (done) {
        widthMatrix3.forEach(function(elementZero, indexZero) {
          elementZero.forEach(function(elementOne, indexOne) {
            elementOne.should.equal(widthMatrix[indexZero][indexOne]);
          });
        });
        done();
      });
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

    describe('array 1', function () {
      var eventArray = computeWidth(base1, widthMatrix1);

      it('should assign a width to all items', function(done) {
        eventArray.forEach(function(elementZero) {
          elementZero.width.should.be.ok;
        });
        done();
      });

      it('should assign the correct width to all items', function(done) {
        var compareArray = [100, 50, 50, 25, 25, 50];
        
        compareArray.forEach(function(elementZero, indexZero) {
          elementZero.should.equal(eventArray[indexZero].width);
        });
        done();
      });
    });

    describe('array 2', function () {
      var eventArray = computeWidth(base2, widthMatrix2);

      it('should assign a width to all items', function(done) {
        eventArray.forEach(function(elementZero) {
          elementZero.width.should.be.ok;
        });
        done();
      });

      it('should assign the correct width to all items', function(done) {
        var compareArray = [100, 33, 33, 33, 33];
        
        compareArray.forEach(function(elementZero, indexZero) {
          elementZero.should.equal(Math.round(eventArray[indexZero].width));
        });
        done();
      });
    });

    describe('array 3', function () {
      var eventArray = computeWidth(base3, widthMatrix3);

      it('should assign a width to all items', function(done) {
        eventArray.forEach(function(elementZero) {
          elementZero.width.should.be.ok;
        });
        done();
      });

      it('should assign the correct width to all items', function(done) {
        var compareArray = [100, 50, 50, 25, 25, 12.5, 12.5];
        
        compareArray.forEach(function(elementZero, indexZero) {
          elementZero.should.equal(eventArray[indexZero].width);
        });
        done();
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

    describe('array1', function () {
      var widthArray = computeMargin(widthArray1, widthMatrix1);
      it('should assign the correct margin to all items', function (done) {
        var compareArray = [0, 0, 50, 0, 25, 50];
        compareArray.forEach(function(elementZero, indexZero) {
          debug('array1', elementZero, widthArray[indexZero].left);
          widthArray[indexZero].left.should.equal(elementZero);
        });
        done();
      });
    });

    describe('array2', function () {
      var widthArray = computeMargin(widthArray2, widthMatrix2);
      it('should assign the correct margin to all items', function (done) {
        var compareArray = [0, 0, 33, 67, 0];
        compareArray.forEach(function(elementZero, indexZero) {
          debug('array2', elementZero, widthArray[indexZero].left);
          Math.round(widthArray[indexZero].left).should.equal(elementZero);
        });
        done();
      });
    });

    describe('array3', function () {
      var widthArray = computeMargin(widthArray3, widthMatrix3);
      it('should assign the correct margin to all items', function (done) {
        var compareArray = [0, 0, 50, 0, 25, 25, 37.5];
        compareArray.forEach(function(elementZero, indexZero) {
          debug('array3', elementZero, widthArray[indexZero].left);
          widthArray[indexZero].left.should.equal(elementZero);
        });
        done();
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