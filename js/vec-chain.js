define(['module', 'lib/pixelspace'], function (module, _pixelspace) {
  'use strict';

  var _pixelspace2 = _interopRequireDefault(_pixelspace);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var Vec = _pixelspace2.default.Vec;

  var Node = function () {
    function Node(x, y) {
      _classCallCheck(this, Node);

      this.position = new Vec(x, y);
      this.target = new Vec();
      this.velocity = new Vec();
      this.damping = 0.3;
      this.stiffness = 0.9;
      this.timeFactor = 0.6;
      this.theta = 0;
      this.radius = 0;
    }

    _createClass(Node, [{
      key: 'update',
      value: function update(setNewTarget) {
        var delta = Vec.sub(this.target, this.position);
        if (delta.magnitude() > 0.1) {
          this.velocity = Vec.scale(this.velocity, this.damping).add(delta.scale(this.timeFactor)).scale(this.stiffness);
          //this.velocity = delta.scale(0.1);
          this.position.add(this.velocity);
        } else if (setNewTarget) {
          this.target = Vec.random(0, 960, 0, 540);
        }
      }
    }]);

    return Node;
  }();

  var VecChains = function (_Pixelspace$Renderer) {
    _inherits(VecChains, _Pixelspace$Renderer);

    function VecChains() {
      _classCallCheck(this, VecChains);

      return _possibleConstructorReturn(this, (VecChains.__proto__ || Object.getPrototypeOf(VecChains)).apply(this, arguments));
    }

    _createClass(VecChains, [{
      key: 'init',
      value: function init() {
        this.bg = 'black';
        this.chains = [];
        this.createChain(this.width * 0.5, this.height * 0.5);
      }
    }, {
      key: 'step',
      value: function step() {
        for (var i = 0; i < this.chains.length; i++) {
          var chain = this.chains[i];
          for (var j = 0; j < chain.length; j++) {
            var link = chain[j];
            if (j == 0) {
              link.update(true);
            } else {
              var leader = chain[j - 1];
              var direction = Vec.sub(leader.target, leader.position).normalize();
              var target = Vec.sub(leader.position, direction.scale(15.0));
              link.target = target;
              link.update(false);
            }
          }
        }
      }
    }, {
      key: 'render',
      value: function render() {
        for (var i = 0; i < this.chains.length; i++) {
          var points = [];
          var chain = this.chains[i];
          for (var j = 0; j < chain.length; j++) {
            points.push([chain[j].position.x, chain[j].position.y]);
          }

          this.color('red');
          this.shape(points, false, false);
          this.circles(points, 2, true);
        }
      }
    }, {
      key: 'onMouseDown',
      value: function onMouseDown(x, y) {
        this.createChain(x, y);
      }
    }, {
      key: 'createChain',
      value: function createChain(x, y) {
        this.chains.push([]);
        var center = new Vec(x, y);
        var linkCount = Math.randomInRange(3, 5);
        var timeFactor = Math.randomInRange(1, 1);
        var damping = Math.randomInRange(0.01, 0.6);
        var stiffness = Math.randomInRange(0.01, 0.2);
        for (var i = 0; i < linkCount; i++) {
          var n = new Node(x, y);
          n.timeFactor = timeFactor;
          n.damping = damping;
          n.stiffness = stiffness;
          n.position = new Vec(x, y);
          if (i == 0) {
            n.target = Vec.random(0, this.width, 0, this.height);
          }
          this.chains[this.chains.length - 1].push(n);
        }
      }
    }]);

    return VecChains;
  }(_pixelspace2.default.Renderer);

  module.exports = VecChains;
});