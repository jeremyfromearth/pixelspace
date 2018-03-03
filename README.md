# [PIXELSPACE]
**Pixelspace is minimalist tool for drawing pixels to an HTML5 Canvas. If features a concise drawing API, simple animation loop and a handful of helpful utilities.**

![Screen capture of Pixelspace app](docs/pixelscan.gif)

> Tested in Chrome, Firefox & Safari

Demos available here [here](https://github.com/jeremyfromearth/pixelspace-demo)

## Installation
```
npm install
```

## Build
```
npx babel src --out-dir lib --presets=es2015,stage-0 --plugins=transform-es2015-modules-amd
```

# pixelspace-demos

## Demos
```
python -m http.server
```
Navigate your browser to: [http://localhost:8000/demo/](http://localhost:8000/pixelspace-demo/)

## Compiling 
The demos can be compiled from ES6 to cross broswer compatible versions using Babel. 
> Note: The `--watch` flag is optional and will result in the re-compilation of any modified file in the `src` dir

```
cd demo
npm install
npx babel src --out-dir js --presets=es2015,stage-0 --plugins=transform-es2015-modules-amd --watch
```
