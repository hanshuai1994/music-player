var log = console.log.bind(console)

var fs = require('fs')

const sendHtml = (path, response) => {
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, (error, data) => {
        // console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

const sendList = (response) => {
    // readdir 读取文件夹并以函数的形式返回所有文件
    // 我们的音乐都放在 audios 文件夹中
    fs.readdir('static/audios', function(error, files) {
        response.send(files)
    })
}

var music = {
    path: '/music',
    method: 'get',
    func: (request, response) => {
        var path = 'music-player.html'
        sendHtml(path, response)
    }
}

var routes = [
    music,
]

module.exports.routes = routes
