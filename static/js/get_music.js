var files = []

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
            files = JSON.parse(response)
            // map 是对 files 里面的每个元素调用 songTemplate 并且用结果生成一个新列表
            const songs = files.map(songTemplate)
            // 找到 id 为 id-ul-song-list 的元素并把上面生成的列表添加进去
            $('#id-ul-song-list').append(songs)
        }
    }
    ajax(request)
}
