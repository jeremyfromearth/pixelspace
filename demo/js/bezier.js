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

  var Bezier = function (_Pixelspace$Renderer) {
    _inherits(Bezier, _Pixelspace$Renderer);

    function Bezier() {
      _classCallCheck(this, Bezier);

      return _possibleConstructorReturn(this, (Bezier.__proto__ || Object.getPrototypeOf(Bezier)).apply(this, arguments));
    }

    _createClass(Bezier, [{
      key: 'init',
      value: function init() {
        this.bg = '#000';
        this.radius = 200;
        this.toggle = 0;

        this.center = {
          x: this.width * .5,
          y: this.height * .5
        };

        this.p1 = {
          x: Math.cos(Math.PI * -.45) * this.radius + this.center.x,
          y: Math.sin(Math.PI * -.45) * this.radius + this.center.y
        };

        this.p2 = {
          x: Math.cos(Math.PI * .25) * this.radius + this.center.x,
          y: Math.sin(Math.PI * .25) * this.radius + this.center.y
        };

        this.cp1 = {
          x: this.center.x,
          y: this.center.y
        };

        this.cp2 = {
          x: this.center.x,
          y: this.center.y
        };

        this.cp = null;
      }
    }, {
      key: 'render',
      value: function render() {
        // Center circle
        this.lineStyle(1);
        this.color('#ffffff');
        this.circle(this.center.x, this.center.y, 20);

        // Outer circle
        this.circle(this.center.x, this.center.y, this.radius, false);

        // Control point lines
        this.color('#22ffcc');
        this.lineStyle(1);
        this.line(this.cp1.x, this.cp1.y, this.p1.x, this.p1.y);
        this.line(this.cp2.x, this.cp2.y, this.p2.x, this.p2.y);

        // Control point dots
        this.circle(this.cp1.x, this.cp1.y, 5);
        this.circle(this.cp2.x, this.cp2.y, 5);

        // Main connecting line p1 > p2
        this.color('#00ccff');
        this.line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

        // p1
        this.color('#ffcc00');
        this.circle(this.p1.x, this.p1.y, 5, true);

        //p2
        this.color('#ff00cc');
        this.circle(this.p2.x, this.p2.y, 5, true);
        this.bezier(this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.p1.x, this.p1.y, this.p2.x, this.p2.y);
      }
    }, {
      key: 'onMouseDown',
      value: function onMouseDown() {
        this.toggle = !this.toggle;
        this.cp = this.toggle ? this.cp1 : this.cp2;
        this.cp.x = this.mouseX;
        this.cp.y = this.mouseY;
      }
    }, {
      key: 'onMouseMove',
      value: function onMouseMove(x, y) {
        if (this.mouseIsDragging) {
          this.cp.x = x;
          this.cp.y = y;
        }
      }
    }]);

    return Bezier;
  }(_pixelspace2.default.Renderer);

  module.exports = Bezier;
});