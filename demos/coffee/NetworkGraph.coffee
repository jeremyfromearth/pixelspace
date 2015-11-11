define ['spectrum/Renderer'], (Renderer) ->
    class NetworkGraph extends Renderer
        init : ->
            @bg = '#000'
            @static = true
            @radius = 250
            @center =
                x: @width * .5,
                y : @height * .5

            numNodes = 100
            thetaInc = Math.TWO_PI / numNodes
            @nodes = ({
                theta : n * thetaInc,
                x : (Math.cos n * thetaInc) * @radius + @center.x,
                y : (Math.sin n * thetaInc) * @radius + @center.y,
                color : Math.randomColor()
            } for n in [0...numNodes])

            numEdges = 50
            @edges = ({a : @rnd(), b : @rnd() }for i in [0...numEdges])
            for edge in @edges
                n1 = @nodes[edge.a]
                n2 = @nodes[edge.b]
                cps = @getControlPointsForEdge n1, n2
                edge.cp1 = cps.cp1
                edge.cp2 = cps.cp2

        render : ->
            for edge in @edges
                n1 = @nodes[edge.a]
                n2 = @nodes[edge.b]
                if n1 isnt n2
                    @color n1.color
                    @bezier edge.cp1.x, edge.cp1.y, edge.cp2.x, edge.cp2.y, n1.x, n1.y, n2.x, n2.y
            for node in @nodes
                @color node.color
                @circle node.x, node.y, 2
                @color node.color
                @circle node.x, node.y, 2

        rnd : ->
            return Math.randomInRange(0, @nodes.length - 1, true)

        getControlPointsForEdge : (p1, p2)->
            cp1 = {}
            cp2 = {}
            r1 = @radius * .3
            r2 = @radius * .1
            cp1.x = p1.x - Math.cos(p1.theta) * r1
            cp1.y = p1.y - Math.sin(p1.theta) * r1
            cp2.x = p2.x - Math.cos(p2.theta) * r2
            cp2.y = p2.y - Math.sin(p2.theta) * r2
            return {cp1 : cp1, cp2 : cp2}
