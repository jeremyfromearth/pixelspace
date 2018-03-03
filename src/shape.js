import Pixelspace from 'lib/pixelspace';

class Shape extends Pixelspace.Renderer {

  init() {
    this.bg = 'black';
    let cx = this.width * 0.5;
    let cy = this.height * 0.5;
    this.shapeData1 = [];
    this.shapeData2 = [];
    this.shapeData3 = [];
    this.radius = 30;
    this.segments = 40;
    let theta = 0;
    let inc = Math.TWO_PI / this.segments;

    for(var i = 0; i < this.segments; i++) {
      var y = Math.sin(theta) * 100 + Math.random() * 15;
      var x = Math.cos(theta) * 100 + Math.random() * 15;
      this.shapeData1.push([cx + x, cy + y]);
      this.shapeData2.push([cx + x - 300, cy + y]);
      this.shapeData3.push([cx + x + 300, cy + y]);
      theta += inc;
    };
  }

  render() {
    // Draw the left shape outline open
    this.color('cyan');
    this.shape(this.shapeData1, false, false);

    // Draw the right shape filled 
    this.color('magenta');
    this.shape(this.shapeData2, true, false);

    // Draw the right shape outline closed
    this.color('yellow');
    this.shape(this.shapeData3, false, true);
  }
}

module.exports = Shape;
