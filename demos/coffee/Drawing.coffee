define ['renderer'], (Renderer) ->
    class Drawing extends Renderer
        
        init : ->
            @bg = "#222222"

        render : ->
            @color "#DDDDDD"
            @lineStyle 1
            @font "lighter 14px monospace"

            # arc()
            @arc 50, 50, 40, Math.PI, Math.TWO_PI * .75, false
            @arc 55, 50, 40, Math.TWO_PI * .75, Math.TWO_PI, false
            @arc 55, 55, 40, 0, Math.PI * .5, false
            @arc 50, 55, 40, Math.PI * .5, Math.PI, false
            @text 35, 110, "arc()"
            
            # circle()
            @circle 160, 50, 40, false
            @circle 160, 50, 20, true
            @text 130, 110, "circle()"

            # circles()
            @ctx.save()
            @circles [[240, 25], [285, 25], [240, 70], [285, 70]], 15
            @color "#ff0000"
            @circles [[240, 25], [285, 25], [240, 70], [285, 70]], 2, false
            @ctx.restore()
            @text 230, 110, "circles()"

            # grid
            @grid 330, 15, 10, 10, 80, 80
            @text 350, 110, "grid()"

            # shape
            @shape [[420, 10], [520, 30], [540, 90], [500, 80], [460, 60]] 
            @text 460, 110, "shape()"

            #polygon
            @polygon 590, 50, 40, 12, false 
            @polygon 590, 50, 30, 3, false
            @polygon 590, 50, 10, 6, false
            @text 560, 110, "polygon()"

            #polygonRing
            @polygonRing 720, 50, 20, 50, 6, 6
            @text 670, 110, "polygonRing()"

            #roundedRectangle
            @roundedRectangle 830, 10, 80, 80, 10 
            @text 800, 110, "roundedRectangle()" 
