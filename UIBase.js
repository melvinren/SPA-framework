/*
* @description 提供UI构建的基础方法
*/
define([], function(){
  var base = {};

  base.config = {
    prefix: 'cui-'
  };
  /*
  * setConfig
  */
  base.setConfig = function(name, value){
    base.config[name]= value;
  }
  /*
  * @param el {element} 元素对象
  * @description 返回元素el在页面中的位置
  */
  base.getElementPos = function(el){
    var top = 0 , left = 0;
    do{
      top += el.offsetTop;
      left += el.offsetLeft;
    }while(el = el.offsetParent);
    return {
      top: top,
      left: left
    };
  }
  /*
  *@description 返回唯一的字符串
  */
  base.getCreateId = (function(){
    var diviso = new Date().getTime();
    return function(){
      return base.config.prefix + (++diviso);
    };
  })();
  /*
  * @description 获取更大的zIndex值，每次调用该函数， 都会产生一个更大值的z-index
  */
  base.getBiggerzIndex = (function(){
    var diviso = 3000;
    return function(){
      return ++diviso;
    };
  })();
  /*
  *@param el {Element} 元素对象
  *@param styleName {String} 样式名称
  *@description 获得某个元素的最终(实时)的样式值
  */
  base.getCurStyleOfEl = function(el, styleName){
    if(document.defaultView && document.defaultView.getComputedStyle){
      return document.defaultView.getComputedStyle(el).getPropertyValue(styleName);
    }else if(el.currentStyle){
      var sec = styleName.split('-'),
          cen = [],
          arr;
      for(var i=0; i< sec.length;i++){
        if(i===0){
          cen.push(sec[i]);
        }else{
          arr = sec[i].split('');
          arr[0] = arr[0].toUpperCase();
          cen.push(arr.join(''));
        }
      }
      cen = cen.join('');
      return el.currentStyle[cen];
    }
  };
  /*
  * @description 安全的将字符串转换为数字
  */
  base.strToNum = function(str){
    var num = parseInt(str.replace(/[a-z]/i,''));
    return isNaN(num) ? 0 : num;
  };
  /*
  * @description 获取元素占位的高度
  */
  base.getElementRealSize = function(el){

  };
  /*
  * @description 返回包含高宽的对象
  */
  base.getPageSize = function(){
    var width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        heith = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    return {
      width: width,
      height : height
    };
  };
  /*
  * @description 获取窗口滚动条的位置
  */
  base.getPageScrollPos = function(){
    var left = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
        top = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
        height = Math.min(document.documentElement.clientHeight, document.body.clientHeight),
        width = Math.min(document.documentElement.clientWidth, document.body.clientWidth),
        pageWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    return {
      top: top,
      left: left,
      height: height,
      width: width,
      pageWidth: pageWidth,
      pageHeight: pageHeight
    };
  };
  /*
  * @description 获取鼠标位置
  */
  base.getMousePos = function(event){
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop),
        left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);

    return {
      top: top + event.clientY,
      left: left + event.clientX
    }
  };
  /*
  * @description 获取event在元素上的位置
  */
  base.getMousePosOfElement = function(event, el){
    var mpos = base.getMousePos(event),
        pos = base.getElementPos(el),
        w = el.clientWidth,
        h = el.clientHeight;
    var x = mpos.left - pos.left,
        y = mpos.top - pos.top;
    x = x < 0 ? 0 : (x > w ? w : x);
    y = y < 0 ? 0 : (y > h ? h : y);
    return {x:x, y:y};
  }
  /*
  */
  base.createElement = function(tag, options){
    var el = document.createElement(tag),
        i,
        t;
    if(options){
      for(i in options){
        switch(i){
          case 'attr':
            if(typeof options[i] === 'object'){
              for(t in options[i]){
                if(options[i][t]){
                  el.setAttribute(i, options[i][t]);
                }
              }
            }
            break;
          case 'styles':
            if(typeof options[i] === 'object'){
              for(t in options[i]){
                if(options[i][t]){
                  el.style[t] = options[i][t];
                }
              }
            }
            break;
          case 'id':
            el.id = options[id];
            break;
          case 'class':
            el.className = options[i];
            break;
          case 'html':
            el.innerHTML = options[i];
            break;
          default:break;
        }
      }
    }
    return el;
  };

  return base;
});
