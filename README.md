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

This repo contains demos of the [Pixelspace](https://github.com/jeremyfromearth/pixelspace) HTML5 Canvas drawing tool. To run the demos, do the following:

## Demos
```
git clone git@github.com:jeremyfromearth/pixelspace.git
git clone git@github.com:jeremyfromearth/pixelspace-demo.git
cd ../
python -m http.server
```
Navigate your browser to: [http://localhost:8000/pixelspace-demo/](http://localhost:8000/pixelspace-demo/)

The gist is that both Pixelspace and the demo should live right next to each other and need to be served from one directory up. The demo uses `require.js` and the `text.js` plugin which use XMLHttpRequest. Thus, it needs to be served. I like to use the Python one liner above, but you can use the NodeJS equivalent or L/MAMP or any other approach to serve the files.

## Compiling 
The demos can be compiled from ES6 to cross broswer compatible versions using Babel. 
> Note: The `--watch` flag is optional and will result in the re-compilation of any modified file in the `src` dir

```
cd pixelspace-demo
npm install
npx babel src --out-dir js --presets=es2015,stage-0 --plugins=transform-es2015-modules-amd --watch
```
