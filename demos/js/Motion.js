// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['renderer'], function(Renderer) {
    var Motion, _ref;
    return Motion = (function(_super) {
      __extends(Motion, _super);

      function Motion() {
        _ref = Motion.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Motion.prototype.init = function() {};

      Motion.prototype.step = function() {};

      Motion.prototype.render = function() {};

      return Motion;

    })(Renderer);
  });

}).call(this);
