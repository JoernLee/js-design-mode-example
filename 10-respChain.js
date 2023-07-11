/**
 * order过程
 */
let order = (orderType, pay, stock) => {
    if(orderType === 1){
        if(pay){
            console.log('500元定金预购，得到100优惠券')
        } else {
            if(stock > 0){
                console.log('普通购买，无优惠券');
            } else {
                console.log('手机库存不足');
            }
        }
    }

    // if(orderType === 2){...}
    // if(orderType === 3){...}
}

/**
 * 第一次重构
 */
var order500 = (orderType, pay, stock) => {
    if(orderType === 1 && pay){
        console.log('500元定金预购，得到100优惠券')
    } else {
        // 传递
        order200(orderType, pay, stock);
    }
}

var order200 = (orderType, pay, stock) => {
    if(orderType === 2 && pay){
        console.log('200元定金预购，得到50优惠券')
    } else {
        // 传递
        orderNormal(orderType, pay, stock);
    }
}

var orderNormal = (orderType, pay, stock) => {
    if(stock > 0){
        console.log('普通购买')
    } else {
        console.log('库存不足')
    }
}

order500(1,false,500);
// ...

/**
 * 灵活可拆分
 */
var order500 = (orderType, pay, stock) => {
    if(orderType === 1 && pay){
        console.log('500元定金预购，得到100优惠券')
    } else {
        return 'nextSuccessor'
    }
}

var order200 = (orderType, pay, stock) => {
    if(orderType === 2 && pay){
        console.log('200元定金预购，得到50优惠券')
    } else {
        return 'nextSuccessor'
    }
}

var orderNormal = (orderType, pay, stock) => {
    if(stock > 0){
        console.log('普通购买')
    } else {
        console.log('库存不足')
    }
}

class Chain {
    constructor(fn){
        this.fn = fn;
        this.successor = null;
    }

    // 指定链中下一个节点
    setNextSuccessor = function(successor){
        return this.successor = successor;
    }

    // 传递请求
    pastRequest = function(){
        const ret = this.fn.apply(this, arguments);
        if(ret = 'nextSuccessor'){
            return this.successor && this.successor.pastRequest.apply(this.successor, arguments);
        }
        return ret;
    }
}

let chainOrder500 = new Chain(order500);
let chainOrder200 = new Chain(order200);
let chainOrderNormal = new Chain(orderNormal);

// 指定顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

// 只需要关注第一个节点
chainOrder500.pastRequest(1,true, 500);
// ...

/**
 * 异步职责链
 */
 class Chain {
    constructor(fn){
        this.fn = fn;
        this.successor = null;
    }

    // ...

    // 新增一个方法
    next = function(){
        return this.successor && this.successor.pastRequest.apply(this.successor, arguments);
    }
}

let fn1 = new Chain(() => {
    console.log(1);
    return 'nextSuccessor';
})

let asyncFn2 = new Chain(() => {
    console.log(2);
    let self = this;
    setTimeout(() => {
        self.next();
    }, 1000);
})


let fn3 = new Chain(() => {
    console.log(3);
})

fn1.setNextSuccessor(asyncFn2).setNextSuccessor(fn3);
fn1.pastRequest();

/**
 * 利用AOP来实现
 */
Function.prototype.after = function(fn){
    let self = this;
    return function(){
        var ret = self.apply(this, arguments);
        if(ret === 'nextSuccessor'){
            return fn.apply(this,arguments);
        }
        return ret;
    }
}

const orderChain = order500.after(order200).after(orderNormal);
orderChain(1, true, 500);


/**
 * 职责链重构获取文件上传对象
 */
const getActiveUploadObj = () => {
    try{
        return new ActiveXObject("TXFTNActiveX.FTNUpload");
    }catch(e){
        return 'nextSuccessor';
    }
}

const getFlashUploadObj = () => {
    if(supoortFlash()){
        const str = '<object type="application/x-shockwave-flash"></object>';
        return $(str).appendTo($('body'));
    }
    return 'nextSuccessor';
}

const getFormUploadObj = () => {
    return $('<form><input ....>...').appendTo($('body'))
}

const getUploadObj = getActiveUploadObj.after(getFlashUploadObj).after(getFormUploadObj);

console.log(getUploadObj());