define ['lib/es6/spectrum'], (Spectrum) ->
    class Bezier extends Spectrum.Renderer
        # Initialize instance variables
        init : ->
            @bg = '#000'
            @radius = 200
            @toggle = 0
            @center =
                x : @width * .5
                y : @height * .5
            @p1 = 
                x : Math.cos(Math.PI * -.45) * @radius + @center.x
                y : Math.sin(Math.PI * -.45) * @radius + @center.y
            @p2 = 
                x : Math.cos(Math.PI * .25) * @radius + @center.x
                y : Math.sin(Math.PI * .25) * @radius + @center.y
            @cp1 =
                x : @center.x
                y : @center.y
            @cp2 = 
                x : @center.x
                y : @center.y
            @cp = null

        # Render graphics 
        render : ->
            # Center circle
            @lineStyle 1
            @color '#ffffff'
            @circle @center.x, @center.y, 20

            # Outer circle
            @circle @center.x, @center.y, @radius, false

            # Control point lines
            @color '#22ffcc'
            @lineStyle 1
            @line @cp1.x, @cp1.y, @p1.x, @p1.y
            @line @cp2.x, @cp2.y, @p2.x, @p2.y

            # Control point dots
            @circle @cp1.x, @cp1.y, 5
            @circle @cp2.x, @cp2.y, 5

            # Main connecting line p1 > p2
            @color '#00ccff'
            @line @p1.x, @p1.y, @p2.x, @p2.y

            # p1
            @color '#ffcc00'
            @circle @p1.x, @p1.y, 5, true

            #p2
            @color '#ff00cc'
            @circle @p2.x, @p2.y, 5, true
            @bezier @cp1.x, @cp1.y, @cp2.x, @cp2.y, @p1.x, @p1.y, @p2.x, @p2.y
            
        onMouseDown : ->
            @toggle = !@toggle
            @cp = if @toggle then @cp1 else @cp2
            @cp.x = @mouseX
            @cp.y = @mouseY

        onMouseMove : (x, y) -> 
          if @mouseIsDragging
            @cp.x = x
            @cp.y = y
