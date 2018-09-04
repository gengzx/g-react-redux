

var request_interface = function(){

}

request_interface.prototype = {

  get:function (params, callback) {},

  post:function (record, params, callback) {}

}

module.exports = function (dbtype = 'ajax') {

  request_interface.prototype = require('./request.' + dbtype + '.js')

  return new request_interface()

}