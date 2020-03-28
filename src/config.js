'use strict';

(function(global){

    global.config = {
        app: {
            title: 'XXX 系统',
            description: 'XXX 系统描述',
            keywords: 'gengzx,react',
            version:'1.0.7'
        },
        debug:false
    }

    global.SERVICE_URL = "http://127.0.0.1:8080/IGPF";
/*
    global.SERVICE_URL = {
      queryDocumentData:WMC+"/server/fore/common/documentDataService.jsp?identity=queryDocumentData",
      queryDocumentCount:WMC+"/server/fore/common/documentDataService.jsp?identity=queryDocumentCount",
      execSqlSel:WMC+"/server/base/busiList.jsp?identity=execSqlSel"
    }*/
    
    
})(window);