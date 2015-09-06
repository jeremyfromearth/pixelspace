define ['spectrum/Renderer'], (Renderer) ->
    class FullScreen extends Renderer
        init : =>
            @bg = "black"
        render : =>
            @color "#ffffff"
            @circle @width * 0.5, @height * 0.5, 20
