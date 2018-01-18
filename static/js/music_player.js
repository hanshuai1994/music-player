// 找到 audio 标签并赋值给 player
const player = e('#id-audio-player')
const play_pause = e('.play-pause')
const pause_class = play_pause.classList
var interval_mark

const input_range = {
    count: true,
}

const song_live = {
    index: 0,
    random: false,
}

const notPrev = (index, len) => {
    var t = parseInt(Math.random() * len)
    if (t == index) {
        return notPrev(index, len)
    } else {
        return t
    }
}

const loadSong = () => {
    const file = files[song_live['index']]
    player.src = 'audios/' + file
}

const setDuration = () => {
    player.addEventListener('canplay', () => {
        const duration = e('.duration')
        const range = e('.range')
        const d = player.duration
        const t = timerFormat(d)
        duration.innerHTML = t

        clearInterval(interval_mark)
        startInterval()
    })
}

const showCurrentTime = () => {
    const current = e('.current')
    const c = player.currentTime
    const d = player.duration

    const t = timerFormat(c)
    current.innerHTML = t

    if (input_range.count) {
        const n = (c / d * 100)
        const range = e('.range')
        range.value = n
    }
}

const startInterval = () => {
    interval_mark = setInterval(function () {
        showCurrentTime()
    }, 1000/2);
}

// 给 id 为 id-ul-song-list 的元素下的 a 标签添加一个点击事件
$('#id-ul-song-list').on('click', 'a', function() {
    // self 是被点击的 a 标签, 套路
    var self = $(this)
    // 生成音乐文件的路径
    var filepath = 'audios/' + self.text()
    // var filepath = 'audios/' + self.text()
    // 设置为 player 的当前音乐
    player.src = filepath
    // 播放
    player.play()
    if ($('.play-pause').hasClass('active')) {
        $('.play-pause').removeClass('active')
    }
    setDuration()
})

const bindePause = () => {
    play_pause.addEventListener('click', () => {
        if ($('.play-pause').hasClass('active')) {
            player.play()
            startInterval()
        } else {
            player.pause()
            clearInterval(interval_mark)
        }
        $('.play-pause').toggleClass('active')
    })
}

player.addEventListener('ended', () => {
    clearInterval(interval_mark)
    const x = 1
    switchSong(x)
})

const bindSetTime = () => {
    const range = e('.range')
    range.addEventListener('mousedown', () => {
        input_range.count = false
    })
    range.addEventListener('mouseup', () => {
        const v = range.value
        const d = player.duration
        const t = d * v / 100
        player.currentTime = t
        input_range.count = true
    })
}

const bindStop = () => {
    const stop = e('.stop')
    const range = e('.range')

    stop.addEventListener('click', () => {
        player.currentTime = 0
        range.value = 0
        $('.current').html('0:00')
        if (!$('.play-pause').hasClass('active')) {
            $('.play-pause').toggleClass('active')
            clearInterval(interval_mark)
            player.pause()
        }
    })
}

const switchSong = (x) => {
    var index = song_live['index']
    const len = files.length
    if (song_live['random']) {
        index = notPrev(index, len)
        log(index)
    } else {
        index = (index + x + len) % len
    }
    song_live['index'] = index
    loadSong()
    setDuration()
    player.play()
    if ($('.play-pause').hasClass('active')) {
        $('.play-pause').removeClass('active')
    }
}

const bindSwitch = () => {
    $('.prev').click(() => {
        const x = -1
        switchSong(x)
    })
    $('.next').click(() => {
        const x = 1
        switchSong(x)
    })
}

const bindAdjustVolume = () => {
    const volume = e('.volume')
    $('.volume').mouseover(() => {
        $('.volume_div').removeClass('hide')
    })
    $('.volume').mouseleave(() => {
        setTimeout(() => {
            $('.volume_div').addClass('hide')
        }, 3000)
    })

    const volume_line = e('.volume_line')
    volume_line.addEventListener('mousemove', () => {
        player.volume = volume_line.value / 100
    })
}

const bindRandom = () => {
    const random = e('.random')
    random.addEventListener('click', () => {
        if (random.classList.contains('active')) {
            random.classList.remove('active')
            song_live['random'] = false
        } else {
            random.classList.add('active')
            song_live['random'] = true
        }
    })
}

const bindRepeat = () => {
    $('.repeat').click(() => {
        const range = e('.range')
        player.currentTime = 0
        range.value = 0
        $('.current').html('0:00')
    })
}

const bindEvents = () => {
    bindePause()
    bindSetTime()
    bindStop()
    bindSwitch()
    bindAdjustVolume()
    bindRandom()
    bindRepeat()
}

const __main = () => {
    getList()
    guasync(() => {
        guasync(() => {
            loadSong()
        })
    })
    bindEvents()
}

__main()
