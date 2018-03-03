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

  var Keys = function (_Pixelspace$Renderer) {
    _inherits(Keys, _Pixelspace$Renderer);

    function Keys() {
      _classCallCheck(this, Keys);

      return _possibleConstructorReturn(this, (Keys.__proto__ || Object.getPrototypeOf(Keys)).apply(this, arguments));
    }

    _createClass(Keys, [{
      key: 'init',
      value: function init() {
        this.bg = 'black';
        this.ctx.textAlign = 'left';
        this.font('normal 16px Terminus');
        this.keyInfo = 'PRESS AN ARROW KEY';
        this.pointList = [[this.width * .5, this.height * .5]];
        this.current = this.pointList[0];
      }
    }, {
      key: 'render',
      value: function render() {
        this.color('white');
        this.text(10, 30, this.keyInfo);
        this.color('dark slate grey');
        this.shape(this.pointList, false, false);
        this.color('black cat');
        this.circles(this.pointList, 3);
        this.color('red');
        this.circle(this.current[0], this.current[1], 3);
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(keyCode, altKey, ctrlKey, shiftKey, timeStamp) {
        this.keyInfo = 'onKeyDown():' + ' keyCode: ' + keyCode + ' altKey: ' + altKey + ' ctrlKey: ' + ctrlKey + ' shiftKey: ' + shiftKey + ' timeStamp: ' + timeStamp;

        var amount = 20;
        var x = this.current[0];
        var y = this.current[1];

        switch (keyCode) {
          case 37:
            x -= amount;break;
          case 38:
            y -= amount;break;
          case 39:
            x += amount;break;
          case 40:
            y += amount;break;
        }

        this.current = [x, y];
        this.pointList.push(this.current);
      }
    }]);

    return Keys;
  }(_pixelspace2.default.Renderer);

  module.exports = Keys;
});