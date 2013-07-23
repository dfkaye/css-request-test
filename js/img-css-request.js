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
    
    var style = styleTags[styleTags.length - 1];
    
    if (!style) { 
      style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      //style.setAttribute('media', 'all');
      styleTags.push(style);
    }
    
    if (typeof callback === 'function') {
    
      len = len - 1;

      for (var i = 0, img; i < len; i++) {
        
        url = args[i];
        
        if (typeof url == 'string' && !(url in requests)) {
          
          console.log(url)
          
          
          var img = new Image();
          
          requests[url] = url;
          img.src = url;
          img.onload = img.onerror = function () {
            
            //console.log(url + ' is loaded');
            console.log('loaded')
            
          }
          

        }
      }
    }
    
  }
  
  
  
  
}());
