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
        this.bg = 'black';
        var cx = this.width * 0.5;
        var cy = this.height * 0.5;
        this.freq = 0;
        this.size = 4;
        this.squares = [];
        this.phazer_attenuation = 0.00008;
        for (var i = 0; i < this.width / 5; i++) {
          for (var j = 0; j < this.height / 5; j++) {
            this.squares.push({
              x: i * 5,
              y: j * 5,
              a: 0,
              color: Math.random() * 0xffffff
            });
          }
        }
      }
    }, {
      key: 'step',
      value: function step() {
        this.freq += 0.05;
        for (var i = 0; i < this.squares.length; i++) {
          var s = this.squares[i];
          var phazer = i > 0 ? this.squares[i - 1].a : 0;
          s.a = Math.abs(Math.sin(this.freq + i * phazer * 0.00008));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        for (var i = 0; i < this.squares.length; i++) {
          var s = this.squares[i];
          this.alpha(s.a);
          this.color('white');
          this.rectangle(s.x, s.y, 4, 4);
        }

        this.alpha(1);
        this.color('#000');
        this.font('bold 50pt Terminus');
        this.text(50, this.height * 0.5, '[PIXELSPACE]');
      }
    }]);

    return Basic;
  }(_pixelspace2.default.Renderer);

  module.exports = Basic;
});