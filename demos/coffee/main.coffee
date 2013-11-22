define [], () ->
    require.config
        baseUrl: "../lib/"
        paths: 
            compiler : 'Compiler'
            env : 'Env'
            player : 'Player'
