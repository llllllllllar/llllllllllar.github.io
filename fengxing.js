var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        log(s)
    } else {
        return element
    }
    return element
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    if (elements.length == 0) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        log(s)
    } else {
        return elements
    }
}
var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var addClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.add(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var find = function(element, selector) {
    var e = element.querySelector(selector)
    if (e == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return e
    }
}

var closestClass = function(element, className) {
    var e = element
    while (e != null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

var closestId = function(element, idName) {
    var e = element
    while (e != null) {
        if (e.id == idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

var closestTag = function(element, tagName) {
    var e = element
    while (e != null) {
        if (e.tagName.toUpperCase() == tagName.toUpperCase()) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

var closest = function(element, selector) {
    var c = selector[0]
    if (c == '.') {
        var className = selector.slice(1)
        return closestClass(element, className)
    } else if (c == '#') {
        var idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        var tag = selector
        return closestTag(element, tag)
    }
}

var initElementHeight = function(element, denominator = 1) {
    var intViewportHeight = window.innerHeight
    element.style.height = `${intViewportHeight / denominator}px`
}

var elementHeight = function(element, denominator = 1) {
    initElementHeight(element, denominator)
    window.onresize = resize
    function resize() {
        initElementHeight(element)
    }
}

var initElementWidth = function(element) {
    var intViewportHeight = window.innerWidth
    element.style.width = `${intViewportHeight}px`
}

var elementWidth = function(element) {
    initElementWidth(element)
    window.onresize = resize
    function resize() {
        initElementWidth(element)
    }
}

var height = function() {
    var e1 = e('.container')
    elementHeight(e1)
}
