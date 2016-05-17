define ['spectrum/Renderer', 'spectrum/Vector', 'spectrum/Utils'], (Renderer, Vector, Utils) ->
    class Node
        constructor : (x, y) ->
            @position = new Vector x, y
            @target = new Vector()
            @velocity = new Vector()
            @damping = 0.3
            @stiffness = 0.9
            @timeFactor = 0.6

        update : (setNewTarget) ->
            @theta += @thetaInc
            @radius = Math.abs(Math.sin(@theta)) * @radiusFactor
            delta = @target.sub(@position)
            if delta.length() > 0.1
                norm = delta.normalized()
                opposite = norm.scale(-1.0)
                @velocity =
                    @velocity.scale(@damping).add(delta.scale(@timeFactor)).scale(@stiffness)
                @position = @position.add(@velocity.scale(@timeFactor))
            else if setNewTarget
                @target = Vector.Random 0, 960, 0, 540

    class VectorChains extends Renderer
        # Initialize instance variables
        init : ->
            @chains = []
            @theta = 0.0
            @createChain(@width * 0.5, @height * 0.5)

        step : ->
            for chain in @chains
                for i in [0...chain.length]
                    link = chain[i]
                    if i is 0
                        link.update(true)
                    else
                        leader = chain[i-1]
                        direction = leader.target.sub(leader.position).normalized()
                        target = leader.position.sub(direction.scale(5.0))
                        delta = target.sub(link.position)
                        link.target = target
                        link.update()
        render : ->
            for chain in @chains
                @color 'red'
                points = [[v.position.x, v.position.y] for v in chain][0]
                @shape points, false, false
                @circles points, 2, true

        onMouseDown : (x, y) ->
            @createChain(x, y)

        createChain : (x, y) ->
            @chains.push []
            center = new Vector(x, y)
            linkCount = Math.randomInRange 3, 5
            timeFactor = Math.randomInRange 0.2, .7
            damping = Math.randomInRange 0.01, 0.6
            stiffness = Math.randomInRange 0.7, 0.9
            for i in [0...linkCount]
                n = new Node(x, y)
                n.timeFactor = timeFactor
                n.damping = damping
                n.stiffness = stiffness
                n.target = Vector.Random 0, @width, 0, @height
                n.position = center
                @chains[@chains.length - 1].push(n)
