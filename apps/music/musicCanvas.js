var audioVisualized = function() {
    var aC = new window.AudioContext()
    var canvas = e('#id-canvas-background')
    var canvasCtx = canvas.getContext('2d')
    var audio = e('audio')
    var source = aC.createMediaElementSource(audio)
    var analyser = aC.createAnalyser()
    source.connect(analyser)
    analyser.connect(aC.destination)
    var draw = function() {
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
audioVisualized()

// var canvasDraw = function() {
//     var canvas = e('#id-canvas-background')
//     var context = canvas.getContext('2d')
//     var cwidth = canvas.width
//     var cheight = canvas.height
//     context.clearRect(0, 0, cwidth, cheight)
//     context.fillStyle = '#ff0000'
//     context.beginPath
//     context.arc(10, 10, 9, 0, 2 * Math.PI, false)
//     context.stroke()
//     // context.save()
// }
// audioVisualized()
// canvasDraw()
// class audioVisualized {
//     constructor() {
//         this.initCanvas()
//         this.initAudioC()
//     }
//     initCanvas() {
//         this.canvas = e('#id-canvas-background')
//         this.context = canvas.getContext('2d')
//         this.cwidth = this.canvas.width
//         this.cheight = this.canvas.height
//     }
//     initAudioC() {
//         this.audio = e('audio')
//         this.audioCtx = new AudioContext()
//         this.source = this.audioCtx.createMediaElementSource(this.audio)
//         this.gainNode = this.audioCtx.createGain()
//
//         this.analyser = this.audioCtx.createAnalyser()
//         this.analyser.smoothingTimeConstant = 0.92
//         this.analyser.fftSize = 2048
//         this.analyser.minDecibels = -125
//         this.analyser.maxDecibels = -10
//
//         this.source.connect(this.gainNode)
//         this.gainNode.connect(this.analyser)
//         this.analyser.connect(this.audioCtx.destination)
//
//         this.gainNode.gain.value = this.volume
//         this.freqData = new Uint8Array(this.analyser.frequencyBinCount)
//         this.analyser.getByteFrequencyData(this.freqData)
//     }
// }
