
exports.Json = function(){

}();


exports.Crypto = function(){

}();




/**全局对象 */
(function(global) {


    Array.prototype.findLastIndex = function(cb, context) {
        let array = this;
    
        for (let i = array.length-1; i >=0; i--) {
            const element = array[i];
            if (cb.call(context, element, i, array)) {
              return i
            }
        }
        return -1
    }

})(window)    

