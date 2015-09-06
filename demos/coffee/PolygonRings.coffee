define ['spectrum/Renderer'], (Renderer) ->
    class PolygonRings extends Renderer
        init : ->
            @cx = @width * .5
            @cy = @height * .5
            
            # We can define our first polygon ring here 
            # Note that x, y are zero, we will use translate() to move them around
            @poly1 = [0, 0, 30, 80, 6, 3, Math.PI * 2, false]

        render : ->
            @color "white"

            # We can supply parameters by themselves
            @polygonRing @cx, @cy, 20, 40, 3, 6

            # Or, we pass in the array defining this polygong ring
            @saveTransform()
            @translate @cx - 200, @cy
            @polygonRing @poly1...
            @restoreTransform()
    
            # We can also rotate shapes, 
            # First we need to move to the drawing point
            @saveTransform()
            @translate @cx + 200, @cy
            @rotate Math.PI
            @polygonRing @poly1... 
            @restoreTransform()
