/**
 * ajax 服务(基于JQuery二次封装)
 */

const Loading = {

  start: function(options) {
      if (options && options.animate) {
          $('.page-spinner-bar').remove();
          $('body').append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
      } else {
          $('.page-loading').remove();
          $('body').append('<div class="page-loading"><img src="../../assets/images/loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (options && options.message ? options.message : '加载中...') + '</span></div>');
      }
  },

  stop: function() {
      $('.page-loading, .page-spinner-bar').remove();
  }
}




exports.Ajax = function(){

    /**
     * ajax 服务对象本身
     * @property {Object} me
     */
    var me = {};

    /**
     * 请求服务器数据
     * @method request
     * @param {String} Controller.Action 请求控制层及动作
     * @param {String} params 请求参数
     * @param {String} callback 回调函数
     * @return {Object} data (如果没有回调函数 认为同步请求 并返回数据)
     */
    me.request = function(controller_action){

        if(!controller_action) {
            return null;
        }

        Loading.start({message:"请稍后...",animate:true});

        var options = {},
            async = false,      // 异步
            syndata = null,      // 如果是同步返回的数据
            params = {},          // 请求参数
            callback = $.noop();  // 回调函数 ; 如果有回调函授 自动设为异步(async = true)

        // 如果有第二个参数
        if(arguments.length > 1){

            var arg = arguments[1];
            if(typeof(arg) == "object"){
                params = arg;
                if(arguments.length > 2){
                    if(typeof(arguments[2]) == "function"){
                        callback = arguments[2],async = true;
                    }
                    if(arguments.length > 3 && typeof(arguments[3]) == "object"){
                        options = arguments[3]
                    }
                }
            }else{
                if(typeof(arg) == "function"){
                    callback = arg,async = true;
                }
                if(arguments.length > 2 && typeof(arguments[2]) == "object"){
                    options = arguments[2]
                }
            }

        }

        // var url = CONTEXT_PATH + "/" + controller_action.replace(".","/");
        var url = controller_action.indexOf("WMC/") > -1 ?  controller_action : SERVICE_URL + "/" + controller_action;
        if(config.debug){
            console.log("****************************");
            console.log("%c请求地址：","color:blue",url);
            console.log("%c请求参数：","color:blue",params);//console.group();console.dir(params);console.groupEnd();
            console.log("****************************");
        };

        if(options.rest){
          if(!$.isEmptyObject(params)) url = `${url}/${JSON.stringify(params)}`
        }else{

            // if(params.user)
            //    options.data = { robj:JSON.stringify(params) } 
            // else{
            //     params.sysuser = exports.User.getUser()
            //     options.data = JSON.stringify(params);
            // }

            if(url.indexOf("IGPF") > -1)
                options.data = { robj:JSON.stringify(params) } 
            else 
                options.data = JSON.stringify(params)
          
        }
        $.ajax($.extend({type : 'POST',async: async,url : url,dataType:'json',jsonpCallback:'jsonp',
            success : function(data,textStatus,jqXHR){
                data = data.params != null ? data.params : data;
                if (textStatus == "success") {
                    if(async){
                        callback.call(options.scope ? options.scope : this, data);
                        // callback(data);
                    }else{
                        syndata = data;
                    }
                } else {
                    alert('请求超时或网络故障,错误编号：[' + textStatus + ']')
                }
                Loading.stop();
            }
        },options));
        return syndata;

    };
    return me;
}();

/**
 * 用户
 */
exports.User = function(){

    var me = {};

    var user;

    var menu;


    /**
     * 对应数据库字段
     * @property {Object} key
     */
    me.KEYS = {
        // ID
        ID:"id",
        // 用户名
        NAME:"nm",
        // 用户显示名
        DISP:"disp",
        // 邮箱
        MAIL:"mail",
        // 移动电话
        MOBILE:"mobile",
        // 所属单位
        UNIT:"unit",
        // 最后登录时间
        LASTLOGIN:"lastLogin",
        // 用户角色
        FRONTROLE:"frontRole"
    };

    me.getUser = function(){
        return user || (user = this.signin().user)
    }

    me.getMenu = function(){
        return menu || (menu = this.signin().menu)
    }

    me.signin = function(){
        const user = {
			user_nm: config.ssoUserName,
			user_password: "46fd54ea2401d27e9da8c70f78b70f28"
		}
        return exports.Ajax.request(`${WMC}/server/fore/user/authentication.jsp?identity=signin`, { user: user })
    }

    return me;

}();

/**
 * 公共服务
 */
exports.BaseService = function(Ajax){

    /**
     * BaseService
     * @property {Object} me
     */
    var me = {};

    /**
     * 普通查询
     * @method request
     * @params {Object} params 请求参数
     *              tbname:"t_sys_user" 表名
     *              columns:"f_name,f_code"   字段
     * @param {Function} callback 回调函数
     * @return {Object} data (如果没有回调函数 认为同步请求 并返回数据)
     */
    me.queryData = function(params,callback){
        if(params.start > -1){
            params.start = (params.start - 1) * params.length;
        }
        Ajax.request(params.start > - 1 ? "common.queryPaginationData" : "common.queryData",params,callback);
    };

    /**
     * 保存数据
     * @method request
     * @params {Object} params 请求参数
     *              tbname:"t_sys_user" 表名
     *              columns:{f_name:"value",f_name:"value"} 数据
     * @param {Function} callback 回调函数
     * @return {Object} data (如果没有回调函数 认为同步请求 并返回数据)
     */
    me.save = function(params,callback){
        Ajax.request("common.saveData",params,callback);
    };

    /**
     * 删除数据
     * @method request
     * @params {Object} params 请求参数
     *              tbname:"t_sys_user" 表名
     *              pkname:"F_ID" 主键名称
     *              idvalue:"value,value" 数据
     * @param {Function} callback 回调函数
     * @return {Object} data (如果没有回调函数 认为同步请求 并返回数据)
     */
    me.removeById = function(params,callback){
        Ajax.request("common.removeById",params,callback);
    };

    return me;

}();



/**
 * 文件服务
 */
exports.Api = require('./Api')(exports.Ajax);


require('./UUID');