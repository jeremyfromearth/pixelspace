import Pixelspace from 'lib/pixelspace';

class Basic extends Pixelspace.Renderer {
  init() {
    this.bg = 'black'
  }

  render() {
    let cx = this.width * 0.5;
    let cy = this.height * 0.5;
    this.font('normal 80pt Terminus');
    this.color('#fff');
    this.text(160, 250, '[PIXELSPACE]', false);
    this.color('cyan');
    this.rectangle(cx-65, cy, 40, 40);
    this.color('magenta');
    this.rectangle(cx-20, cy, 40, 40);
    this.color('yellow');
    this.rectangle(cx+25, cy, 40, 40);
  }
}

module.exports = Basic
