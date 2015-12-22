define([], function(){

  var contentTypeMap = {
    'json' : 'application/json',
    'jsonp' : 'application/json'
  };

  var _getContentType = function(contentType){
    if(contentType){
      contentType = contentTypeMap[contentType] ? contentTypeMap[contentType] : contentType;
    }
    return contentType;
  };

  function get(url,data, callback, error, timeout){
    var opt = _getCommonOpt(url, data, callback, error);
    opt.type = 'GET';
    opt.timeout = timeout;
    return _sendReq(opt);
  }

  function post(url, data, callback, error, timeout){
    var contentType = data.contentType;
    data = JSON.stringify(data);
    var opt = _getCommonOpt(url, data, callback, error);
    opt.type = 'POST';
    opt.dataType = 'json';
    opt.timeout = timeout;
    opt.contentType = _getContentType(contentType) || 'application/json';
    return _sendReq(opt);
  }

  function _sendReq(opt){
    var loadedLength = 0 ;
    var obj ={
      url: opt.url,
      type:opt.type,
      dataType:opt.dataType,
      data:opt.data,
      contentType:opt.contentType,
      timeout: opt.timeout || 50000,
      beforeSend:function(xhr){
        xhr.onprogress = function(event){
          loadedLength = event.loaded ? event.loaded : event.position;
        }
      },

      success: function(res, status, xhr){
        opt.callback(res);
      },

      error:function(err){
        opt.error && opt.error(err);
      }
    };

    //是否跨越
    if(opt.url.indexOf(window.location.href) === -1){
      obj.crossDomain = !!opt.crossDomain;
    }

    return $.ajax(obj);
  }

  function _getCommonOpt(url, data, callback, error){
    return {
      url:url,
      data:data,
      callback:callback,
      error:error
    }
  }
})
