define [], () ->
    require.config
        paths:
            coffee: '../lib/vendor/coffee-script'
            spectrum: '../lib/spectrum/Spectrum'
            player: '../lib/spectrum/Player'
            compiler: '../lib/spectrum/Compiler'
            renderer: '../lib/spectrum/Renderer'
