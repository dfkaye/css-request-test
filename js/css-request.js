/**
 * file: css-reques.js - provides stylesheet requestCss() api to JavaScript - 
 * author: @dfkaye - david.kaye
 * first: 12 FEB 2013
 * previous: 12 FEB 2013
 * last: 22 JUL 2013
 *
 * Prior Art:
 *   - http://www.phpied.com/when-is-a-stylesheet-really-loaded/
 *   - http://www.zachleat.com/web/load-css-dynamically/
 *
 * To-DO
 *   - commonjs module support for global scope and exports
 *   - better (any) negative tests for bad URLs
 *
 */
(function () {
  
  /* public */
	
  var global = global || window;
  
  global.requestCss = requestCss;
  
  /* local */
  
  var requested = {};
  
  
  // TODO - SCAN FOR LINK AND STYLE TAGS ALREADY LOADED??  INEFFICIENT AT THIS POINT...
  
  
  /*
   * param - any number of string arguments to css filepaths
   * 
   * callback - last argument must be a function
   */
  function requestCss() {
  	
  	var args = arguments;
    var len = args.length;
    var callback = args[len - 1];
  
    var style = document.createElement('style');
  
    style.setAttribute('type', 'text/css');
    style.setAttribute('media', 'all');
  
    if (typeof callback === 'function') {
    	
    	len = len - 1;
      
      /*
       * link elements don't fire load event cross-browser (webkit, FF < 9 - opera uses addEventListener...)
       * plus IE restricts link and @import counts to 31, nesting 3 deep, etc.
       * BUT, style element fires load event!
       * AND, we can use multiple imports in a style to beat the IE restriction (no kidding!).
       */
      style.onload = onload;
      
      function onload() {
        
        style.onload = null;
        
        var sheet = style.styleSheet || style.sheet
        var cssRules = sheet.rules || sheet.cssRules
        
        if (style.styleSheet) {
          // MSIE
          console.log('MSIE:' + cssRules.length)
        } else if (style.sheet) {
          // W3C
          console.log('W3C:' + cssRules.length)
        }
      
        
        if (cssRules.length > 0) {
          callback()
        } else {
          
          setTimeout(onload, 250)
        }
      }
      
    }
        
    var pending = len;
    var cssText = '';
    var url;
            
    // append the element right away so that the import directive runs on an active element
    // borks out otherwise
    document.getElementsByTagName('head')[0].appendChild(style);
    
    for (var i = 0; i < len; i++) {
    	
    	url = args[i];
    
    	if (typeof url == 'string' && !(url in requested)) {
        
        requested[url] = url;
        
        try {
        	cssText += "\n@import url(" + url + ");";
        } catch (err) {
        	global.console && console.warn(err + ': ' + url);
        } finally {
        	continue;
        }
    	}
    }       
        
    // try not to block other processes
    setTimeout(function () {
    	
    	if (style.styleSheet) {
        // internet explorer
        style.styleSheet.cssText = cssText;
    	} else {
        // most dom compliant browsers
        style.appendChild(document.createTextNode(cssText));
    	}
    	
    }, 25);
  	
  }
  
}());
