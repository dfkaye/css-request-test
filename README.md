css-request-test
================

experimental html &amp; js for loading css stylesheets dynamically.

motivation
----------

Read these if you're unfamiliar with the problem:

+ @3rdeden tweet [You don&#39;t understand cross browser pain until&hellip;](https://twitter.com/3rdEden/statuses/358669103973675009)
+ Stoyan's blog [When is a stylesheet really loaded?](http://www.phpied.com/when-is-a-stylesheet-really-loaded/)
+ John Albin's blog [31 reasons to hate IE&hellip;](http://john.albin.net/css/ie-stylesheets-not-loading)
+ Microsoft&#39;s removal of this limit [starting in IE10](http://msdn.microsoft.com/en-us/library/ie/hh920762(v=vs.85).aspx)

working example
---------------

+ View the working [test page](http://rawgithub.com/dfkaye/css-request-test/master/index.html)

a word or two about Microsoft limit strategy
--------------------------------------------

As painful as it is to be unable to load more than 971 stylesheets, Microsoft's developers are 
actually telling us something important when they limit the stylesheet payload to 32 or 255 or 
whatever - that means overloading the document with crap, and probably un-setting a lot of css 
rules already labored over with dedication to get right the first time.

Better to reduce the ruleset than complain about MSIE.  CODE IS NOT ART, GET OVER IT (spoken with
love and compassion, of course).

verify next
-----------

The bulk imports strategy appears to block rendering.

TODO
----

add arbitrary urls to requestCss(urls..., callback) and respond with single callback
throw errors for malformed argument types

More to come&hellip;
