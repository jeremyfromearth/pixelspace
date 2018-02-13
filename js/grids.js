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

  var Grids = function (_Pixelspace$Renderer) {
    _inherits(Grids, _Pixelspace$Renderer);

    function Grids() {
      _classCallCheck(this, Grids);

      return _possibleConstructorReturn(this, (Grids.__proto__ || Object.getPrototypeOf(Grids)).apply(this, arguments));
    }

    _createClass(Grids, [{
      key: 'init',
      value: function init() {
        this.bg = '#222';
      }
    }, {
      key: 'render',
      value: function render() {
        this.color('#333');
        this.grid(0, 0, this.height / 10, this.width / 10, this.width, this.height);
        this.color('#66ccff');
        this.grid(30, 50, 10, 10, 100, 100);
        this.color('#ccff66');
        this.grid(160, 50, 10, 10, 200, 200);
        this.color('#ff3366');
        this.grid(390, 50, 10, 10, 400, 400);
      }
    }]);

    return Grids;
  }(_pixelspace2.default.Renderer);

  module.exports = Grids;
});