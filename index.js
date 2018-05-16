var initContainerHeight = () => {
    var intViewportHeight = window.innerHeight
    var container = e('.container')
    var margin = 20
    var containerHeight = intViewportHeight - margin
    container.style.height = `${containerHeight}px`
}

var containerHeight = () => {
    initContainerHeight()
    window.onresize = resize
    function resize() {
        initContainerHeight()
    }
}

var count = () => {
    var i = 0
    return () => {
        if (i < 4) {
            i++
        } else {
            i = 0
        }
        return i
    }
}

var playNextImage = (i) => {
    var element = e('body')
    element.style.backgroundImage = `url(/pics/bg${i}.webp)`
}

var autoPlay = () => {
    var interval = 3500
    var index = count()
    setInterval(function() {
        // 每 3.5s 都会调用这个函数
        playNextImage(index())
    }, interval)
}

var load = () => {
    bindEvent(window, "load", (event) => {
        containerHeight()
        autoPlay()
        log("All resources have finished loading!")
    })
}
var __main = () => {
    load()
}
__main()
