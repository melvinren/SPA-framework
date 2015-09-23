define(['UIHeader'],function(Header){
  var PageView = _.extend({
    /*
    * 滚动条位置
    */
    scrollPos:{x:0, y:0},
    /*
    * header
    */
    header : null,
    /*
    * pageid UBT统计
    */
    pageid:0,
    /*
    * hpageid UBT统计 hybrid使用
    */
    hpageid:0,
    /*
    * 页面切换时， 是否要滚动至顶部
    */
    scrollZero： true,
    /*
    * 页面切换时， 是否执行onshow
    */
    triggerShow:true,
    /*
    * 页面切换时，是否执行onHide
    */
    triggerHide:true,
    /*
    * View构造函数
    */
    initializae:function(){
      this.id = this.$el.attr("id");
      this.create();
    },
    /*
    * 生成头部
    */
    _createHeader:function(){
      var hDom = $("#headerview");
      this.header = this.headerview = new Header({'root', hDom, 'wrapper': hDom});
    },
    /*
    * create 方法， view首次初始化调用
    */
    create:function(){
      //调用子类onCreate
      if(this.onCreate){
        this.onCreate();
      }
    },
    /*
    * View 销毁方法
    */
    destroy:function(){
      this.$el.remove();
    },
    /*
    * View 显示时调用的方法
    */
    show:function(){
      if(document.activeElement){
        document.activeElement.blur();
      }
      //生成头部
      this._createHeader();
      //调用子类的onshow
      if(!this.switchByOut){
        this.$el.show();
      }
      if(this.triggerShow && this.onShow){
        this.onShow();
      }
      if(this.onAfterShow){
        this.onAfterShow();
      }
      //注册Web_view_did_appear 事件
      //Guider.registerAppearEvent(_.bind(this.onAppearHandler, this));
      if(this.onBottomPull){
        this._onWindowScroll = $.proxy(this.onWindowScroll, this);
        this.addScrollListener();
      }

      if(this.scrollZero){
        window.scrollTo(0,0);
      }

      this.triggerShow = true;
      this.triggerHide = true;

      //如果定义了addScrollListener,说明要监听滚动条事,此方法在cListView中实现
      if(this.addScrollListener){
        this.addScrollListener();
      }
    }，
    /*
    * View 隐藏
    */
    hide: function(){
      //取消web_view_did_appear 事件的注册
      //Guider.unregisterAppearEvent();

      //调用子类onHide方法
      if(this.triggerHide && this.onHide){
        this.onHide();
      }
      if(this.removeScrollListener){
        this.removeScrollListener();
      }
      this.$el.hide();
    },
    /**
     * View 从Native 回来，重新获取焦点时调用，此方法只在hybrid可用
     * @param {String} data 再次唤醒事由Native传来的参数
     */
    onAppear: function (data) {
      console.log('onAppear --------------');
    },
    onAppearHandler: function (param) {
    },
    jump:function(){},
    cross:function(){},
    forward:function(){},
    back:function(){},
    refresh:function(){},
    /*
    * 唤醒APP， 要求返回一个app接受的字符串
    */
    getAppUrl:function(){},
    /*
    * 返回URL中的参数的值
    */
    getQuery:function(key){
      //TODO
    },
    /*
    * 保存滚动条位置
    */
    saveScrollPos:function(){
      this.scrollPos = {
        x: window.scrollX,
        y: window.scrollY
      };
    },
    /*
    * 恢复原滚动条位置
    */
    restoreScrollPos:function(){
      window.scrollTo(this.scrollPos.x, this.scrollPos.y);
    },
    /*
    * 空方法
    */
    turning:function(){},

    /**
     */
    showMessage: function (params) {
      //TODO
    },
    /**
     */
    hideMessage: function () {
      //TODO
    },
    /**
     */
    showConfirm: function (params) {
      //TODO
    },
    /**
     */
    hideConfirm: function () {
      //TODO
    },

    /**
     */
    showWarning404: function (params) {
        //TODO
    },

    /**
     */
    hideWarning404: function () {
      //TODO
    },
    /**
     */
    showToast: function (params) {
      //TODO
    },
    /**
     */
    hideToast: function () {
      //TODO
    },
    /**
     */
    showLoading: function (params) {
      //TODO
    },
    /**
     */
    hideLoading: function (opener) {
      //TODO
    },
    /**
     * 设置html的title
     */
    setTitle: function (title) {
      document.title = title;
    },
    /**
     */
    sendUbt: function () {
      //TODO
    }
  });

  return PageView;
});
