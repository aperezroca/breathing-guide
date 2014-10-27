'use strict';

/* global App */
App.Models.ComposedSine = function() {

  // Private vars
  var _f1, _f2;

  // Constructor
  this.initialize = function(coef1, coef2) {
    // B is calculated to force the function to start increasing at x = 0
    _f1 = {
      A : coef1,
      B : Math.asin(-1)
    };

    // B is calculated to force the function to start decreasing exactly
    // when f1 reaches its maximum
    _f2 = {
      A : coef2,
      B : (2*Math.asin(1) - calculateFPeriod(_f1)*coef2)/2
    };
  };

  // Public functions
  this.evaluate = function(x, t) {
    var y, modX = (x + t) % calculatePeriod();

    // Selects which function to use depending on the value of x
    if ((modX > 0) && (modX < calculateFPeriod(_f1)/2)) {
      y = Math.sin(_f1.A * modX + _f1.B);
    } else {
      y = Math.sin(_f2.A * modX + _f2.B);
    }

    return y;
  };

  // Private functions
  var calculateFPeriod = function(f) {
    return 2*Math.PI/f.A;
  };

  var calculatePeriod = function() {
    return calculateFPeriod(_f1)/2 + calculateFPeriod(_f2)/2;
  };

  this.initialize.apply(this, arguments);

  return this;
};
