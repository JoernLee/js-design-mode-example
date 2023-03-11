/**
 * 基于类的单例模式
 *  */
var Singleton = function (name) {
    this.name = name
};

Singleton.prototype.getName = function () {
    alert(this.name)
}

Singleton.getInstance = (function () {
    // 闭包保存instance变量
    var instance = null;
    return function (name) {
        if (!instance) {
            instance = new Singleton(name)
        }
        return instance;
    }
})()

var a = Singleton.getInstance('sven1')
var b = Singleton.getInstance('sven2')
alert(a === b); // true

/**
 * 无需用户感知用法差异的透明的单例模式 - 借助代理类实现
 */
var CreateDiv = function (html) {
    this.html = html;
    this.init();
}

CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div)
}

var ProxySingletonCreateDiv = (function () {
    var instance;
    return function (html) {
        if (!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    }
})()

/**
 * JS中通过字面量来直接实现单例 - 注意避免命名空间污染
 *  */
const namespace1 = {
    a: function () { },
    b: function () { }
}

var user = (function () {
    var _name = 'sven',
        _age = 29

    return {
        getUserInfo: function () {
            return _name + '-' + _age;
        }
    }
})();

/**
 * 惰性单例 - 实现一个惰性浮窗为例子
 */

var createLoginLayer = (function () {
    var div;
    return function () {
        if (!div) {
            div = document.createElement('div')
            div.innerHTML = '我是登录浮窗'
            div.style.display = 'none'
            document.body.appendChild(div)
        }
    }
})()

document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createLoginLayer();
    loginLayer.style.display = 'block';
}

/**
 * 更加通用的惰性单例 - 抽离独立可复用的管理单例逻辑
 */
var getSingle = function (fn) {
    // result身在闭包中，不会被销毁
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}

// 业务逻辑函数
var createLoginLayer = function () {
    var div = document.createElement('div')
    div.innerHTML = '我是登录浮窗'
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
}

// 连接
var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
}