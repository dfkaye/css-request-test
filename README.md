css-request-test
================

experimental html &amp; js for loading css stylesheets dynamically


motivation
----------

# 3rdeden tweet
# stoyan's blog

working examples
----------------

# rawgithub to link strategy
# rawgithub link to ie fallback style/imports strategy

a word or two about the fallback strategy
-----------------------------------------

Microsoft's developers are telling you something important when you they limit 
your stylesheet payload to 32 or 255 or whatever - you're overloading your document with crap,
and probably un-setting a lot of css rules you already worked hard to get right the first time.

Better to reduce your ruleset than complain about MSIE.  CODE IS NOT ART, GET OVER IT (spoken with
love and compassion, of course).

imports strategy appears to block rendering.
