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
    for (var i = 0; i < s.length; i++) {
        var song = {}
        song.index = i
        song.path = s[i].dataset.path
        song.name = s[i].innerHTML
        songs.push(song)
    }
    return songs
}

var cycleSingle = function(audio) {
    var songs = allSongs()
    var src = audio.src.split('/').slice(-1)[0]
    for (var i = 0; i < songs.length; i++) {
        if (songs[i].path == src) {
            return songs[i]
        }
    }
}

var loopPlay = function(audio) {
    var songs = allSongs()
    var src = audio.src.split('/').slice(-1)[0]
    for (var i = 0; i < songs.length; i++) {
        if (songs[i].path == src) {
            var index = (i + 1) % songs.length
            return songs[index]
        }
    }
}

var loopPlayLast = function(audio) {
    var songs = allSongs()
    var src = audio.src.split('/').slice(-1)[0]
    for (var i = 0; i < songs.length; i++) {
        if (songs[i].path == src) {
            var index = (i + songs.length - 1) % songs.length
            return songs[index]
        }
    }
}

var choice = function(array) {
    var a = Math.random()
    a = a * array.length
    var index = Math.floor(a)
    return array[index]
}

var shufflePlay = function(audio) {
    var songs = allSongs()
    var src = audio.src.split('/').slice(-1)[0]
    for (var i = 0; i < songs.length; i++) {
        if (songs[i].path == src) {
            songs.splice(i, 1)
            var song = choice(songs)
            return song
        }
    }
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
    var span = element.querySelector('span')
    var d = timeFormat(audio.duration)
    span.innerHTML = d
}

var nextSong = function(audio) {
    var btn = e('#id-play-mode')
    if (btn.classList.contains('single')) {
        var song = cycleSingle(audio)
    } else if (btn.classList.contains('loop')) {
        var song = loopPlay(audio)
    } else if (btn.classList.contains('shuffle')) {
        var song = shufflePlay(audio)
    }
    return song
}

var lastSong = function(audio) {
    var btn = e('#id-play-mode')
    if (btn.classList.contains('single')) {
        var song = cycleSingle(audio)
    } else if (btn.classList.contains('loop')) {
        var song = loopPlayLast(audio)
    } else if (btn.classList.contains('shuffle')) {
        var song = shufflePlay(audio)
    }
    return song
}

var songSelected = function(audio) {
    var sel = e('.selected')
    var l = e('#id-song-list')
    var s = l.querySelectorAll('.song')
    var src = audio.src.split('/').slice(-1)[0]
    if (!(sel.dataset.path == audio.src)) {
        for (var i = 0; i < s.length; i++) {
            if (s[i].dataset.path == src) {
                sel.classList.remove('selected')
                s[i].classList.toggle('selected')
            }
        }
    }
}

var bindCurrentTime = function(audio) {
    var element = e('#id-span-current')
    var span = element.querySelector('span')
    bindEvent(audio, 'timeupdate', function(event) {
        var currentTime = Math.floor(audio.currentTime)
        var time = timeFormat(currentTime)
        span.innerHTML = time
    })
}

var progressBar = function(currentTime, duration) {
    var percentage = Math.floor((currentTime / duration) * 100) + "%"
    return percentage
}

var buttonPlay = function(audio) {
    var button = e("#id-button-play")
    var mode = 'pause'
    if (audio.paused) {
        mode = 'pause'
    } else if (audio.readyState == 4) {
        mode = 'play'
    }
    button.innerHTML = templateMode(mode)
}

var playPause = function(audio) {
    if (audio.readyState == 4 && audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
}

var bindButtonPlay = function(audio) {
    var btn = e("#id-button-play")
    bindEvent(btn, 'click', function(event) {
        buttonPlay(audio, btn)
        playPause(audio)
    })
}

var bindTimeUpdate = function(audio) {
    var p = e('#id-song-progress')
    var b = p.querySelector('.bar')
    var btn = e("#id-button-play")
    bindEvent(audio, 'timeupdate', function(event) {
        var c = audio.currentTime
        var d = audio.duration
        var p = progressBar(c, d)
        b.style.width = p
    })
}

var bindMusicSound = function(audio) {
    var btn = e('#id-music-sound')
    var btnIcon = btn.querySelector('#id-icon-sound')
    var btnRange = btn.querySelector('#id-input-sound')
    btnRange.style.display = 'none'
    bindEvent(btnIcon, 'click', function(event) {
        if (btnRange.style.display == 'none') {
            btnRange.style.display = 'inline'
        } else if (btnRange.style.display == 'inline') {
            btnRange.style.display = 'none'
        }
    })
    bindEvent(btnRange, 'input', function(event) {
        var input = event.target
        audio.volume = Number(input.value / 100)
        var mode = 'sound'
        if (audio.volume == 0) {
            mode = 'mute'
        }
        btnIcon.innerHTML = templateMode(mode)
    })
}

var bindPlayMode = function() {
    var btn = e('#id-play-mode')
    bindEvent(btn, 'click', function(event) {
        if (btn.classList.contains('single')) {
            var mode = 'loop'
            btn.classList.remove('single')
            btn.classList.toggle('loop')
        } else if (btn.classList.contains('loop')) {
            var mode = 'shuffle'
            btn.classList.remove('loop')
            btn.classList.toggle('shuffle')
        } else if (btn.classList.contains('shuffle')) {
            var mode = 'single'
            btn.classList.remove('shuffle')
            btn.classList.toggle('single')
        }
        btn.innerHTML = templateMode(mode)
    })
}

var bindButtonNext = function(audio) {
    var btn = e('#id-button-next')
    var name = e('.song-name')
    bindEvent(btn, 'click', function(event) {
        var song = nextSong(audio)
        audio.src = song.path
        name.innerHTML = song.name
        songSelected(audio)
        buttonPlay(audio)
    })
}

var bindButtonLast = function(audio) {
    var btn = e('#id-button-last')
    var name = e('.song-name')
    bindEvent(btn, 'click', function(event) {
        var song = lastSong(audio)
        audio.src = song.path
        name.innerHTML = song.name
        songSelected(audio)
        buttonPlay(audio)
    })
}

var bindswitchSong = function(audio) {
    var name = e('.song-name')
    bindAll('.song', 'click', function() {
        var self = event.target
        var path = self.dataset.path
        audio.src = path
        name.innerHTML = self.innerHTML
        songSelected(audio)
        buttonPlay(audio)
    })
}

var bindEventCanplay = function(audio) {
    bindEvent(audio, 'canplay', function(event) {
        showDuration(audio)
        bindTimeUpdate(audio)
        audio.play()
    })
}

var bindEventEnd = function(audio) {
    bindEvent(audio, 'ended', function(event) {
        var song = nextSong(audio)
        audio.src = song.path
        songSelected(audio)
        audio.play()
    })
}

var bindAudioEvents = function(audio) {
    bindEventCanplay(audio)
    bindEventEnd(audio)
    bindPlayMode()
    bindMusicSound(audio)
    bindCurrentTime(audio)
    bindButtonPlay(audio)
    bindswitchSong(audio)
    bindButtonNext(audio)
    bindButtonLast(audio)
}

var audio = function() {
    var a = e('#id-audio-player')
    bindAudioEvents(a)
}

var __main = function() {
    height()
    audio()
    audioVisualized()
}

__main()
