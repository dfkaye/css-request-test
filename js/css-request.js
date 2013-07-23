/* file: css-request.js - provides stylesheet requestCss() api to JavaScript
 * author: @dfkaye - david.kaye
 * first: 12 FEB 2013
 * previous: 22 JUL 2013
 * last: 23 JUL 2013
 *
 * Prior Art:
 *   - http://www.phpied.com/when-is-a-stylesheet-really-loaded/
 *   - http://www.zachleat.com/web/load-css-dynamically/
 *
 * Uses link element strategy (i.e., creating and appending link elements per supplied URL)
 */
 
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
