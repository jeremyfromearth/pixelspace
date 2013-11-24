define ['renderer'], (Renderer) ->    
    class Motion extends Renderer

        # Initialize instance variables
        init : ->
            @n = 0
            @s = 0
            @bg = "#222222"
            @cx = @width * .5
            @cy = @height * .5

        # Update variables here
        step : ->
            @n += .01
            @s = @sin(@n)   

        # Render graphics
        render : ->
            @color "#ffcc00"
            @alpha @abs(@s)
            # Before using translation save the transformation matrix
            @saveTransform()
            @translate @cx, @cy
            @rotate @s
            @polygon 0, 0, 100, 2 + @ceil(@abs(@s) * 10) 
            # When finished with translation, restore transormation matrix
            @restoreTransform()
            
            
