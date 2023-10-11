/**
 * 电灯程序
 */
// 一般写法-简单状态机
class Light {
    constructor() {
        this.button = null;
        this.state = 'off'
    }

    init() {
        const button = document.createElement('button');
        const self = this;
        button.innerHTML = '开关';
        this.button = document.body.appendChild(button);
        this.button.onclick = function () {
            self.buttonWasPressed();
        }
    }

    buttonWasPressed() {
        if (this.state === 'off') {
            this.state = 'on';
            console.log('开灯')
        } else if (this.state === 'on') {
            this.state = 'off';
            console.log('关灯');
        }
    }

}

// 状态模式改造
class OffLightState {
    constructor(light) {
        this.light;
    }

    buttonWasPressed() {
        // off状态的逻辑
        console.log('弱光');
        this.light.setState(this.light.weakLightState);
    }
}

class WeakLightState {
    constructor(light) {
        this.light;
    }

    buttonWasPressed() {
        console.log('强光');
        this.light.setState(this.light.strongLightState);
    }
}

class StrongLightState {
    constructor(light) {
        this.light;
    }

    buttonWasPressed() {
        console.log('关闭');
        this.light.setState(this.light.offLightState);
    }
}

// 改写Light类
class Light {
    constructor() {
        this.button = null;
        this.offLightState = new OffLightState(this);
        this.weakLightState = new WeakLightState(this);
        this.strongLightState = new StrongLightState(this);
    }

    init() {
        const button = document.createElement('button');
        const self = this;
        button.innerHTML = '开关';
        // 不再通过字符串来记录state，而是通过具体的状态对象
        this.currState = this.offLightState;
        this.button = document.body.appendChild(button);
        this.button.onclick = function () {
            // 委托给具体状态对象执行
            self.currState.buttonWasPressed();
        }
    }

    setState(state) {
        // 提供状态切换方法，状态切换逻辑在具体状态类中，Context不需要关心
        this.currState = state;
    }

}

// 抽象父类代替
class State {
    buttonWasPressed() {
        throw new Error('父类必须被重写')
    }
}

class SuperLightState extends State {
    buttonWasPressed() {
        // TODO
    }
}

/**
 * 文件上传示例
 */
window.external.upload = (state) => {
    console.log(state);
}

const plugin = (function () {
    const plugin = document.createElement('embed');
    plugin.style.display = 'none';
    plugin.type = 'application/txftn-webkit';
    plugin.sign = () => { console.log('开始文件扫描') };
    plugin.pause = () => { console.log('暂停文件上传') };
    plugin.uploading = () => { console.log('开始文件上传') };
    plugin.del = () => { console.log('删除文件上传') };
    plugin.done = () => { console.log('文件上传完成') };
    document.body.appendChild(plugin);

    return plugin;
})();

// 不使用状态模式
class Upload {
    constructor(fileName) {
        this.plugin = plugin;
        this.fileName = fileName;
        this.button1 = null;
        this.button2 = null;
        this.state = 'sign'; // 初始状态
    }

    // 初始化工作-创建button节点
    init() {
        let that = this;
        this.dom = document.createElement('div');
        this.dom.innerHTML = '<span>文件名称:' + this.fileName + '</span>' + '<button data-action="button1">扫描中</button>' + '<button data-action="button2">删除</button>'
        document.body.appendChild(this.dom);
        this.button1 = this.dom.querySelector('[data-action="button1"]');
        this.button2 = this.dom.querySelector('[data-action="button2"]');
        this.bindEvent();
    }

    // 按钮绑定事件 - 处理状态逻辑
    bindEvent() {
        let that = this;
        this.button1.onclick = function () {
            if (self.state === 'sign') {
                console.log('扫描中，点击无效')
            } else if (self.state === 'uploading') {
                self.changeState('pause');
            } else if (self.state === 'pause') {
                self.changeState('uploading');
            } else if (self.state === 'done') {
                console.log('文件以及上传成功，点击无效')
            } else if (self.state === 'error') {
                console.log('文件上传失败，点击无效');
            }
        }

        this.button2.onclick = function () {
            if (self.state === 'done' || self.state === 'error' || self.state === 'pause') {
                self.changeState('del');
            } else if (self.state === 'sign') {
                console.log('扫描中，不能删除')
            } else if (self.state === 'uploading') {
                console.log('上传中，不能删除')
            }
        }
    }

    // 切换状态之后的具体行为，与按钮UI逻辑控制，调用插件执行真正的操作
    changeState(state) {
        switch (state) {
            case 'sign':
                this.plugin.sign();
                this.button1.inner = '扫描中，任何操作无效';
                break;
            case 'uploading':
                this.plugin.uploading();
                this.button1.inner = '正在上传点击暂停';
                break;
            case 'pause':
                this.plugin.pause();
                this.button1.inner = '已暂停，点击继续上传';
                break;
            case 'done':
                this.plugin.done();
                this.button1.inner = '上传完成';
                break;
            case 'error':
                this.button1.inner = '上传失败';
                break;
            case 'del':
                this.plugin.del();
                this.dom.parentNode.removeChild(this.dom);
                console.log('删除完成')
                break;
        }
    }
}

// 测试下
const uploadObj = new Upload('JS设计模式文件');
uploadObj.init();

window.external.upload = (state){
    // 插件调用JS方法
    uploadObj.changeState(state);
}

window.external.upload('sign');
setTimeout(() => {
    uploadObj.changeState('uploading')
}, 1000)
setTimeout(() => {
    uploadObj.changeState('done')
}, 5000)

/**
 * 状态模式重构文件上传
 */
 class Upload {
    constructor(fileName) {
        this.plugin = plugin;
        this.fileName = fileName;
        this.button1 = null;
        this.button2 = null;
        
        this.signState = new SignState(this);
        this.uploadingState = new UploadingState(this);
        this.pauseState = new PauseState(this);
        this.doneState = new DoneState(this);
        this.errorState = new ErrorState(this);
        // 设置初始状态
        this.currState = this.signState;
    }

    // 不用改变，仍然负责创建DOM与绑定事件
    init() {
        let that = this;
        this.dom = document.createElement('div');
        this.dom.innerHTML = '<span>文件名称:' + this.fileName + '</span>' + '<button data-action="button1">扫描中</button>' + '<button data-action="button2">删除</button>'
        document.body.appendChild(this.dom);
        this.button1 = this.dom.querySelector('[data-action="button1"]');
        this.button2 = this.dom.querySelector('[data-action="button2"]');
        this.bindEvent();
    }

    // 按钮绑定事件 - 不再自己处理而是委托给状态类
    bindEvent() {
        let self = this;
        this.button1.onclick = function () {
            self.currState.clickHandler1();
        }

        this.button2.onclick = function () {
            self.currState.clickHandler2();
        }
    }

    // 把状态对应的逻辑行为放在这里
    sign(){
        this.plugin.sign();
        this.currState = this.signState;
    }

    uploading(){
        this.plugin.uploading();
        this.button1.inner = '正在上传点击暂停';
        this.currState = this.uploadingState;
    }

    pause(){
        this.plugin.pause();
        this.button1.inner = '已暂停，点击继续上传';
        this.currState = this.pauseState;
    }

    done(){
        this.plugin.done();
        this.button1.inner = '上传完成';
        this.currState = this.doneState;
    }

    error(){
        this.button1.inner = '上传失败';
        this.currState = this.errorState;
    }

    del(){
        this.plugin.del();
        this.dom.parentNode.removeChild(this.dom);
        console.log('删除完成')
    }
}

// 编写状态类实现

const StateFactory = (function(){
    class State {
        constructor() { }
        clickHandler1() {
            throw new Error('handler1是必要的');
        }
        clickHandler2() {
            throw new Error('handler2是必要的');
        }
    }



    return function(param){
        class F {
            constructor(uploadObj) {
                this.uploadObj = uploadObj;
            }
        }
        F.prototype = new State();
        for(let i in param){
            F.prototype[i] = param[i]
        };
        return F;
    }
})()

const SignState = StateFactory({
    clickHandler1: function(){
        console.log('扫描中，点击无效')
    },
    clickHandler2: function(){
        console.log('扫描中，删除无效')
    }
});

const UploadingState = StateFactory({
    clickHandler1: function(){
        this.uploadObj.pause();
    },
    clickHandler2: function(){
        console.log('上传中，不能删除')
    }
})

// ...
