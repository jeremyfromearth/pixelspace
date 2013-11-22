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

            @canvas.addEventListener "mousedown", @onMouseEvent, true
            @canvas.addEventListener "mousemove", @onMouseEvent, true
            @canvas.addEventListener "mouseout", @onMouseEvent, true
            @canvas.addEventListener "mouseover", @onMouseEvent, true
            @canvas.addEventListener "mouseup", @onMouseEvent, true

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

        run : =>
            @running = true

        onMouseEvent : (event) ->
            x = event.offsetX
            y = event.offsetY

            if @renderer?
                switch event.type
                    when "mousedown"
                        if @renderer.onMouseDown?
                            @renderer.onMouseDown x, y
                    when 'mousemove'
                        if @renderer.onMouseMove?
                            @renderer.onMouseMove x, y
                    when 'mouseout'
                        if @renderer.onMouseOut?
                            @renderer.onMouseOut x, y
                    when 'mouseover'
                        if @renderer.onMouseEnter?
                            @renderer.onMouseEnter x, y
                    when 'mouseup'
                        if @renderer.onMouseUp?
                            @renderer.onMouseUp x, y

        pause : =>
            @running = false 

        render : =>
            if @renderer.clear?
                @renderer.clear()
            if @renderer.render? then @renderer.render()

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
