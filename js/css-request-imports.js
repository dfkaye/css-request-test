/*
 * IE 9 and down to get around the total stylesheet, imports and css rules limits 
 * wisely imposed by Microsoft's developers.
 */
 
;(function () {

window.onload = function() {
  document.getElementById('sleepcgi-test').innerHTML += '<br/>in progress ~ testing: should be IE 9 or less';
}

  /* local */
  
  var requests = {};
  var styleTags = [];
  
  /* public */
   
  window.requestCss = importCss;
  
  /*
   * param - any number of string arguments to css filepaths
   * 
   * callback - last argument must be a function
   */
  function importCss() {
    
    var args = arguments;
    var len = args.length;
    var callback = args[len - 1];
    
    
    var style = styleTags[styleTags.length - 1];
    
    if (!style) {
      
      style = document.createElement('style');

      style.setAttribute('type', 'text/css');
      //style.setAttribute('media', 'all');
      
      styleTags.push(style);
    }
    
    var styleSheet = style.styleSheet;
    var rules = styleSheet.rules;
    
    
    styleSheet.addImport(url);
  }
  
  
  
}());



