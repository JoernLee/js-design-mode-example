/**
 * jQuery中的迭代器
 */
$.each([1,2,3], function(i,n){
    console.log('当前下标'+i, '当前值为'+n)
})

/**
 * 实现自己的迭代器
 */
var each = function(arr, callback){
    for(var i = 0, l = arr.length; i < l; i++){
        callback.call(arr[i], i, arr[i]); // 下标和元素传递过去
    }
}

each([1,2,3], function(i,n){
    console.log('当前下标'+i, '当前值为'+n)
})