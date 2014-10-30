'use strict';

/* global App */
App.Models.BreathingCanvas = function() {

  // Constants
  var STROKE_COLOR = '#999',
      STROKE_COLOR_CIRCLE = '#000',
      CIRCLE_RADIUS = 12,
      STROKE_WIDTH = 3;

  // Private vars
  var _canvas, _context, _height, _width,
      _xAxis, _yAxis, _time = {}, _function, _scale = 100;

  // Constructor
  this.initialize = function(canvas) {
    _canvas = canvas;
    _function = new App.Models.ComposedSine(3, 3);

    // Configures general properties of the canvas and initialize
    // the object itself
    _context = _canvas.getContext('2d');

    _time.t = 0;
    _time.seconds = 0;

    $(window).resize(initCanvas);

    initCanvas();

    // Initializes the drawing of the canvas
    draw();
  };

  // Public functions
  this.setUpSpeed = function(speed) {
    _function.setUpSpeed(speed);
  };

  this.setDownSpeed = function(speed) {
    _function.setDownSpeed(speed);
  };

  // Private functions
  var initCanvas = function() {
    _canvas.width = $(_canvas).width();
    _canvas.height = $(_canvas).height();

    _height = _canvas.height;
    _width = _canvas.width;

    _xAxis = Math.floor(_height/2);
    _yAxis = Math.floor(_width/2);

    _context = _canvas.getContext('2d');
    _context.lineJoin = 'round';
    _context.lineWidth = STROKE_WIDTH;

    _context.lineJoin = 'round';
    _context.lineWidth = STROKE_WIDTH;

    if (_width < 300) { _scale = 50; }
    else { _scale = 100; }
  };

  var draw = function() {
    // Clears the canvas before redrawing
    _context.clearRect(0, 0, _width, _height);

    // Draws the function and the circle in the canvas
    _context.beginPath();
    _context.strokeStyle = STROKE_COLOR;
    drawFunction();
    _context.stroke();

    _context.beginPath();
    _context.strokeStyle = STROKE_COLOR_CIRCLE;
    drawCircle();
    _context.stroke();

    // Updates time
    _time.seconds += 0.007;
    _time.t = _time.seconds * 2.54;

    // Calls himself to redraw the canvas every 35 miliseconds which makes the
    // function move at about 28fps
    setTimeout(draw, 35);
  };

  var drawFunction = function() {
    // Goes from the yAxis to the right side of the canvas plotting the
    // function.
    // Uses _scale to scale up the function.
    // The plotting occurs every four pixels, which offers more or less the
    // same quality as using one. More than four pixels shows shuttering
    // corners
    for (var i = 0; i <= _width; i += 4) {
      _context.lineTo(i, -_scale*_function.evaluate((i - _yAxis)/_scale, _time.t) + _xAxis);
    }
  };

  var drawCircle = function() {
    var xCenter = _width/2,
        yCenter = -_scale*_function.evaluate(0, _time.t) + _xAxis;

    _context.arc(xCenter, yCenter, CIRCLE_RADIUS, 0, 2*Math.PI, false);
  };

  this.initialize.apply(this, arguments);

  return this;
};
