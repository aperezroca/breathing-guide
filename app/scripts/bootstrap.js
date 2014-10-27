'use strict';

var App = {
  Models : {},
};

App.initialize = function() {
  $(function() {
    App.Models.BreathingGuide($('#breathing-canvas')[0], $('#slider1'), $('#slider2'));
  });
};
