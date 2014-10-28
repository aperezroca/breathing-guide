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

    initSliders();
  };

  // Private functions
  var initSliders = function() {
    _slider1.on('input', onSlider1Input);
    _slider2.on('input', onSlider2Input);
  };

  var onSlider1Input = function () {
    _canvas.setUpSpeed($(this).val());
  };

  var onSlider2Input = function () {
    _canvas.setDownSpeed($(this).val());
  };

  this.initialize.apply(this, arguments);

  return this;
};
