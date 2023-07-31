let Plane = function () { }

Plane.prototype.fire = function () {
    console.log('发射普通子弹')
}

let MissileDecorator = function (plane) {
    this.plane = plane;
}

MissileDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('发射导弹')
}

let plane = new Plane();
plane = new MissileDecorator(plane);
plane.fire(); // 输出 发射普通子弹 发射导弹

/**
 * 保存引用来新增功能
 */
let a = function () {
    console.log(1)
}

let _a = a;

a = function () {
    _a();
    console.log(2);
}

a();

// 实际开发中修改全局函数也会这样 - 避免覆盖之前函数的行为
window.onload = function () {
    console.log(1)
}

let _onload = window.onload || function () { };

window.onload = function () {
    _onload();
    console.log(2);
}

/**
 * AOP实现装饰器
 */
Function.prototype.before = function (fn) {
    // 保存原函数引用
    let _self = this;
    // 返回新的定制函数
    return function () {
        // 执行新的函数并保证this不被劫持，新函数接受的参数也会传入原函数
        fn.apply(this, arguments);
        // 执行原函数
        return _self.apply(this, arguments);
    }
}

Function.prototype.after = function (fn) {
    // 保存原函数引用
    let _self = this;
    // 返回新的定制函数
    return function () {
        // 执行原函数
        const result = _self.apply(this, arguments);
        // 执行新的函数并保证this不被劫持，新函数接受的参数也会传入原函数
        fn.apply(this, arguments);
        return result;
    }
}

// 适用before来增加新的window.onload
window.onload = function () {
    alert(1);
}

window.onload = (window.onload || function () { }).after(function () {
    alert(2);
});

// 不污染原型
let before = function (fn, beforeFn) {
    return function () {
        beforeFn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
}

/**
 * 数据上报示例
 */
let showLogin = function () {
    console.log('打开浮层');
    log(this.getAttribute('tag'));
}

let log = function (tag) {
    console.log('上报标签为' + tag);
    // 上报代码
}

document.getElementById('button').onclick = showLogin;

// AOP优化
let showLogin2 = function () {
    // 不耦合上报
    console.log('打开浮层')
}

let log2 = function () {
    console.log('上报标签为' + this.getAttribute('tag'));
    // 上报代码
}

// 打开登陆浮层之后上报数据
showLogin2 = showLogin2.after(log);

document.getElementById('button').onclick = showLogin2;

/**
 * 动态改变函数参数
 */
let ajax = function (type, url, param) {
    param = param || {};
    // 略
}

ajax = ajax.before(function (type, url, param) {
    param.Token = getToken();
})



