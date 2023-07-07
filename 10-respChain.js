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