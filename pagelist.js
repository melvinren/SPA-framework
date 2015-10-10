define(['pageView', 'UIBase'],
  function(PageView, UIBase){
    "use strict";
    /*
    * ListView提供列表分次加载功能
    */
    var PageList = _.extend(PageView, {
      _onWindowScroll: null,
      __isComplete__: false,
      __isLoading__: false,
      refreshLoading: null,

      /*
      * 增加页面滚动事件
      */
      addScrollListener:function(){
        this.__isComplete__ = false;
        this.__isLoading__ = false;
        if(this._onWindowScroll){
          $(window).bind('scroll', this._onWindowScroll);
        }
        var view = this;
        /*
        * 当滚动条位于顶部时， 下拉操作时触发
        */
        if(this.onTopPull){
          //TODO
          _.flip(this.$el, 'down', function(){
            var pos = UIBase.getPageScrollPos();
            if(pos.top <= 10 && !view.__isLoading__){
              view.__isLoading__ = true;
              view.onTopPull();
            }
          }, function(dir){
            var pos = UIBase.getPageScrollPos();
            return dir != 'down' || pos.top >=10;
          },0,5);
        }
      },
      /*
      * 移除页面滚动事件
      */
      removeScrollListener:function(){
        $(window).unbind('scroll', this._onWindowScroll);
        if(this.refreshLoading){
          this.refreshLoading.remove();
          this.refreshLoading = null;
        }
        _.flipDestroy(this.$el);
      },
      /*
      * 当滚动条位于底部时， 上拉操作时触发
      */
      onWindowScroll:function(){
        var pos = UIBase.getPageScrollPos();
        if(pos.top == '0'){ return ;}
        var h = pos.pageHeight - (pos.top + pos.height);
        //fix ios 不容易加载更多数据问题 shbzhang 2014/1/6
        if(h <= 81 && !this.__isComplete__ && !this.__isLoading__){
          this.__isLoading__ = true;
          if(this.onBottomPull){
            this.onBottomPull();
          }
        }
      },
      /*
      * 通知本次下拉操作完成
      */
      endPull:function(){
        this.__isLoading__ = false;
      },
      /*
      *关闭下拉通知功能
      */
      closePull:function(){
        this.__isComplete__ = false;
      },
      /*
      * 在当前list顶部显示loading
      */
      showTopLoading:function(){

      },
      /*
      * 在当前list底部显示loading
      */
      showBottomLoading:function(){

      },
      /*
      * 隐藏loading图标
      */
      hideBottomLoading:function(){

      },
      hideRefreshLoading:function(){

      },
      getLoading:function(){

      }
    });
    return PageList;
});
