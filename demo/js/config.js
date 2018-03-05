console.log(window.location);
var base = 
  window.location.hostname == 'localhost' ? 
    '../../' : 'http://jeremyfromearth.com/pixelspace/';

require({
  baseUrl: '../../',
  paths: {
    js: 'demo/js',
    text: 'demo/js/text',
    src: 'demo/src/',
    lib: 'lib',
  }
});
