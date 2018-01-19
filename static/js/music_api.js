// 搜索
// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /music/url 接口传入歌曲 id 获取具体的播放链接
const api_search = (keywords) => {
    const request = {
        method: 'GET',
        url: `http://hanshuai.me:4000/search?keywords=${keywords}`,
        callback: function(response) {
            const data = JSON.parse(response)
            const songs = data.result.songs
            log('data', typeof(data), data)
            for (var i = 0; i < songs.length; i++) {
                const song = songs[i]
                const song_id = song.id
                const song_name = song.name
                const song_duration = song.duration
                const artist_id = song.artists[0].id
                const artist_name = song.artists[0].name
                log('song_id', song_id)
                log('歌名', song_name)
                log('时长', song_duration)
                log('歌手id', artist_id)
                log('歌手名', artist_name)
            }
        }
    }
    ajax(request)
}

// 获取歌曲详情
// 说明 : 调用此接口 , 传入音乐 id, 可获得歌曲详情
const api_song_detail = (id) => {
    const request = {
        method: 'GET',
        url: `http://hanshuai.me:4000/song/detail?ids=${id}`,
        callback: function(response) {
            const data = JSON.parse(response)
            log('data', data)
            const song = data.songs[0]
            const pic_url = song.al.picUrl
            const song_id = song.id
            const song_name = song.name
            const song_duration = song.dt
            const artist_id = song.ar[0].id
            const artist_name = song.ar[0].name
            log('pic_url', pic_url)
            log('song_id', song_id)
            log('song_name', song_name)
            log('song_duration', song_duration)
            log('artist_id', artist_id)
            log('artist_name', artist_name)
        }
    }
    ajax(request)
}

// 获取歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词
const api_lyric = (id) => {
    const request = {
        method: 'GET',
        url: `http://hanshuai.me:4000/lyric?id=${id}`,
        callback: function(response) {
            const data = JSON.parse(response)
            const song_lyric = data.lrc.lyric
            log('song_lyric', song_lyric)
        }
    }
    ajax(request)
}
