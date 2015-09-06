define ['spectrum/Renderer'], (Renderer) ->
    class Basic extends Renderer
        # Initialize instance variables
        init : ->
            @static = no
            @bg = "#ffffff"
            @cx = @width * .5
            @cy = @height * .5
            @id = 0
            @paths = {}
            @count = 0
            @freq = 0
            @segment = 10
            @directions = [ 
                #[@segment, 0.0],
                [@segment, -@segment],
                #[0.0, @segment],
                [-@segment, -@segment],
                #[-@segment, 0],
                [-@segment, @segment],
                #[0, @segment]
                [@segment, @segment]
            ]

        step : ->
            if @id < 10 and @count >= @freq
                # Reset counts
                @id++
                @count = 0
                @freq  = 50 + Math.floor Math.random() * 60

                # Create a new path
                @paths[@id] = {}
                path = @paths[@id]
                path.points = []
                path.points[0] = []
                point = path.points[0]
                point[0] = @segment * ~~(Math.random() * (@width/@segment))
                point[1] = @segment * ~~(Math.random() * (@height/@segment))
            else: 
                @count++

            # Update existing paths
            if @stepCount %% 5 == 0
                for k, v of @paths
                    x = v.points[v.points.length-1][0]
                    y = v.points[v.points.length-1][1]
                    
                    neighbors = []
                    for dir in @directions
                        neighbors.push [x + dir[0], y + dir[1]]

                    neighbor = null
                    @shuffle neighbors
                    for n in neighbors
                        if neighbor is null and !(@contains v.points, n)
                            neighbor = n
                            break
                    
                    if neighbor is null
                        # we could remove the path here or mark it as complete
                        index = ~~(Math.random() * @directions.length)
                        direction = @directions[index]
                        neighbor = [x + direction[0], y + direction[1]]

                    if neighbor? 
                        v.points.push(neighbor)
                        if v.points.length > 100
                            v.points.shift() 

        # Returns whether or not a point is in the provided list
        contains : (list, n) ->
            count = 0
            for el in list
                if el[0] == n[0] and el[1] == n[1]
                    if count == list.length - 1
                        return no
                    return yes
                count++
            return no
    
        # Shuffles an array
        shuffle : (a) ->
            i = a.length
            while --i > 0
                j = ~~(Math.random() * (i + 1)) # ~~ is a common optimization for Math.floor
                t = a[j]
                a[j] = a[i]
                a[i] = t
                a 

        # Render graphics 
        render : ->
            for k, v of @paths
                @color "#da4939"
                @shape v.points, no, no
                for p in v.points
                    @rectangle p[0]-2, p[1]-2, 4, 4, true 
