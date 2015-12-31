define(['loading','UIWarning404','UIAlert','UIToast', 'UIAnimation'],
function(Loading, Warning404, Alert, Toast, animation){
  function APP(options){
    this.initialize(options);
  }

  APP.subclasses = [];

  APP.defaults = {
    "mainRoot"        : "main",
    "header"          : "headerview",
    "viewport"        : ".main-viewport",
    "animForwardName" : "slideleft",
    "animBackwordName": "slideright",
    "isAnim"          : false,
    "maxsize"         : 10
  };

  APP.prototype = {
    viewReady: function(handler){
      //TODO
      //MessageCenter.subscribe('viewReady', handler);
    },

    initialize: function initialize(options){
      var opts = this.initProperty(options);
      this.options = opts;
      this.firstState = null;
      this.mainRoot = document.getElementById(opts.mainRoot);
      this.viewport = this.mainRoot.querySelector(opts.viewport);
      this.header = document.getElementById(opts.header);
      this.curView = null;
      this.lastView = null;
      this.maxsize = opts.maxsize;
      this.animForwardName = opts.animForwardName;
      this.animBackwordName = opts.animBackwordName;
      this.isAnim = opts.isAnim;
      this.animAPIs = animation;
      this.animatName = this.animForwardName;
      this._loading = new Loading();
      this._alert = new Alert();
      this._confirm = new Alert();
      this._toast = new Toast();
      this._warning404 = new Warning404();

      this.bindEvents();
      this.views = {};
      this.start();
    },

    /*
    * 显示提示框
    */
    showMessage: function(params){
      params = params || {};
      if(typeof params === 'string'){
        params = {
          datamodel:{
            content: params
          }
        };
      }

      //每次设置重置属性， 以防止组件相互影响
      this._alert.resetDefaultProperty();
      this._alert.setOption(params);
      this._alert.refresh();
      this._alert.show();
    },

    /*
    * 隐藏showMessage弹层的消息
    */
    hideMessage:function(){
      this._alert.hide();
    },
    /*
    * 显示确认框
    */
    showConfirm: function(params){
      params = params || {};
      if(typeof params === 'string'){
        params = {
          datamodel:{
            content: params
          }
        };
      }

      this._confirm.resetDefaultProperty();

      this._confirm.datamodel.btns = [
        { name: '取消', className: 'cui-btns-cancel'},
        { name: '确认', className: 'cui-btns-ok'}
      ];
      this._confirm.setOption(params);
      this._confirm.refresh();
      this._confirm.show();
    },
    /*
    * 隐藏确认框
    */
    hideConfirm: function(){
      this._confirm.hide();
    },
    /*
    * 显示warning
    */
    showWarning404: function(params){
      //TODO
    },
    /*
    * 隐藏warning
    */
    hideWarning404: function(){
      this._warning404.hide();
    },
    /*
    */
    showToast: function(params){
      params = params || {};
      if(typeof params === 'string'){
        params = {
          datamodel:{
            content: params
          }
        }
      }

      this._toast.resetDefaultProperty();
      this._toast.setOption(params);
      this._toast.refresh();
      this._toast.show();
    },
    /*
    */
    hideToast: function(){
      this._toast.hdie();
    },
    showLoading: function(params){

    },
    __showLoading: function(params){

    },
    hideLoading: function(){

    },

    initProperty: function initProperty(options){
      var opts = _.extend({}, APP.defaults, options ||{});
      return opts;
    },
    bindEvents: function(){
      /*if($.bindFastClick){
        $.bindFastClick();
      }*/
    },
    start:function(){

    },
    loadView: function(url, options){
        var el = this.viewport.children[0];
        var controller = el.getAttribute('data-controller');
        //实例化view
        require([controller || 'pageView'], _.bind(function(View){
          this.animatName = options.animatName || (this.navigationType == 'back' ? this.animBackwordName : this.animForwardName);
          if(this.curView){
            this.lastView = this.curView;
          }
          this.curView = new View({el: el});
          this.curView.$el.setAttribute('page-url', url);
        }, this));
    },
    showView: function(data){
      this.loadView(data.url, data.options)
    },
    goTo: function(url, opt){},
    goBack: function(url, opt){},
    jump: function(url){},
    interface: function(){
      return {
        'viewReady'      : this.viewReady,
        'showMessage'    : this.showMessage,
        'hideMessage'    : this.hideMessage,
        'showConfirm'    : this.showConfirm,
        'hideConfirm'    : this.hideConfirm,
        'showWarning404' : this.showWarning404,
        'hideWarning404' : this.hideWarning404,
        'showToast'      : this.showToast,
        'hideToast'      : this.hideToast,
        'showLoading'    : this.showLoading,
        'hideLoading'    : this.hideLoading,
        "goTo"           : this.goTo,
        "goBack"         : this.goBack,
        "jump"           : this.jump
      };
    }
  };

  return APP;
});
