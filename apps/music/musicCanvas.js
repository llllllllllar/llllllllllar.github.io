var audioVisualized = function() {
    var aC = new window.AudioContext()
    var audio = e('audio')
    var source = aC.createMediaElementSource(audio)
    var analyser = aC.createAnalyser()
    source.connect(analyser)
    analyser.connect(aC.destination)
    var draw = function() {
        var canvas = e('#id-canvas-background')
        var canvasCtx = canvas.getContext('2d')
        var cwidth = canvas.width
        var cheight = canvas.height
        var array = new Uint8Array(128)
        analyser.getByteFrequencyData(array)
        canvasCtx.clearRect(0, 0, cwidth, cheight)
        for (var i = 0; i < array.length; i++) {
            canvasCtx.fillStyle = 'rgb(229, 124, 0)'
            canvasCtx.fillRect(i * 3, cheight - array[i], 1, cwidth)
        }
        requestAnimationFrame(draw)
    }
    bindEvent(audio, 'canplaythrough', function() {
        draw()
    })
}
