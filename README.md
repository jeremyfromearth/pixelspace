# [PIXELSPACE]
**Pixelspace is minimalist toolkit for drawing pixels to an HTML5 Canvas. If features a concise drawing API, simple animation loop and a handful of helpful utilities.**

> Tested in Chrome, Firefox & Safari

## Demo Site: 
[http://jeremyfromearth.com/pixelspace/demo/](http://jeremyfromearth.com/pixelspace/demo/)

## Getting Started
### Installation
```
npm install
```

### Build Pixelspace
```
npm run build
```

### Watch/build Pixelspace
```
npm run watch
```

### Build Demos
```
npm run build-demos
```

### Run Demos (python required)
```
npm run demos
```
This will start a simple Python based HTTP server and open your default browser to `http://localhost:8000/demo`. You may need to refresh the page if it does not load right away. Alternatively, you can run the demos using `jekyll serve` and navigating to `http://localhost:4000/demo/`.

## Anatomy of a Pixelspace App
A Pixelspace app consists of two components a `Player` and a `Renderer`. The `Player` is mainly responsible for setting up a context for a `Renderer` sub class to funtion within. Developing sketches for Pixelspace mostly involves sub-classing `Renderer`, creating an instance of it and passing it to the `Player`. Below is a very basic ES6 example of this.

```
import Pixelspace from 'lib/pixelspace';

class CustomApp extends Pixelspace.Renderer {
  init() { /* initialize variables here */ }

  step() { /* update variables here */ }

  draw() { /* draw graphics here */ }
}

let canvas = document.getElementById("canvas");
let player = new Pixelspace.Player(canvas);
let custom_app = new CustomApp();
player.setRenderer(custom_app);
player.play();
```
