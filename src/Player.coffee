#This class controls the frame inint/step/render cycle for an instance or sub-class of the Renderer class. It can be started, stopped, paused and un-paused. This class provides the renderer with data about it's environment such as the canvas width, current frame and any mouse events that occurr on the canvas.
define [], () ->
    class Player
        running : false

        constructor : (@canvas) ->
            @isFullScreen = false
            @stepCount = 0
            @width = @canvas.clientWidth
            @height = @canvas.clientHeight
            @ctx = canvas.getContext "2d"
            @renderer = null 
            @loop()

            window.addEventListener "mousedown", @onWindowMouseEvent, true
            window.addEventListener "mousemove", @onWindowMouseEvent, true
            window.addEventListener "mouseout", @onWindowMouseEvent, true
            window.addEventListener "mouseover", @onWindowMouseEvent, true
            window.addEventListener "mouseup", @onWindowMouseEvent, true

        # Wraps various browser specific request for animation frame
        getAnimationCallback : =>
            return  window.requestAnimationFrame or
                    window.webkitRequestAnimationFrame or
                    window.mozRequestAnimationFrame or
                    window.oRequestAnimationFrame or
                    window.msRequestAnimationFrame or 
                    setTimeout callback, (1000 / 60)

        # The main loop
        loop : =>
            @getAnimationCallback() @loop
            if @renderer? 
                if @running 
                    if !@renderer.static
                        @step()
                        @render()
                    else
                        if @stepCount is 0
                            @step()
                            @render()

        # Capture all mouse events on the window and pass them to the renderer when it is the target
        onWindowMouseEvent : (event) =>
            if @renderer?
                r = @canvas.getBoundingClientRect()
                x = event.clientX - r.left
                y = event.clientY - r.top
                @renderer.mouseX = x
                @renderer.mouseY = y
                if event.target == @canvas
                    switch event.type
                        when "mousedown"
                            @toggleFullScreen()
                            @renderer.mouseIsDown = true
                            if @renderer.onMouseDown?
                                @renderer.onMouseDown x, y
                        when 'mousemove'
                            if @renderer.mouseIsDown
                                @renderer.mouseIsDragging = true
                            if @renderer.onMouseMove?
                                @renderer.onMouseMove x, y
                        when 'mouseout'
                            if @renderer.onMouseOut?
                                @renderer.mouseIsOver = false
                                @renderer.onMouseOut x, y
                        when 'mouseover'
                            if @renderer.onMouseOver?
                                @renderer.mouseIsOver = true
                                @renderer.onMouseOver x, y
                        when 'mouseup'
                            @renderer.mouseIsDown = false
                            @renderer.mouseIsDragging = false
                            if @renderer.onMouseUp?
                                @renderer.onMouseUp x, y
                else
                    switch event.type
                        when "mouseup"
                            @renderer.mouseIsDown = false
                            @renderer.mouseIsDragging = false
                            if @renderer.onMouseUp?
                                @renderer.onMouseUp(-1, -1)
                
        # Pauses the player
        pause : =>
            @running = false 

        # Calls render phase 
        render : =>
            if @renderer.clear?
                @renderer.clear()
            if @renderer.render? then @renderer.render()

        # Starts or un-pauses the loop
        run : =>
            @running = true

        # Sets an instance of a Renderer sub-class as the renderer for this Player
        setRenderer : (newRenderer) =>
            @renderer = newRenderer
            @renderer.width = @canvas.clientWidth
            @renderer.height = @canvas.clientHeight

        # The step phase
        step : =>
            if @renderer.looping and @renderer.duration > 0
                if @stepCount > @renderer.duration
                    @stepCount = 0
            @stepCount++
            @renderer.stepCount = @stepCount
            @renderer.width = @canvas.clientWidth
            @renderer.height = @canvas.clientHeight
            if @renderer.step? then @renderer.step()

        # Stops the player, resets itself and the renderer
        stop : =>
            @stepCount = 0
            @running = false
            @ctx.clearRect 0, 0, @width, @height
            if @renderer?
                if @renderer.clear?
                    @renderer.clear()
        
        toggleFullScreen : () ->
            console.log @isFullScreen
            requestFullScreen = @requestFullScreen()
            cancelFullScreen = @cancelFullScreen()
            if !requestFullScreen or !cancelFullScreen
                return
            if @isFullScreen
                @isFullScreen = false
                cancelFullScreen()
            else
                @isFullScreen = true
                requestFullScreen()

        requestFullScreen : () ->
            return @canvas.webkitRequestFullScreen or
                   @canvas.mozRequestFullScreen
        
        cancelFullScreen : () ->
            return document.webkitCancelFullScreen or
                   document.mozCancelFullScreen
