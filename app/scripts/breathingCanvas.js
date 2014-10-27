'use strict';

/* global App */
App.Models.BreathingCanvas = function() {

  // Constants
  var UNITS = 100,
      STROKE_COLOR = '#000',
      STROKE_WIDTH = 2;

  // Private vars
  var _canvas, _context, _height, _width,
      _xAxis, _yAxis, _time = {}, _function;

  // Constructor
  this.initialize = function(canvas) {
    _canvas = canvas;
    _function = new App.Models.ComposedSine(1, 4);

    initCanvas();
  };

  // Private functions
  var initCanvas = function() {
    // Configures general properties of the canvas and initialize
    // the object itself
    _canvas.width = 800;
    _canvas.height = 300;

    _context = _canvas.getContext('2d');
    _context.strokeStyle = STROKE_COLOR;
    _context.lineJoin = 'round';
    _context.lineWidth = STROKE_WIDTH;

    _height = _canvas.height;
    _width = _canvas.width;

    _xAxis = Math.floor(_height/2);
    _yAxis = 0;

    _time.t = 0;
    _time.seconds = 0;

    _context.save();

    // Initializes the drawing of the canvas
    draw();
  };

  var draw = function() {
    // Clears the canvas before redrawing
    _context.clearRect(0, 0, _width, _height);

    // Draws the function and the circle in the canvas
    _context.beginPath();
    drawFunction();
    drawCircle();
    _context.stroke();

    // Updates time
    _time.seconds += 0.007;
    _time.t = _time.seconds * Math.PI;

    // Calls himself to redraw the canvas every 35 miliseconds which makes the
    // function move at about 28fps
    setTimeout(draw, 35);
  };

  var drawFunction = function() {
    // Goes from the yAxis to the right side of the canvas plotting the
    // function.
    // Uses UNITS to scale up the function.
    // The plotting occurs every four pixels, which offers more or less the
    // same quality as using one. More than four pixels shows shuttering
    // corners
    for (var i = _yAxis; i <= _width; i += 4) {
      _context.lineTo(i, -UNITS*_function.evaluate(i/UNITS, _time.t) + _xAxis);
    }
  };

  var drawCircle = function() {

  };

  this.initialize.apply(this, arguments);

  return this;
};
