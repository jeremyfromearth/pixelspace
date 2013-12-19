spectrum
========

Spectrum is an canvas rendering framework with a concise delcaritive drawing API and a handful of helpful utilitie functions. 

> Tested in Chrome, Firefox & Safari

To build the lib files use: 
```
$ cd spectrum/
$ cake watch:js
```
<br/>
To build the docs, first install docco on node and then use:
```
$ cd spectrum/
$ docco src/*.coffee
```
<br/>
A Spectrum app is comprised of an instance of the `Player` class and an instance of a `Renderer` sub-class. The `Player` is responsible for managing the playback of the renderer. It does so through the two methods that `Renderer` subclass should override: step() and render()
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
            @rectange @x, @y, 100, 100
```
<br/>
The init method initializes instance variable. This can also be done inside the constructor, but it is important to also call the constructor of the super-class as well. The `step()` method is intended for updating data and values and the `render()` method is for calling drawing commands.
<br/>
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

When `run()` is called the `Player` begins an animation loop wherein the `step()` and `render()` methods are called on the `Renderer` sub-class, in that order. 

        


