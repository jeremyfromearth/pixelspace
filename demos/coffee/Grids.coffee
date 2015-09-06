define ['spectrum/Renderer'], (Renderer) ->
    class Grids extends Renderer

        init : () ->
            @bg = "#222222" 

        render : () ->
            @color "#333333"
            @grid 0, 0, @height / 10, @width / 10, @width, @height
            @color "#66CCFF"
            @grid 30, 50, 10, 10, 100, 100
            @color "#CCFF66"
            @grid 160, 50, 10, 10, 200, 200
            @color "#FF3366"
            @grid 390, 50, 10, 10, 400, 400
