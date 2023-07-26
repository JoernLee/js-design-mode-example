let Plane = function(){}

Plane.prototype.fire = function(){
    console.log('发射普通子弹')
}

let MissileDecorator = function(plane){
    this.plane = plane;
}

MissileDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log('发射导弹')
}

let plane = new Plane();
plane = new MissileDecorator(plane);
plane.fire(); // 输出 发射普通子弹 发射导弹

/**
 * 保存引用来新增功能
 */
let a = function(){
    console.log(1)
}

let _a = a;

a = function(){
    _a();
    console.log(2);
}

a();

// 实际开发中修改全局函数也会这样 - 避免覆盖之前函数的行为
window.onload = function(){
    console.log(1)
}

let _onload = window.onload || function(){};

window.onload = function(){
    _onload();
    console.log(2);
}