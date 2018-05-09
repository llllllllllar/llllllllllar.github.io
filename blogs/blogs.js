var log = console.log.bind(console)

var e = selector => document.querySelector(selector)

var appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

var bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

var initContainerHeight = () => {
    var intViewportHeight = window.innerHeight
    var container = e('.container')
    container.style.height = `${intViewportHeight}px`
}

var containerHeight = () => {
    initContainerHeight()
    window.onresize = resize
    function resize() {
        initContainerHeight()
    }
}

var bindEvents = () => {

}

var __main = () => {
    containerHeight()
    bindEvents()
}
__main()
