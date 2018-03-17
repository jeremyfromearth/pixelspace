class Dispatcher {
  constructor() {
    this.callbacks = {}
  }

  add_listener(event_name, callback) {
    let list = 
      this.callbacks[event_name] = 
        this.callbacks[event_name] || [];
    if(list.indexOf(callback) < 0) {
      list.push(callback);
    }
  }
  
  remove_listener(event_name, callback) {
    let index = -1;
    let list = this.callbacks[event_name];
    if(list) {
      for(var i = 0; i < list.length; i++) {
        if(list[i] === callback) {
          index = i;
        }
      }
      
      if(index >= 0) list.splice(index, 1);
    }
  }
            
  dispatch(event_name, data) {
    let cbs = this.callbacks[event_name];
    if(cbs) {
      for(var i = 0; i < cbs.length; i++) {
        let cb = cbs[i];
        if(cb) cb(data);
      }
    }
  }
}

class Renderer extends Dispatcher{
  constructor() {
    super();

    // Width of the drawing context
    this.width = 0;
    // Height of the drawing context
    this.height = 0;
    // Only render once if this Renderer is static
    this.static = false;
    // Boolean indicating whether or not to loop the currentStep variable
    this.looping = false;
    // If looping, set currentStep back to zero after this many steps
    this.duration = 0;
    // Background color
    this.bg = "#CCCCCC";
    // Boolean indicating that player is in fullscreen
    this.isFullScreen = false;
    // Current step, incremented by Player
    this.stepCount = 0;
    // The current x coordinate of the mouse
    this.mouseX = 0;
    // The current y coordinate of the mouse
    this.mouseY = 0;
    // Boolean indicating the mouse is down
    this.mouseIsDown = false;
    // Boolean indicating the is over this Renderer
    this.mouseIsOver = false;
    // Boolean indicating that the mouse is dragging
    this.mouseIsDragging = false;
  }

  // Set the opacity of all subsequent draw commands
  alpha(a) {
    this.ctx.globalAlpha = a;
  }

  // Draws and arc
  arc(x, y, radius, start_angle, end_angle, solid = true) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, start_angle, end_angle);
    solid ? this.ctx.fill() : this.ctx.stroke();
    this.ctx.closePath();
  }

  // Draws a bezier curve between x1, y1 > x2, y2 with control point cp1 & cp2
  bezier(cp1x, cp1y, cp2x, cp2y, x1, y1, x2, y2) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1);
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
    this.ctx.stroke()
    this.ctx.closePath()
  }

  // Draws a single circle
  circle(x, y, radius, solid = true) {
    this.ctx.beginPath();
    this.arc(x, y, radius, 0, Math.TWO_PI, false);
    solid ? this.ctx.fill() : this.ctx.stroke();
    this.ctx.closePath()
  }

  // Draws circles at specified points
  circles(points, radius, solid = true) {
    if(points && points.length) {
      for(var i = 0; i < points.length; i++) {
        var p = points[i];
        this.circle(p[0], p[1], radius, solid);
      }
    }
  }

  // Clears the drawing context and redraws the background color
  // This method is called by the player every frame before the render method is called
  clear() {
    this.ctx.save()
    this.ctx.globalAlpha = 1
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.color(this.bg);
    this.rectangle(0, 0, this.width, this.height);
    this.ctx.restore()
  }

  // Sets the color of both fill and stroke style for all subsequent draw commands
  // Color values can be supplied in the following formats
  // ```
  // @color rgb(255, 0, 0)
  // @color #ff0000
  // @color "red"
  // ```
  color(color) {
    this.ctx.fillStyle = this.ctx.strokeStyle = color
  }

  // Sets the fonstyle
  // ```
  // @font "bold 80pt Baskerville"
  // @font "normal 100px Helvetica"
  // ```
  font(style) {
    this.ctx.font = style
  }

  // Dispatches a fullscreen event
  fullscreen() {
    this.dispatch('fullscreen');
  }

  // Draws a grid
  grid(x, y, rows, columns, width, height) {
    let row_height = height / rows
    let col_width = width / columns

    for(var i = 0; i <= rows; i++) {
      var ypos = Math.round(y) + i * row_height + .5
      this.line(x, ypos, x + width, ypos);
    }

    for(var i = 0; i <= columns; i++) {
      var xpos = Math.round(x) + i * col_width + .5
      this.line(xpos, y, xpos, y + height);
    }
  }

  // Draws a line betwen two points
  line(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  // Sets the linestyle for all subsequent draw commands
  lineStyle(lineWidth = 1.0, jointStyle = "round", capStyle = "round") {
    this.ctx.lineWidth = lineWidth;
    this.ctx.lineJoin = jointStyle;
    this.ctx.lineCap = capStyle;
  }

  // Draws a series of lines that define shape
  // Lines can be optionally closed and and left un-filled to draw a series of connected lines
  // ```
  // #Draw closed and filled shape
  // @shape [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]
  //
  // #Draw connected line segments only
  // @shape [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]], false, false
  // ```
  shape(pointList, solid = true, closed=true) {
    if(pointList.length) {
      this.ctx.beginPath();
      for(var i = 0; i < pointList.length; i++) {
        var p = pointList[i];
        this.ctx.lineTo(p[0], p[1]);
      }
      if(closed) {
        this.ctx.closePath();
        solid ? this.ctx.fill() : this.ctx.stroke();
      } else {
        solid ? this.ctx.fill() : this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }

  // Draws an n-sided polygon
  polygon(x, y, radius, sides = 3, solid = true) {
    let angle = 0;
    let points = [];
    const inc = Math.TWO_PI / sides;
    for(var i = 0; i < sides; i++) {
      angle = i * inc;
      points.push([x + Math.cos(angle) * radius, y + Math.sin(angle) * radius]);
    }

    this.shape(points, solid, true);
  }


  // Draws a polygon with n inner sides and n outer sides of
  // ```
  // #Draws a triangle with a hole in the center
  // @polygonRing 100, 100, 20, 60, 30, 3, true
  // ```
  polygonRing(x, y, innerRadius, outerRadius, innerSides = 90, outerSides = 90, arcLength = Math.TWO_PI, solid = true) {
    let inc = 0;
    let p = {x : 0, y : 0};
    this.ctx.beginPath();
    inc =  arcLength / outerSides;
    for(var n = 0; n <= outerSides; n++) {
      p.x = x + Math.cos(inc * n) * outerRadius;
      p.y = y + Math.sin(inc * n) * outerRadius;
      this.ctx.lineTo(p.x, p.y);
    }   

    inc = arcLength / innerSides;
    for(var n = innerSides; n >= 0; n--) {
      p.x = x + Math.cos(inc * n) * innerRadius;
      p.y = y + Math.sin(inc * n) * innerRadius;
      if(n == innerSides) {
        this.ctx.moveTo(p.x, p.y);
      } else {
        this.ctx.lineTo(p.x, p.y);
      }
    }

    //this.ctx.closePath();
    solid ? this.ctx.fill() : this.ctx.stroke();
  }

  // Returns a random color in rgb format
  randomColor() {
    return "rgb(" +
      (Math.floor(Math.random() * 256)).toString() + ',' +
      (Math.floor(Math.random() * 256)).toString() + ',' +
      (Math.floor(Math.random() * 256)).toString() + ")";
  }

  // Draws a rectangle
  rectangle(x, y, width, height, solid = true) {
    solid ? this.ctx.fillRect(x, y, width, height) : this.ctx.strokeRect(x, y, width, height);
  }

  // Restores the drawing context
  restoreTransform() { 
    this.ctx.restore();
  }

  // Rotates the drawing context
  rotate(theta) {
    this.ctx.rotate(theta);
  }

  // Draws a rounded rectangle
  roundedRectangle(x, y, width, height, cornerRadius, solid = true) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + cornerRadius);
    this.ctx.lineTo(x, y + height - cornerRadius);
    this.ctx.quadraticCurveTo(x , y + height, x + cornerRadius, y + height);
    this.ctx.lineTo(x + width - cornerRadius, y + height);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - cornerRadius);
    this.ctx.lineTo(x + width, y + cornerRadius);
    this.ctx.quadraticCurveTo(x + width, y , x + width - cornerRadius, y);
    this.ctx.lineTo(x + cornerRadius, y);
    this.ctx.quadraticCurveTo(x, y, x, y + cornerRadius);
    solid ? this.ctx.fill() : this.ctx.stroke();
  }

  // Saves the drawing context
  saveTransform() {
    this.ctx.save();
  }

  // Sets a drop shadow on all subsequent draw commands
  shadow(offsetX, offsetY, blur, color) {
    this.ctx.shadowOffsetX = offsetX;
    this.ctx.shadowOffsetY = offsetY;
    this.ctx.shadowBlur = blur;
    this.ctx.shadowColor = color;
  }

  // Clears the drop shadow on all subsequent draw commands
  shadowClear() {
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
  }

  // Sets the scale of the drawing context
  scale(scaleX, scaleY) {
    this.ctx.scale(scaleX, scaleY);
  }

  // Draws text
  text(x, y, text, solid = true) {
    solid ? this.ctx.fillText(text, x, y) : this.ctx.strokeText(text, x, y);
  }

  // Translate the drawing context
  translate(x, y) {
    this.ctx.translate(x, y);
  }

  // Draws a wedge shape
  wedge(x, y, radius, startAngle, endAngle, solid = true) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, startAngle, endAngle);
    this.ctx.lineTo(x, y);
    this.ctx.closePath()
    solid ? this.ctx.fill() : this.ctx.stroke();
  }
}

class Player {
  static get FS_RESIZE() { return 'fs_resize'; }
  static get FS_NO_RESIZE() { return 'fs_no_resize'; }

  constructor(canvas) {
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
    this.ctx = canvas.getContext('2d');
    window.addEventListener("keyup", this.onWindowKeyboardEvent.bind(this). true);
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
  getAnimationCallback() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame;
  }

  // The main loop
  loop() {
    this.getAnimationCallback()(this.loop.bind(this));
    if(this.renderer) {
      if(this.playing) {
        if(!this.renderer.static) {
          this.step();
          this.render();
        } else {
          if(this.stepCount == 0) {
            this.step();
            this.render();
          }
        }
      }
    }
  }

  onWindowKeyboardEvent(event) {
    if(this.renderer && this.focus) {
      event.preventDefault();
      switch(event.type) {
        case 'keydown':
          if(this.renderer.onKeyDown) {
            this.renderer.onKeyDown(
              event.keyCode, event.altKey, 
              event.ctrlKey, event.shiftKey, 
              event.timeStamp);
          }
          break;
        case 'keyup':
          if(this.renderer.onKeyUp) {
            renderer.onKeyUp(
              event.keyCode, event.altKey, 
              event.ctrlKey, event.shiftKey, 
              event.timeStamp);
          }
          break;
      }
    }
  }

  // Capture all mouse events on the window and pass them to the renderer when it is the target
  onWindowMouseEvent(event) {
    this.focus = event.target == this.canvas;
    if(this.renderer) {
      let r = this.canvas.getBoundingClientRect();
      let x = event.clientX - r.left;
      let y = event.clientY - r.top;
      this.renderer.mouseX = x
      this.renderer.mouseY = y
      if(event.target == this.canvas) {
        switch(event.type) {
        case "mousedown":
          this.renderer.mouseIsDown = true;
          if(this.renderer.onMouseDown) {
            this.renderer.onMouseDown(x, y);
          }
          break
        case 'mousemove':
          if(this.renderer.mouseIsDown) {
            this.renderer.mouseIsDragging = true;
          }
          if(this.renderer.onMouseMove) {
            this.renderer.onMouseMove(x, y);
          }
          break;
        case 'mouseout':
          if(this.renderer.onMouseOut) {
            this.renderer.mouseIsOver = false;
            this.renderer.onMouseOut(x, y);
          }
          break;
        case 'mouseover':
          if(this.renderer.onMouseOver) {
            this.renderer.mouseIsOver = true;
            this.renderer.onMouseOver(x, y);
          }
          break;
        case 'mouseup':
          this.renderer.mouseIsDown = false;
          this.renderer.mouseIsDragging = false;
          if(this.renderer.onMouseUp) {
            this.renderer.onMouseUp(x, y);
          }
        }
      } else {
        switch(event.type) {
        case "mouseup":
          this.renderer.mouseIsDown = false;
          this.renderer.mouseIsDragging = false;
          if(this.renderer.onMouseUp) {
            this.renderer.onMouseUp(-1, -1);
          }
        }
      }
    }
  }

  // Checks to see if the player is full window and resizes the canvas if it is
  onWindowResize(event) {
    if(this.isFullWindow) {
      if(this.canvas.width != window.innerWidth) {
        this.canvas.width = window.innerWidth;
      }
      if(this.canvas.height != window.innerHeight) {
        this.canvas.height = window.innerHeight;
      }

      if(this.renderer) {
        this.renderer.width = this.canvas.width;
        this.renderer.height = this.canvas.height;
        if(this.renderer.static) {
          this.renderer.clear();
          this.renderer.render();
        }
      }
    }
  }

  // Pauses the player
  pause() {
    this.playing = false;
  }

  // Calls render phase
  render() {
    if(this.renderer.clear) {
      this.renderer.clear();
    }

    if(this.renderer.render) { this.renderer.render(); }
  }

  // Starts or un-pauses the loop
  play() {
    this.playing = true;
  }

  // Set the player to fill the entire browser window
  setFullWindow(full) {
    this.isFullWindow = full
    if(full) {
      this.onWindowResize();
    }
  }

  // Sets an instance of a Renderer sub-class as the renderer for this Player
  setRenderer(newRenderer) {
    if(this.renderer) this.renderer.remove_listener('fullscreen', this.toggleFullscreen);
    this.ctx.globalAlpha = 1.0;
    this.renderer = newRenderer;
    this.renderer.ctx = this.ctx;
    if(this.renderer) {
      this.renderer.stepCount = this.stepCount;
      this.renderer.width = this.canvas.clientWidth;
      this.renderer.height = this.canvas.clientHeight;
      this.renderer.isFullScreen = this.isFullScreen;
      this.renderer.add_listener('fullscreen', this.toggleFullScreen.bind(this));
      // TODO: This does not appear to be working
      if(this.renderer.init) {
        this.renderer.init();
      }
    }
  }

  // The step phase
  step() {
    if(this.renderer.looping && this.renderer.duration > 0) {
      if(this.stepCount > this.renderer.duration) {
        this.stepCount = 0;
      }
    }

    this.renderer.stepCount = this.stepCount
    this.width = this.renderer.width = this.canvas.clientWidth
    this.height = this.renderer.height = this.canvas.clientHeight
    if(this.renderer.step) this.renderer.step();
    this.stepCount++
  }

  // Stops the player, resets itself and the renderer
  stop() {
    this.stepCount = 0;
    this.playing = false;
    this.ctx.clearRect(0, 0, this.width, this.height);
    if(this.renderer) {
      if(this.renderer.clear) {
        this.renderer.clear()
      }
    }
  }

  toggleFullScreen() {
    if(this.isFullScreen) {
      this.isFullScreen = false;
      if(document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      if(document.mozCancelFullScreen) document.mozCancelFullScreen();
      if(document.cancelFullScreen) document.cancelFullScreen();
      if(document.msCancelFullScreen) document.msCanceFullScreen();
    } else {
      this.isFullScreen = true;
      if(this.canvas.webkitRequestFullScreen) this.canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      if(canvas.mozRequestFullScreen) this.canvas.mozRequestFullScreen();
      if(this.canvas.requestFullScreen) this.canvas.requestFullScreen();
      if(canvas.msRequestFullScreen) this.canvas.msRequestFullScreen();
    }

    if(this.renderer) this.renderer.isFullScreen = this.isFullScreen;
  }
}

class Vec {
  static add(v1, v2) {
    return new Vec(v1.x + v2.x, v1.y + v2.y);
  }

  static delta(v1, v2) {
    const x = v1.x - v2.x;
    const y = v1.y - v2.y;
    return Math.sqrt(x * x + y * y);
  } 

  static div(v, n) {
    return new Vec(v.x / n, v.y / n);
  }

  static normalize(v) {
    const m = v.magnitude();
    if(m == 0.0) return new Vec();
    return Vec.div(v, m);
  }

  static random(x1, x2, y1, y2) {
    return new Vec(
      Math.randomInRange(x1, x2), 
      Math.randomInRange(y1, y2));
  }

  static scale(v, n) {
    return new Vec(v.x * n, v.y * n);
  }

  static sub(v1, v2) {
    return new Vec(v1.x - v2.x, v1.y - v2.y);
  }

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

  add(v) {
    this.set(Vec.add(this, v));
    return this;
  }

  div(n) {
    this.set(Vec.div(this, n));
    return this;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    this.set(Vec.normalize(this));
    return this;
  }

  scale(n) {
    this.set(Vec.scale(this, n));
    return this;
  }

  set(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  sub(v) {
    this.set(Vec.sub(this, v));
    return this;
  }
}

// Array Utils
// ======

// Returns a randomized copy of the supplied Array
Array.shuffle = function(a) {
  let result = [];
  let copy = a.slice();
  while(copy.length > 0) {
    var r = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(r, 1)[0]);
  }
  return result
}

Array.NUMERIC = function(a, b) {
  return a - b;
}

// Math Utils
// ======

// CONSTANTS
Math.HALF_PI = Math.PI * .5
Math.QTR_PI = Math.PI * .25
Math.TWO_PI = Math.PI * 2

Math.average = function (terms) {
  return Math.sum(terms) / terms.length;
}

Math.clamp = function(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

// Returns a boolean indicating that the point (px, py) is contained by the circle
Math.hitTestCircle = function(px, py, x, y, r) {
  return Math.distance(px, py, x, y) <= r;
}

// Returns a boolean indicating that the point (px, py) is contained in the rectangle
Math.hitTestRectangle = function (px, py, x, y, w, h) {
  return px >= x && px <= x + w && py >= y && py <= y + h;
}

// Returns a boolean that the point (px, py) is with the band of a ring shape
Math.hitTestRing = function(px, py, x, y, r1, r2) {
  let d = Math.distance(px, py, x, y);
  return d > r1 && d < r2;
}

// Returns a boolean that the point (px, py) is contained by the triangle p1, p2, p3
// p1, p2, p3 are arrays of two points each
Math.hitTestTriangle = function (px, py, p1, p2, p3) {
  let x0 = p1[0];
  let y0 = p1[1];
  let x1 = p2[0];
  let y1 = p2[1];
  let x2 = p3[0];
  let y2 = p3[1];
  let A = .5 * (-y1 * x2 + y0 * (-x1 + x2) + x0 * (y1 - y2) + x1 * y2);
  let s = (y0 * x2 - x0 * y2 + (y2 - y0) * px + (x0 - x2) * py);
  let t = (x0 * y1 - y0 * x1 + (y0 - y1) * px + (x1 - x0) * py);
  let sign = A < 0 ? -1 : 1;
  s *= sign;
  t *= sign;
  return s > 0 && t > 0 && (s + t) < 2 * A * sign;
}

// Returns a boolean indicating that the point (px, py) is contained within a wedge shaped region
Math.hitTestWedge = function(px, py, x, y, r, startAngle, endAngle) {
  // TODO: Implement
  return false;
}

// Returns the distance between two points
Math.distance = function(x1, y1, x2, y2) {
  let dx = x1 - x2;
  let dy = y1 - y2;
  dx *= dx;
  dy *= dy;
  return Math.sqrt(dx + dy);
}

// Returns array of RGB value of supplied hex value
// Input value is expected to be in 0xrrggbb format
Math.hexToRGB = function(hex) {
  return [hex >> 16, (hex >> 8) & 0xff, hex & 0xff];
}

// Interpolates a value between 0.0 and 1.0 to a correspondig value between min and max
// ```
// Math.interpolateLin(.2, 0, 100) # 20
// ```
Math.interpolateLin = function(n, min, max) {
  return min + ((max - min) * n);
}

// Returns a value between 0.0 and 1.0 corresponding to the percentage of n between min and max
// ```
// Math.normalize(50, 0, 100) # .5
// ```
Math.normalize = function(n, min, max) {
  return (n - min) / (max - min);
}

// Returns a random color in rgb format
Math.randomColor = function() {
  let r = (Math.randomInRange(0, 255, true));
  let g = (Math.randomInRange(0, 255, true));
  let b = (Math.randomInRange(0, 255, true));
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

// Returns a random number between the supplied range
// Provide optional argument of true as third param to return an integer
Math.randomInRange = function(min, max, round=false) {
  let n = min + (max - min) * Math.random();
  if(round) return Math.round(n);
  return n;
}

// Rounds to the nearest decimal
// ```
// Math.roundTo(3.219, 2) # 3.22
// ```
Math.roundTo = function(n, decimals) {
  return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Returns a value rounded to the nearest integer multiple
// ```
// Math.roundToMultiple(28, 5) # 30
// ```
Math.roundToMultiple = function(n, multiple) {
  return multiple * Math.round((n/multiple));
}

// Converts a value in degrees to radians
// ```
// Math.toRadians(90) # 1.5707963267948966
// ```
Math.toRadians = function(degrees) {
  return Math.PI * degrees / 180;
}

Math.sum = function(terms) {
  return terms.reduce(function(a, b){ return a + b; });
}

// Transposes a value from one range to another
// ```
// Math.transpose(40, 30, 50, 0, 1) # .5
// ```
Math.transpose = function(n, min1, max1, min2, max2) {
  return Math.interpolateLin(Math.normalize(n, min1, max1), min2, max2);
}

// Convenience for testing the truthiness of whether or not a given number is between two others
Math.within = function(x, gt, lt) {
  return x >= gt && x <= lt;
}

// String Utils
// ======

String.alphabet = function() {
  return 'abcdefghijklmnopqrstuvwxyz'
}

String.numerics = function() {
  return '0123456789';
}

module.exports = {
  Dispatcher, 
  Renderer,
  Player,
  Vec
}
