/* file: css-request-imports.js - provides stylesheet requestCss() api to JavaScript
 * author: @dfkaye - david.kaye
 * first: 12 FEB 2013
 * previous: 22 JUL 2013
 * last: 23 JUL 2013
 *
 * Prior Art:
 *   - http://www.phpied.com/when-is-a-stylesheet-really-loaded/
 *   - http://www.zachleat.com/web/load-css-dynamically/
 *
 * Uses style element with @import directive strategy for IE 9 and down to get around 
 * the total stylesheet, imports and css rules limits wisely imposed by Microsoft's 
 * developers.
 */
 
;(function () {
  
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
    var url;
    var style = styleTags[styleTags.length - 1];
    
    callbacks.push(callback);
    
    for (var i = 0; i < len; i++) {
     
      url = args[i];
    
      if (typeof url == 'string' && !(url in requests)) {
        
        requests[url] = url;
        
        if (!style || style.styleSheet.imports.length > 31) {    
          
          style = newStyle();
        }
        
        try {
          //cssText += "\n@import url('" + url + "');";
          style.styleSheet.addImport(url);
        } catch (err) {
          global.console && console.warn(err + ': ' + url);
        } finally {
          continue;
        } 
      }
    }

    return requests;
  }
  
  
  /* local */
  
  var requests = {};
  var styleTags = [];
  var callbacks = [];
  
  
  function newStyle() {
    
    var style = document.createElement('style');

    style.setAttribute('type', 'text/css');
    //style.setAttribute('media', 'all');
        
    style.onload = function () {
      handleCallbacks();
    };
   
    styleTags.push(style);
     
    // append the element right away so that the import directive runs on an active element
    // borks out otherwise
    document.getElementsByTagName('head')[0].appendChild(style);
    
    return style;
  }
  
  
  function handleCallbacks() {
    var callback;
    while (callbacks[0]) {
      callback = callbacks.shift();
      callback();
    }
  }

}());
