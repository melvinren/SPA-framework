define([],function(){
  var Path = {};
  /**
   * 解析URL中的各项参数
   * @method Util.cUtilPath.parseUrl
   * @param url
   * @returns {{href: (*|string), hrefNoHash: (*|string), hrefNoSearch: (*|string), domain: (*|string), protocol: (*|string), doubleSlash: (*|string), authority: (*|string), username: (*|string), password: (*|string), host: (*|string), hostname: (*|string), port: (*|string), pathname: (*|string), directory: (*|string), filename: (*|string), search: (*|string), hash: (*|string)}}
   */
  Path.parseUrl = function (url) {
    var urlParseRE = /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
    var matches = urlParseRE.exec(url || "") || [];
    return {
      href        : matches[0] || "",
      hrefNoHash  : matches[1] || "",
      hrefNoSearch: matches[2] || "",
      domain      : matches[3] || "",
      protocol    : matches[4] || "",
      doubleSlash : matches[5] || "",
      authority   : matches[6] || "",
      username    : matches[8] || "",
      password    : matches[9] || "",
      host        : matches[10] || "",
      hostname    : matches[11] || "",
      port        : matches[12] || "",
      pathname    : matches[13] || "",
      directory   : matches[14] || "",
      filename    : matches[15] || "",
      search      : matches[16] || "",
      hash        : matches[17] || ""
    };
  };

  return Path;
});
