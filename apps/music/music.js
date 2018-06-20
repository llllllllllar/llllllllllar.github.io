var templateMode = function(mode) {
    var t = `
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-${mode}"></use>
        </svg>
    `
    return t
}

var allSongs = function() {
    var l = e('#id-song-list')
    var s = l.querySelectorAll('.song')
    var songs = []
    var index = 0
    for (var i = 0; i < s.length; i++) {
        var d = s[i].dataset.path
        songs.push(d)
    }
    return songs
}

var bindSwitchSongs = function(audio) {
    bindAll('.song', 'click', function() {
        var self = event.target
        var path = self.dataset.path
        audio.src = path
        bindEventCanplay(audio)
    })
}

var cycleSingle = function(audio) {
    var songs = allSongs()
    var src = audio.src.split('/').slice(-1)[0]
    var index = songs.indexOf(src)
    return songs[index]
}

var loopPlay = function(audio) {
    var songs = allSongs()
    var src = audio.src.split('/').slice(-1)[0]
    var index = songs.indexOf(src)
    index = (index + 1) % songs.length
    return songs[index]
}

var choice = function(array) {
    var a = Math.random()
    a = a * array.length
    var index = Math.floor(a)
    return array[index]
}

var shufflePlay = function() {
    var songs = allSongs()
    var s = choice(songs)
    return s
}

var bindPlayMode = function() {
    var btn = e('#id-play-mode')
    bindEvent(btn, 'click', function(event) {
        var mode = ''
        if (btn.classList.contains('single')) {
            mode = 'loop'
            btn.classList.remove('single')
            btn.classList.toggle('loop')
        } else if (btn.classList.contains('loop')) {
            mode = 'shuffle'
            btn.classList.remove('loop')
            btn.classList.toggle('shuffle')
        } else if (btn.classList.contains('shuffle')) {
            mode = 'single'
            btn.classList.remove('shuffle')
            btn.classList.toggle('single')
        }
        btn.innerHTML = templateMode(mode)
    })
}

var bindMusicSound = function(audio) {
    var btn = e('#id-music-sound')
    bindEvent(btn, 'click', function(event) {
        var mode = ''
        if (btn.classList.contains('sound')) {
            mode = 'mute'
            btn.classList.remove('sound')
            btn.classList.toggle('mute')
            audio.volume = 0
        } else if (btn.classList.contains('mute')) {
            mode = 'sound'
            btn.classList.remove('mute')
            btn.classList.toggle('sound')
            audio.volume = 1
        }
        btn.innerHTML = templateMode(mode)
    })
}

var timeFormat = function(time) {
    var minute = Math.floor(time / 60)
    var second = (time % 60).toFixed(0)
    if (second < 10) {
        second = '0' + second
    }
    var t = `${minute}:${second}`
    return t
}

var showDuration = function(audio){
    var element = e('#id-span-duration')
    audio.addEventListener('canplay', function() {
        var span = element.querySelector('span')
        var d = timeFormat(audio.duration)
        span.innerHTML = d
    })
}

var showCurrentTime = function(audio) {
    var element = e('#id-span-current')
    setInterval(function() {
        var span = element.querySelector('span')
        var c = timeFormat(audio.currentTime)
        span.innerHTML = c
    }, 1000)
}

var bindButtonPlay = function(audio) {
    var btn = e("#id-button-play")
    bindEvent(btn, 'click', function(event) {
        // log('enter the play button event?')
        var mode = ''
        if (audio.paused) {
            mode = 'pause'
            audio.play()
        } else {
            mode = 'play'
            audio.pause()
        }
        btn.innerHTML = templateMode(mode)
    })
}

var bindEventCanplay = function(audio) {
    audio.addEventListener('canplay', function() {
        // log('音乐加载完毕', audio.duration)
        audio.play()
    })
}

var bindEventEnd = function(audio) {
    var btn = e('#id-play-mode')
    audio.addEventListener('ended', function() {
        if (btn.classList.contains('single')) {
            // 单曲循环
            var song = cycleSingle(audio)
        } else if (btn.classList.contains('loop')) {
            // 顺序播放
            var song = loopPlay(audio)
        } else if (btn.classList.contains('shuffle')) {
            // 随机播放
            var song = shufflePlay()
        }
        // var song = playMode()
        log('song', song)
        audio.src = song
    })
}

var time = function(audio) {
    showDuration(audio)
    showCurrentTime(audio)
}

var bindAudioEvents = function(audio) {
    bindEventCanplay(audio)
    bindButtonPlay(audio)
    bindEventEnd(audio)
    bindPlayMode()
    bindMusicSound(audio)
    bindSwitchSongs(audio)
}

var audio = function() {
    var a = e('#id-audio-player')
    time(a)
    bindAudioEvents(a)
}

var __main = function() {
    height()
    audio()
}

__main()
