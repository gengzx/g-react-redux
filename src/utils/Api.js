
/**
 * 接口
 */
module.exports = function(Ajax){

    /**
     * BaseService
     * @property {Object} me
     */
    var me = {};
    me.TBNAME_SPECIAL = "T_BUSI_SPECIAL"
    me.TBNAME_SPECIAL_MENU = "T_BUSI_SPECIAL_MENU a LEFT JOIN SYS_CUSTOMMENU b ON a.F_CUSTODATA = b.ID ";


    /**
     * 加载专题列表
     */
    me.loadSpecial = function(params,callback, scope){
        const robj = {
            tbname: me.TBNAME_SPECIAL,
            cond: ""
        };
        Object.assign(robj, params)
        Ajax.request((robj.start && robj.limit) ? 'common/findPage' : 'common/query',robj,callback,{ scope: scope });
    }

    /**
     * 删除专题
     */
    me.deleteSpecial = function(id,callback, scope){
        const robj = {
            tbname: me.TBNAME_SPECIAL,
            idvalue: id
        };
        Ajax.request("common/removeById",robj,callback);
    }

    /**
     * 加载树列表
     */
    me.loadTree = function(specialId,callback, scope){

        const robj = {
            tbname: me.TBNAME_SPECIAL_MENU,
            cond: specialId ? ` A.F_SPECIAL ='${specialId}' ` : "",
            columns:"A.F_ID,A.F_NAME,A.F_PARENT,A.F_PATH,A.F_LEVEL,A.F_SPECIAL,A.F_PAGECONFIG,B.TABLECONFIG,B.CHARTCONFIG",
            order:"a.F_ORDER",
            id:"F_ID",
            name:"F_NAME",
            parent:"F_PARENT",
        };
        Ajax.request(`common/tree`,robj,callback,{ scope: scope });
        
    }

    /**
     * 加载数据中心 自定义名录
     */
    me.loadDataCenterList = function(params,callback, scope){

        
    }


    // --------------------------------资料中心接口---------------------------------
    /**
     * 加载资料
     */
    me.loadFiles = function(params,callback, scope){

        
    }

    return me;

};