class EventDispatcher
    callbacks : {}

    add : (eventName, callback) ->
        @callbacks[eventName] ||= []
        @callbacks[eventName].push callback

    dispatch : (eventName, data) ->
        @chain = @callbacks[eventName]
        callback data for callback in chain if chain?

