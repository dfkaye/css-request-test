/**
 * file: css-request.js - provides stylesheet requestCss() api to JavaScript - 
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
	  
  window.requestCss = requestCss;
  
  /* local */
  
  var requested = {};
  
  function handleOnLoad(style, callback, count) {
    
    var message = 'handleOnLoad ' + count;
    var length;
    var sheet;
    var cssRules;
    
    if (style.styleSheet) {
      
      // MSIE
      
      //console.dir(sheet.rules)
      //console.dir(sheet.imports)

      //cssRules = style.styleSheet.rules;
      cssRules = style.styleSheet.imports
      length = cssRules.length;
      message += '; MSIE; ' + length

    } else if (style.sheet) {
    	      
      //console.dir(style.sheet)
      
      try {
        cssRules = style.sheet.cssRules;
      } catch(err) {
        cssRules = ''; // firefox bonk out
      }
      
      length = cssRules.length
      message += '; W3C; ' + length
    } else {
    	
    	message += "; don't know what's going on"
    }

    !!console && console.log(message + '; ' + document.readyState);

    if (length > 0) {
            
      callback()
      
    } else if (count > 0) {

      setTimeout(function() {
        handleOnLoad(style, callback, count - 1);
      }, 1000) // cuzillion
    }
  }  
  
  
  
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
    //style.setAttribute('media', 'all');
    
    var sheet = style.styleSheet ? style.styleSheet : (style.sheet || style);
		
    if (typeof callback === 'function') {
    	
      len = len - 1;
      
      /*
       * link elements don't fire load event cross-browser (webkit, FF < 9 - opera uses addEventListener...)
       * plus IE restricts link and @import counts to 31, nesting 3 deep, etc.
       * BUT, style element fires load event!
       * AND, we can use multiple imports in a style to beat the IE restriction (no kidding!).
       */


      if (sheet.onreadystatechange) {
      	console.log('onreadystatechange')

        sheet.onreadystatechange = function () {
          if (sheet.readyState == 'loaded' || sheet.readyState == 'complete') {
            sheet.onreadystatechange = null;
            handleOnLoad(style, callback, 20) // see above - try 20 times
          }
        }
        
      } else if (sheet.addEventListener) {
      	console.log('addEventListener')
      	
      	function handle() {
          sheet.removeEventListener('load', handle, false);
          handleOnLoad(style, callback, 20) // see above - try 20 times
        }
        
        sheet.addEventListener('load', handle, false);
      } else {
      	console.log('onload')

        sheet.onload = function () {
          sheet.onload = null;
      	  handleOnLoad(sheet, callback, 20) // see above - try 20 times
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
          cssText += "\n@import url('" + url + "');";        
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
      
    }, 0);

  }
  
}());
