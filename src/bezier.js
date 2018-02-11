import Pixelspace from 'lib/pixelspace'

class Bezier extends Pixelspace.Renderer {
  init() {
   	this.bg = '#000'
		this.radius = 200
		this.toggle = 0

		this.center = {
			x: this.width * .5,
			y: this.height * .5
		};

		this.p1 = {
			x: Math.cos(Math.PI * -.45) * this.radius + this.center.x,
			y: Math.sin(Math.PI * -.45) * this.radius + this.center.y
		};

		this.p2 = {
      x: Math.cos(Math.PI * .25) * this.radius + this.center.x,
      y: Math.sin(Math.PI * .25) * this.radius + this.center.y
		};

		this.cp1 = {
      x: this.center.x,
      y: this.center.y
    };

		this.cp2 = {
      x: this.center.x,
      y: this.center.y
    };

		this.cp = null;
  }

  render() {
  	// Center circle
    this.lineStyle(1);
    this.color('#ffffff');
    this.circle(this.center.x, this.center.y, 20);

    // Outer circle
    this.circle(this.center.x, this.center.y, this.radius, false);

    // Control point lines
    this.color('#22ffcc');
    this.lineStyle(1);
    this.line(this.cp1.x, this.cp1.y, this.p1.x, this.p1.y);
    this.line(this.cp2.x, this.cp2.y, this.p2.x, this.p2.y);

    // Control point dots
    this.circle(this.cp1.x, this.cp1.y, 5);
    this.circle(this.cp2.x, this.cp2.y, 5);

    // Main connecting line p1 > p2
    this.color('#00ccff');
    this.line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

    // p1
    this.color('#ffcc00');
    this.circle(this.p1.x, this.p1.y, 5, true);

    //p2
    this.color('#ff00cc');
    this.circle(this.p2.x, this.p2.y, 5, true);
    this.bezier(
      this.cp1.x, this.cp1.y, 
      this.cp2.x, this.cp2.y, 
      this.p1.x, this.p1.y, 
      this.p2.x, this.p2.y
    );
  }

  onMouseDown() {
    this.toggle = !this.toggle
    this.cp = this.toggle ? this.cp1 : this.cp2;
    this.cp.x = this.mouseX
    this.cp.y = this.mouseY
  }

  onMouseMove(x, y) {
    if(this.mouseIsDragging) {
      this.cp.x = x
      this.cp.y = y
    }
  }
}

module.exports = Bezier;
