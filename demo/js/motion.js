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

  var Motion = function (_Pixelspace$Renderer) {
    _inherits(Motion, _Pixelspace$Renderer);

    function Motion() {
      _classCallCheck(this, Motion);

      return _possibleConstructorReturn(this, (Motion.__proto__ || Object.getPrototypeOf(Motion)).apply(this, arguments));
    }

    _createClass(Motion, [{
      key: 'init',
      value: function init() {
        this.n = 0;
        this.s = 0;
        this.bg = 'black';
        this.cx = this.width * .5;
        this.cy = this.height * .5;
      }
    }, {
      key: 'step',
      value: function step() {
        this.n += .01;
        this.s = Math.sin(this.n);
      }
    }, {
      key: 'render',
      value: function render() {
        this.color('red');
        this.alpha(Math.abs(this.s));
        this.saveTransform();
        this.translate(this.cx, this.cy);
        this.rotate(this.s);
        this.polygon(0, 0, 100, 2 + Math.ceil(Math.abs(this.s) * 10));
        this.restoreTransform();
      }
    }]);

    return Motion;
  }(_pixelspace2.default.Renderer);

  module.exports = Motion;
});