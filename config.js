
//框架名称
  M = typeof M === 'undefined' ? {} : M;

  var dir = "http://localhost/lib/";
  require.config({
    urlArgs: "v=__version__",
    paths: {
      "cCoreInherit"  : dir + "classInherit",
      "cWebApp"       : dir + "webapp",
      "cAbstractApp"  : dir + "abstractapp",
      "cUtilPath"     : dir + "util/path",
      "cUtilCommon"   : dir + "util/common",
      "cAjax"         : dir + "common/ajax",
      "UIHeader"      : dir + "ui/header",
      "pageView"      : dir + "pageview",
      "UIBase"        : dir + "UIBase",
      "loading"       : dir + "ui/loading",
      "UIWarning404"  : dir + "ui/warning404",
      "UIAlert"       : dir + "ui/alert",
      "UIToast"       : dir + "ui/toast",
      "UIAnimation"   : dir + "ui/animation",
      "baseinit"      : dir + "baseinit"
    }
  });

  function initConfig(){
    var scripts = document.getElementsByTagName('script') || [];
    var reg = /\/config\.js/ig;
    for(var i =0,len = scripts.length;i<len;i++){
      var src = scripts[i].getAttribute('src');
      if(src && reg.test(src)){
        var configStr = scripts[i].getAttribute('data-config') || '';
        if(configStr){
          M.config = configStr;
          break;
        }
      }
    }
  }

  initConfig();

  require(['baseinit'],function(init){
    init();
  });
