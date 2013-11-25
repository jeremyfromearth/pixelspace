#This class controls the frame inint/step/render cycle for an instance or sub-class of the Renderer class. It can be started, stopped, paused and un-paused. This class provides the renderer with data about it's environment such as the canvas width, current frame and any mouse events that occurr on the canvas.


define [], () ->
    class Player
        running : false

        constructor : (@canvas) ->
            @frame = 0
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

        getAnimationCallback : =>
            return  window.requestAnimationFrame or
                    window.webkitRequestAnimationFrame or
                    window.mozRequestAnimationFrame or
                    window.oRequestAnimationFrame or
                    window.msRequestAnimationFrame or 
                    setTimeout callback, (1000 / 60)

        loop : =>
            @getAnimationCallback() @loop
            if @renderer? and  @running and !@renderer.static
                @step()
                @render()

        onWindowMouseEvent : (event) =>
            if @renderer?
                x = event.offsetX
                y = event.offsetY
                @renderer.mouseX = x
                @renderer.mouseY = y
                if event.target == @canvas
                    switch event.type
                        when "mousedown"
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
                
        pause : =>
            @running = false 

        render : =>
            if @renderer.clear?
                @renderer.clear()
            if @renderer.render? then @renderer.render()

        run : =>
            @running = true

        setRenderer : (newRenderer) =>
            @renderer = newRenderer
            @renderer.width = @canvas.clientWidth
            @renderer.height = @canvas.clientHeight

        step : =>
            if @renderer.looping and @renderer.duration > 0
                if @frame > @renderer.duration
                    @frame = 0
            @frame++
            @renderer.frame = @frame
            @renderer.width = @canvas.clientWidth
            @renderer.height = @canvas.clientHeight
            if @renderer.step? then @renderer.step()

        stop : =>
            @frame = 0
            @running = false
            @ctx.clearRect 0, 0, @width, @height
            if @renderer?
                if @renderer.clear?
                    @renderer.clear()
