% Sessions
% Dr. Andrew Besmer

# Sessions

## Sessions

* Cookies are limited to ~4K
	* What if you had to store more than 4K of data?
	* What if you had several cookies?

## Sessions

* Cookies are extremely vulnerable to tampering
	* How would you fix this?

## Sessions

* PHP sets a cookie with a Session ID when you call `session_start()`
	* Lets look at one

## Sessions

* 26 Random characters is hard to guess
	* How many possibilities?

## Sessions

* You can now use the super global `$_SESSION` to write and read from
	* Store pretty much anything, arrays, strings, objects...
	* Don't need to encode!

## Sessions 

* Sessions end when the browser is closed or you call `session_destroy()`
* Consider setting `$_SESSION` to a new `array()`, why?

## Sessions

* One small cookie unlocks larger data
* Less data transmission during each request/response

## Sessions

* If you are going to redirect consider calling `session_write_close()` first


