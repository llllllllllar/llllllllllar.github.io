var foo = () => {
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
    var index = foo()
    setInterval(function() {
        // 每 3.5s 都会调用这个函数
        playNextImage(index())
    }, interval)
}
var __main = () => {
    autoPlay()
}
__main()
