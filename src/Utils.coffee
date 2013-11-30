define [], () ->
    Math.TWO_PI = Math.PI * 2
    Math.distance = (x1, y1, x2, y2) ->
        dx = x1 - x2
        dy = y1 - y2
        dx *= dx
        dy *= dy 
        return Math.sqrt(dx + dy)  

    Math.interpolateLin = (n, min, max) ->
        return min + ((max - min) * n)

    Math.normalize = (n, min, max) ->
        return (n - min) / (max - min)

    Math.roundTo = (n, decimals) ->
        return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals)

    Math.transpose = (n, min1, max1, min2, max2) ->
        return Math.interpolateLin(Math.normalize(n, min1, max1), min2, max2)

    Math.roundToMultiple = (n, multiple) ->
        return multiple * Math.round((n/multiple))

    Array.shuffle = (a) ->
        result = []
        copy = a.slice()
        console.log copy
        while copy.length > 0
            r = Math.floor Math.random() * copy.length
            result.push copy.splice(r, 1)[0]
        return result

