#The renderer class provides a drawing API that simplifies many common drawing operations.
#Many of the methods have a similar signature. The first two parameters are often x, y coordinates and the following parameters are specific to the function. This class can be used independantly, but it is intended to be extended.   

define [], () ->
    class Renderer
        constructor : (@ctx, @id) ->
            @frame = 0
            @width = 0
            @height = 0
            @static = false
            @looping = false
            @bg = "#CCCCCC"

            @mouseX = 0
            @mouseY = 0
            @mouseIsDown = false
            @mouseIsOver = false
            @mouseIsDragging = false

        alpha : (a) =>
            @ctx.globalAlpha = a 

        arc : (x, y, radius, start_angle, end_angle, solid = true) =>
            @ctx.beginPath()
            @ctx.arc x, y, radius, start_angle, end_angle
            if solid then @ctx.fill() else @ctx.stroke()

        clear : =>
            @ctx.save()
            @ctx.globalAlpha = 1
            @ctx.clearRect 0, 0, @width, @height 
            @color @bg
            @rectangle 0, 0, @width, @height
            @ctx.restore()
            
        color : (color) =>
            @ctx.fillStyle = @ctx.strokeStyle = color

        font : (style) =>
            @ctx.font = style

        grid : (x, y, rows, columns, width, height) =>
            row_height = height / rows
            col_width = width / columns

            for i in [0..rows] by 1
                ypos = (round y + i * row_height) + .5
                @line x, ypos, x + width, ypos

            for i in [0..columns] by 1
                xpos = (round x + i * col_width) + .5
                @line xpos, y, xpos, y + height

        line : (x1, y1, x2, y2) =>
            @ctx.beginPath()
            @ctx.moveTo x1, y1
            @ctx.lineTo x2, y2
            @ctx.stroke()

        lineStyle : (line_width = 1.0, joint_style = "round", cap_style = "round") =>
            @ctx.lineWidth = line_width
            @ctx.lineJoin = joint_style
            @ctx.lineCap = cap_style

        path : (point_list, solid = true) =>
            if point_list.length is 0 then return
            @ctx.beginPath()
            @ctx.moveTo point_list[0][0], point_list[0][1]
            @ctx.lineTo p[0], p[1] for p in point_list
            @ctx.closePath()
            if solid then @ctx.fill() else @ctx.stroke()

        point : (x, y, radius, solid = true) =>
            @ctx.beginPath()
            @ctx.arc x, y, radius, 0, Math.TWO_PI, false
            if solid then @ctx.fill() else @ctx.stroke()

        points : (point_list, radius, solid = true) =>
            if point_list.length is 0 then return
            @point p[0], p[1], radius, solid for p in point_list

        polyline : (point_list) =>
            if point_list.length is 0 then return
            @ctx.beginPath()
            @ctx.moveTo point_list[0][0], point_list[0][1]
            @ctx.lineTo p[0], p[1] for p in point_list
            @ctx.stroke()
            @ctx.closePath()

        polygon : (x, y, radius, sides = 3, solid = true) =>
            points = []
            inc = Math.TWO_PI / sides
            for i in [0..sides] by 1
                angle = i * inc
                points.push [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius]

            @path points, solid

        polygonRing : (x, y, inner_radius, outer_radius, inner_sides = 90, outer_sides = 90, solid = true) =>

            p = {x : 0, y : 0}
            inc = Math.TWO_PI / outer_sides

            @ctx.beginPath()

            for n in [0..outer_sides] by 1
                p.x = x + Math.cos(inc * n) * outer_radius
                p.y = y + Math.sin(inc * n) * outer_radius
                if n is 0
                    @ctx.moveTo p.x, p.y
                else
                    @ctx.lineTo p.x, p.y    

            inc = Math.TWO_PI / inner_sides
            for n in [inner_sides..0] by -1
                p.x = x + Math.cos(inc * n) * inner_radius
                p.y = y + Math.sin(inc * n) * inner_radius
                if n is inner_sides
                    @ctx.moveTo p.x, p.y
                else
                    @ctx.lineTo(p.x, p.y)

            if solid then @ctx.fill() else @ctx.stroke()

        randomColor : =>
            return "rgb(" + 
                (Math.floor(Math.random() * 256)).toString() + ',' + 
                (Math.floor(Math.random() * 256)).toString() + ',' +
                (Math.floor(Math.random() * 256)).toString() + ")"

        rectangle : (x, y, width, height, solid = true) =>
            if solid then @ctx.fillRect(x, y, width, height) else @ctx.strokeRect(x, y, width, height)  

        restoreTransform : =>
            @ctx.restore()

        rotate : (theta) =>
            @ctx.rotate theta

        roundedRectangle : (x, y, width, height, corner_radius, solid = true) =>
            @ctx.beginPath();  
            @ctx.moveTo x, y + corner_radius
            @ctx.lineTo x, y + height - corner_radius  
            @ctx.quadraticCurveTo x , y + height, x + corner_radius, y + height  
            @ctx.lineTo x + width - corner_radius, y + height  
            @ctx.quadraticCurveTo x + width, y + height, x + width, y + height - corner_radius  
            @ctx.lineTo x + width, y + corner_radius  
            @ctx.quadraticCurveTo x + width, y , x + width - corner_radius, y
            @ctx.lineTo x + corner_radius, y  
            @ctx.quadraticCurveTo x, y, x, y + corner_radius  
            if solid then @ctx.fill() else @ctx.stroke()

        saveTransform : =>
            @ctx.save()

        scale : (x_scale, y_scale) =>
            @ctx.scale x_scale, y_scale

        text : (x, y, text, solid = true) => 
            if solid then @ctx.fillText(text, x, y) else @ctx.strokeText(text, x, y)

        translate : (x, y) => 
            @ctx.translate x, y
