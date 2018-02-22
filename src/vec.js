define ['spectrum/Renderer', 'spectrum/Vector'], (Renderer, Vector) ->
    class Particle
        constructor : (v) ->
            @id = -1
            @alphaTarget = 1.0
            @coords = v
            @damping = 0.9
            @direction = new Vector()
            @target = new Vector()
            @scale = 1.0
            @scaleTarget = 1.0
            @stiffness = 0.9
            @timeFactor = 0.2
            @velocity = new Vector()
            @coordHistory = []

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
            for i in [0..3] 
                @particles.push new Particle new Vector @width * 0.5, @height * 0.5
                @particles[i].target =
                    Vector.Random 0, @width * .25 + @width * .75,
                                  0, @height * .25 + @height * .75

        step : ->
            for particle in @particles
                particle.update()


        render : ->
            for p1 in @particles
                @color "red"
                @circle p1.coords.x, p1.coords.y, 2
                for p2 in @particles
                    if p1 != p2
                        #@line p1.coords.x, p
                        #distance = p1.coords.distance p2.coords
                        #if distance < 200
                        @line p1.coords.x, p1.coords.y, p2.coords.x, p2.coords.y
