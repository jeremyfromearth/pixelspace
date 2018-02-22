define(['module', 'lib/pixelspace'], function (module, _pixelspace) {
  'use strict';

  var _pixelspace2 = _interopRequireDefault(_pixelspace);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var MouseEvents = function (_Pixelspace$Renderer) {
    _inherits(MouseEvents, _Pixelspace$Renderer);

    function MouseEvents() {
      _classCallCheck(this, MouseEvents);

      return _possibleConstructorReturn(this, (MouseEvents.__proto__ || Object.getPrototypeOf(MouseEvents)).apply(this, arguments));
    }

    _createClass(MouseEvents, [{
      key: 'init',
      value: function init() {
        this.data = [];
        this.bg = 'black';
        this.current = null;
        this.currentMouseEventType = "None";
      }
    }, {
      key: 'step',
      value: function step() {
        var i = 0;
        while (i < this.data.length) {
          if (this.data[i] && this.data[i] != this.current) {
            this.data[i].scale *= .95;
            this.data[i].alpha *= .95;
            if (this.data[i].alpha < 0) {
              this.data[i] = null;
            }
          }

          i++;
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var i = 0;
        while (i < this.data.length) {
          var p = this.data[i];
          if (p) {
            this.alpha(p.alpha);
            var outline = this.current && (this.mouseIsDragging || this.mouseIsDown);
            this.color(p.color);
            this.circle(p.x, p.y, p.radius * p.scale, !outline);
          }

          i++;
        }

        this.alpha(1);
        this.color("#ffffff");
        this.font('normal 14pt Helvetica');
        this.text(30, 30, "Mouse position x: " + this.mouseX + ", y: " + this.mouseY);
        this.text(30, 50, "Current mouse event type: " + this.currentMouseEventType);
        this.text(30, 70, "mouseIsDragging: " + this.mouseIsDragging + ", mouseIsOver: " + this.mouseIsOver + ", mouseIsDown: " + this.mouseIsDown);
      }
    }, {
      key: 'onMouseDown',
      value: function onMouseDown(x, y) {
        this.currentMouseEventType = "mouseDown";
        this.current = {
          x: x,
          y: y,
          color: Math.random() > 0.5 ? 'white' : 'red',
          radius: Math.random() * 30 + 10,
          alpha: 1,
          scale: 1
        };

        this.data.push(this.current);
      }
    }, {
      key: 'onMouseMove',
      value: function onMouseMove(x, y) {
        this.currentMouseEventType = "mouseMove";
        if (this.mouseIsDragging) {
          if (this.current) {
            this.current.x = x;
            this.current.y = y;
          }
        }
      }
    }, {
      key: 'onMouseUp',
      value: function onMouseUp(x, y) {
        this.currentMouseEventType = "mouseUp";
        this.current = null;
      }
    }, {
      key: 'onMouseOver',
      value: function onMouseOver(x, y) {
        this.currentMouseEventType = "mouseOver";
        this.bg = "#222222";
      }
    }, {
      key: 'onMouseOut',
      value: function onMouseOut(x, y) {
        this.currentMouseEventType = "mouseOut";
        this.bg = "#000000";
      }
    }]);

    return MouseEvents;
  }(_pixelspace2.default.Renderer);

  module.exports = MouseEvents;
});