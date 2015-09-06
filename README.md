# spectrum

**Spectrum is an HTML5 Canvas framework with a concise drawing API, simple animation loop and a handful of helpful utilities.**

> Tested in Chrome, Firefox & Safari

## Install
Spectrum is registered with bower.io. To install with Bower, simply use:

```
bower install spectrum-js
```

## Demos
Demos are available here: https://github.com/jeremynealbrown/visible
<br>
The demo repo should be cloned into a location next to spectrum.
```
coffeerithms/
spectrum/
visible/
```
Some of the demos also require coffeerithms which can be found here: https://github.com/jeremynealbrown/coffeerithms

## Anatomy of a spectrum app

A Spectrum app is comprised of an instance of the `Player` class and an instance of a `Renderer` subclass. The `Player` is responsible for managing the playback of the renderer. It does so through the two methods that a `Renderer` subclass should override: `step()` and `render()`
<br/>
<br/>
Example of a `Renderer` subclass:
```
define ['renderer'], (Renderer) ->
    class DataVisualization extends Renderer
        
        init : () ->
            @x = 0
            @y = 0

        step : () ->
            @x += 1
            @y += 1

        render : () ->
            @color "orange"
            @rectangle @x, @y, 100, 100
```
The init method initializes instance variable, which can also be done within the constructor. However, when using the constructor, it is important to also call the constructor of the super-class. The `step()` method is intended for updating data and variables and the `render()` method is intended for calling drawing commands.
<br>
<br>
Example of initializing a `Player`:
```
canvas = getElementById 'canvas'
ctx = canvas.getContext '2d'
renderer = new DataVisualization ctx
player = new Player(canvas)
player.setRenderer renderer
renderer.init()
player.run()
```

When `run()` is called the `Player` begins an animation loop wherein the `step()` and `render()` methods are called on the `Renderer` sub-class, in that order, at a rate of roughly 60 times per second.
