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
var __main = () => {
    containerHeight()
}
__main()
