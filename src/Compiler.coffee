define [], () ->
    class Compiler
        constructor : (@ctx) ->

        compile : (code) =>
            df = null
            try
                obj = CoffeeScript.eval code, {bare: true}
                if obj? 
                    if obj.main
                        df = new obj.main @ctx
                    else
                        @onNoMainClassError() 
                        return
                
                if df?
                    if df.init?
                        try 
                            df.init()
                        catch error
                            @onInitError error
                            return

                    if df.step?
                        try 
                            df.step()
                        catch error
                            @onStepError error
                            return

                    if df.render?
                        try
                            df.render()
                        catch error
                            @onRenderError error
                            return
                obj = null
                return CoffeeScript.eval code, {bare: true}
            catch error
                @onCompilationError error

        # callbacks
        onNoMainClassError : ->
            console.log "onNoMainClassError()"

        onCompilationError : (error) ->
            console.log "onCompilationError()", error.message

        onInitError : (error) ->
            console.log "onInitializationError()"

        onStepError : (error) ->
            console.log "onStepError()"

        onRenderError : (error) ->
            console.log "onRenderError()", error.message
