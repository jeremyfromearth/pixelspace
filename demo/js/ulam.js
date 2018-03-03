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

  var UlamSpiral = function (_Pixelspace$Renderer) {
    _inherits(UlamSpiral, _Pixelspace$Renderer);

    function UlamSpiral() {
      _classCallCheck(this, UlamSpiral);

      return _possibleConstructorReturn(this, (UlamSpiral.__proto__ || Object.getPrototypeOf(UlamSpiral)).apply(this, arguments));
    }

    _createClass(UlamSpiral, [{
      key: 'init',
      value: function init() {
        this.bg = 'black';
        this.font('bold 24pt sans-serif');
        this.dist = 12; // distance between points and diameter of dots
        this.total = 1600; // total number of points
        this.direction = { x: this.dist, y: 0 }; // initialize the direction
        this.points = [{ x: this.width * .5, y: this.height * .5, num: 1, prime: false }]; // all of the points drawn

        var num = 0;
        var count = 0;
        var changes = 0;

        // initialize an array of points
        for (var i = 2; i < this.total + 1; i++) {
          var prev = this.points[i - 2];
          var current = {
            x: prev.x + this.direction.x,
            y: prev.y + this.direction.y,
            num: i,
            prime: this.isPrime(i)
          };

          count++;
          if (count > num) {
            changes++;
            if (changes == 2) {
              num++;
              changes = 0;
            }
            count = 0;
            this.updateDirection();
          }
          this.points.push(current);
        }
      }
    }, {
      key: 'isPrime',
      value: function isPrime(n) {
        for (var i = 2; i < 10; i++) {
          if (n % i == 0 && (n != i || n == 1)) return false;
        }
        return true;
      }
    }, {
      key: 'updateDirection',
      value: function updateDirection() {
        var x = this.direction.x;
        var y = this.direction.y;
        if (x > 0 && y == 0) {
          x = 0;
          y = -this.dist;
        } else if (x == 0 && y < 0) {
          x = -this.dist;
          y = 0;
        } else if (x < 0 && y == 0) {
          x = 0;
          y = this.dist;
        } else if (x == 0 && y > 0) {
          x = this.dist;
          y = 0;
        }
        this.direction.x = x;
        this.direction.y = y;
      }
    }, {
      key: 'render',
      value: function render() {
        for (var i = 0; i < this.points.length; i++) {
          var p = this.points[i];
          if (p.num == 1) {
            this.color('red');
          } else if (p.prime) {
            this.color('white');
          } else {
            this.color('#333');
          }
          this.circle(p.x, p.y, this.dist * .5 - 2);

          if (Math.hitTestCircle(this.mouseX, this.mouseY, p.x, p.y, this.dist * .5)) {
            if (p.prime) {
              this.color('slategrey');
            } else {
              this.color('black');
            }
            this.text(20, 50, 'Number: ' + p.num);
          }
        }
      }
    }]);

    return UlamSpiral;
  }(_pixelspace2.default.Renderer);

  module.exports = UlamSpiral;
});