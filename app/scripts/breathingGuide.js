'use strict';

/* global App */
App.Models.BreathingGuide = function() {

  // Private vars
  var _canvas, _slider1, _slider2;

  // Constructor
  this.initialize = function(canvas, slider1, slider2) {
    _canvas = new App.Models.BreathingCanvas(canvas);
    _slider1 = slider1;
    _slider2 = slider2;
  };

  this.initialize.apply(this, arguments);

  return this;
};
