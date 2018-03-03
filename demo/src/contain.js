import Pixelspace from 'lib/pixelspace';

class Contain extends Pixelspace.Renderer {
  init() {
    let cx = this.width * .5
    let cy = this.height * .5

    // rectangle properties
    this.rect = [cx, cy-50, 100, 100]

    // circle propertys
    this.circ = [cx-75, cy, 50]

    // triangle properties
    this.tri = [
        [cx + 183, cy-50],
        [cx + 125,  cy+50],
        [cx + 250, cy+50]
    ]

    // ring properties
    this.ring = [cx-200, cy, 20, 50, 16, 36]

    this.bg = 'black';
    this.cx = cx;
    this.cy = cy;
  }

  render() {
    // rectangle
    let contains = Math.hitTestRectangle(this.mouseX, this.mouseY, ...this.rect)
    this.color(contains ? 'red' : 'white');
    this.rectangle(...this.rect);

    // circle
    contains = Math.hitTestCircle(this.mouseX, this.mouseY, ...this.circ);
    this.color(contains ? 'red' : 'white');
    this.circle(...this.circ);
    
    // triangle
    contains = Math.hitTestTriangle(this.mouseX, this.mouseY, ...this.tri);
    this.color(contains ? 'red' : 'white');
    this.shape(this.tri);

    // ring
    contains = Math.hitTestRing(this.mouseX, this.mouseY, ...this.ring);
    this.color(contains ? 'red' : 'white');
    this.polygonRing(...this.ring);
  }
}

module.exports = Contain;
