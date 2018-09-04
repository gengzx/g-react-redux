'use strict';

(function(global){

    global.config = {
        app: {
            title: '油气资源管理和战略研究支撑服务平台',
            description: '油气资源管理和战略研究支撑服务平台',
            keywords: '石大正信,油气资源管理和战略研究支撑服务平,资料服务',
            version:'1.0.7'
        },
        debug:false,
        ssoUserName:'baiy'
        //ssoUserName:ssoUserName
    }

    global.WMC = "http://127.0.0.1:8083/WMC";
    global.SERVICE_URL = "http://127.0.0.1:8080/IGPF";
/*
    global.SERVICE_URL = {
      queryDocumentData:WMC+"/server/fore/common/documentDataService.jsp?identity=queryDocumentData",
      queryDocumentCount:WMC+"/server/fore/common/documentDataService.jsp?identity=queryDocumentCount",
      execSqlSel:WMC+"/server/base/busiList.jsp?identity=execSqlSel"
    }*/
    
    
})(window);