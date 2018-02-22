import Pixelspace from 'lib/pixelspace';

class NetworkGraph extends Pixelspace.Renderer {
  init() {
    this.bg = '#000'
    this.radius = 250;
    this.center = {
      x: this.width * .5,
      y : this.height * .5
    };

    let numNodes = 100
    let thetaInc = Math.TWO_PI / numNodes

    this.nodes = [];
    for(var i = 0; i < numNodes; i++) {
      this.nodes.push({
        theta : i * thetaInc,
        x : Math.cos(i*thetaInc) * this.radius + this.center.x,
        y : Math.sin(i*thetaInc) * this.radius + this.center.y,
        color : Math.randomColor()
      });
    }

    this.edges = [];
    for(var i = 0; i < 50; i++) {
      this.edges.push({a : this.rnd(), b : this.rnd()});
    }

    for(var i = 0; i < this.edges.length; i++) {
      let edge = this.edges[i];
      let n1 = this.nodes[edge.a]
      let n2 = this.nodes[edge.b]
      let cps = this.getControlPointsForEdge(n1, n2);
      edge.cp1 = cps.cp1
      edge.cp2 = cps.cp2
    }
  }

  render() {
    for(var i = 0; i < this.edges.length; i++) {
      var edge = this.edges[i];
      var n1 = this.nodes[edge.a]
      var n2 = this.nodes[edge.b]
      if(n1 !== n2) {
        this.color(n1.color);
        this.bezier(edge.cp1.x, edge.cp1.y, edge.cp2.x, edge.cp2.y, n1.x, n1.y, n2.x, n2.y);
      }
    }

    for(var i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      this.color(node.color);
      this.circle(node.x, node.y, 2);
      this.color(node.color);
      this.circle(node.x, node.y, 2);
    }
  }

  rnd() { 
    return Math.randomInRange(0, this.nodes.length - 1, true);
  }

  getControlPointsForEdge(p1, p2) {
    let cp1 = {}
    let cp2 = {}
    let r1 = this.radius * .3
    let r2 = this.radius * .1
    cp1.x = p1.x - Math.cos(p1.theta) * r1
    cp1.y = p1.y - Math.sin(p1.theta) * r1
    cp2.x = p2.x - Math.cos(p2.theta) * r2
    cp2.y = p2.y - Math.sin(p2.theta) * r2
    return {cp1 : cp1, cp2 : cp2}
  }
}

module.exports = NetworkGraph;
