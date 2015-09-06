define ['spectrum/Renderer'], (Renderer) ->
    class Shadows extends Renderer
        init : () ->
            @n = 0
            @offsetX = 0
            @offsetY = 0
            @radius = 10
            @bg = "#CCCCCC"
            @cx = @width * .5
            @cy = @height * .5

        step : () ->
            @offsetY = Math.sin(@n) * @radius
            @offsetX = Math.cos(@n) * @radius
            @n += .1

        render : () ->
            @color "white"
            @circle @cx - 150, @cy, 30
            @shadow @offsetX, @offsetY, 10, "#000000"
            @circle @cx, @cy, 50
            @shadowClear()
            @circle @cx + 150, @cy, 30
