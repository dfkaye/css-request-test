;(function() {

  var requests = {};
  
  window.requestCss = requestCss;
  
  /*
   * param url - string url to css filepaths
   * 
   * callback - last argument must be a function
   */
  function requestCss(url, callback) {
            
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

    if (link.addEventListener) {
      
      console.log('using addEventListener');
      
      function handle() {
        link.removeEventListener('load', handle, false);
        callback();
      }
      
      link.addEventListener('load', handle, false);
      
    } else {
      
      console.log('using onload')

      var onload = link.onload;
      
      link.onload = function () {
        try {
          onload();
        } catch (err) {
          
        } finally {
          callback();
        }
      }
    }
  }

}());
