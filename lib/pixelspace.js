define(["module"], function (module) {
  "use strict";

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

  var Dispatcher = function () {
    function Dispatcher() {
      _classCallCheck(this, Dispatcher);

      this.callbacks = {};
    }

    _createClass(Dispatcher, [{
      key: "add_listener",
      value: function add_listener(event_name, callback) {
        var list = this.callbacks[event_name] = this.callbacks[event_name] || [];
        if (list.indexOf(callback) < 0) {
          list.push(callback);
        }
      }
    }, {
      key: "remove_listener",
      value: function remove_listener(event_name, callback) {
        var index = -1;
        var list = this.callbacks[event_name];
        if (list) {
          for (var i = 0; i < list.length; i++) {
            if (list[i] === callback) {
              index = i;
            }
          }

          if (index >= 0) list.splice(index, 1);
        }
      }
    }, {
      key: "dispatch",
      value: function dispatch(event_name, data) {
        var cbs = this.callbacks[event_name];
        if (cbs) {
          for (var i = 0; i < cbs.length; i++) {
            var cb = cbs[i];
            if (cb) cb(data);
          }
        }
      }
    }]);

    return Dispatcher;
  }();

  var Renderer = function (_Dispatcher) {
    _inherits(Renderer, _Dispatcher);

    function Renderer(ctx) {
      _classCallCheck(this, Renderer);

      var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this));

      _this.ctx = ctx;
      // Width of the drawing context
      _this.width = 0;
      // Height of the drawing context
      _this.height = 0;
      // Only render once if this Renderer is static
      _this.static = false;
      // Boolean indicating whether or not to loop the currentStep variable
      _this.looping = false;
      // If looping, set currentStep back to zero after this many steps
      _this.duration = 0;
      // Background color
      _this.bg = "#CCCCCC";
      // Boolean indicating that player is in fullscreen
      _this.isFullScreen = false;
      // Current step, incremented by Player
      _this.stepCount = 0;
      // The current x coordinate of the mouse
      _this.mouseX = 0;
      // The current y coordinate of the mouse
      _this.mouseY = 0;
      // Boolean indicating the mouse is down
      _this.mouseIsDown = false;
      // Boolean indicating the is over this Renderer
      _this.mouseIsOver = false;
      // Boolean indicating that the mouse is dragging
      _this.mouseIsDragging = false;
      // In some cases the alpha of the context was set by a previous renderer, initialize it
      _this.ctx.globalAlpha = 1.0;
      return _this;
    }

    // Set the opacity of all subsequent draw commands


    _createClass(Renderer, [{
      key: "alpha",
      value: function alpha(a) {
        this.ctx.globalAlpha = a;
      }
    }, {
      key: "arc",
      value: function arc(x, y, radius, start_angle, end_angle) {
        var solid = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, start_angle, end_angle);
        solid ? this.ctx.fill() : this.ctx.stroke();
        this.ctx.closePath();
      }
    }, {
      key: "bezier",
      value: function bezier(cp1x, cp1y, cp2x, cp2y, x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }, {
      key: "circle",
      value: function circle(x, y, radius) {
        var solid = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        this.ctx.beginPath();
        this.arc(x, y, radius, 0, Math.TWO_PI, false);
        solid ? this.ctx.fill() : this.ctx.stroke();
        this.ctx.closePath();
      }
    }, {
      key: "circles",
      value: function circles(points, radius) {
        var solid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (points && points.length) {
          for (var i = 0; i < points.length; i++) {
            var p = points[i];
            this.circle(p[0], p[1], radius, solid);
          }
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        this.ctx.save();
        this.ctx.globalAlpha = 1;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.color(this.bg);
        this.rectangle(0, 0, this.width, this.height);
        this.ctx.restore();
      }
    }, {
      key: "color",
      value: function color(_color) {
        this.ctx.fillStyle = this.ctx.strokeStyle = _color;
      }
    }, {
      key: "font",
      value: function font(style) {
        this.ctx.font = style;
      }
    }, {
      key: "fullscreen",
      value: function fullscreen() {
        this.dispatch('fullscreen');
      }
    }, {
      key: "grid",
      value: function grid(x, y, rows, columns, width, height) {
        var row_height = height / rows;
        var col_width = width / columns;

        for (var i = 0; i <= rows; i++) {
          var ypos = Math.round(y) + i * row_height + .5;
          this.line(x, ypos, x + width, ypos);
        }

        for (var i = 0; i <= columns; i++) {
          var xpos = Math.round(x) + i * col_width + .5;
          this.line(xpos, y, xpos, y + height);
        }
      }
    }, {
      key: "line",
      value: function line(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }, {
      key: "lineStyle",
      value: function lineStyle() {
        var lineWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
        var jointStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "round";
        var capStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "round";

        this.ctx.lineWidth = lineWidth;
        this.ctx.lineJoin = jointStyle;
        this.ctx.lineCap = capStyle;
      }
    }, {
      key: "shape",
      value: function shape(pointList) {
        var solid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var closed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (pointList.length) {
          this.ctx.beginPath();
          for (var i = 0; i < pointList.length; i++) {
            var p = pointList[i];
            this.ctx.lineTo(p[0], p[1]);
          }
          if (closed) {
            this.ctx.closePath();
            solid ? this.ctx.fill() : this.ctx.stroke();
          } else {
            solid ? this.ctx.fill() : this.ctx.stroke();
            this.ctx.closePath();
          }
        }
      }
    }, {
      key: "polygon",
      value: function polygon(x, y, radius) {
        var sides = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
        var solid = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        var angle = 0;
        var points = [];
        var inc = Math.TWO_PI / sides;
        for (var i = 0; i < sides; i++) {
          angle = i * inc;
          points.push([x + Math.cos(angle) * radius, y + Math.sin(angle) * radius]);
        }

        this.shape(points, solid, true);
      }
    }, {
      key: "polygonRing",
      value: function polygonRing(x, y, innerRadius, outerRadius) {
        var innerSides = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 90;
        var outerSides = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 90;
        var arcLength = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Math.TWO_PI;
        var solid = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;

        var inc = 0;
        var p = { x: 0, y: 0 };
        this.ctx.beginPath();
        inc = arcLength / outerSides;
        for (var n = 0; n <= outerSides; n++) {
          p.x = x + Math.cos(inc * n) * outerRadius;
          p.y = y + Math.sin(inc * n) * outerRadius;
          this.ctx.lineTo(p.x, p.y);
        }

        inc = arcLength / innerSides;
        for (var n = innerSides; n >= 0; n--) {
          p.x = x + Math.cos(inc * n) * innerRadius;
          p.y = y + Math.sin(inc * n) * innerRadius;
          if (n == innerSides) {
            this.ctx.moveTo(p.x, p.y);
          } else {
            this.ctx.lineTo(p.x, p.y);
          }
        }

        //this.ctx.closePath();
        solid ? this.ctx.fill() : this.ctx.stroke();
      }
    }, {
      key: "randomColor",
      value: function randomColor() {
        return "rgb(" + Math.floor(Math.random() * 256).toString() + ',' + Math.floor(Math.random() * 256).toString() + ',' + Math.floor(Math.random() * 256).toString() + ")";
      }
    }, {
      key: "rectangle",
      value: function rectangle(x, y, width, height) {
        var solid = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        solid ? this.ctx.fillRect(x, y, width, height) : this.ctx.strokeRect(x, y, width, height);
      }
    }, {
      key: "restoreTransform",
      value: function restoreTransform() {
        this.ctx.restore();
      }
    }, {
      key: "rotate",
      value: function rotate(theta) {
        this.ctx.rotate(theta);
      }
    }, {
      key: "roundedRectangle",
      value: function roundedRectangle(x, y, width, height, cornerRadius) {
        var solid = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y + cornerRadius);
        this.ctx.lineTo(x, y + height - cornerRadius);
        this.ctx.quadraticCurveTo(x, y + height, x + cornerRadius, y + height);
        this.ctx.lineTo(x + width - cornerRadius, y + height);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - cornerRadius);
        this.ctx.lineTo(x + width, y + cornerRadius);
        this.ctx.quadraticCurveTo(x + width, y, x + width - cornerRadius, y);
        this.ctx.lineTo(x + cornerRadius, y);
        this.ctx.quadraticCurveTo(x, y, x, y + cornerRadius);
        solid ? this.ctx.fill() : this.ctx.stroke();
      }
    }, {
      key: "saveTransform",
      value: function saveTransform() {
        this.ctx.save();
      }
    }, {
      key: "shadow",
      value: function shadow(offsetX, offsetY, blur, color) {
        this.ctx.shadowOffsetX = offsetX;
        this.ctx.shadowOffsetY = offsetY;
        this.ctx.shadowBlur = blur;
        this.ctx.shadowColor = color;
      }
    }, {
      key: "shadowClear",
      value: function shadowClear() {
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 0;
      }
    }, {
      key: "scale",
      value: function scale(scaleX, scaleY) {
        this.ctx.scale(scaleX, scaleY);
      }
    }, {
      key: "text",
      value: function text(x, y, _text) {
        var solid = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        solid ? this.ctx.fillText(_text, x, y) : this.ctx.strokeText(_text, x, y);
      }
    }, {
      key: "translate",
      value: function translate(x, y) {
        this.ctx.translate(x, y);
      }
    }, {
      key: "wedge",
      value: function wedge(x, y, radius, startAngle, endAngle) {
        var solid = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle);
        this.ctx.lineTo(x, y);
        this.ctx.closePath();
        solid ? this.ctx.fill() : this.ctx.stroke();
      }
    }]);

    return Renderer;
  }(Dispatcher);

  var Player = function () {
    _createClass(Player, null, [{
      key: "FS_RESIZE",
      get: function get() {
        return 'fs_resize';
      }
    }, {
      key: "FS_NO_RESIZE",
      get: function get() {
        return 'fs_no_resize';
      }
    }]);

    function Player(canvas) {
      _classCallCheck(this, Player);

      this.stepCount = 0;
      this.focus = false;
      this.playing = false;
      this.renderer = null;
      this.canvas = canvas;
      this.isFullWindow = false;
      this.isFullScreen = false;
      this.ctx = this.canvas.getContext('2d');
      this.width = this.canvas.clientWidth;
      this.height = this.canvas.clientHeight;
      this.fullScreenMode = Player.FS_RESIZE;
      window.addEventListener("keyup", this.onWindowKeyboardEvent.bind(this).true);
      window.addEventListener("keydown", this.onWindowKeyboardEvent.bind(this), true);
      window.addEventListener("mousedown", this.onWindowMouseEvent.bind(this), true);
      window.addEventListener("mousemove", this.onWindowMouseEvent.bind(this), true);
      window.addEventListener("mouseout", this.onWindowMouseEvent.bind(this), true);
      window.addEventListener("mouseover", this.onWindowMouseEvent.bind(this), true);
      window.addEventListener("mouseup", this.onWindowMouseEvent.bind(this), true);
      window.addEventListener("resize", this.onWindowResize.bind(this), true);
      this.loop.bind(this);
      this.loop();
    }

    // Wraps various browser specific request for animation frame


    _createClass(Player, [{
      key: "getAnimationCallback",
      value: function getAnimationCallback() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
      }
    }, {
      key: "loop",
      value: function loop() {
        this.getAnimationCallback()(this.loop.bind(this));
        if (this.renderer) {
          if (this.playing) {
            if (!this.renderer.static) {
              this.step();
              this.render();
            } else {
              if (this.stepCount == 0) {
                this.step();
                this.render();
              }
            }
          }
        }
      }
    }, {
      key: "onWindowKeyboardEvent",
      value: function onWindowKeyboardEvent(event) {
        if (this.renderer && this.focus) {
          event.preventDefault();
          switch (event.type) {
            case 'keydown':
              if (this.renderer.onKeyDown) {
                this.renderer.onKeyDown(event.keyCode, event.altKey, event.ctrlKey, event.shiftKey, event.timeStamp);
              }
              break;
            case 'keyup':
              if (this.renderer.onKeyUp) {
                renderer.onKeyUp(event.keyCode, event.altKey, event.ctrlKey, event.shiftKey, event.timeStamp);
              }
              break;
          }
        }
      }
    }, {
      key: "onWindowMouseEvent",
      value: function onWindowMouseEvent(event) {
        this.focus = event.target == this.canvas;
        if (this.renderer) {
          var r = this.canvas.getBoundingClientRect();
          var x = event.clientX - r.left;
          var y = event.clientY - r.top;
          this.renderer.mouseX = x;
          this.renderer.mouseY = y;
          if (event.target == this.canvas) {
            switch (event.type) {
              case "mousedown":
                this.renderer.mouseIsDown = true;
                if (this.renderer.onMouseDown) {
                  this.renderer.onMouseDown(x, y);
                }
                break;
              case 'mousemove':
                if (this.renderer.mouseIsDown) {
                  this.renderer.mouseIsDragging = true;
                }
                if (this.renderer.onMouseMove) {
                  this.renderer.onMouseMove(x, y);
                }
                break;
              case 'mouseout':
                if (this.renderer.onMouseOut) {
                  this.renderer.mouseIsOver = false;
                  this.renderer.onMouseOut(x, y);
                }
                break;
              case 'mouseover':
                if (this.renderer.onMouseOver) {
                  this.renderer.mouseIsOver = true;
                  this.renderer.onMouseOver(x, y);
                }
                break;
              case 'mouseup':
                this.renderer.mouseIsDown = false;
                this.renderer.mouseIsDragging = false;
                if (this.renderer.onMouseUp) {
                  this.renderer.onMouseUp(x, y);
                }
            }
          } else {
            switch (event.type) {
              case "mouseup":
                this.renderer.mouseIsDown = false;
                this.renderer.mouseIsDragging = false;
                if (this.renderer.onMouseUp) {
                  this.renderer.onMouseUp(-1, -1);
                }
            }
          }
        }
      }
    }, {
      key: "onWindowResize",
      value: function onWindowResize(event) {
        if (this.isFullWindow) {
          if (this.canvas.width != window.innerWidth) {
            this.canvas.width = window.innerWidth;
          }
          if (this.canvas.height != window.innerHeight) {
            this.canvas.height = window.innerHeight;
          }

          if (this.renderer) {
            this.renderer.width = this.canvas.width;
            this.renderer.height = this.canvas.height;
            if (this.renderer.static) {
              this.renderer.clear();
              this.renderer.render();
            }
          }
        }
      }
    }, {
      key: "pause",
      value: function pause() {
        this.playing = false;
      }
    }, {
      key: "render",
      value: function render() {
        if (this.renderer.clear) {
          this.renderer.clear();
        }

        if (this.renderer.render) {
          this.renderer.render();
        }
      }
    }, {
      key: "play",
      value: function play() {
        this.playing = true;
      }
    }, {
      key: "setFullWindow",
      value: function setFullWindow(full) {
        this.isFullWindow = full;
        if (full) {
          this.onWindowResize();
        }
      }
    }, {
      key: "setRenderer",
      value: function setRenderer(newRenderer) {
        if (this.renderer) this.renderer.remove_listener('fullscreen', this.toggleFullscreen);
        this.renderer = newRenderer;
        if (this.renderer) {
          this.renderer.stepCount = this.stepCount;
          this.renderer.width = this.canvas.clientWidth;
          this.renderer.height = this.canvas.clientHeight;
          this.renderer.isFullScreen = this.isFullScreen;
          this.renderer.add_listener('fullscreen', this.toggleFullScreen.bind(this));
          // TODO: This does not appear to be working
          if (this.renderer.init) {
            this.renderer.init();
          }
        }
      }
    }, {
      key: "step",
      value: function step() {
        if (this.renderer.looping && this.renderer.duration > 0) {
          if (this.stepCount > this.renderer.duration) {
            this.stepCount = 0;
          }
        }

        this.renderer.stepCount = this.stepCount;
        this.width = this.renderer.width = this.canvas.clientWidth;
        this.height = this.renderer.height = this.canvas.clientHeight;
        if (this.renderer.step) this.renderer.step();
        this.stepCount++;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.stepCount = 0;
        this.playing = false;
        this.ctx.clearRect(0, 0, this.width, this.height);
        if (this.renderer) {
          if (this.renderer.clear) {
            this.renderer.clear();
          }
        }
      }
    }, {
      key: "toggleFullScreen",
      value: function toggleFullScreen() {
        if (this.isFullScreen) {
          this.isFullScreen = false;
          if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
          if (document.mozCancelFullScreen) document.mozCancelFullScreen();
          if (document.cancelFullScreen) document.cancelFullScreen();
          if (document.msCancelFullScreen) document.msCanceFullScreen();
        } else {
          this.isFullScreen = true;
          if (this.canvas.webkitRequestFullScreen) this.canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
          if (canvas.mozRequestFullScreen) this.canvas.mozRequestFullScreen();
          if (this.canvas.requestFullScreen) this.canvas.requestFullScreen();
          if (canvas.msRequestFullScreen) this.canvas.msRequestFullScreen();
        }

        if (this.renderer) this.renderer.isFullScreen = this.isFullScreen;
      }
    }]);

    return Player;
  }();

  var Vec = function () {
    _createClass(Vec, null, [{
      key: "add",
      value: function add(v1, v2) {
        return new Vec(v1.x + v2.x, v1.y + v2.y);
      }
    }, {
      key: "delta",
      value: function delta(v1, v2) {
        var x = v1.x - v2.x;
        var y = v1.y - v2.y;
        return Math.sqrt(x * x + y * y);
      }
    }, {
      key: "div",
      value: function div(v, n) {
        return new Vec(v.x / n, v.y / n);
      }
    }, {
      key: "normalize",
      value: function normalize(v) {
        var m = v.magnitude();
        if (m == 0.0) return new Vec();
        return Vec.div(v, m);
      }
    }, {
      key: "random",
      value: function random(x1, x2, y1, y2) {
        return new Vec(Math.randomInRange(x1, x2), Math.randomInRange(y1, y2));
      }
    }, {
      key: "scale",
      value: function scale(v, n) {
        return new Vec(v.x * n, v.y * n);
      }
    }, {
      key: "sub",
      value: function sub(v1, v2) {
        return new Vec(v1.x - v2.x, v1.y - v2.y);
      }
    }]);

    function Vec() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      _classCallCheck(this, Vec);

      this.x = x;
      this.y = y;
    }

    _createClass(Vec, [{
      key: "add",
      value: function add(v) {
        this.set(Vec.add(this, v));
        return this;
      }
    }, {
      key: "div",
      value: function div(n) {
        this.set(Vec.div(this, n));
        return this;
      }
    }, {
      key: "magnitude",
      value: function magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
    }, {
      key: "normalize",
      value: function normalize() {
        this.set(Vec.normalize(this));
        return this;
      }
    }, {
      key: "scale",
      value: function scale(n) {
        this.set(Vec.scale(this, n));
        return this;
      }
    }, {
      key: "set",
      value: function set(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
      }
    }, {
      key: "sub",
      value: function sub(v) {
        this.set(Vec.sub(this, v));
        return this;
      }
    }]);

    return Vec;
  }();

  // Array Utils
  // ======

  // Returns a randomized copy of the supplied Array
  Array.shuffle = function (a) {
    var result = [];
    var copy = a.slice();
    while (copy.length > 0) {
      var r = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(r, 1)[0]);
    }
    return result;
  };

  Array.NUMERIC = function (a, b) {
    return a - b;
  };

  // Math Utils
  // ======

  // CONSTANTS
  Math.HALF_PI = Math.PI * .5;
  Math.QTR_PI = Math.PI * .25;
  Math.TWO_PI = Math.PI * 2;

  Math.average = function (terms) {
    return Math.sum(terms) / terms.length;
  };

  Math.clamp = function (n, min, max) {
    return Math.min(Math.max(n, min), max);
  };

  // Returns a boolean indicating that the point (px, py) is contained by the circle
  Math.hitTestCircle = function (px, py, x, y, r) {
    return Math.distance(px, py, x, y) <= r;
  };

  // Returns a boolean indicating that the point (px, py) is contained in the rectangle
  Math.hitTestRectangle = function (px, py, x, y, w, h) {
    return px >= x && px <= x + w && py >= y && py <= y + h;
  };

  // Returns a boolean that the point (px, py) is with the band of a ring shape
  Math.hitTestRing = function (px, py, x, y, r1, r2) {
    var d = Math.distance(px, py, x, y);
    return d > r1 && d < r2;
  };

  // Returns a boolean that the point (px, py) is contained by the triangle p1, p2, p3
  // p1, p2, p3 are arrays of two points each
  Math.hitTestTriangle = function (px, py, p1, p2, p3) {
    var x0 = p1[0];
    var y0 = p1[1];
    var x1 = p2[0];
    var y1 = p2[1];
    var x2 = p3[0];
    var y2 = p3[1];
    var A = .5 * (-y1 * x2 + y0 * (-x1 + x2) + x0 * (y1 - y2) + x1 * y2);
    var s = y0 * x2 - x0 * y2 + (y2 - y0) * px + (x0 - x2) * py;
    var t = x0 * y1 - y0 * x1 + (y0 - y1) * px + (x1 - x0) * py;
    var sign = A < 0 ? -1 : 1;
    s *= sign;
    t *= sign;
    return s > 0 && t > 0 && s + t < 2 * A * sign;
  };

  // Returns a boolean indicating that the point (px, py) is contained within a wedge shaped region
  Math.hitTestWedge = function (px, py, x, y, r, startAngle, endAngle) {
    // TODO: Implement
    return false;
  };

  // Returns the distance between two points
  Math.distance = function (x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    dx *= dx;
    dy *= dy;
    return Math.sqrt(dx + dy);
  };

  // Returns array of RGB value of supplied hex value
  // Input value is expected to be in 0xrrggbb format
  Math.hexToRGB = function (hex) {
    return [hex >> 16, hex >> 8 & 0xff, hex & 0xff];
  };

  // Interpolates a value between 0.0 and 1.0 to a correspondig value between min and max
  // ```
  // Math.interpolateLin(.2, 0, 100) # 20
  // ```
  Math.interpolateLin = function (n, min, max) {
    return min + (max - min) * n;
  };

  // Returns a value between 0.0 and 1.0 corresponding to the percentage of n between min and max
  // ```
  // Math.normalize(50, 0, 100) # .5
  // ```
  Math.normalize = function (n, min, max) {
    return (n - min) / (max - min);
  };

  // Returns a random color in rgb format
  Math.randomColor = function () {
    var r = Math.randomInRange(0, 255, true);
    var g = Math.randomInRange(0, 255, true);
    var b = Math.randomInRange(0, 255, true);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  };

  // Returns a random number between the supplied range
  // Provide optional argument of true as third param to return an integer
  Math.randomInRange = function (min, max) {
    var round = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var n = min + (max - min) * Math.random();
    if (round) return Math.round(n);
    return n;
  };

  // Rounds to the nearest decimal
  // ```
  // Math.roundTo(3.219, 2) # 3.22
  // ```
  Math.roundTo = function (n, decimals) {
    return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };

  // Returns a value rounded to the nearest integer multiple
  // ```
  // Math.roundToMultiple(28, 5) # 30
  // ```
  Math.roundToMultiple = function (n, multiple) {
    return multiple * Math.round(n / multiple);
  };

  // Converts a value in degrees to radians
  // ```
  // Math.toRadians(90) # 1.5707963267948966
  // ```
  Math.toRadians = function (degrees) {
    return Math.PI * degrees / 180;
  };

  Math.sum = function (terms) {
    return terms.reduce(function (a, b) {
      return a + b;
    });
  };

  // Transposes a value from one range to another
  // ```
  // Math.transpose(40, 30, 50, 0, 1) # .5
  // ```
  Math.transpose = function (n, min1, max1, min2, max2) {
    return Math.interpolateLin(Math.normalize(n, min1, max1), min2, max2);
  };

  // Convenience for testing the truthiness of whether or not a given number is between two others
  Math.within = function (x, gt, lt) {
    return x >= gt && x <= lt;
  };

  // String Utils
  // ======

  String.alphabet = function () {
    return 'abcdefghijklmnopqrstuvwxyz';
  };

  String.numerics = function () {
    return '0123456789';
  };

  module.exports = {
    Dispatcher: Dispatcher,
    Renderer: Renderer,
    Player: Player,
    Vec: Vec
  };
});