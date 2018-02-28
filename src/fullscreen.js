import Pixelspace from 'lib/pixelspace';

class Fullscreen extends Pixelspace.Renderer {
  init() {
    this.bg = 'black';
    this.button_color = 'red';
    this.button = [this.width * 0.5, this.height * 0.5, 20];
  }

  render() {
    this.color('white');
    this.ctx.textAlign = 'center';
    this.font('bold 20pt Helvetica');
    this.text(this.width * 0.5, this.height * 0.5 + 60, 'Toggle Fullscreen Mode');
    this.color(this.button_color);
    this.circle(...this.button);
  }

  onMouseMove(x, y) {
    this.button_color = 
      Math.hitTestCircle(x, y, ...this.button) ? 
        'darkred' : 'red';
  }

  onMouseDown(x, y) {
    if(Math.hitTestCircle(x, y, ...this.button)) {
      this.fullscreen();
    }
  }

}

module.exports = Fullscreen;
