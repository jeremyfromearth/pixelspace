#This class is intended to be used to compile spectrum apps in the browser. 
#There is a specific format that needs to be followed for scripts that are compiled with this class. 

#
#class MyRenderer extends Renderer
#   init : ->
#       particle = new Particle()
#
#class Particle
#   x : 0
#   y : 0
#
#main : MyRenderer
#


#The above example demonstrates the expected format. The script must define a main property that points to sub-class of the Renderer
define ->
    class Compiler
        constructor : (@ctx) ->

        # Compiles a script such as the one described above.
        # Attempts to init, step & render.
        # If any of these methods fail, the corresponding error method is called
        # Override these methods to handle errors. 
        # If no errors are detected, a new instance of the script is compiled and returned
        compile : (code) =>
            r = null
            try
                obj = CoffeeScript.eval code, {bare: true}
                if obj? 
                    if obj.main
                        r = new obj.main @ctx
                    else
                        @onNoMainClassError() 
                        return
                
                if r?
                    if r.init?
                        try 
                            r.init()
                        catch error
                            @onInitError error
                            return

                    if r.step?
                        try 
                            r.step()
                        catch error
                            @onStepError error
                            return

                    if r.render?
                        try
                            r.render()
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
