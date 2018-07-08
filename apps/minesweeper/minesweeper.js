var random01 = function() {
    var n = Math.random()
    if (n > 0.75) {
        return 1
    } else {
        return 0
    }
}

var randomLine09 = function(n) {
    var line = []
    for (var i = 0; i < n; i++) {
        var r = random01()
        var e = [0, 9][r]
        line.push(e)
    }
    return line
}

var randomSquare09 = function(n) {
    var a = []
    for (var i = 0; i < n; i++) {
        a.push(randomLine09(n))
    }
    return a
}

var clonedSquare = function(array) {
    var l = []
    for (var i = 0; i < array.length; i++) {
        var line = array[i]
        var e = line.slice(0)
        l.push(e)
    }
    return l
}

var plus1 = function(array, x, y) {
    // 1. array[x][y] 不能为 9
    // 2. x 和 y 不能越界
    var n = array.length
    var validX = x >= 0 && x < n
    var validY = y >= 0 && y < n
    if (validX && validY) {
        if (array[x][y] != 9) {
            array[x][y] += 1
        }
    }
}

var markAround = function(array, x, y) {
    if (array[x][y] == 9) {
        // 标记周围 8 个
        // 标记的时候要判断是不是可以标记

        // 先标记左边 3 个
        plus1(array, x - 1, y - 1)
        plus1(array, x - 1, y)
        plus1(array, x - 1, y + 1)

        // 再标记上下两个
        plus1(array, x, y - 1)
        plus1(array, x, y + 1)

        // 最后标记右边 3 个
        plus1(array, x + 1, y - 1)
        plus1(array, x + 1, y)
        plus1(array, x + 1, y + 1)
    }
}

var markedSquare = function(array) {
    var square = clonedSquare(array)
    for (var i = 0; i < square.length; i++) {
        var line = square[i]
        for (var j = 0; j < line.length; j++) {
            markAround(square, i, j)
        }
    }
    return square
}

var templatePuzzle = function(n) {
    var a = randomSquare09(n)
    var s = markedSquare(a)
    log('扫雷答案', s)
    for (var i = 0; i < n; i++) {
        var l = s[i]
        var t1 = `<div id="id-mines-row-${i}" class="mines-row" data-row=${i}></div>`
        var e1 = e('#id-game-box')
        appendHtml(e1, t1)
        for (var j = 0; j < n; j++) {
            var m = l[j]
            if (m == 9) {
                var t2 = `
                    <div class="mines-col mines-boom mask" data-xy=${i}-${j}>
                        <div class="mines-cell" data-num=${m}>&nbsp;</div>
                        <div class="mines-flag"><img src="minesweeper_pics/flag.svg" alt="flag" class="img-flag hide"></div>
                    </div>
                `
            } else if (m == 0) {
                var t2 = `
                    <div class="mines-col mask" data-xy=${i}-${j}>
                        <div class="mines-cell" data-num=${m}>&nbsp;</div>
                        <div class="mines-flag"><img src="minesweeper_pics/flag.svg" alt="flag" class="img-flag hide"></div>
                    </div>
                `
            } else {
                var t2 = `
                    <div class="mines-col mask" data-xy=${i}-${j}>
                        <div class="mines-cell" data-num=${m}>${m}</div>
                        <div class="mines-flag"><img src="minesweeper_pics/flag.svg" alt="flag" class="img-flag hide"></div>
                    </div>
                `
            }
            var e2 = e(`#id-mines-row-${i}`)
            appendHtml(e2, t2)
        }
    }
}

var totalMines = function() {
    var ms = []
    var mcell = es('.mines-cell')
    for (var i = 0; i < mcell.length; i++) {
        if (mcell[i].dataset.num == '9') {
            ms.push(mcell[i])
        }
    }
    return ms.length
}

var totalFlags = function() {
    var fs = []
    var flags = es('.img-flag')
    for (var i = 0; i < flags.length; i++) {
        if (!flags[i].classList.contains('hide')) {
            fs.push(flags[i])
        }
    }
    return fs.length
}

var toggleHide = function(element) {
    if (element.classList.contains('hide')) {
        element.classList.remove('hide')
        element.classList.toggle('show')
    } else {
        element.classList.remove('show')
        element.classList.toggle('hide')
    }
}

var bindContextMenu = function() {
    var box = e('#id-game-box')
    bindEvent(box, 'contextmenu', function(event) {
        event.preventDefault()
        var self = event.target
        if (self.classList.contains('mines-col') || self.classList.contains('mines-cell') || self.classList.contains('mines-flag') || self.classList.contains('img-flag')) {
            var col = self.closest('.mines-col')
            var img = col.querySelector('.img-flag')
            toggleHide(img)
            totalFlags()
        }
    })
}

// var showBlankAround = function() {
//
// }

var bindClick = function() {
    var box = e('#id-game-box')
    bindEvent(box, 'click', function(event) {
        var self = event.target
        if (self.classList.contains('mines-col') || self.classList.contains('mines-cell') || self.classList.contains('mines-flag') || self.classList.contains('img-flag')) {
            log('click start')
            var col = self.closest('.mines-col')
            var cell = col.querySelector('.mines-cell')
            var flag = col.querySelector('.img-flag')
            if (cell.dataset.num == '9') {
                var booms = es('.mines-boom')
                for (var i = 0; i < booms.length; i++) {
                    var boomCell = booms[i].querySelector('.mines-cell')
                    booms[i].classList.remove('mask')
                    booms[i].style.backgroundImage = 'url(minesweeper_pics/boom.svg)'
                    boomCell.style.opacity = '1'
                }
                // alert('boom, you lose')
            } else if (cell.dataset.num == '0') {
                var row = self.closest('.mines-row')
                col.classList.remove('mask')
                cell.style.opacity = '1'
                // showBlankAround()
                log('col.dataset.xy', col.dataset.xy)

            } else if (flag.classList.contains('show')) {

            } else {
                col.classList.remove('mask')
                cell.style.opacity = '1'
            }
            // else if (!flag.classList.contains('hide')) {
            //
            // }
        }
    })
}

var initPuzzles = function() {
    templatePuzzle(16)
}

var bindEvents = function() {
    bindContextMenu()
    bindClick()
}

var __main = function() {
    height()
    initPuzzles()
    bindEvents()
    totalMines()
}
__main()
