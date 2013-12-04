define ['renderer'], (Renderer) ->
    class HitTests extends Renderer

        init : () ->
            # canvas center
            @centerX = @width * .5
            @centerY = @height * .5

            # rectangle properties
            @rx = @centerX - 50
            @ry = @centerY - 50
            @rw = 100
            @rh = 100

            # circle propertys
            @cx = @centerX - 200
            @cy = @centerY
            @cr = 50

            # triangle properties
            @tx0 = @centerX + 200
            @ty0 = @centerY - 50
            @tx1 = @centerX + 150
            @ty1 = @centerY + 50
            @tx2 = @centerX + 400
            @ty2 = @centerY + 50

            # ring properties
            @r2x = @centerX
            @r2y = @cy + 150
            @r2r1 = 20
            @r2r2 = 50

        render : () ->
            # Rectangle
            if Math.hitTestRectangle @mouseX, @mouseY, @rx, @ry, @rw, @rh
                @color "#000000"
            else
                @color "#ffffff"
            @rectangle @rx, @ry, @rw, @rh

            # Circle
            if Math.hitTestCircle @mouseX, @mouseY, @cx, @cy, @cr
                @color "#000000"
            else
                @color "#ffffff"
            @circle @cx, @cy, @cr
            
            # Triangle
            if Math.hitTestTriangle @mouseX, @mouseY, @tx0, @ty0, @tx1, @ty1, @tx2, @ty2
                @color "#000000"
            else
                @color "#ffffff"
            @shape [[@tx0, @ty0], [@tx1, @ty1], [@tx2, @ty2]], true, true

            # Ring
            if Math.hitTestRing @mouseX, @mouseY, @r2x, @r2y, @r2r1, @r2r2
                @color "#000000"
            else
                @color "#ffffff"
            @polygonRing @r2x, @r2y, @r2r1, @r2r2, 16, 36 


