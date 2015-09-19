define ->
    class Vector

        @Zero = new Vector(0, 0)

        constructor : (@x = 0, @y = 0) ->
            
        length : () ->
            return Math.sqrt @x * @x + @y * @y

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

        normalized : (v) ->
            len = @length()
            if len == 0.0
                @Zero()
            else
                @div(len)
