define ->
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

    Array.NUMERIC = (a, b) ->
        return a - b

    # Math Utils
    # ======

    # CONSTANTS
    Math.HALF_PI = Math.PI * .5
    Math.QTR_PI = Math.PI * .25
    Math.TWO_PI = Math.PI * 2

    Math.average = (terms) ->
        return (Math.sum terms) / terms.length

    Math.clamp = (n, min, max) ->
        return Math.min(Math.max(n, min), max)

    # Returns a boolean indicating that the point (px, py) is contained by the circle
    Math.hitTestCircle = (px, py, x, y, r) ->
        return Math.distance(px, py, x, y) <= r

    # Returns a boolean indicating that the point (px, py) is contained in the rectangle
    Math.hitTestRectangle = (px, py, x, y, w, h) ->
        return px >= x && px <= x + w && py >= y && py <= y + h

    # Returns a boolean that the point (px, py) is with the band of a ring shape
    Math.hitTestRing = (px, py, x, y, r1, r2) ->
        d = Math.distance(px, py, x, y)
        return d > r1 and d < r2

    # Returns a boolean that the point (px, py) is contained by the triangle p1, p2, p3
    # p1, p2, p3 are arrays of two points each
    Math.hitTestTriangle = (px, py, p1, p2, p3) ->
        x0 = p1[0]
        y0 = p1[1]
        x1 = p2[0]
        y1 = p2[1]
        x2 = p3[0]
        y2 = p3[1]
        A = .5 * (-y1 * x2 + y0 * (-x1 + x2) + x0 * (y1 - y2) + x1 * y2)
        s = (y0 * x2 - x0 * y2 + (y2 - y0) * px + (x0 - x2) * py)
        t = (x0 * y1 - y0 * x1 + (y0 - y1) * px + (x1 - x0) * py)
        sign = if A < 0 then -1 else 1
        s *= sign
        t *= sign
        return s > 0 and t > 0 and (s + t) < 2 * A * sign

    # Returns a boolean indicating that the point (px, py) is contained within a wedge shaped region
    Math.hitTestWedge = (px, py, x, y, r, startAngle, endAngle) ->
        # TODO: Implement
        return false

    # Returns the distance between two points
    Math.distance = (x1, y1, x2, y2) ->
        dx = x1 - x2
        dy = y1 - y2
        dx *= dx
        dy *= dy
        return Math.sqrt(dx + dy)

    # Returns array of RGB value of supplied hex value
    # Input value is expected to be in 0xrrggbb format
    Math.hexToRGB = (hex) ->
        return [hex >> 16, (hex >> 8) & 0xff, hex & 0xff]

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

    # Returns a random color in rgb format
    Math.randomColor = ->
        r = (Math.randomInRange(0, 255, true))
        g = (Math.randomInRange(0, 255, true))
        b = (Math.randomInRange(0, 255, true))
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'

    # Returns a random number between the supplied range
    # Provide optional argument of true as third param to return an integer
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

    Math.sum = (terms) ->
        n = 0
        for x in terms
            n += x
        return n

    # Transposes a value from one range to another
    # ```
    # Math.transpose(40, 30, 50, 0, 1) # .5
    # ```
    Math.transpose = (n, min1, max1, min2, max2) ->
        return Math.interpolateLin(Math.normalize(n, min1, max1), min2, max2)

    # Convenience for testing the truthiness of whether or not a given number is between two others
    Math.within = (x, gt, lt) -> return x >= gt and x <= lt

    # String Utils
    # ======

    String.alphabet = () ->
        return 'abcdefghijklmnopqrstuvwxyz'

    String.numerics = () ->
        return '0123456789'
