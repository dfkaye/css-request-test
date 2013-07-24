CSS Request Test
================

experimental html &amp; js for loading css stylesheets dynamically, asynchronously, with event-driven 
callbacks, cross-browser.

Should become a better repo eventually&hellip;

Last modified: 24 JUL 2013

Motivation
----------

Read these if you're unfamiliar with the problem:

+ @3rdeden tweet [You don&#39;t understand cross browser pain until&hellip;](https://twitter.com/3rdEden/statuses/358669103973675009)
+ Stoyan's blog [When is a stylesheet really loaded?](http://www.phpied.com/when-is-a-stylesheet-really-loaded/)
+ John Albin's blog [31 reasons to hate IE&hellip;](http://john.albin.net/css/ie-stylesheets-not-loading)
+ Microsoft&#39;s removal of this limit [starting in IE10](http://msdn.microsoft.com/en-us/library/ie/hh920762.aspx)

Working example
---------------

+ View the working [test page](http://rawgithub.com/dfkaye/css-request-test/master/index.html)

Word or two about Microsoft limit strategy
--------------------------------------------

As painful as it is to be unable to load more than 971 stylesheets, Microsoft's developers are 
actually telling us something important when they limit the stylesheet payload to 32 or 255 or 
whatever:

# you're overloading the document with crap
# you're probably un-setting a lot of css rules you already labored over with dedication to 
    get right the first time - better reduce the ruleset than complain about MSIE.
# CODE IS NOT ART, GET OVER IT (spoken with love and compassion, of course).

More to come&hellip;
--------------------

# better repo without "test" in the name, should have the following:
# support arbitrary argument length (aka batch requests) in both implementations.
# support node.js style callback(err, data) for better err hook.
# report (but don't throw) errors for malformed argument types.
# fix imports strategy kickoff which appears to block rendering.
# document the api/examples *for the love of all that is holy.*
