/**
 * 通用实现
 */
let commonEvent = {
    clientList: [],
    // 监听
    listen: (key, fn) => {
        if(!this.clientList[key]){
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
    },
    // 触发广播
    trggier: () => {
        let key = Array.prototype.shift.call(arguments);
        let fns = this.clientList[key];
        if(!fns || fns.length === 0){
            return false;
        }
        for(let i = 0; i < fns.length; i++){
            const fn = fns[i];
            fn.apply(this, arguments);
        }
    },
    // 取消订阅
    remove: (key, fn) => {
        const fns = this.clientList[key];

        if(!fns){
            return false;
        }

        if(!fn){
            // 没有传入取消订阅的函数，默认取消所有
            fns && (fns.length = 0);
        } else {
            for(let l = fns.length - 1; l >= 0; l--){
                const _fn = fns[l];
                if(_fn === fn){
                    // 删除此回调函数
                    fns.splice(l, 1);
                }
            }
        }
    }
}

// 配置一个install函数让对象可以动态安装发布-订阅功能
const installEvent = (obj) => {
    for(let i in obj){
        obj[i] = commonEvent[i];
    }
}

const salesOffices = {};
installEvent(salesOffices);

const callback = (price) => {
    console.log('价格='+price);
}

salesOffices.listen('square88', callback)

salesOffices.trggier('square88', 10000); // 输出10000

salesOffices.remove('square88', callback);

/**
 * 网站登录的示例
 */

// 直接依赖具体实现来完成
login.success((data) => {
    header.setAvatar(data.avatar);
    navigator.setAvatar(data.avatar);
    message.refresh();
    // 新的地址模块也需要关注登录成功与否 -> 需要修改代码
    address.refresh();
})

// 重构之后
$.ajax('http://xxx.com?login', (data) => {
    login.trigger('loginSuccess', data);
})

const header = (function(){
    login.listen('loginSuccess', (data) => {
        header.setAvatar(data.avatar);
    })
    return {
        setAvatar: function(data){
            console.log('设置header模块的头像')
        }
    }
})();

const nav = (function(){
    login.listen('loginSuccess', (data) => {
        nav.setAvatar(data.avatar);
    })
    return {
        setAvatar: function(data){
            console.log('设置nav模块的头像')
        }
    }
})();

/**
 * 全局Event
 */

let Event = (function(){
    var clientList = {},listen,trigger,remove;

    listen = (key, fn) => {
        if(!this.clientList[key]){
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
    };

    // 触发广播
    trggier = () => {
        let key = Array.prototype.shift.call(arguments);
        let fns = this.clientList[key];
        if(!fns || fns.length === 0){
            return false;
        }
        for(let i = 0; i < fns.length; i++){
            const fn = fns[i];
            fn.apply(this, arguments);
        }
    };
    // 取消订阅
    remove = (key, fn) => {
        const fns = this.clientList[key];

        if(!fns){
            return false;
        }

        if(!fn){
            // 没有传入取消订阅的函数，默认取消所有
            fns && (fns.length = 0);
        } else {
            for(let l = fns.length - 1; l >= 0; l--){
                const _fn = fns[l];
                if(_fn === fn){
                    // 删除此回调函数
                    fns.splice(l, 1);
                }
            }
        }
    };

    return {
        listen,
        trigger,
        remove
    }
})();

Event.listen('squareMeter88', function(price)){
    // 小红订阅消息
    console.log('价格=' + price);
}

Event.trigger('squareMeter88', 200000); // 售楼处发布消息

/**
 * 模块通信
 */
var a = (function(){
    var count = 0;
    var button = document.getElementById('count');
    button.onclick = function(){
        Event.trggier('add',count++);
    }
})()

var b = (function(){
    var div = document.getElementById('show');
    Event.listen('add',function(count){
        div.innerHTML = count;
    });
})()