var initElementWidth = (element) => {
    var w = window.screen.width
    if (w > 600) {
        element.style.width = `600px`
    } else {
        element.style.width = `${w}px`
    }
}


var weatherWidth = () => {
    var e1 = e('#main')
    var e2 = e('#weather')
    var e3 = e('#id-nav-box')
    elementWidth(e1)
    elementWidth(e2)
    elementWidth(e3)
}

var ajax = (method, path, data, callback) => {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            callback(r.response)
        }
    }
    data = JSON.stringify(data, null, 2)
    r.send(data)
}

var weatherGet = (location) => {
    var method = 'GET'

    var url = 'https://free-api.heweather.com/s6/weather/forecast?location='
    var key = 'd662c1ab6725449a81156946da80879c'
    var path = url + location + '&key=' + key

    var data = ''
    ajax(method, path, data, function(r){
        log('获取和风天气三天数据')
        var data = JSON.parse(r)
        showChart(data)
        insertWeatherAll(data)
    })
}

var cleanData = (data) => {
    var all = data.HeWeather6[0]
    var location = all.basic.location
    var date = []
    var tmpMax = []
    var tmpMin = []
    var day = []
    var night = []
    var icoDay = []
    var icoNight = []
    var len = all.daily_forecast.length
    for (var i = 0; i < len; i++) {
        var daily = all.daily_forecast[i]
        date.push(daily.date)
        var max = daily.tmp_max
        var min = daily.tmp_min
        tmpMax.push(Number(max))
        tmpMin.push(Number(min))
        var conDay = daily.cond_txt_d
        var conNig = daily.cond_txt_n
        day.push(conDay)
        night.push(conNig)
        var icoD = daily.cond_code_d
        var icoN = daily.cond_code_n
        icoDay.push(icoD)
        icoNight.push(icoN)
    }
    var obj = {
        'location': location,
        'date': date,
        'tmpMax': tmpMax,
        'tmpMin': tmpMin,
        'day': day,
        'night': night,
        'icoDay': icoDay,
        'icoNight': icoNight,
    }
    return obj
}

var insertWeather = (id, date, day, icoDay, night, icoNight) => {
    var html = `
        <div data-id="${id}" class="weather-box">
            <div>${date}</div>
            <div class="weather-display">日间天气<br>${day}<br><img src="https://cdn.heweather.com/cond_icon/${icoDay}.png" alt="${day}"></div>
            <div class="weather-display">夜间天气<br>${night}<br><img src="https://cdn.heweather.com/cond_icon/${icoNight}.png" alt="${night}"></div>
        </div>
    `
    var element = e('#weather')
    appendHtml(element, html)
}

var insertWeatherAll = (data) => {
    var object = cleanData(data)
    var len = object.date.length
    var date = object.date
    var day = object.day
    var icoDay = object.icoDay
    var night = object.night
    var icoNight = object.icoNight
    for (var i = 0; i < len; i++) {
        insertWeather(i, date[i], day[i], icoDay[i], night[i], icoNight[i])
    }
}

var showChart = (data) => {
    var element = e('#main')
    var myChart = echarts.init(element)
    var object = cleanData(data)
    var option = {
        title: {
            text: '',
            subtext: '气温'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['最高气温','最低气温']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name:'最高气温',
                type:'line',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'最低气温',
                type:'line',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
        ]
    };
    option.title.text = object.location
    option.xAxis.data = object.date
    option.series[0].data = object.tmpMax
    option.series[1].data = object.tmpMin
    myChart.setOption(option)
}

var __main = () => {
    weatherWidth()
    weatherGet('guangzhou')
}
__main()
