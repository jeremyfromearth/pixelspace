define ['renderer'], (Renderer) ->
    class KeyEvents extends Renderer

        init : () ->
            @keyInfo = ''

        step : () ->

        render : () ->
            @color 'black'
            @text 10, 30, @keyInfo
            for keys in 

        onKeyDown : (keyCode, altKey, ctrlKey, shiftKey, timeStamp) ->
            @keyInfo = 'keyCode: ' + keyCode + 
                       ', altKey: ' + altKey + 
                       ', ctrlKey: ' + ctrlKey + 
                       ', shiftKey: ' + shiftKey + 
                       ', timeStamp: ' + timeStamp
