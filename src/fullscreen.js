import Pixelspace from 'lib/pixelspace';

class Fullscreen extends Pixelspace.Renderer {
  init() {
    this.bg = 'black';
  }

  render() {
    this.color('white');
    this.font('bold 20pt Helvetica');
    this.text(20, 40, 'Click anywhere to toggle fullscreen');
  }

  onMouseDown(x, y) {
    this.fullscreen();
  }
}

module.exports = Fullscreen;
