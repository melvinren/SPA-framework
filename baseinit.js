define(['cWebApp'], function(APP){

  function init(){
      if(M.config){
        require([M.config], function(){
          _init();
        });
      }else{
        _init();
      }
  }


  function _init(){
    M.instance = new APP({});

  }

  return init;

})
