
#This class is intended to be used to compile scripts right in the browser. There is a specific format that needs to be followed for scripts that are compiled with this class. 

# ```
#class MyRenderer extends Renderer
#   init : ->
#       particle = new Particle()
#
#class Particle
#   x : 0
#   y : 0
#
#main : ClassOne
#```


#The above example demonstrates the expected format. The script must define a main property that points to sub-class of the Renderer

define [], () ->
    class Compiler
        constructor : (@ctx) ->

        # Compiles a script such as the one described above.
        # Attempts to init, step & render.
        # If any of these methods fail, the corresponding error method is called
        # Override these methods to handle errors. 
        # If no errors are detected, a new instance of the script is compiled and returned
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

        # Implement these callbacks to handle compilation errors
        onCompilationError : (error) ->
            console.log "onCompilationError()", error.message

        onInitError : (error) ->
            console.log "onInitializationError()"

        onNoMainClassError : ->
            console.log "onNoMainClassError()"

        onRenderError : (error) ->
            console.log "onRenderError()", error.message

        onStepError : (error) ->
            console.log "onStepError()"

        
