const log = console.log.bind(console)

const e = function(selector) {
    return document.querySelector(selector)
}

const es = function (sel) {
    return document.querySelectorAll(sel)
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        log('classname', className, e)
        e.classList.remove(className)
    }
}

const ajax = function(request) {
    /*
    request 是一个 object，有如下属性
        method，请求的方法，string
        url，请求的路径，string
        data，请求发送的数据，如果是 GET 方法则没有这个值，string
        callback，响应回调，function
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

const transformXPercent = (x) => {
    var t = `transform:translateX(${x}%)`
    return t
}

const transformXPx = (x) => {
    var t = `transform:translateX(${x}px)`
    return t
}

const transformYPercent = (y) => {
    var t = `transform:translateY(${y}%)`
    return t
}

const isFirefox = () => {
    if (navigator.userAgent.indexOf('Firefox') > -1) {
        return true
    }
    return false
}

const timerFormat = (s, slide) => {
    if(slide) {
        s = s / slide
    }
    const min = Math.floor(s / 60)
    var sec = Math.floor(s % 60)
    if (sec < 10) {
        sec = '0' + sec
    }
    return min + ':' + sec
}

const guasync = (callback) => {
    // setTimeout 函数一定会把第一个参数放在后台去执行
    setTimeout(() => {
        callback()
    }, 0)
}
