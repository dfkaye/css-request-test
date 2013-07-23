/*
 * IE 9 and down to get around the total stylesheet, imports and css rules limits 
 * wisely imposed by Microsoft's developers.
 */
 
;(function () {

window.onload = function() {
 setTimeout(function() {
   document.getElementById('sleepcgi-test').innerHTML += '<br/>in progress ~ testing: should be IE 9 or less';
 }, 25);
};

  /* local */
  
  var requests = {};
  var styleTags = [];
  
  /* public */
   
  window.requestCss = importCss;
  
  /*
   * param - any number of string arguments to css filepaths
   * 
   * callback - last argument must be a function
   */
  function importCss() {
    
    var args = arguments;
    var len = args.length;
    var callback = args[len - 1];
    var pending = len;
    var cssText = '';
    var url;
    var style = styleTags[styleTags.length - 1];
    
    if (!style || style.styleSheet.imports.length > 31) {    
      
      style = document.createElement('style');

      style.setAttribute('type', 'text/css');
      //style.setAttribute('media', 'all');
      
      style.onload = function onStyleLoad() {
        
        pending -= 1;
        document.getElementById('sleepcgi-test').innerHTML += '<br/>' + style.styleSheet.imports.length;
        if (pending < 1) {
          callback();
        }
      };
     
      styleTags.push(style);
       
      // append the element right away so that the import directive runs on an active element
      // borks out otherwise
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    

    for (var i = 0; i < len; i++) {
     
      url = args[i];
    
      if (typeof url == 'string' && !(url in requests)) {
        
        requests[url] = url;
        
        try {
          cssText += "\n@import url('" + url + "');";
          //style.styleSheet.addImport(url);
        } catch (err) {
          global.console && console.warn(err + ': ' + url);

          pending -= 1;

        } finally {
          continue;
        } 
      }
    }
    style.styleSheet.cssText = cssText;
    return requests;
  }
  
  function newStyle() {
   
    return style;
  }

}());
