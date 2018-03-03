import Pixelspace from 'lib/pixelspace';

class Motion extends Pixelspace.Renderer {
  init() {
    this.n = 0
    this.s = 0
    this.bg = 'black';
    this.cx = this.width * .5
    this.cy = this.height * .5
  }

  step() {
    this.n += .01
    this.s = Math.sin(this.n)   
  }

  render() {
    this.color('red');
    this.alpha(Math.abs(this.s));
    this.saveTransform()
    this.translate(this.cx, this.cy);
    this.rotate(this.s);
    this.polygon(0, 0, 100, 2 + Math.ceil(Math.abs(this.s) * 10));
    this.restoreTransform();
  }
}          

module.exports = Motion;
