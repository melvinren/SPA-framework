define([],function(){
  //偏移步长
  var step = 20 ,
      touch = {} ,
      down = "touchstart",
      move = "touchmove",
      up = "touchend";
  if(!('ontouchstart' in window)){
    down = "mousedown";
    move = "mousemove";
    up = "mouseup";
  }
  /*
  * 判断手势胡
  */
  function swipeDirection(x1, x2, y1, y2, sensibility){
    //x移动的步长
    var _x = Math.abs(x1 - x2);
    //y移动的步长
    var _y = Math.abs(y1 - y2);
    var dir = _x > _y ? (x1 - x2 >0 ? 'left' : 'right') : (y1-y2>0 ? 'up' : 'down');

    //设置灵敏度限制
    if(sensibility){
      if(dir == 'left' || dir == 'right'){
        if((_y/_x) > sensibility){
           dir = '';
         };
      }else if(dir == 'up' || dir == 'down'){
        if((_x/_y) > sensibility){
          dir = '';
        };
      }
    }
    return dir;
  }

  function flip(el,dir,fn, noDefault, sensibility, stepSet){
    if(!el || !el[0]){return;}
    var _dir = '',
        _step = stepSet || step;

    el[0]['__flip_'+dir] = fn;
    if(el[0].__hasFlipEvent){
      return;
    }
    el[0].__hasFlipEvent = true;

    el.on(down, function(e){
      var pos = (e.touches && e.touches[0]) || e;
      touch.x1 = pos.pageX;
      touch.y1 = pos.pageY;
    }).on(move, function(e){
      var pos = (e.touches && e.touches[0]) || e;
      touch.x2 = pos.pageX;
      touch.y2 = pos.pageY;

      if((touch.x2 && Math.abs(touch.x1 - touch.x2) > _step) ||
         (touch.y2 && Math.abs(touch.y1 - touch.y2) > _step)){
           _dir = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2, sensibility);
      }
      var preventDefaultFlag = typeof noDefault == 'function' ? noDefault(_dir) : noDefault;
      if(!preventDefaultFlag){
        e.preventDefault();
      }
    }).on(up, function(e){
      var pos = (e.changedTouches && e.chagnedTouches[0]) || e;
      touch.x2 = pos.pageX;
      touch.y2 = pos.pageY;

      if((touch.x2 && Math.abs(touch.x1 - touch.x2) > _step) ||
         (touch.y2 && Math.abs(touch.y1 - touch.y2) > _step)){
           _dir = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2, sensibility);

           if(typeof el[0]['__flip_'+_dir] == 'function'){
             el[0]['__flip_'+_dir]();
           }
      }else{
        if(typeof el[0]['__flip_tap'] == 'function'){
          el[0]['__flip_tap']();
        }
      }
      //reset
      touch = {};
    })
  }

  /*
  * 注销
  */
  function flipDestroy(el){
    if(!el || !el[0]){return;}

    el.off(down).off(move).off(up);
    if(el[0].__hasFlipEvent) { delete el[0].__hasFlipEvent;}
    if(el[0].__flip_left) { delete el[0].__flip_left;}
    if(el[0].__flip_right) { delete el[0].__flip_right;}
  }

  return { flip: filp, flipDestroy: flipDestroy};
});
