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