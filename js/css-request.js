;(function() {

  var requests = {};
  
  window.requestCss = requestCss;
  
  /*
   * param url - string url to css filepaths
   * 
   * callback - last argument must be a function
   */
  function requestCss(url, callback) {
            
    if (typeof url != 'string' || (url in requests)) {
      return false; 
    }
    
    // prevent accidental re-requests - need a hook to dump cache or force/refresh
    requests[url] = {url: url, callback: callback};

    var link = document.createElement('link');
    
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    
    document.getElementsByTagName('head')[0].appendChild(link);

    if (link.addEventListener) {
      
      //console.log('using addEventListener');
      
      function handle() {
        link.removeEventListener('load', handle, false);
        callback();
      }
      
      link.addEventListener('load', handle, false);
      
    } else {
      
      //console.log('using onload')

      var onload = link.onload;
      
      link.onload = function () {
        try {
          onload();
        } catch (err) {
          console.warn('error loading css at [' + url + ']: ' + err.message);
        } finally {
          callback();
        }
      }
    }
    
    // worth turning into a status object eventually
    return requests[url];
  }

}());
