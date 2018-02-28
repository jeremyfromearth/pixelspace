import Pixelspace from 'lib/pixelspace';

class Keys extends Pixelspace.Renderer {
  init() {
    this.bg = 'black';
    this.ctx.textAlign = 'left';
    this.font('normal 16px Terminus');
    this.keyInfo = 'PRESS AN ARROW KEY';
    this.pointList = [[this.width * .5, this.height * .5]];
    this.current = this.pointList[0];
  }

  render() {
    this.color('white');
    this.text(10, 30, this.keyInfo);
    this.color('dark slate grey');
    this.shape(this.pointList, false, false)
    this.color('black cat');
    this.circles(this.pointList, 3);
    this.color('red');
    this.circle(this.current[0], this.current[1], 3);
  }

  onKeyDown(keyCode, altKey, ctrlKey, shiftKey, timeStamp) {
    this.keyInfo = 
      'onKeyDown():' +
      ' keyCode: ' + keyCode + 
      ' altKey: ' + altKey + 
      ' ctrlKey: ' + ctrlKey + 
      ' shiftKey: ' + shiftKey + 
      ' timeStamp: ' + timeStamp
    
    let amount = 20 
    let x = this.current[0];
    let y = this.current[1];

    switch(keyCode) {
      case 37: x -= amount; break;
      case 38: y -= amount; break;
      case 39: x += amount; break;
      case 40: y += amount; break;
    }

    this.current = [x, y];
    this.pointList.push(this.current);
  }
}

module.exports = Keys;

