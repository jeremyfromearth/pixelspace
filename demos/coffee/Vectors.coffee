define ['spectrum/Renderer', 'spectrum/Vector'], (Renderer, Vector) ->
    class Particle
        constructor : (x, y) ->
            @id = -1
            @alphaTarget = 1.0
            @coords = new Vector(x, y)
            @damping = 0.1
            @direction = new Vector()
            @target = new Vector()
            @scale = 1.0
            @scaleTarget = 1.0
            @stiffness = 0.9
            @timeFactor = 0.2
            @velocity = new Vector()
            @coordHistory = []
            @maxCoordHistoryLength = Math.round Math.random() * 500

        update : =>
            delta = @target.sub(@coords)
            if Math.abs delta.length() > 0.001
                @direction = delta
                @velocity = (@velocity.scale @damping).add(delta.scale @timeFactor).scale(@stiffness)
                @coordHistory.push [@coords.x, @coords.y]
                @coords = @coords.add @velocity.scale(@timeFactor)
                @scale += (@scaleTarget - @scale) * @timeFactor
                if @coordHistory.length > @maxCoordHistoryLength
                    @coordHistory.shift()


    class Vectors extends Renderer
        init : ->
            @particles = []
            for i in [0..10]
                @particles.push new Particle @width * 0.5, @height * 0.5
                @particles[i].target = new Vector Math.randomInRange(0, @width), Math.randomInRange( 0, @height)

        step : ->
            for particle in @particles
                particle.update()

        render : ->
            for p1 in @particles
                @color "red"
                @shape p1.coordHistory, false, false
                @circle p1.coords.x, p1.coords.y, 2
                for p2 in @particles
                    if p1 != p2
                        @line p1.coords.x, p1.coords.y, p2.coords.x, p2.coords.y
