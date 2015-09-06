define ['spectrum/Renderer'], (Renderer) ->
    class HitTests extends Renderer

        init : () ->
            # canvas center
            @centerX = @width * .5
            @centerY = @height * .5

            # rectangle properties
            @rect1 = [@centerX - 50, @centerY - 50, 100, 100]

            # circle propertys
            @circ1 = [@centerX - 200, @centerY, 50]

            # triangle properties
            @tri1 = [
                [@centerX + 200, @centerY - 50],
                [@centerX + 150, @centerY + 50],
                [@centerX + 400, @centerY + 50]
            ]

            # ring properties
            @ring1 = [@centerX, @centerY + 150, 20, 50, 16, 36]

        render : () ->
            # Rectangle
            if Math.hitTestRectangle @mouseX, @mouseY, @rect1...
                @color "#000000"
            else
                @color "#ffffff"
            @rectangle @rect1...

            # Circle
            if Math.hitTestCircle @mouseX, @mouseY, @circ1...
                @color "#000000"
            else
                @color "#ffffff"
            @circle @circ1...
            
            # Triangle
            if Math.hitTestTriangle @mouseX, @mouseY, @tri1...
                @color "#000000"
            else
                @color "#ffffff"
            @shape @tri1, true, true

            # Ring
            if Math.hitTestRing @mouseX, @mouseY, @ring1... 
                @color "#000000"
            else
                @color "#ffffff"
            @polygonRing @ring1...


