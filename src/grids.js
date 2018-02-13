import Pixelspace from 'lib/pixelspace';

class Grids extends Pixelspace.Renderer {
  init() {
    this.bg = '#222';
  }

  render() {
    this.color('#333');
    this.grid(0, 0, this.height/10, this.width/10, this.width, this.height);
    this.color('#66ccff');
    this.grid(30, 50, 10, 10, 100, 100);
    this.color('#ccff66');
    this.grid(160, 50, 10, 10, 200, 200);
    this.color('#ff3366');
    this.grid(390, 50, 10, 10, 400, 400);
  }
}

module.exports = Grids;
