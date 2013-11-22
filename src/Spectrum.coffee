define ['player', 'compiler', 'renderer'], (Player, Compiler, Renderer) ->
    class Spectrum
        for m in Object.getOwnPropertyNames Math
                window[m] = Math[m]

        additions = [
            ["TWO_PI", Math.PI * 2]
        ]

        for a in additions
            window[a[0]] = a[1]

        @Player = Player
        @Compiler = Compiler
        @Renderer = Renderer
