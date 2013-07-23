;(function() {

  var requests = {};
  var styleTags = [];
  
  window.requestCss = requestCss;
  
  /*
   * param - any number of string arguments to css filepaths
   * 
   * callback - last argument must be a function
   */
  function requestCss() {
  
    var args = arguments;
    var len = args.length;
    var callback = args[len - 1];
    var pending = len;
    var cssText = '';
    var url;
    
    if (typeof callback === 'function') {
    
      len = len - 1;

      for (var i = 0, img; i < len; i++) {
        
        url = args[i];
        
        if (typeof url == 'string' && !(url in requests)) {
          
          var img = new Image();
          
          requests[url] = url;
          img.src = url;
          img.onload = img.onerror = function () {
            
            //console.log(url + ' is loaded');
            console.log('loaded ' + url)
            loadCss(url, callback);
          }
          

        }
      }
    }
    
  }
  
  function loadCss(url, callback) {
    
    var cssText = "\n@import url('" + url + "');";
    var style = styleTags[styleTags.length - 1];
    
    if (!style) {
      
      style = document.createElement('style');
      
      style.setAttribute('type', 'text/css');
      //style.setAttribute('media', 'all');
      
      if (style.addEventListener) {
        console.log('addEventListener')
      	
      	function handle() {
          //sheet.removeEventListener('load', handle, false);
          handleOnLoad(style, callback, 20) // see above - try 20 times
        }
        
        style.addEventListener('load', handle, false);
      } else {
      	console.log('onload')

        style.onload = function () {
          //style.onload = null;
      	  handleOnLoad(style, callback, 20) // see above - try 20 times
        }
        
      }
      
      styleTags.push(style);
      
      // append the element right away so that the import directive runs on an active element
      // borks out otherwise
      document.getElementsByTagName('head')[0].appendChild(style);      
    }
            
    if (style.styleSheet) {
      // internet explorer
      style.styleSheet.cssText += cssText;
    } else {
      // most dom compliant browsers
      style.appendChild(document.createTextNode(cssText));
    }

  }
  
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
  
  
}());
