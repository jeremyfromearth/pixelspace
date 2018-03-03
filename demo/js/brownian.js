define(["module", "lib/pixelspace"], function (module, _pixelspace) {
  "use strict";

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

  var Brownian = function (_Pixelspace$Renderer) {
    _inherits(Brownian, _Pixelspace$Renderer);

    function Brownian() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Brownian);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Brownian.__proto__ || Object.getPrototypeOf(Brownian)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
        var k, p, ref, results, v;
        ref = this.paths;
        results = [];
        for (k in ref) {
          v = ref[k];
          this.color("#eee");
          this.shape(v.points, false, false);
          results.push(function () {
            var l, len, ref1, results1;
            ref1 = v.points;
            results1 = [];
            for (l = 0, len = ref1.length; l < len; l++) {
              p = ref1[l];
              results1.push(this.rectangle(p[0] - 2, p[1] - 2, 4, 4, true));
            }
            return results1;
          }.call(this));
        }
        return results;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Brownian, [{
      key: "init",
      value: function init() {
        this["static"] = false;
        this.bg = "#000";
        this.cx = this.width * .5;
        this.cy = this.height * .5;
        this.id = 0;
        this.paths = {};
        this.count = 0;
        this.freq = 0;
        this.segment = 10;
        return this.directions = [[this.segment, -this.segment], [-this.segment, -this.segment], [-this.segment, this.segment], [this.segment, this.segment]];
      }
    }, {
      key: "step",
      value: function step() {
        var dir, direction, index, k, l, len, len1, m, n, neighbor, neighbors, path, point, ref, ref1, results, v, x, y;
        if (this.id < 10 && this.count >= this.freq) {
          this.id++;
          this.count = 0;
          this.freq = 50 + Math.floor(Math.random() * 60);
          this.paths[this.id] = {};
          path = this.paths[this.id];
          path.points = [];
          path.points[0] = [];
          point = path.points[0];
          point[0] = this.segment * ~~(Math.random() * (this.width / this.segment));
          point[1] = this.segment * ~~(Math.random() * (this.height / this.segment));
        } else {
          this.count++;
        }
        if (this.stepCount % 5 === 0) {
          ref = this.paths;
          results = [];
          for (k in ref) {
            v = ref[k];
            x = v.points[v.points.length - 1][0];
            y = v.points[v.points.length - 1][1];
            neighbors = [];
            ref1 = this.directions;
            for (l = 0, len = ref1.length; l < len; l++) {
              dir = ref1[l];
              neighbors.push([x + dir[0], y + dir[1]]);
            }
            neighbor = null;
            this.shuffle(neighbors);
            for (m = 0, len1 = neighbors.length; m < len1; m++) {
              n = neighbors[m];
              if (neighbor === null && !this.contains(v.points, n)) {
                neighbor = n;
                break;
              }
            }
            if (neighbor === null) {
              index = ~~(Math.random() * this.directions.length);
              direction = this.directions[index];
              neighbor = [x + direction[0], y + direction[1]];
            }
            if (neighbor != null) {
              v.points.push(neighbor);
              if (v.points.length > 100) {
                results.push(v.points.shift());
              } else {
                results.push(void 0);
              }
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      }
    }, {
      key: "contains",
      value: function contains(list, n) {
        var count, el, l, len;
        count = 0;
        for (l = 0, len = list.length; l < len; l++) {
          el = list[l];
          if (el[0] === n[0] && el[1] === n[1]) {
            if (count === list.length - 1) {
              return false;
            }
            return true;
          }
          count++;
        }
        return false;
      }
    }, {
      key: "shuffle",
      value: function shuffle(a) {
        var i, j, results, t;
        i = a.length;
        results = [];
        while (--i > 0) {
          j = ~~(Math.random() * (i + 1));
          t = a[j];
          a[j] = a[i];
          a[i] = t;
          results.push(a);
        }
        return results;
      }
    }]);

    return Brownian;
  }(_pixelspace2.default.Renderer);

  module.exports = Brownian;
});