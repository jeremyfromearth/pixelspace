define [], () ->

    # Array Utils
    # ======

    # Returns a randomized copy of the supplied Array
    Array.shuffle = (a) ->
        result = []
        copy = a.slice()
        console.log copy
        while copy.length > 0
            r = Math.floor Math.random() * copy.length
            result.push copy.splice(r, 1)[0]
        return result

    # Math Utils
    # ======

    # CONSTANTS
    Math.TWO_PI = Math.PI * 2

    # Returns the distance between two points
    Math.distance = (x1, y1, x2, y2) ->
        dx = x1 - x2
        dy = y1 - y2
        dx *= dx
        dy *= dy 
        return Math.sqrt(dx + dy)  

    # Interpolates a value between 0.0 and 1.0 to a correspondig value between min and max
    # ``` 
    # Math.interpolateLin(.2, 0, 100) # 20
    # ```
    Math.interpolateLin = (n, min, max) ->
        return min + ((max - min) * n)

    # Returns a value between 0.0 and 1.0 corresponding to the percentage of n between min and max
    # ```
    # Math.normalize(50, 0, 100) # .5
    # ```
    Math.normalize = (n, min, max) ->
        return (n - min) / (max - min)

    # Returns a random number between the supplied range
    Math.randomInRange = (min, max, round=false) ->
        n = min + (max - min) * Math.random() 
        if round
            return Math.round(n)
        return n

    # Rounds to the nearest decimal
    # ```
    # Math.roundTo(3.219, 2) # 3.22
    # ``` 
    Math.roundTo = (n, decimals) ->
        return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals)

    # Returns a value rounded to the nearest integer multiple
    # ```
    # Math.roundToMultiple(28, 5) # 30
    # ```
    Math.roundToMultiple = (n, multiple) ->
        return multiple * Math.round((n/multiple))

    # Converts a value in degrees to radians
    # ```
    # Math.toRadians(90) # 1.5707963267948966
    # ```
    Math.toRadians = (degrees) ->
        return Math.PI * degrees / 180

    # Transposes a value from one range to another
    # ``` 
    # Math.transpose(40, 30, 50, 0, 1) # .5
    # ```    
    Math.transpose = (n, min1, max1, min2, max2) ->
        return Math.interpolateLin(Math.normalize(n, min1, max1), min2, max2)



    
