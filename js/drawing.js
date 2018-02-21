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

  var Drawing = function (_Pixelspace$Renderer) {
    _inherits(Drawing, _Pixelspace$Renderer);

    function Drawing() {
      _classCallCheck(this, Drawing);

      return _possibleConstructorReturn(this, (Drawing.__proto__ || Object.getPrototypeOf(Drawing)).apply(this, arguments));
    }

    _createClass(Drawing, [{
      key: 'init',
      value: function init() {
        this.bg = 'black';
      }
    }, {
      key: 'render',
      value: function render() {
        this.color('white');
        this.lineStyle(1);
        this.font('lighter 14px monospace');

        // arc()
        this.arc(50, 50, 40, Math.PI, Math.TWO_PI * .75, false);
        this.arc(55, 50, 40, Math.TWO_PI * .75, Math.TWO_PI, false);
        this.arc(55, 55, 40, 0, Math.PI * .5, false);
        this.arc(50, 55, 40, Math.PI * .5, Math.PI, false);
        this.text(35, 110, "arc()");

        // circle()
        this.circle(160, 50, 40, false);
        this.circle(160, 50, 20, true);
        this.text(130, 110, "circle()");

        // circles()
        this.ctx.save();
        this.circles([[240, 25], [285, 25], [240, 70], [285, 70]], 15);
        this.color('red');
        this.circles([[240, 25], [285, 25], [240, 70], [285, 70]], 2, false);
        this.ctx.restore();
        this.text(230, 110, "circles()");

        // grid
        this.grid(330, 15, 10, 10, 80, 80);
        this.text(350, 110, "grid()");

        // shape
        this.shape([[420, 10], [520, 30], [540, 90], [500, 80], [460, 60]]);
        this.text(460, 110, "shape()");

        // polygon
        this.polygon(590, 50, 40, 12, false);
        this.polygon(590, 50, 30, 3, false);
        this.polygon(590, 50, 10, 6, false);
        this.text(560, 110, "polygon()");

        // polygonRing
        this.polygonRing(720, 50, 20, 50, 6, 6);
        this.text(670, 110, "polygonRing()");

        // roundedRectangle
        this.roundedRectangle(830, 10, 80, 80, 10);
        this.text(800, 110, "roundedRectangle()");
      }
    }]);

    return Drawing;
  }(_pixelspace2.default.Renderer);

  module.exports = Drawing;
});