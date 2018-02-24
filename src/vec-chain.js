import Pixelspace from 'lib/pixelspace';
const Vec = Pixelspace.Vec

class Node {
  constructor(x, y) {
    this.position = new Vec(x, y);
    this.target = new Vec();
    this.velocity = new Vec();
    this.damping = 0.3;
    this.stiffness = 0.9;
    this.timeFactor = 0.6;
    this.theta = 0;
    this.radius = 0;
  }

  update(setNewTarget) {
    const delta = Vec.sub(this.target, this.position);
    if(delta.magnitude() > 0.1) {
      this.velocity = 
        Vec.scale(this.velocity, this.damping)
           .add(delta.scale(this.timeFactor))
           .scale(this.stiffness)
      this.position.add(this.velocity);
    } else if(setNewTarget) {
      this.target = Vec.random(0, 960, 0, 540);
    }
  }
}

class VecChains extends Pixelspace.Renderer {
  init() {
    this.bg = 'black';
    this.chains = []
    this.createChain(this.width * 0.5, this.height * 0.5)
  }

  step() {
    for(var i = 0; i < this.chains.length; i++) {
      var chain = this.chains[i];
      for(var j = 0; j < chain.length; j++) {
        var link = chain[j];
        if(j == 0) {
            link.update(true)
        } else {
          var leader = chain[j-1]
          var direction = Vec.sub(leader.target, leader.position).normalize();
          var target = Vec.sub(leader.position, direction.scale(15.0));
          link.target = target
          link.update(false)
        }
      }
    }
  }

  render() {
    for(var i = 0; i < this.chains.length; i++) {
      var points = []; 
      var chain = this.chains[i];
      for(var j = 0; j < chain.length; j++) {
        points.push([chain[j].position.x, chain[j].position.y]);
      }

      this.color('red');
      this.shape(points, false, false);
      this.circles(points, 2, true);
    }
  }

  onMouseDown (x, y) {
    this.createChain(x, y)
  }

  createChain(x, y) {
    this.chains.push([]);
    var center = new Vec(x, y);
    var linkCount = Math.randomInRange(3, 5);
    var timeFactor = Math.randomInRange(0.8, 0.7);
    var damping = Math.randomInRange(0.01, 0.2);
    var stiffness = Math.randomInRange(0.01, 0.3);
    for(var i = 0; i < linkCount; i++) {
      var n = new Node(x, y)
      n.timeFactor = timeFactor
      n.damping = damping
      n.stiffness = stiffness
      n.position = new Vec(x, y);
      if(i == 0) {
        n.target = Vec.random(0, this.width, 0, this.height);
      }
      this.chains[this.chains.length - 1].push(n)
    }
  }
}

module.exports = VecChains;
