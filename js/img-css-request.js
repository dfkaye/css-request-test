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
        
        if (typeof url == 'string' && !(url in requested)) {
          
          var img = new Image();
          
          requests[url] = img;
          
          img.onload = function () {
            console.log(uri + ' is loaded');
            console.log(img)
          }
          
          img.src = uri;      
        }
      }
    }
    
  }
  
}());
