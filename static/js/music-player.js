// 找到 audio 标签并赋值给 player
var player = e('#id-audio-player')

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
})


// 给 id 为 id-audio-player 的元素也就是我们的 audio 标签添加一个事件 ended
// 这样在音乐播放完之后就会调用第二个参数(一个匿名函数)
$("#id-audio-player").on('ended', function() {
    log("播放结束, 当前播放模式是", playMode)
    // 如果播放模式是 loop 就重新播放
    if (playMode == 'loop') {
        player.play()
    } else {
        log('mode', playMode)
    }
})

const songTemplate = function(song) {
    const t = `
        <li class="gua-song">
            <a href="#">${song}</a>
        </li>
    `
    return t
}

const getList = () => {
    const request = {
        method: 'GET',
        url: '/music/music_list',
        callback: function(response) {
            const files = JSON.parse(response)
            // map 是对 files 里面的每个元素调用 songTemplate 并且用结果生成一个新列表
            var songs = files.map(songTemplate)
            // 找到 id 为 id-ul-song-list 的元素并把上面生成的列表添加进去
            $('#id-ul-song-list').append(songs)
        }
    }
    ajax(request)
}

window.onload = function() {
    getList()
}
