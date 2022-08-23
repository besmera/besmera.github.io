% HTTP State
% Dr. Andrew Besmer


# Cookies

## HTTP

* HTTP is stateless

## Cookies

* What are cookies?
* Why do we use them?

## Cookies

* Use the [https://chrome.google.com/webstore](Chrome Web Store) to install "Edit this cookie"
	* Can be used to inspect, delete, and modify cookies
* In general, should never store anything important in the cookie
    * For example, a cookie that stores the username of the signed in user for the purposes of access control

## Cookies

* Setting cookies is very easy
	* In the HTTP Response send a header `Set-Cookie: name=value`
* Use `header()` to set HTTP headers
    * Be sure to do this ***before*** you send even your first byte of html for the page
* Lets do it

## Cookies

* To access the cookie we can use another super global `$_COOKIE` 
	* Lets look at it and see what is in it

## Cookies

* According to the Netscape standard the **value** part of `Set-Cookie` *"is a sequence of characters excluding semi-colon, comma and white space."*

## Cookies

* What if I want to store a comma separated list of of the companies we visited in the cookie

## Cookies

* According to the Netscape standard the **value** part of `Set-Cookie` *"is a sequence of characters excluding semi-colon, comma and white space. If there is a need to place such data in the name or value, some encoding method such as URL style %XX encoding is recommended, though no encoding is defined or required."*
* So we need to choose some encoding method.  The method of encoding is irrelevant as long as it does not contain a semi-colon, comma, or whitespace.

## Cookies

* Common encodings to chose for cookies include
	* `urlencode()`
	* `urldecode()`
	* `base64_encode()`
	* `base64_decode()`


## Cookies

* The cookies we have tried have been setup as "session cookies"
	* They ~~will~~ should cease to exist when the client closes the browser
	* `Set-Cookie` can be specified with a 
		* `Max-Age` in seconds or 
		* `Expires` specified as `Wdy, DD Mon YYYY HH:MM:SS GMT`

```http
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
```

## Cookies

* Several versions of Internet Explorer do not support the `Max-Age` directive so `Expires` or both are typically used in cases of needing maximum coverage
* To delete a cookie 
	* Set the `Max-Age` to `0` or a negative number
	* Set the `Expires` to a previously occuring time `Thu, 01 Jan 1970 00:00:01 GMT`

## Cookies

* You may find `setrawcookie($name, $value = "", int $expire = 0)` easier to use
	* This is only a PHP method, not an HTTP method.
	* Same rules regarding setting cookie before body apply
* You may find `setcookie()` even easier
    * Again PHP specific, will automatically urlencode data for you
