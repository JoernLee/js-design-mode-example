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
let order500 = (orderType, pay, stock) => {
    if(orderType === 1 && pay){
        console.log('500元定金预购，得到100优惠券')
    } else {
        // 传递
        order200(orderType, pay, stock);
    }
}

let order200 = (orderType, pay, stock) => {
    if(orderType === 2 && pay){
        console.log('200元定金预购，得到50优惠券')
    } else {
        // 传递
        orderNormal(orderType, pay, stock);
    }
}

let orderNormal = (orderType, pay, stock) => {
    if(stock > 0){
        console.log('普通购买')
    } else {
        console.log('库存不足')
    }
}

order500(1,false,500);
// ...