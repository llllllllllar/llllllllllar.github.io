var height = () => {
    var e1 = e('.container')
    elementHeight(e1)
}
var templateApp = (appCn, appEn) => {
    var t = `
        <div class="link-text fengxing-float-left"><a href="/apps/${appEn}/${appEn}.html">${appCn}<br/>${appEn}</a></div>
    `
    return t
}
var insertApp = () => {
    var linkBox = e('.link-box')
    var a1 = ['音乐', '广州三天天气', '待办事项']
    var a2 = ['music', 'weather', 'todo']
    for (var i = 0; i < a1.length; i++) {
        var html = templateApp(a1[i], a2[i])
        appendHtml(linkBox, html)
    }
}

var __main = () => {
    height()
    insertApp()
}
__main()
