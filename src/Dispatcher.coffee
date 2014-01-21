define ->
    class Dispatcher
        callbacks : {}

        addListener : (eventName, callback) ->
            list = @callbacks[eventName] ||= []
            if list.indexOf(callback) < 0 
                @callbacks[eventName].push callback

        removeListener : (eventName, callback) ->
            index = -1
            list = @callbacks[eventName]
            for i in [0..list.length-1]
                console.log i
                if list[i] is callback
                    index = i
            list.splice(index, 1)

        dispatch : (eventName, data) ->
            chain = @callbacks[eventName]
            callback data for callback in chain if chain?
