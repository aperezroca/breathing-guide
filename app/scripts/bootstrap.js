'use strict';

var App = {
  Models : {},
};

App.initialize = function() {
  App.Models.BreathingGuide($('#breathing-canvas'), $('#slider1'), $('#slider2'));
};
