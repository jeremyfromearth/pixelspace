define ['renderer'], (Renderer) ->
    class KeyEvents extends Renderer

        init : () ->
            @font 'normal 14px Helvetica'
            @keyInfo = 'PRESS AN ARROW KEY'
            @pointList = [[@width * .5, @height * .5]]

        step : () ->

        render : () ->
            @color 'black'
            @text 10, 30, @keyInfo
            @color 'dark slate grey'
            @shape @pointList, false, false
            @color 'black cat'
            @circles @pointList, 3

        onKeyDown : (keyCode, altKey, ctrlKey, shiftKey, timeStamp) ->
            @keyInfo = 'onKeyDown():' +
                       ' keyCode: ' + keyCode + 
                       ' altKey: ' + altKey + 
                       ' ctrlKey: ' + ctrlKey + 
                       ' shiftKey: ' + shiftKey + 
                       ' timeStamp: ' + timeStamp
            
            amount = 20 
            current = @pointList[@pointList.length - 1]
            x = current[0]
            y = current[1]
            switch event.keyCode
                when 37 then x -= amount
                when 38 then y -= amount 
                when 39 then x += amount
                when 40 then y += amount
            @pointList.push [x, y]

