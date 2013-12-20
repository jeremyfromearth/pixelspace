define ['renderer'], (Renderer) ->
    class Shape extends Renderer

        init : () ->
            @shapeData1 = [[30, 30], [200, 50], [220, 250], [100, 280], [30, 200]]
            @shapeData2 = []
            @shapeData3 = []
            for p in @shapeData1
                @shapeData2.push [p[0] + 300, p[1]]
                @shapeData3.push [p[0] + 600, p[1]]


        step : () ->

        render : () ->
            @color "white"
            # Draw the left shape outline open
            @shape @shapeData1, false, false

            # Draw the right shape filled 
            @shape @shapeData2, true, true

            # Draw the right shape outline closed
            @shape @shapeData3, false, true


