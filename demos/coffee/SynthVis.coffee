define ['renderer'], (Renderer) ->
    class SynthesisVisualization extends Renderer
        init : () ->
            AudioContext = window.AudioContext or window.webkitAudioContext
            if AudioContext?
                @audioCtx = new AudioContext()
                @oscillator = @audioCtx.createOscillator()
                @gain = @audioCtx.createGain()
                @analyzer = @audioCtx.createAnalyser()
                @oscillator.connect @analyzer
                @analyzer.connect @gain
                @gain.connect @audioCtx.destination
                @freqData = new Uint8Array(@analyzer.frequencyBinCount)
                @stepInterval = 5
                @oscillator.start 0
                @playing = true
            @bg = "#222222"

        step : () ->
            if @audioCtx? and @stepCount % @stepInterval is 0 and @playing
                @gain.gain.value = Math.clamp(Math.transpose(@mouseY, 0, @height, 1, 0), 0, 1)
                @oscillator.frequency.value = Math.clamp(Math.transpose(@mouseX, 0, @width, 20, 2000), 20, 2000)
                @analyzer.getByteFrequencyData @freqData

        render : () ->
            @color "#dddddd"
            if @audioCtx? 
                @text 10, 20, "x: frequency " + Math.roundTo @oscillator.frequency.value, 2
                @text 10, 35, "y: amplitude " + Math.roundTo @gain.gain.value, 2
                @text 10, 50, "Click to toggle playback"
                if @playing
                    for x in [0..@freqData.length * .5]
                        value = @freqData[x] * 1.55555 
                        @rectangle x * 10, @height - value, 3, value 
            else 
                @color "#ff0000"
                @text 20, 20, "AudioContext not available in this browser" 

        onMouseDown : (x, y) ->
            if @playing 
                @gain.gain.value = 0
            else 
                @gain.gain.value = 1 
            @playing = !@playing


