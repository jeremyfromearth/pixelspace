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

  var Basic = function (_Pixelspace$Renderer) {
    _inherits(Basic, _Pixelspace$Renderer);

    function Basic() {
      _classCallCheck(this, Basic);

      return _possibleConstructorReturn(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).apply(this, arguments));
    }

    _createClass(Basic, [{
      key: 'init',
      value: function init() {
        this.bg = '#222';
        this.title = 'Pixelspace!';
      }
    }, {
      key: 'render',
      value: function render() {
        var cx = this.width * 0.5;
        var cy = this.height * 0.5;
        this.font('bold 80pt Helvetica');
        this.color('#fff');
        this.text(165, 250, this.title, false);
        this.color('#d13737');
        this.circle(cx - 25, cy + 20, 10);
        this.color('#45d137');
        this.circle(cx, cy + 20, 10);
        this.color('#3762d1');
        this.circle(cx + 25, cy + 20, 10);
      }
    }]);

    return Basic;
  }(_pixelspace2.default.Renderer);

  module.exports = Basic;
});