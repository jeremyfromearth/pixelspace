define ['renderer'], (Renderer) ->    
    class MouseEvents extends Renderer

        # Initialize instance variables
        init : ->
            @data = []
            @bg = "#222222"

        # Update variables here
        step : ->
            i = 0
            while i < @data.length
                if @data[i]?
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
                    @point p.x, p.y, p.radius * p.scale
                    @color "#ffffff"
                    @point p.x, p.y, p.radius * p.scale, false
                i++
                
        onMouseDown : (x, y) ->
            @data.push { 
                x: x 
                y: y
                color: @randomColor()
                radius: @random() * 20 + 5
                alpha: 1 
                scale: 1
            }
            
        onMouseDrag : (x, y) ->
            console.log "onMouseDrag"
