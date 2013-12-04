define ['renderer'], (Renderer) ->
    class ImageBasics extends Renderer
        init : ->
            console.log Image
            @img = new Image()
            @img.addEventListener('load', @onImageLoad)
            @img.src = 'http://24.media.tumblr.com/71a5b5ad517988f25b257d36be093316/tumblr_mw9w2ck3Ot1t1a31uo2_1280.jpg'

        render : ->
            @ctx.drawImage @img, 0, 0, 960, 540

        onImageLoad : (event) =>
            console.log @img.width, 'x', @img.height, @img.data
