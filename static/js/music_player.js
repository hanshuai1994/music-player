// 找到 audio 标签并赋值给 player
const player = e('#id-audio-player')
const play_pause = e('.play-pause')
const pause_class = play_pause.classList
var interval_mark

const songTemplate = function(index, song_name, artist_name, song_duration) {
    const duration = timerFormat(song_duration, 1000)
    const t = `
        <li class="song-li" data-index=${index}><span>${song_name}<small>${artist_name}</small></span><em>${duration}</em></li>
    `
    return t
}

const input_range = {
    count: true,
}

const song_live = {
    index: 0,
    random: false,
}

// 返回一个不等于 index 的，在 [0, len] 之间的整数
const notPrev = (index, len) => {
    var t = parseInt(Math.random() * len)
    if (t == index) {
        return notPrev(index, len)
    } else {
        return t
    }
}

// 载入 list 对象中，下标为 song_live.index 的歌曲
const loadSong = (list) => {
    const index = song_live.index
    player.src = list[index].song_url
    $('.photo').css('background', 'url(' + list[index].pic_url + ') round')
    $('.infos').find('span').html(list[index].song_name)
    $('.infos').find('small').html(list[index].artist_name)
    const duration = list[index].song_duration
    $('.duration').html(timerFormat(duration, 1000))
}


// 将 list 对象中的所有歌曲，载入歌单
const loadList = (list) => {
    for (var i = 0; i < list.length; i++) {
        const song_name =  list[i].song_name
        const artist_name = list[i].artist_name
        const song_duration = list[i].song_duration
        const song = songTemplate(i, song_name, artist_name, song_duration)
        $('#id-ul-song-list').append(song)
    }
}

const setVolume = (v) => {
    const volume_line = e('.volume_line')
    volume_line.value = v
    player.volume = volume_line.value / 100
}

const showCurrentTime = () => {
    const c = player.currentTime
    const d = player.duration
    const t = timerFormat(c)
    $('.current').html(t)

    // 当计时开关为开时，设置进度条的值
    if (input_range.count) {
        const n = (c / d * 100)
        $('.range').val(n)
    }
}

// 每 1000/2 毫秒运行一次 showCurrentTime 函数
const startInterval = () => {
    interval_mark = setInterval(function () {
        showCurrentTime()
    }, 1000/2);
}

// 给 id 为 id-ul-song-list 的元素下的 a 标签添加一个点击事件

const bindLi = function() {
    $('#id-ul-song-list').click(function(event) {
        const self = event.target
        if (self.classList.contains('song-li')) {
            const index = Number(self.dataset.index)
            song_live.index = index

            // 载入音乐
            if (song_list.length > 0) {
                loadSong(song_list)
            } else {
                loadSong(default_list)
            }
            // 播放
            player.play()
            if ($('.play-pause').hasClass('active')) {
                $('.play-pause').removeClass('active')
            }
            clearInterval(interval_mark)
            startInterval()
        }
    })
}

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
    switchSong(1)
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
    if (song_list.length > 0) {
        var list = song_list
    } else {
        var list = default_list
    }
    // 获取此刻音乐的 index
    var index = song_live['index']

    const len = list.length
    // 如果循环设定为随机，将一个在 [0, len] 之间的随机整数赋值给 index，否则将 index + x 赋值给 index
    if (song_live['random']) {
        index = notPrev(index, len)
    } else {
        index = (index + x + len) % len
    }
    // 设定此刻音乐的 index
    song_live.index = index
    // 载入音乐
    loadSong(list)
    player.play()
    if ($('.play-pause').hasClass('active')) {
        $('.play-pause').removeClass('active')
    }
    clearInterval(interval_mark)
    startInterval()
}

const bindSwitch = () => {
    $('.prev').click(() => {
        switchSong(-1)
    })
    $('.next').click(() => {
        switchSong(1)
    })
}

// 绑定修改音量的事件
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
    bindLi()
    bindePause()
    bindSetTime()
    bindStop()
    bindSwitch()
    bindAdjustVolume()
    bindRandom()
    bindRepeat()
}

const __main = () => {
    if (song_list.length > 0) {
        var list = song_list
    } else {
        var list = default_list
    }
    loadList(list)
    loadSong(list)
    setVolume(60)


    // guasync(() => {
    //     guasync(() => {
    //         loadSong()
    //     })
    // })
    bindEvents()
}

$('.search_button').click(() => {
    const keywords = e('.search_input').value
    log(keywords)
    api_search(keywords)
})

__main()
