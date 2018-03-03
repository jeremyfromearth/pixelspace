import Pixelspace from 'lib/pixelspace';
class UlamSpiral extends Pixelspace.Renderer {
  init() {
    this.bg = 'black';
    this.font('bold 24pt sans-serif');
    this.dist=12; // distance between points and diameter of dots
    this.total=1600; // total number of points
    this.direction={x: this.dist, y: 0}; // initialize the direction
    this.points = [{x : this.width * .5, y : this.height * .5, num: 1, prime : false}] // all of the points drawn
    
    let num = 0
    let count = 0
    let changes = 0

    // initialize an array of points
    for(var i = 2;  i < this.total + 1; i++) {
      var prev = this.points[i-2] 
      var current = {
        x : prev.x + this.direction.x, 
        y : prev.y + this.direction.y, 
        num : i, 
        prime : this.isPrime(i)
      }

      count++
      if(count > num) {
        changes++;
        if(changes == 2) {
          num++ ;
          changes = 0;
        }
        count = 0;
        this.updateDirection();
      }
      this.points.push(current);
    }
  }

  // Tests whether or not the supplied number is a prime number  
  isPrime(n) {
    for(var i = 2; i < 10; i++) {
      if(n % i == 0 && (n != i || n == 1)) return false;
    }
    return true
  }

  // Rotates the direction counter clockwise
  updateDirection() {
    var x = this.direction.x
    var y = this.direction.y
    if(x > 0  && y == 0) {
      x = 0;
      y = -this.dist;
    } else if(x == 0 && y < 0) {
      x = -this.dist;
      y = 0;
    } else if(x < 0 && y == 0) {
      x = 0;
      y = this.dist;
    } else if(x == 0 && y > 0) {
      x = this.dist;
      y = 0;
    }
    this.direction.x = x
    this.direction.y = y
  }

  render() {
    for(var i = 0; i < this.points.length; i++) {
      var p = this.points[i];
      if(p.num == 1) {
        this.color('red');
      } else if(p.prime) {
        this.color('white');
      } else {
        this.color('#333');
      }
      this.circle(p.x, p.y, this.dist * .5 - 2);

      if(Math.hitTestCircle(this.mouseX, this.mouseY, p.x, p.y, this.dist * .5)) {
        if(p.prime) {
          this.color('slategrey');
        } else {
          this.color('black');
        }
        this.text(20, 50, 'Number: ' + p.num);
      }
    }
  }
}

module.exports = UlamSpiral;
