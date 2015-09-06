define ['spectrum/Renderer', 'spectrum/Utils'], (Renderer, Util) ->
    class UlamSpiral extends Renderer
        init : () ->
            @font 'bold 24pt sans-serif'
            
            @dist = 12      # distance between points and diameter of dots
            @total = 1601   # total number of points
            @direction = {x: @dist, y: 0} # initialize the direction
            @points = [{x : @width * .5, y : @height * .5, num: 1, prime : false}] # all of the points drawn
            
            num = 0
            count = 0
            changes = 0

            # initialize an array of points
            for i in [2...@total + 1]
                prev = @points[i-2] 
                current =   
                    x : prev.x + @direction.x, 
                    y : prev.y + @direction.y, 
                    num : i, 
                    prime : @isPrime i

                count++
                if count > num 
                    changes++
                    if changes is 2
                        num++ 
                        changes = 0
                    count = 0 
                    @updateDirection()
                @points.push current

        # Tests whether or not the supplied number is a prime number  
        isPrime : (n) ->
            for i in [2...10]
                if n % i is 0 and n isnt i or n is 1
                    return false
            return true

        # Rotates the direction counter clockwise
        updateDirection : () ->
            x = @direction.x
            y = @direction.y
            if x > 0  and y is 0
                x = 0
                y = -@dist
            else if x is 0 and y < 0
                x = -@dist
                y = 0
            else if x < 0 and y is 0
                x = 0
                y = @dist
            else if x is 0 and y > 0
                x = @dist
                y = 0
            @direction.x = x
            @direction.y = y

        render : () ->
            for p in @points
                if p.num is 1
                    @color 'red'
                else if p.prime 
                    @color 'slategrey'
                else 
                    @color 'white'
                @circle p.x, p.y, @dist * .5 - 2

                if Math.hitTestCircle @mouseX, @mouseY, p.x, p.y, @dist * .5
                    if p.prime 
                        @color 'slategrey' 
                    else 
                        @color 'black'
                    @text 20, 50, 'Number: ' + p.num
