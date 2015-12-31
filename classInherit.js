define([],function(){
  var slice = [].slice;
  var Core = function(){};

  Core.Class = function(){
    if(arguments.length === 0 || arguments.length > 2){
      throw '参数错误';
    }

    var parent = null;
    var properties = slice.call(arguments);

    if(typeof properties[0] === 'function'){
      parent = properties.shift();
    }
    properties = properties[0];

    function klass(){
      this.__properties__();
      this.initialize.apply(this, arguments);
    }

    klass.superclass = parent;
    klass.subclass = [];

    var sup__properties__ = function(){};
    var sub__properties__ = properties.__properties__ || function(){};

    if(parent){
      if(parent.prototype.__properties__){
        sub__properties__ = parent.prototype.__properties__;
      }
      var Subclass = function(){};
      Subclass.prototype = parent.prototype;
      klass.prototype = new Subclass();
      parent.subclasses.push(klass);
    }

    var ancestor = klass.superclass && klass.superclass.prototype;
    var subclassfn = function(methodName, fn){
      return function(){
        var scope = this;
        var args = [function(){
          return ancestor[methodName].apply(scope, arguments);
        }];
        return fn.apply(this, args.concat(arguments));
      };
    };
    for(var k in properties){
      var value = properties[k];

      if(ancestor && typeof value == 'function'){
        var argslist = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(value.toString())[1].replace(/\s/i,'').split(',');
        if(argslist[0] === '$super' && ancestor[k]){
          value = subclassfn(k, value);
        }
      }
      klass.prototype[k] = value;
    }
    if(!klass.prototype.initialize){
      klass.prototype.initialize = function(){};
    }

    klass.prototype.__properties__ = function(){
      sup__properties__.call(this);
      sub__properties__.call(this);
    }

    for(var key in parent){
      if(parent.hasOwnProperty(key) && key !=='prototype' && key !== 'superclass'){
        klass[key] = parent[key];
      }
    }

    klass.prototype.constructor = klass;

    return klass;
  };

  Core.extend = function(){
    var args = slice.call(arguments);
    var source = args.shift() || {};

    if(!source){
      return;
    }

    for(var i = 0, l = args.length; i<l; i++){
      if(typeof args[i] === 'object'){
        for(var key in args[i]){
          source[key] = args[i][key];
        }
      }
    }

    return source;
  }

  return Core;
});
