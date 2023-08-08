/**
 * 电灯程序
 */
// 一般写法-简单状态机
class Light{
    constructor(){
        this.button = null;
        this.state = 'off'
    }

    init(){
        const button = document.createElement('button');
        const self = this;
        button.innerHTML = '开关';
        this.button = document.body.appendChild(button);
        this.button.onclick = function(){
            self.buttonWasPressed();
        }
    }

    buttonWasPressed(){
        if(this.state === 'off'){
            this.state = 'on';
            console.log('开灯')
        } else if(this.state === 'on') {
            this.state = 'off';
            console.log('关灯');
        }
    }

}

// 状态模式改造
class OffLightState {
    constructor(light){
        this.light;
    }

    buttonWasPressed(){
        // off状态的逻辑
        console.log('弱光');
        this.light.setState(this.light.weakLightState);
    }
}

class WeakLightState {
    constructor(light){
        this.light;
    }

    buttonWasPressed(){
        console.log('强光');
        this.light.setState(this.light.strongLightState);
    }
}

class StrongLightState {
    constructor(light){
        this.light;
    }

    buttonWasPressed(){
        console.log('关闭');
        this.light.setState(this.light.offLightState);
    }
}

// 改写Light类
class Light{
    constructor(){
        this.button = null;
        this.offLightState = new OffLightState(this);
        this.weakLightState = new WeakLightState(this);
        this.strongLightState = new StrongLightState(this);
    }

    init(){
        const button = document.createElement('button');
        const self = this;
        button.innerHTML = '开关';
        // 不再通过字符串来记录state，而是通过具体的状态对象
        this.currState = this.offLightState;
        this.button = document.body.appendChild(button);
        this.button.onclick = function(){
            // 委托给具体状态对象执行
            self.currState.buttonWasPressed();
        }
    }

    setState(state){
        // 提供状态切换方法，状态切换逻辑在具体状态类中，Context不需要关心
        this.currState = state;
    }

}