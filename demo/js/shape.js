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

  var Shape = function (_Pixelspace$Renderer) {
    _inherits(Shape, _Pixelspace$Renderer);

    function Shape() {
      _classCallCheck(this, Shape);

      return _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).apply(this, arguments));
    }

    _createClass(Shape, [{
      key: 'init',
      value: function init() {
        this.bg = 'black';
        var cx = this.width * 0.5;
        var cy = this.height * 0.5;
        this.shapeData1 = [];
        this.shapeData2 = [];
        this.shapeData3 = [];
        this.radius = 30;
        this.segments = 40;
        var theta = 0;
        var inc = Math.TWO_PI / this.segments;

        for (var i = 0; i < this.segments; i++) {
          var y = Math.sin(theta) * 100 + Math.random() * 15;
          var x = Math.cos(theta) * 100 + Math.random() * 15;
          this.shapeData1.push([cx + x, cy + y]);
          this.shapeData2.push([cx + x - 300, cy + y]);
          this.shapeData3.push([cx + x + 300, cy + y]);
          theta += inc;
        };
      }
    }, {
      key: 'render',
      value: function render() {
        // Draw the left shape outline open
        this.color('cyan');
        this.shape(this.shapeData1, false, false);

        // Draw the right shape filled 
        this.color('magenta');
        this.shape(this.shapeData2, true, false);

        // Draw the right shape outline closed
        this.color('yellow');
        this.shape(this.shapeData3, false, true);
      }
    }]);

    return Shape;
  }(_pixelspace2.default.Renderer);

  module.exports = Shape;
});