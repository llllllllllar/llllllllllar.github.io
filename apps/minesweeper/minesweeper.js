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

var templatePuzzle = function(dyadicArray, n) {
    for (var i = 0; i < n; i++) {
        var l = dyadicArray[i]
        var t1 = `<div id="id-mines-row-${i}" class="mines-row" data-row=${i}></div>`
        var e1 = e('#id-game-box')
        appendHtml(e1, t1)
        for (var j = 0; j < n; j++) {
            var m = l[j]
            if (m == 9) {
                var t2 = `
                    <div class="mines-col mines-boom mask" data-col=${j}>
                        <div class="mines-cell" data-num=${m}>&nbsp;</div>
                        <div class="mines-flag"><img src="minesweeper_pics/flag.svg" alt="flag" class="img-flag hide"></div>
                    </div>
                `
            } else if (m == 0) {
                var t2 = `
                    <div class="mines-col mask" data-col=${j}>
                        <div class="mines-cell" data-num=${m}>&nbsp;</div>
                        <div class="mines-flag"><img src="minesweeper_pics/flag.svg" alt="flag" class="img-flag hide"></div>
                    </div>
                `
            } else {
                var t2 = `
                    <div class="mines-col mask" data-col=${j}>
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

var mineSweeper = function(n) {
    var a = randomSquare09(n)
    var s = markedSquare(a)
    log('扫雷答案', s)
    templatePuzzle(s, n)
    bindEvents(s, n)
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
            if (col.classList.contains('mask')) {
                toggleHide(img)
                totalFlags()
            }
        }
    })
}

var removeMask = function(cellbox, cell) {
    if (cellbox.classList.contains('mask')) {
        cellbox.classList.remove('mask')
        cell.style.opacity = '1'
    }
}

var checkEdge = function(x, y, rows, cols) {
    return x >= 0 && x < cols && y >= 0 && y < rows
}

var locateCell = function(x, y) {
    var rows = es('.mines-row')
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].dataset.row == `${x}`) {
            var cols = rows[i].querySelectorAll('.mines-col')
            for (var j = 0; j < cols.length; j++) {
                if (cols[j].dataset.col == `${y}`) {
                    var cell = cols[j].querySelector('.mines-cell')
                    return cell
                }
            }
        }
    }
}

var anotherBlank = function(cell, rows, cols) {
    if (cell.dataset.num == '0') {
        var r = cell.closest('.mines-row')
        var c = cell.closest('.mines-col')
        var x2 = Number(r.dataset.row)
        var y2 = Number(c.dataset.col)
        showBlankAround(x2, y2, rows, cols)
    } else {
        return
    }
}

var showBlank = function(x, y, rows, cols) {
    var c = locateCell(x, y)
    log('cell', c)
    if (c.dataset.num != '9') {
        var cb = c.closest('.mines-col')
        removeMask(cb, c)
        anotherBlank(c, rows, cols)
    }
}

var showBlankAround = function(x, y, rows, cols) {
    if (checkEdge(x, y, rows, cols)) {
        showBlank(x - 1, y - 1)
        showBlank(x - 1, y)
        showBlank(x - 1, y + 1)

        // 再标记上下两个
        showBlank(x, y - 1)
        showBlank(x, y + 1)

        // 最后标记右边 3 个
        showBlank(x + 1, y - 1)
        showBlank(x + 1, y)
        showBlank(x + 1, y + 1)
    }
}

var bindClick = function(s, n) {
    var box = e('#id-game-box')
    // var openedCell = 0
    bindEvent(box, 'click', function(event) {
        var self = event.target
        var condition = self.classList.contains('mines-col') || self.classList.contains('mines-cell') || self.classList.contains('mines-flag') || self.classList.contains('img-flag')
        if (condition) {
            log('bindClick ===> click cell')
            var col = self.closest('.mines-col')
            var cell = col.querySelector('.mines-cell')
            var flag = col.querySelector('.img-flag')
            if (cell.dataset.num == '9') {
                var booms = es('.mines-boom')
                for (var i = 0; i < booms.length; i++) {
                    var boomCell = booms[i].querySelector('.mines-cell')
                    booms[i].style.backgroundImage = 'url(minesweeper_pics/boom.svg)'
                    removeMask(booms[i], boomCell)
                }
                // alert('boom, you lose')
            } else if (cell.dataset.num == '0') {
                removeMask(col, cell)
                var row = self.closest('.mines-row')
                var x = Number(row.dataset.row)
                var y = Number(col.dataset.col)
                log('dataset', x, y)
                showBlankAround(x, y, n, n)
            } else if (flag.classList.contains('show')) {

            } else {
                removeMask(col, cell)
            }
        }
    })
}

// var bindButtonClick = function() {
//     var btn = e('#id-game-restart')
//     bindEvent(btn, 'click', function() {
//         initPuzzles()
//     })
// }
var initPuzzles = function() {
    mineSweeper(12)
}

var bindEvents = function(s, n) {
    bindContextMenu(s, n)
    bindClick(s, n)
    // bindButtonClick()
}

var __main = function() {
    height()
    initPuzzles()

    totalMines()
}
__main()
