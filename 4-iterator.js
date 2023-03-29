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

/**
 * 倒序迭代器
 */
var reverseEach = function(arr, callback){
    for(let i = arr.length - 1;i >= 0;i--){
        callback(arr[i]);
    }
}

/**
 * 重构前的函数
 */

const getUploadObj = function(){
    try{
        // IE
        return new ActiveXObject("TXFTNActiveX.FTNUpload");
    } catch(e) {
        if(supportFlash()){
            var str = '<object type="application"></object>';
            return $(str).appendTo($('body'))
        } else {
            var str = '<input name="file"/>';
            return $(str).appendTo($('body'))
        }
    }
}

/**
 * 重构后的函数
 */
const getActivexUploadObj = function(){
    try{
        // IE
        return new ActiveXObject("TXFTNActiveX.FTNUpload");
    } catch(e) {
        return false
    }
}

const getFlashUploadObj = function(){
    if(supportFlash()){
        var str = '<object type="application"></object>';
        return $(str).appendTo($('body'))
    } 
    return false;
}

const getFormUploadObj = function(){
    var str = '<input name="file"/>';
    return $(str).appendTo($('body'));
}

const iteratorUploadObj = function(){
    for(let i = 0; i < arguments.length; i++){
        const uploadObj = arguments[i]();
        if(uploadObj !== false){
            return uploadObj;
        }
    }
}

const uploadObj = iteratorUploadObj(getActivexUploadObj, getFlashUploadObj, getFormUploadObj);