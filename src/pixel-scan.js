import Pixelspace from 'lib/pixelspace';

class PixelScan extends Pixelspace.Renderer {
  init() {
    this.freq = 0;
    this.size = 4;
    this.bg = 'black';
    this.squares = [];
    let cx = this.width * 0.5;
    let cy = this.height * 0.5;
    for(var i = 0; i < this.width / 5; i++) {
      for(var j = 0; j < this.height / 5; j++) {
        this.squares.push({
          a: 0,
          x: i * 5,
          y: j * 5,
        });
      }
    }
  }

  step() {
    this.freq += 0.05;
    for(var i = 0; i < this.squares.length; i++) {
      var s = this.squares[i];
      var phazer = i > 0 ? this.squares[i-1].a : 0
      s.a = Math.abs(Math.sin(this.freq + i * phazer * 0.00008));
    }
  }

  render() {
    this.color('white');
    for(var i = 0; i < this.squares.length; i++) {
      var s = this.squares[i];
      this.alpha(s.a);
      this.rectangle(s.x, s.y, 4, 4);
    }

    this.alpha(1);
    this.color('#000');
    this.font('bold 80pt Terminus');
    this.text(50, this.height * 0.5, '[PIXELSPACE]');
  }
}

module.exports = PixelScan
