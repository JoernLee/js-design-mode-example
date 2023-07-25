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