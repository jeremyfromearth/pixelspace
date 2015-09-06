define ['spectrum/Renderer'], (Renderer) ->    
    class MouseEvents extends Renderer

        # Initialize instance variables
        init : ->
            @data = []
            @bg = "#222222"
            @current = null
            @currentMouseEventType = "None"

        # Update variables here
        step : ->
            i = 0
            while i < @data.length
                if @data[i]? and @data[i] != @current
                    @data[i].scale -= .005 
                    @data[i].alpha -= .005
                    if @data[i].alpha < 0
                        @data[i] = null
                i++

        # Render graphics
        render : ->
            i = 0
            while i < @data.length
                p = @data[i]
                if p?
                    @alpha p.alpha
                    @color p.color 
                    @circle p.x, p.y, p.radius * p.scale
                i++
            
            @alpha 1
            @color "#ffffff"
            @text 30, 30, "Mouse position x: " + @mouseX + ", y: " + @mouseY
            @text 30, 45, "Current mouse event type: " + @currentMouseEventType
            @text 30, 60, "mouseIsDragging: " + 
                @mouseIsDragging + ", mouseIsOver: " + 
                @mouseIsOver + ", mouseIsDown: " + @mouseIsDown

        onMouseDown : (x, y) ->
            @currentMouseEventType = "mouseDown" 
            @current = { 
                x: x 
                y: y
                color: @randomColor()
                radius: Math.random() * 20 + 5
                alpha: 1 
                scale: 1
            }

            @data.push @current

        onMouseMove : (x, y) ->
            @currentMouseEventType = "mouseMove"
            if @mouseIsDragging
                if @current?
                    @current.x = x
                    @current.y = y

        onMouseUp : (x, y) ->
            @currentMouseEventType = "mouseUp"
            @current = null

        onMouseOver : (x, y) ->
            @currentMouseEventType = "mouseOver"
            @bg = "#222222"

        onMouseOut : (x, y) ->
            @currentMouseEventType = "mouseOut"
            @bg = "#000000"
