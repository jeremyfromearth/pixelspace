import Pixelspace from 'lib/pixelspace';

class Drag extends Pixelspace.Renderer {
  init() {
    this.bg = 'black';
    this.point = {
      x: this.width * 0.5, 
      y: this.height * 0.5
    }

    this.drag_start = {
      x: 0, 
      y: 0
    };

    this.target = {
      x: this.point.x,
      y: this.point.y
    };

    this.target_at_drag_start = {
      x: this.point.x,
      y: this.point.y
    };
  }

  step() {
    this.point.x += (this.target.x - this.point.x) * 0.2;
    this.point.y += (this.target.y - this.point.y) * 0.2;
  }

  render() {
    this.color('red');
    this.circle(this.point.x, this.point.y, 30, this.mouseIsDown);
  }

  onMouseDown(x, y) {
    this.target = {x: x, y: y};
  }

  onMouseMove(x, y) {
    if(this.mouseIsDown) {
      this.target = {
        x: x,
        y: y
      }
    }
  }
}

module.exports = Drag;
