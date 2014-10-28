'use strict';

/* global App */
App.Models.ComposedSine = function() {

  // Private vars
  var _f1 = {}, _f2 = {};

  // Constructor
  this.initialize = function(coef1, coef2) {
    this.setDownSpeed(coef1);
    this.setUpSpeed(coef2);
  };

  // Public functions
  this.evaluate = function(x, t) {
    var y, modX = (x + t) % calculatePeriod();

    if (modX < 0) {
      modX = calculatePeriod() + modX;
    }

    // Selects which function to use depending on the value of x
    if ((modX >= 0) && (modX < calculateFPeriod(_f1)/2)) {
      y = Math.sin(_f1.A * modX + _f1.B);
    } else {
      y = Math.sin(_f2.A * modX + _f2.B);
    }

    return y;
  };

  this.setUpSpeed = function(speed) {
    _f1.A = 2*Math.PI/speed;

    onUpSpeedChange();
  };

  this.setDownSpeed = function(speed) {
    _f2.A = 2*Math.PI/speed;

    onDownSpeedChange();
  };

  // Private functions
  var calculateFPeriod = function(f) {
    return 2*Math.PI/f.A;
  };

  var calculatePeriod = function() {
    return calculateFPeriod(_f1)/2 + calculateFPeriod(_f2)/2;
  };

  var onUpSpeedChange = function() {
    _f1.B = Math.asin(-1);
    _f2.B = (2*Math.asin(1) - calculateFPeriod(_f1)*_f2.A)/2;
  };

  var onDownSpeedChange = function() {
    _f2.B = (2*Math.asin(1) - calculateFPeriod(_f1)*_f2.A)/2;
  };

  this.initialize.apply(this, arguments);

  return this;
};
