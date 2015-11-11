define ->
    class Vector

        @Zero = new Vector(0, 0)

        @Random : (xMin, xMax, yMin, yMax) ->
            new Vector Math.randomInRange(xMin, xMax), Math.randomInRange(yMin, yMax)

        constructor : (@x = 0, @y = 0) ->

        length : () ->
            Math.sqrt @x * @x + @y * @y

        add : (v) ->
            new Vector(@x + v.x, @y + v.y)

        sub : (v) ->
            new Vector(@x - v.x, @y - v.y)

        div : (n) ->
            new Vector(@x / n, @y / n)

        mult : (v) ->
            new Vector(@x * v.x, @y * v.y)

        scale : (n) ->
            new Vector(@x * n, @y * n)

        distance : (v) ->
            dx = @x - v.x
            dy = @y - v.y
            Math.sqrt dx * dx + dy * dy

        normalized : (v) ->
            len = @length()
            if len == 0.0
                @Zero()
            else
                @div(len)
