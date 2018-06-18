var slideHeight = () => {
    var e1 = e('.fengxing-slide')
    elementHeight(e1)
}

var slideWidth = () => {
    var e1 = e('.fengxing-slide')
    elementWidth(e1)
}

var nextIndex = (slide, offset) => {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    var i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

var bindEventSlide = () => {
    var selector = '.fengxing-slide-button'
    bindAll(selector, 'click', (event) => {
        var button = event.target
        // 找到 slide div
        var slide = button.parentElement
        // 求出下一张图片的 index
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

var switchIndicator = (slide, index) => {
    var nextIndex = index
    slide.dataset.active = nextIndex
    // 切换小圆点
    // 1. 删除当前小圆点的 class
    removeClassAll('fengxing-white')
    // 2. 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indi = e(indiSelector)
    indi.classList.add('fengxing-white')
}

var showImageAtIndex = (slide, index) => {
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'fengxing-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-fengxingimage-' + String(nextIndex)
    // 使用 e 函数可以得到一个元素, 参数是选择器(字符串)
    var img = e(nextSelector)
    img.classList.add(className)
    switchIndicator(slide, index)
}

var bindEventIndicator = () => {
    var selector = '.fengxing-slide-indi'
    bindAll(selector, 'mouseover', (event) => {
        var self = event.target
        var index = Number(self.dataset.index)
        // 直接播放第 n 张图片
        var slide = self.closest('.fengxing-slide')
        showImageAtIndex(slide, index)
    })
}

var bindClickIndicator = () => {
    var selector = '.fengxing-slide-indi'
    bindAll(selector, 'click', (event) => {
        var self = event.target
        var index = Number(self.dataset.index)
        // 直接播放第 n 张图片
        var slide = self.closest('.fengxing-slide')
        showImageAtIndex(slide, index)
    })
}

// var count = () => {
//     var i = 4
//     return () => {
//         if (i < 4) {
//             i++
//         } else {
//             i = 0
//         }
//         return i
//     }
// }

// var switchImage = (i) => {
//     var element = e('body')
//     element.style.backgroundImage = `url(/pics/bg${i}.webp)`
// }

var playNextImage = () => {
    var slide = e('.fengxing-slide')
    // 求出下一张图片的 index
    var index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}

var autoPlay = () => {
    var interval = 3500
    // var index = count()
    setInterval(() => {
        // 每 3.5s 都会调用这个函数
        // switchImage(index())
        playNextImage()
    }, interval)
    // switchImage(index())
}

var __main = () => {
    height()
    slideHeight()
    slideWidth()
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}
__main()
