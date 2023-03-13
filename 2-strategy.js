/**
 * 最直白的绩效计算
 */
var calculateBouns = function(performanceLevel, salary){
    if(performanceLevel === 'S'){
        return salary * 4;
    }

    if(performanceLevel === 'A'){
        return salary * 3;
    }

    if(performanceLevel === 'B'){
        return salary * 2;
    }
}

/**
 * 组合模式重构
 */

var performanceS = function(salary){
    return salary * 4;
}

var performanceA = function(salary){
    return salary * 3;
}

var performanceB = function(salary){
    return salary * 2;
}

 var calculateBouns = function(performanceLevel, salary){
    if(performanceLevel === 'S'){
        return performanceS(salary);
    }

    if(performanceLevel === 'A'){
        return performanceA(salary);
    }

    if(performanceLevel === 'B'){
        return performanceB(salary);
    }
}

/**
 * JS版本的策略模式重构
 */
var strategies = {
    S: function(salary){
        return salary * 4
    },
    A: function(salary){
        return salary * 3;
    },
    B: function(salary){
        return salary * 2;
    }
}

var calculateBouns2 = function(level, salary){
    return strategies[level](salary)
}

calculateBouns2('S', 20000); // 输出80000

/**
 * 小球运动动画示例
 */

// 缓动算法对象
var tween = {
    linear:function(t,b,c,d){
        return c*t/d + b;
    },
    easeIn:function(t,b,c,d){
        return c * (t/=d)*t + b;
    },
    // ... 其他算法可以网上搜索
}

// 定义Animate类
var Animate = function(dom){
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0; // 动画开始时DOM位置
    this.endPos = 0; // 动画结束时DOM位置
    this.propertName = null; // dom节点需要改变的CSS名称
    this.easing = null; // 缓动算法
    this.duration = null;
}

// start方法负责启动动画并记录初始信息，供后续算法计算使用
Animate.prototype.start = function(propertName,  endPos, duration, easing){
    this.startTime = +new Date;
    this.startPos = this.dom.getBoundingClient()[propertName];
    this.propertName = propertName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];

    var self = this;
    var timeId = setInterval(function(){
        if(self.step() === false){
            clearInterval(timeId);
        }
    },19)
}

// step方法负责小球每一帧需要做的事情
Animate.prototype.step = function(){
    var t = +new Date;
    if(t >= this.startTime + this.duration){
        this.update(this.endPos); // 更新小球CSS
        return false; // 动画结束
    }
    // 得到算法更新后位置
    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
    // 更新CSS
    this.update(pos);
}

// update方法负责更新CSS
Animate.prototype.update = function(pos){
    this.dom.style[this.propertName] = pos + 'px'
}

// 测试一下
var div = document.getElementById('div');
var animate = new Animate(div);

animate.start('left', 500, 1000, 'linear');