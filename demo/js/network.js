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

  var NetworkGraph = function (_Pixelspace$Renderer) {
    _inherits(NetworkGraph, _Pixelspace$Renderer);

    function NetworkGraph() {
      _classCallCheck(this, NetworkGraph);

      return _possibleConstructorReturn(this, (NetworkGraph.__proto__ || Object.getPrototypeOf(NetworkGraph)).apply(this, arguments));
    }

    _createClass(NetworkGraph, [{
      key: 'init',
      value: function init() {
        this.bg = '#000';
        this.radius = 250;
        this.center = {
          x: this.width * .5,
          y: this.height * .5
        };

        var numNodes = 100;
        var thetaInc = Math.TWO_PI / numNodes;

        this.nodes = [];
        for (var i = 0; i < numNodes; i++) {
          this.nodes.push({
            theta: i * thetaInc,
            x: Math.cos(i * thetaInc) * this.radius + this.center.x,
            y: Math.sin(i * thetaInc) * this.radius + this.center.y,
            color: Math.randomColor()
          });
        }

        this.edges = [];
        for (var i = 0; i < 50; i++) {
          this.edges.push({ a: this.rnd(), b: this.rnd() });
        }

        for (var i = 0; i < this.edges.length; i++) {
          var edge = this.edges[i];
          var n1 = this.nodes[edge.a];
          var n2 = this.nodes[edge.b];
          var cps = this.getControlPointsForEdge(n1, n2);
          edge.cp1 = cps.cp1;
          edge.cp2 = cps.cp2;
        }
      }
    }, {
      key: 'render',
      value: function render() {
        for (var i = 0; i < this.edges.length; i++) {
          var edge = this.edges[i];
          var n1 = this.nodes[edge.a];
          var n2 = this.nodes[edge.b];
          if (n1 !== n2) {
            this.color(n1.color);
            this.bezier(edge.cp1.x, edge.cp1.y, edge.cp2.x, edge.cp2.y, n1.x, n1.y, n2.x, n2.y);
          }
        }

        for (var i = 0; i < this.nodes.length; i++) {
          var node = this.nodes[i];
          this.color(node.color);
          this.circle(node.x, node.y, 2);
          this.color(node.color);
          this.circle(node.x, node.y, 2);
        }
      }
    }, {
      key: 'rnd',
      value: function rnd() {
        return Math.randomInRange(0, this.nodes.length - 1, true);
      }
    }, {
      key: 'getControlPointsForEdge',
      value: function getControlPointsForEdge(p1, p2) {
        var cp1 = {};
        var cp2 = {};
        var r1 = this.radius * .3;
        var r2 = this.radius * .1;
        cp1.x = p1.x - Math.cos(p1.theta) * r1;
        cp1.y = p1.y - Math.sin(p1.theta) * r1;
        cp2.x = p2.x - Math.cos(p2.theta) * r2;
        cp2.y = p2.y - Math.sin(p2.theta) * r2;
        return { cp1: cp1, cp2: cp2 };
      }
    }]);

    return NetworkGraph;
  }(_pixelspace2.default.Renderer);

  module.exports = NetworkGraph;
});