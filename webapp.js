define(['cUtilCommon', 'cCoreInherit', 'cAbstractApp','cUtilPath', 'cAjax'],
  function(UtilCommon, cCoreInherit, APP, Path, cAjax){

  return cCoreInherit.Class(APP,{
    bindEvents: function($super){
      $super();
      var that = this;
      window.addEventListener('popstate', _.bind(function(e){
        var data = e.state;

        history.replaceState({url: data.url, text:data.text, options: data.options}, document.title, data.url);
        this.navigationType = 'back';
        data.options = data.options || {};
        data.options.animatName = this.animBackwordName;
        this.showView(data);
      }, that));
    },

    start: function(){
      this._loadViewByLocationUrl();
    },

    _loadViewByLocationUrl: function(){
      var landingpath = Path.parseUrl(location.href).pathname;
      if(landingpath == '/'){
        landingpath = '/index';
      }else{
        landingpath = location.href.substring(location.href.indexOf(Path.parseUrl(location.href).pathname));
      }
      this.__startState = {url: landingpath, text: document.documentElement.innerHTML, options: {pushState: false, landingpage:1}};
      history.replaceState({url: landingpath, text: document.documentElement.innerHTML, options:{pushState: false, landingpage:1}}, document.title, landingpath);
      this.loadView(landingpath, {pushState: false, landingpage:1});
    },

    goTo: function(url, opt){
      var now = new Date();
      if((opt && !opt.forcegoto) && this.lastGoto && now - this.lastGoto < 500){
        return;
      }

      this.navigationType = 'forward';
      this.lastGoto = now;
      //TODO 用意？
      if(_.isObject(url)){
        if(history.length>1){
          this.goBack();
          return;
        }else{
          var opts = url;
          opts.animatName = opts.animatName || this.animBackwordName;
          opts.replaceFirstState = true;
          opts.isPushState = true;
          this.goTo(opts.defaultView, opts);
          return;
        }
      }

      if(UtilCommon.isUrl(url) || url.indexOf('http://localhost') === 0){
        if(url.indexOf('/webapp') > -1){
          url = url.substr(url.indexOf('/webapp'));
        }
        if(url.indexOf('/html5') > -1){
          url = url.substr(url.indexOf('/html5'));
        }
      }
      //请求页面， 返回页面内容
      //{html:html, controller:controller, error: error}
      cAjax.get(url, function (html) {
        //解析html
        var pageDocNode = $('<DIV>' + html + '</DIV>');
        var viewcontent = pageDocNode.find('.main-viewport').children().first();
        var viewcontroller = viewcontent.attr('data-controller');
        var error = viewcontent.find('#errorcontainer');
        if(!error){
          this.viewport.children().remove();
          var newview = document.createElement('div');
          newview.id='client_id_viewport_'+new Date().getTime();
          newview.attr('data-controller', viewcontroller);
          newview.append(viewcontent);
          this.viewport.append(newview);

          this._loadViewByOptions(url, opt);
        }
      });
    },

    _loadViewByOptions: function(url, opt){
      var goToPath = Path.parseUrl(url).pathname;
      if(opt && opt.pushState === false){
        history.replaceState({url: url, options:{pushState: false}}, document.title, url);
      }else{
        history.pushState({url:url, options:{pushState: true}}, document.title, url);
      }

      if(_.isEmpty(opt)){
        opt = {};
      }
      opt.pushState = true;
      this.loadView(url, opt);
    },

    goBack: function(url, opt){
      if(arguments.length === 0){
        history.back();
      }else{
        this.goTo.apply(this, arguments);
        this.navigationType = 'back';
      }
    },

    jump:function(url,opt){
      var openUrl = url;
      if(!UtilCommon.isUrl(url)){
        var domain = window.location.protocal + '//' + window.location.host;
        if(url.toLowerCase().indexOf('/webapp') === -1 && url.toLowerCase().indexOf('/html5') === -1){
          openUrl = domain + "/webapp/" + url;
        }else{
          openUrl = domain + url;
        }
      }

      if(opt && opt.replace){
        window.location.replace(openUrl);
      }else{
        window.location.href = openUrl;
      }
    }
  });

});
