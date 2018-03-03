import Pixelspace from 'lib/pixelspace';

class MouseEvents extends Pixelspace.Renderer {
  init() {
    this.data = [];
    this.bg = 'black';
    this.current = null;
    this.show_grid = false;
    this.ctx.textAlign = 'left';
    this.currentMouseEventType = "None";
  }

  step() {
    let i = 0;
    if(this.mouseIsDown) {
      this.create_shape(this.mouseX, this.mouseY);
    }

    while(i < this.data.length) {
      if(this.data[i] && this.data[i] != this.current) {
        this.data[i].scale *= .99;
        this.data[i].alpha *= .99;
        this.data[i].rotation += 0.05 * this.data[i].alpha;
        if(this.data[i].alpha <= 0.01) {
          this.data[i] = null;
        }
      }

      i++;
    }
  }

  render() {
    let i = 0;
    if(this.show_grid) {
      this.color('#222');
      this.grid(
        0, 0, this.height/10, 
        this.width/10, 
        this.width, this.height);
    }

    while(i < this.data.length) {
      var p = this.data[i]
      if(p) {
        this.alpha(p.alpha);
        let outline = this.current && 
          (this.mouseIsDragging || this.mouseIsDown);
        this.color(p.color);
        this.saveTransform();
        this.translate(p.x, p.y);
        this.rotate(p.rotation);
        this.polygon(0, 0, p.radius * p.scale, p.sides, outline);
        this.restoreTransform();
      }

      i++
    }
    
    this.alpha(1);
    this.color("#ffffff");
    this.font('normal 14pt Terminus');
    this.text(30, 30, 
      "Mouse position x: " + this.mouseX + ", y: " + this.mouseY);
    this.text(30, 50, 
      "Current mouse event type: " + this.currentMouseEventType);
    this.text(30, 70, 
      "mouseIsDragging: " + 
      this.mouseIsDragging + ", mouseIsOver: " + 
      this.mouseIsOver + ", mouseIsDown: " + this.mouseIsDown);
  }

  create_shape(x, y) {
    this.currentMouseEventType = "mouseDown" 
    this.current = { 
      x: x,
      y: y,
      color: Math.random() > 0.5 ? 'white' : 'red',
      radius: Math.random() * 50 + 10,
      alpha: 1,
      scale: 1,
      rotation: Math.random() * Math.TWO_PI,
      sides: 2 + Math.ceil(Math.random() * 8)
    };

    this.data.push(this.current);
  }

  onMouseMove(x, y) {
    this.currentMouseEventType = "mouseMove"
    if(this.mouseIsDragging) {
      if(this.current) {
        this.current.x = x
        this.current.y = y
      }
    }
  }

  onMouseUp(x, y) {
    this.currentMouseEventType = "mouseUp"
    this.current = null
  }

  onMouseOver(x, y) {
    this.show_grid = true;
    this.currentMouseEventType = "mouseOver"
  }

  onMouseOut(x, y) {
    this.show_grid = false;
    this.currentMouseEventType = "mouseOut"
  }
}

module.exports = MouseEvents;
