;(function() {

  var requests = {};
  var styleTags = [];
  
  window.requestCss = requestCss;
  
  /*
   * param url - string url to css filepaths
   * 
   * callback - last argument must be a function
   */
  function requestCss(url, callback) {

    var cssText = '';
            
    if (typeof url == 'string' && !(url in requests)) {
          
      var request = {url: url, callback: callback};
      var img = new Image();
      
      requests[url] = request;
      
      img.src = url;
      img.onload = img.onerror = function () {
         loadCss(request);
      }
      
    }
    
  }

  function loadCss(request) {

    var url = request.url;
    var callback = request.callback
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    
    document.getElementsByTagName('head')[0].appendChild(link);
    //console.log(url + ' is loaded');
    //console.log('loadCss ' + request.url)
    
    /*var cssText = "\n@import url('" + url + "');";
    var style = styleTags[styleTags.length - 1];
    
    if (!style || (style.styleSheet && style.styleSheet.rules.length > 31)) {
      
      style = document.createElement('style');
      
      style.setAttribute('type', 'text/css');
      //style.setAttribute('media', 'all');
          
      styleTags.push(style);
      
      // append the element right away so that the import directive runs on an active element
      // borks out otherwise
      document.getElementsByTagName('head')[0].appendChild(style);      
    }*/

    if (link.addEventListener) {
      
      console.log('addEventListener')
      
    	function handle() {
        link.removeEventListener('load', handle, false);
        callback();
        
        //handleOnLoad(style, request, 500) // see above - try 20 times
      }
      
      link.addEventListener('load', handle, false);
      
    } else {
      
    	console.log('onload')

      var onload = link.onload;
      
      link.onload = function () {
        //style.onload = null;
        try {
          onload();
        } catch (err) {
          
        } finally {
    	    callback();
        
        //handleOnLoad(style, request, 500) // see above - try 20 times
        }
      }
      
    }
      
    /*if (style.styleSheet) {
      // internet explorer
      style.styleSheet.cssText += cssText;
    } else {
      // most dom compliant browsers
      style.appendChild(document.createTextNode(cssText));
    }*/

  }
  
  function handleOnLoad(style, request, count) {
    
    var url = request.url;
    var callback = request.callback;
    var message = 'handleOnLoad ' + count;
    var cssRules;
    var length;

    if (style.styleSheet && style.styleSheet.imports) {
      
      // MSIE
      
      //console.dir(sheet.rules)
      //console.dir(sheet.imports)

      cssRules = style.styleSheet.imports;
      //cssRules = style.styleSheet.rules
      length = cssRules.length;
      message += '; MSIE; ' + length

    } else if (style.sheet) {
            
      //console.dir(style.sheet)
      
      //cssRules = style.sheet.cssRules;
      
      try {
        cssRules = style.sheet.cssRules;
      } catch(err) {
        cssRules = ''; // x-domain firefox crap
      }
      
      length = cssRules.length
      message += '; W3C; ' + length
    } else {
    	
    	message += "; don't know what's going on"
    }

   // !!console && console.log(message + '; ' + length);

    if (length > 0) {
      
      typeof callback != 'function' || (callback())
      
    } else if (count > 0) {

      setTimeout(function() {
        
        handleOnLoad(style, request, count - 1);
        
      }, 25) // cuzillion
    }
  }
  
  
}());
