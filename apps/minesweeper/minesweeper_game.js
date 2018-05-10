var log = console.log.bind(console)

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

/*
###
#*#
###
*/
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
    /*
    array 是一个「包含了『只包含了 0 9 的 array』的 array」
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组

    范例如下, 这是 array
    [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]

    这是标记后的结果
    [
        [1, 9, 2, 1],
        [2, 4, 9, 2],
        [9, 4, 9, 2],
        [2, 9, 2, 1],
    ]

    规则是, 0 会被设置为四周 8 个元素中 9 的数量

    提示：
        这道题比较麻烦, 你要是不会, 就直接写「这道题目我不会」
        这道题目循环调用作业 14 的 markedLine，这道题目不要求写测试

    分步提示：
        1. 先定义一个 clonedSquare 函数，把 array 的内容复制到一个新数组中
        2. 调用 clonedSquare 函数，得到 square
        3. 遍历 square，每次遍历的元素为 line
        4. 遍历 line，调用一个 markAround 函数，传入 square, i, j
        5. 实现 markAround 函数，对于每一个 square[i][j] 这样的元素都按照规则 +1
            分 4 个顶角、4 条边和剩下的元素这几种情形
        6. 两重遍历结束后，square 就是需要的结果，return square 即可。
    */
    /*
    ###
    #*#
    ###
    */
    var square = clonedSquare(array)
    for (var i = 0; i < square.length; i++) {
        var line = square[i]
        for (var j = 0; j < line.length; j++) {
            markAround(square, i, j)
        }
    }
    log('square', square)
    return square
}
var __main = () => {
    var array =
    [
        [0, 9, 0, 0, 9],
        [0, 0, 9, 0, 0],
        [9, 0, 9, 0, 9],
        [0, 9, 0, 0, 0],
        [0, 9, 0, 0, 0],
    ]
    markedSquare(array)
}
__main()
