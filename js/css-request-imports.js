/*
 * IE 9 and down to get around the total stylesheet, imports and css rules limits 
 * wisely imposed by Microsoft's developers.
 */
 
;(function () {

  document.getElementById('sleepcgi-test').innerHTML += '<br/>testing: should be IE 9 or less';
  /* public */
   
  window.requestCss = importCss;
  
  /* local */
  
  var requests = {};
  
  function importCss() {
   
   
  }
  
}());



