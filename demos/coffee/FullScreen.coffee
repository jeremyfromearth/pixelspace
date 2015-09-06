define ['spectrum/Renderer'], (Renderer) ->
    class FullScreen extends Renderer

        render : =>
            @color 'black'
            @text 20, 20, 'Click anywhere to toggle fullscreen'

        onMouseDown : (x, y) ->
            @fullscreen()
