import Pixelspace from 'lib/pixelspace';

class PolyRings extends Pixelspace.Renderer {
  init() {
    this.cx = this.width * .5
    this.cy = this.height * .5
    
    // We can define our first polygon ring here 
    // Note that x, y are zero, we will use translate() to move them around
    this.poly1 = [0, 0, 30, 80, 6, 3, Math.PI * 2, false]
  }

  render() {
    this.color('white');

    // We can supply parameters by themselves
    this.polygonRing(this.cx, this.cy, 20, 40, 3, 6);

    // Or, we pass in the array defining this polygong ring
    this.saveTransform();
    this.translate(this.cx - 200, this.cy);
    this.polygonRing(...this.poly1)
    this.restoreTransform()

    // We can also rotate shapes, 
    // First we need to move to the drawing point
    this.saveTransform();
    this.translate(this.cx + 200, this.cy);
    this.rotate(Math.PI);
    this.polygonRing(...this.poly1);
    this.restoreTransform();
  }
}

module.exports = PolyRings;
