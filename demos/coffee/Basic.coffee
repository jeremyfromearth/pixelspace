define ['spectrum'], (Spectrum) ->    
    class Basic extends Spectrum.Renderer
        init : ->
            @bg_color = "#222222"

        render : ->
            @font "bold 80pt Baskerville"
            @color "#ffffff"
            @text 45, 200, "SPECTRUM", false
            @color "#d13737"
            @polygon @width * .5 - 25, @height * .5 + 20, 10, 30
            @color "#45d137"
            @polygon @width * .5, @height * .5 + 20, 10, 30
            @color "#3762d1"
            @polygon @width * .5 + 25, @height * .5 + 20, 10, 30
