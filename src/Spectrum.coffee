# Conveniently load all of Spectrum by loading this file. 
# Classes can then be accessed as in the following:
# ``` 
# renderer = Spectrum.Renderer(ctx, id)
# ```
define ['renderer', 'player', 'compiler', 'utils'], (Renderer, Player, Compiler, Utils) ->
    class Spectrum
        @Player = Player
        @Compiler = Compiler
        @Renderer = Renderer
        @Utils = Utils
