import Pixelspace from 'lib/pixelspace';

class Keys extends Pixelspace.Renderer {
  init() {
    this.font('normal 14px Helvetica');
    this.keyInfo = 'PRESS AN ARROW KEY';
    this.pointList = [[this.width * .5, this.height * .5]];
  }

  render() {
    this.color('black');
    this.text(10, 30, this.keyInfo);
    this.color('dark slate grey');
    this.shape(this.pointList, false, false)
    this.color('black cat');
    this.circles(this.pointList, 3);
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
    let current = this.pointList[this.pointList.length - 1]
    let x = current[0]
    let y = current[1]
    switch(keyCode) {
      case 37: x -= amount; break;
      case 38: y -= amount; break;
      case 39: x += amount; break;
      case 40: y += amount; break;
    }

    this.pointList.push([x, y]);
  }
}

module.exports = Keys;

