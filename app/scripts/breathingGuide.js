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
    window._slider1 = _slider1;
    $('input', _slider1).on('input', onSlider1Input);
    $('input', _slider2).on('input', onSlider2Input);
  };

  var onSlider1Input = function () {
    var value = $(this).val();

    _canvas.setUpSpeed(value);
    updateLabel(_slider1, value);
  };

  var onSlider2Input = function () {
    var value = $(this).val();

    _canvas.setDownSpeed(value);
    updateLabel(_slider2, value);
  };

  var updateLabel = function(slider, value) {
    $('label', slider).html(parseFloat(value).toFixed(1) + 's');
  };

  this.initialize.apply(this, arguments);

  return this;
};
