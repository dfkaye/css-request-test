/* file: css-request-imports.js - provides stylesheet requestCss() api to JavaScript
 * author: @dfkaye - david.kaye
 * first: 12 FEB 2013
 * previous: 23 JUL 2013
 * last: 26 JUL 2013
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
 
  /* local vars and fns */
  
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
  
  
  /* public api */
   
  window.requestCss = importCss;
  
  /*
   * param url - string url to css filepath
   * 
   * callback - last argument must be a function
   */
  function importCss(url, callback) {
            
    if (typeof url != 'string' || (url in requests)) {
      return false; 
    }
    
    // prevent accidental re-requests - need a hook to dump cache or force/refresh
    requests[url] = {url: url, callback: callback};
    
    var style = styleTags[styleTags.length - 1];

    if (!style || style.styleSheet.imports.length > 31) {    
      
      style = newStyle();
    }
    
    try {
      style.styleSheet.addImport(url);
    } catch (err) {
      global.console && console.warn(err + ': ' + url);
    } finally {
      callbacks.push(callback);
    } 
    
    // worth turning into a status object eventually
    return requests[url];
  }

}());
