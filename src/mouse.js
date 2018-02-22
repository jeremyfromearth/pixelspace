import Pixelspace from 'lib/pixelspace';

class MouseEvents extends Pixelspace.Renderer {
  init() {
    this.data = [];
    this.bg = 'black';
    this.current = null;
    this.currentMouseEventType = "None";
  }

  step() {
    let i = 0;
    while(i < this.data.length) {
      if(this.data[i] && this.data[i] != this.current) {
        this.data[i].scale *= .95;
        this.data[i].alpha *= .95;
        if(this.data[i].alpha < 0) {
          this.data[i] = null;
        }
      }

      i++;
    }
  }

  render() {
    let i = 0;
    while(i < this.data.length) {
      var p = this.data[i]
      if(p) {
        this.alpha(p.alpha);
        let outline = this.current && 
          (this.mouseIsDragging || this.mouseIsDown);
        this.color(p.color);
        this.circle(p.x, p.y, p.radius * p.scale, !outline);
      }

      i++
    }
    
    this.alpha(1);
    this.color("#ffffff");
    this.font('normal 14pt Helvetica');
    this.text(30, 30, "Mouse position x: " + this.mouseX + ", y: " + this.mouseY);
    this.text(30, 50, "Current mouse event type: " + this.currentMouseEventType);
    this.text(30, 70, "mouseIsDragging: " + 
      this.mouseIsDragging + ", mouseIsOver: " + 
      this.mouseIsOver + ", mouseIsDown: " + this.mouseIsDown);
  }

  onMouseDown(x, y) {
    this.currentMouseEventType = "mouseDown" 
    this.current = { 
      x: x,
      y: y,
      color: Math.random() > 0.5 ? 'white' : 'red',
      radius: Math.random() * 30 + 10,
      alpha: 1,
      scale: 1
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
    this.currentMouseEventType = "mouseOver"
    this.bg = "#222222"
  }

  onMouseOut(x, y) {
    this.currentMouseEventType = "mouseOut"
    this.bg = "#000000"
  }
}

module.exports = MouseEvents;
