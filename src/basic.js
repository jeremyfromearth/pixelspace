import Pixelspace from 'lib/pixelspace';

class Basic extends Pixelspace.Renderer {
  constructor(ctx) {
    super(ctx);
    this.static = true
    this.bg = '#222'
    this.title = 'Pixelspace!';
  }

  render() {
    let cx = this.width * 0.5;
    let cy = this.height * 0.5;
    this.font('bold 80pt Helvetica');
    this.color('#fff');
    this.text(165, 250, this.title, false);
    this.color('#d13737');
    this.circle(cx - 25, cy + 20, 10);
    this.color('#45d137');
    this.circle(cx, cy + 20, 10);
    this.color('#3762d1');
    this.circle(cx + 25, cy + 20, 10);
  }
}

module.exports = Basic
