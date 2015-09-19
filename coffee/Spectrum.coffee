# Conveniently load all of Spectrum by loading this file.
# Classes can then be accessed as in the following:
# ```
# renderer = Spectrum.Renderer(ctx, id)
# ```
define ['Renderer',
        'Player',
        'Dispatcher',
        'Utils',
        'Vector'], 
    (Renderer, Player, Dispatcher, Utils, Vector) ->
    class Spectrum
        @Player = Player
        @Renderer = Renderer
        @Dispatcher = Dispatcher
        @Utils = Utils
        @Vector = Vector
