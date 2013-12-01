define ['renderer'], (Renderer) ->    
    class Basic extends Renderer
        # Initialize instance variables
        init : ->
            @bg = "#222222"
            @cx = @width * .5
            @cy = @height * .5

        # Render graphics 
        render : ->
            @font "bold 80pt Baskerville"
            @color "#ffffff"
            @text 165, 250, "SPECTRUM", false
            @color "#d13737"
            @circle @cx - 25, @cy + 20, 10
            @color "#45d137"
            @circle @cx, @cy + 20, 10
            @color "#3762d1"
            @circle @cx + 25, @cy + 20, 10
