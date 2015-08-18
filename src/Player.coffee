# This class controls the frame inint/step/render cycle for an instance or sub-class of the Renderer class.
# It can be started, stopped, paused and un-paused.
# This class provides the renderer with data about it's environment such as the canvas width, current frame and any mouse events that occurr on the canvas.
define ->
    class Player

        @FS_RESIZE = 'fs_resize'
        @FS_NO_RESIZE = 'fs_no_resize'

        constructor : (@canvas) ->
            @stepCount = 0
            @playing = false
            @renderer = null
            @isFullWindow = false
            @isFullScreen = false
            @ctx = @canvas.getContext "2d"
            @width = @canvas.clientWidth
            @height = @canvas.clientHeight
            @fullScreenMode = Player.FS_RESIZE

            window.addEventListener "keyup", @onWindowKeyboardEvent, true
            window.addEventListener "keydown", @onWindowKeyboardEvent, true
            window.addEventListener "mousedown", @onWindowMouseEvent, true
            window.addEventListener "mousemove", @onWindowMouseEvent, true
            window.addEventListener "mouseout", @onWindowMouseEvent, true
            window.addEventListener "mouseover", @onWindowMouseEvent, true
            window.addEventListener "mouseup", @onWindowMouseEvent, true
            window.addEventListener "resize", @onWindowResize, true

            @loop()

        # Wraps various browser specific request for animation frame
        getAnimationCallback : =>
            return  window.requestAnimationFrame or
                    window.webkitRequestAnimationFrame or
                    window.mozRequestAnimationFrame or
                    window.oRequestAnimationFrame or
                    window.msRequestAnimationFrame or
                    setTimeout callback, (1000 / 60)

        # Initialize properties on the renderer and cal Renderer.init()
        init : =>
            if @renderer?
                @renderer.stepCount = @stepCount
                @renderer.width = @canvas.clientWidth
                @renderer.height = @canvas.clientHeight
                if @renderer.init?
                    @renderer.init()

        # The main loop
        loop : =>
            @getAnimationCallback() @loop
            if @renderer?
                if @playing
                    if !@renderer.static
                        @step()
                        @render()
                    else
                        if @stepCount is 0
                            @step()
                            @render()

        onWindowKeyboardEvent : (event) =>
            if @renderer?
                switch event.type
                    when 'keydown'
                        if @renderer.onKeyDown?
                            @renderer.onKeyDown event.keyCode,
                                      event.altKey, event.ctrlKey,
                                      event.shiftKey, event.timeStamp
                    when 'keyup'
                        if @renderer.onKeyUp?
                            @renderer.onKeyUp event.keyCode,
                                      event.altKey, event.ctrlKey,
                                      event.shiftKey, event.timeStamp

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

        # Checks to see if the player is full window and resizes the canvas if it is
        onWindowResize : (event) =>
            if @isFullWindow?
                if @canvas.width != window.innerWidth
                    @canvas.width = window.innerWidth
                if @canvas.height != window.innerHeight
                    @canvas.height = window.innerHeight

        # Pauses the player
        pause : =>
            @playing = false

        # Calls render phase
        render : =>
            if @renderer.clear?
                @renderer.clear()
            if @renderer.render? then @renderer.render()

        # Starts or un-pauses the loop
        play : =>
            @playing = true

        # Set the player to fill the entire browser window
        setFullWindow : (full) =>
            @isFullWindow = full
            if full?
                @onWindowResize()

        # Sets an instance of a Renderer sub-class as the renderer for this Player
        setRenderer : (newRenderer) =>
            if @renderer?
                @renderer.removeListener 'fullscreen', @toggleFullscreen

            @renderer = newRenderer
            @renderer.width = @canvas.clientWidth
            @renderer.height = @canvas.clientHeight
            @renderer.isFullScreen = @isFullScreen
            @renderer.addListener 'fullscreen', @toggleFullScreen

        # The step phase
        step : =>
            if @renderer.looping and @renderer.duration > 0
                if @stepCount > @renderer.duration
                    @stepCount = 0
            @stepCount++
            @renderer.stepCount = @stepCount

            @width = @renderer.width = @canvas.clientWidth
            @height = @renderer.height = @canvas.clientHeight
            if @renderer.step? then @renderer.step()

        # Stops the player, resets itself and the renderer
        stop : =>
            @stepCount = 0
            @playing = false
            @ctx.clearRect 0, 0, @width, @height
            if @renderer?
                if @renderer.clear?
                    @renderer.clear()

        toggleFullScreen : () =>
            if @isFullScreen
                @isFullScreen = false
                if document.webkitCancelFullScreen?
                    document.webkitCancelFullScreen()
                if document.mozCancelFullScreen?
                    document.mozCancelFullScreen()
                if document.cancelFullScreen?
                    document.cancelFullScreen()
                if document.msCancelFullScreen?
                    document.msCanceFullScreen()
            else
                @isFullScreen = true
                if @canvas.webkitRequestFullScreen?
                    @canvas.webkitRequestFullScreen Element.ALLOW_KEYBOARD_INPUT
                if @canvas.mozRequestFullScreen?
                    @canvas.mozRequestFullScreen()
                if @canvas.requestFullScreen?
                    @canvas.requestFullScreen()
                if @canvas.msRequestFullScreen?
                    @canvas.msRequestFullScreen()

            if @renderer?
                @renderer.isFullScreen = @isFullScreen
