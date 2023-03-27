/**
 * 不用代理B
 */
var Flower = function(){};

var xiaoming = {
    sendFlower: function(target){
        var flower = new Flower();
        target.receiveFlower(flower);
    }
}

var A = {
    receiveFlower: function(flower){
        console.log('收到花' + flower)
    }
}

xiaoming.sendFlower(A);

/**
 * 加入代理B
 */

// ...
var B = {
    receiveFlower: function(flower){
        A.receiveFlower(flower);
    }
}

xiaoming.sendFlower(B);

/**
 * 代理B发挥用处了
 */
 var A = {
    receiveFlower: function(flower){
        console.log('收到花' + flower)
    },
    listenGoodMood: function(fn){
        // 假设10s条件后心情变化
        setTimeout(() => {fn()}, 10000)
    }
}

var B = {
    receiveFlower: function(flower){
        A.listenGoodMood(() => {
            A.receiveFlower(flower);
        })
    }
}

xiaoming.sendFlower(B);

/**
 * 图片预加载
 */

var myImage = (function(){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc: function(src){
            imgNode.src = src;
        }
    }
})()

// 引入代理对象proxy，避免页面空白 - 图片被加载好之前会出现菊花图loading.gif占位

var proxyImage = (function(){
    var img = new Image;
    img.onload = function(){
        myImage.setSrc(img.src);
    }
    return {
        setSrc: function(src){
            // 加载本地占位
            myImage.setSrc('file://C:/Users/loading.gif');
            // Image对象去异步加载真正的图片-加载完成后通过onload顶替myImage
            img.src = src;
        }
    }
})()

proxyImage.setSrc('http://xxx/x.png');

/**
 * 代理对象合并http请求
 */

var synchronousFile = function(id){
    console.log('开始同步文件,id为:' + id);
};

var proxySynchronousFile = (function(){
    var cache = [], timer;
    return function(id){
        // 保证不会覆盖已经启动的定时器
        if(timer){
            return;
        }

        timer = setTimeout(function(){
            synchronousFile(id);
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        },2000)
    }
})()

var checkbox = document.getElementsByTagName('input');
for(var i = 0, c; c = checkbox[i++];){
    c.onclick = function(){
        if(this.checked === true){
            proxySynchronousFile(this.id)
        }
    }
}

/**
 * 惰性加载console.js工具类
 */
var cache = [];

// 未加载真正console.js之前的代码
var miniConsole = {
    log: function(){
        var args = arguments;
        cache.push(function(){
            return miniConsole.log.apply(miniConsole, args);
        })
    }
}

miniConsole.log(1);

// 用户按下F2，开始加载真正的miniConsole.js
document.body.addEventListener('keydown', (ev) => {
    if(ev.code === 113){
        var script = document.createElement('script');
        script.onload = function(){
            for(var i = 0, fn; fn = cache[i++];){
                fn();
            }
        }
        script.src = 'miniConsole.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}, false);

// 真正的miniConsole.js代码
miniConsole = {
    log: function(){
        // 真正的代码略
        console.log(Array.prototype.join.call(arguments));
    }
}

/**
 * 缓存代理(脑补耗时计算过程)
 */

// 乘积算法
var mult = function(){
    var a = 1;
    for(var i = 0, l = arguments.length; i < l; i++ ){
        a = a*arguments[i];
    }
    return a;
}

// 累加算法
var plus = function(){
    var a = 1;
    for(var i = 0, l = arguments.length; i < l; i++ ){
        a = a+arguments[i];
    }
    return a;
}

// 缓存代理包裹
var createProxyFactory = function(fn){
    var cache = {};
    return function(){
        var args = Array.prototype.join.call(arguments, ',');
        if(args in cache){
            return cache[args];
        }
        return cache[args] = fn.apply(this.arguments);
    }
}

var proxyMult = createProxyFactory(mult);
var proxyPlus = createProxyFactory(plus);