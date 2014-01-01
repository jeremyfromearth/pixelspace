# Conveniently load all of Spectrum by loading this file. 
# Classes can then be accessed as in the following:
# ``` 
# renderer = Spectrum.Renderer(ctx, id)
# ```
define ['renderer', 
        'player', 
        'dispatcher', 
        'utils'], 
    (Renderer, Player, Dispatcher, Utils) ->
    class Spectrum
        @Player = Player
        @Renderer = Renderer
        @Dispatcher = Dispatcher
        @Utils = Utils

