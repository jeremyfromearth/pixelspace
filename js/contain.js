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

  var Contain = function (_Pixelspace$Renderer) {
    _inherits(Contain, _Pixelspace$Renderer);

    function Contain() {
      _classCallCheck(this, Contain);

      return _possibleConstructorReturn(this, (Contain.__proto__ || Object.getPrototypeOf(Contain)).apply(this, arguments));
    }

    _createClass(Contain, [{
      key: 'init',
      value: function init() {
        var cx = this.width * .5;
        var cy = this.height * .5;

        // rectangle properties
        this.rect = [cx, cy - 50, 100, 100];

        // circle propertys
        this.circ = [cx - 75, cy, 50];

        // triangle properties
        this.tri = [[cx + 183, cy - 50], [cx + 125, cy + 50], [cx + 250, cy + 50]];

        // ring properties
        this.ring = [cx - 200, cy, 20, 50, 16, 36];

        this.bg = 'black';
        this.cx = cx;
        this.cy = cy;
      }
    }, {
      key: 'render',
      value: function render() {
        // rectangle
        var contains = Math.hitTestRectangle.apply(Math, [this.mouseX, this.mouseY].concat(_toConsumableArray(this.rect)));
        this.color(contains ? 'red' : 'white');
        this.rectangle.apply(this, _toConsumableArray(this.rect));

        // circle
        contains = Math.hitTestCircle.apply(Math, [this.mouseX, this.mouseY].concat(_toConsumableArray(this.circ)));
        this.color(contains ? 'red' : 'white');
        this.circle.apply(this, _toConsumableArray(this.circ));

        // triangle
        contains = Math.hitTestTriangle.apply(Math, [this.mouseX, this.mouseY].concat(_toConsumableArray(this.tri)));
        this.color(contains ? 'red' : 'white');
        this.shape(this.tri);

        // ring
        contains = Math.hitTestRing.apply(Math, [this.mouseX, this.mouseY].concat(_toConsumableArray(this.ring)));
        this.color(contains ? 'red' : 'white');
        this.polygonRing.apply(this, _toConsumableArray(this.ring));
      }
    }]);

    return Contain;
  }(_pixelspace2.default.Renderer);

  module.exports = Contain;
});