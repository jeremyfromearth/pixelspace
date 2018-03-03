define(['module', 'lib/pixelspace'], function (module, _pixelspace) {
  'use strict';

  var _pixelspace2 = _interopRequireDefault(_pixelspace);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
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

  var PolyRings = function (_Pixelspace$Renderer) {
    _inherits(PolyRings, _Pixelspace$Renderer);

    function PolyRings() {
      _classCallCheck(this, PolyRings);

      return _possibleConstructorReturn(this, (PolyRings.__proto__ || Object.getPrototypeOf(PolyRings)).apply(this, arguments));
    }

    _createClass(PolyRings, [{
      key: 'init',
      value: function init() {
        this.bg = 'black';
        this.cx = this.width * .5;
        this.cy = this.height * .5;

        // We can define our first polygon ring here 
        // Note that x, y are zero, we will use translate() to move them around
        this.poly1 = [0, 0, 30, 80, 3, 3, Math.PI * 2, true];
      }
    }, {
      key: 'render',
      value: function render() {
        this.color('white');

        // We can supply parameters by themselves
        this.polygonRing(this.cx, this.cy, 20, 40, 6, 6);

        // Or, we pass in the array defining this polygong ring
        this.saveTransform();
        this.translate(this.cx - 200, this.cy);
        this.polygonRing.apply(this, _toConsumableArray(this.poly1));
        this.restoreTransform();

        // We can also rotate shapes, 
        // First we need to move to the drawing point
        this.saveTransform();
        this.translate(this.cx + 200, this.cy);
        this.rotate(Math.PI);
        this.polygonRing.apply(this, _toConsumableArray(this.poly1));
        this.restoreTransform();
      }
    }]);

    return PolyRings;
  }(_pixelspace2.default.Renderer);

  module.exports = PolyRings;
});