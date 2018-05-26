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
    for (var i = 0; i < n; i++) {
        var l = s[i]
        var t1 = `<div id="id-mines-row-${i}" class="mines-row" data-x=${i}></div>`
        var e1 = e('#id-game-box')
        appendHtml(e1, t1)
        for (var j = 0; j < n; j++) {
            var m = l[j]
            // if (m == 9) {
            //     var t2 = `
            //         <div id="id-mines-col-${j}" class="mines-col img-boom mask" data-col=${j}>
            //             <span>&nbsp;</span>
            //             <img src="minesweeper_pics/flag.svg" alt="flag" class="img-flag hide">
            //         </div>
            //     `
            // } else if (m == 0) {
            //     var t2 = `
            //         <div id="id-mines-col-${j}" class="mines-col mask" data-col=${j}>
            //             <span>&nbsp;</span>
            //             <img src="minesweeper_pics/flag.svg" alt="flag" class="img-flag hide">
            //         </div>
            //     `
            // } else {
            //     var t2 = `
            //         <div id="id-mines-col-${j}" class="mines-col mask" data-col=${j}>
            //             <span>${m}</span>
            //             <img src="minesweeper_pics/flag.svg" alt="flag" class="img-flag hide">
            //         </div>
            //     `
            // }
            var t2 = `
                <div id="id-mines-col-${j}" class="mines-col mask" data-y=${j}>
                    <span>${m}</span>
                    <img src="minesweeper_pics/flag.svg" alt="flag" class="img-flag hide">
                </div>
            `
            var e2 = e(`#id-mines-row-${i}`)
            appendHtml(e2, t2)

            // hoverPuzzle(x, y)
        }
    }
}

// var puzzle = (n) {
//     var a = randomSquare09(n)
//     var s = markedSquare(a)
//     for (var i = 0; i < n; i++) {
//         var l = s[i]
//         for (var i = 0; i < n; i++) {
//             var m = l[j]
//             if (m == 9) {
//                 var e1 = e('mines-col')
//
//             }
//         }
//     }
// }


var hoverPuzzle = function() {
    // bindAll('.mines-col', 'mouseover', () {
    //     removeClassAll('mask')
    // })
    // bindAll('.mines-col', 'mouseout', () {
    //     addClassAll('mask')
    // })
    // for (var i = 0; i < array.length; i++) {
    //     array[i]
    // }

}
var initPuzzles = function() {
    templatePuzzle(12)
    // var btn = e(`#id-game-level-easy`)
    // bindEvent(btn, 'click', () {
    //     var gameBox = e('#id-game-box')
    //     if () {
    //         templatePuzzle(9)
    //     } else {
    //
    //     }
    // })
}

var gameLevel = function(level) {

}

var bindEvents = function() {
    hoverPuzzle()
}

var __main = function() {
    height()
    initPuzzles()
    bindEvents()
}
__main()
