% Files & HTTP State
% Dr. Andrew Besmer

# Scenario

## Scenario

* Telemarketing Scenario[^ContrivedTelemarketerExample]

> Lets imagine that you are building a calling system for telemarketers.  Obviously you don't want a telemarketer to call the same company multiple times.  So we will build a web based system to keep track of the companies called.  To do this we will need to use files, HTTP headers, cookies, and encoding.

[^ContrivedTelemarketerExample]: In reality this not how we would go about accomplishing this.  It makes for a good example since it uses many functions we need to learn.

# Files

## Files

* Why would we want to use files in our PHP application?

## Files

* Working with files involves several functions, for example:
	* `fopen($fileName, $mode)` - returns a `resource` to the file or `false`, if it was unable to open file
	* `fgets($resource)` - returns a `string` up to a `CRLF` or `EOF`, if it runs out of data to read `false` is returned
	* `fwrite($resource, $content)` - returns number of bytes written or `false`
	* `fclose($resource)` - returns `true` if the file is successfully close, `false` if not

* Should always close the file resource when you are finished

## Modes

* Modes
	* `R` - Read
	* `W` - Write (erase file if exists, create if not)
	* `A` - Append (create if does not exists, appends to end)
* Other modes exist but are not frequently used

## Example File

* Name this file `callList.csv`

```csv
1,Dictum Eu Company,1-194-286-3041
2,Proin Industries,1-319-137-9279
3,Enim Sit Industries,1-562-872-9219
4,Phasellus In Corp,1-128-930-9807
5,Dolor Quam Elementum PC,1-928-801-9652
6,Nibh Lacinia Orci PC,1-332-594-5321
7,Donec Porttitor Tellus Company,1-873-991-8646
8,Ut Dolor Consulting,1-514-308-9570
9,Suspendisse Ac Metus PC,1-466-488-2655
10,Lorem Incorporated,1-778-863-7253
11,Curabitur Consequat Incorporated,1-496-807-1201
12,Non Company,1-383-777-6247
13,Enim Inc,1-441-333-2507
14,Quisque Libero Industries,1-821-364-5581
15,At Pretium Aliquet Incorporated,1-651-831-1982
16,Mi Consulting,1-358-903-2637
17,Lacus Varius LLP,1-493-938-0338
18,Nibh Dolor Foundation,1-706-129-8454
19,Risus Associates,1-657-994-6688
20,Viverra LLC,1-857-231-3877
21,Nunc Corp,1-652-403-0424
22,Praesent Luctus Curabitur Foundation,1-363-243-2228
23,Risus PC,1-110-328-3877
24,Eleifend Nunc Risus Associates,1-873-927-9209
25,Vel Convallis LLP,1-430-846-6335
```

## Opening

* To open the file for reading
	* `fopen()` the file by providing the location and mode
	* Check if it is a `resource`
		* It is possible that the file does not exist, can not be accessed, etc...	
	* Don't forget to later close

```php
$callList = fopen("callList.csv", "r");

if(!is_resource($callList))
{
	echo "Could not open file";
	exit();
}

//Do stuff with your file

fclose($callList);
```

## Using

* There are many ways to work with the file
	* Could use `fgetscsv()` to parse csv but we would limit our learning today :)
	* We will use `fgets()`

```php
//Open the file

while($line = fgets($callList))
{
	echo $line;
}

//Close the file
``` 

> * What will `$line` contain during each iteration?
* When will this while loop end?

## Parsing

* On first iteration:

```
//How can we turn this:
"1,Dictum Eu Company,1-194-286-3041"

//Into this:
array("1", "Dictum Eu Company", "1-194-286-3041");
```

## Explode

* Can use PHP functions to parse the line into an array for us[^csvAssumption]
	* `explode($delimiter, $source)` - returns an `array` of `string`s by splitting it up using the delimiter
	* `implode($delimiter, $source)` - returns a `string` by combining all the elements of the `array` inserting the delimiter between each


```php
$companies[]=explode(",", $line);

$line = implode(",",array("1", "Dictum Eu Company", "1-194-286-3041"));
```


> * Once all iterations have completed on `callList.csv` what will be in `$companies[0]`?

[^csvAssumption]: We are assuming that the csv file is a very simple one here. This in reality is a terrible assumption.

## In Array

* `in_array($needle, $haystack)` - Searches the haystack (`array`) for the needle (element) and returns `true` if found, `false` if not

* How would you check to see if the 5th row is in the variable `$companies` using `in_array()`?

## In Array
 
```php
in_array(4,$companies);
//Because $companies[4]=array("5","Dolor Quam Elementum PC","1-928-801-9652");
```

## Outputting

* Lets build the overview and details screen

# Headers

## Headers

* Recall headers from HTTP Lecture
* Each header is written `Header-Name: Value\r\n`
* What can we use HTTP headers for?

## Redirection

* Sometimes you need to redirect someone 
	* The page moved temporarily or permanently
	* Send to informative page
	* Etc...
* When do you commonly get redirected?

## Headers

* What happens if someone were to call the telemarketing script with an id that does not exist in the file?

> * Instead of outputting a message lets redirect the user back to the overview screen where they can make a valid choice.

## Location

* Redirection can be accomplished by using the `Location` header
	* Older browsers require a fully qualified absolute URL per HTTP spec
	* Newer browsers will use a relative URL

## Location

* Example HTTP Request/Responses

```http
GET /~acc.besmera2/a.php HTTP/1.1
Host: infd.birdnest.org
```

```http
HTTP/1.1 302 Temporarily Moved
Location: /~acc.besmera2/b.php
```

```http
GET /~acc.besmera2/b.php HTTP/1.1
Host: infd.birdnest.org
```

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 2

Hi
```

> * How many HTTP Requests?
* Which HTTP method will the *browser* use when redirected?

## PHP

* Can use `header()` to modify the headers being sent to the client
* `CRLF` is sent by the server for you

```php
<?php

header("Location: /~acc.besmera2/b.php");
```

> * Lets do an example

## Headers

* Recall headers must occur *before* message body
* What would happen if we did output before the header?
* Lets do it[^HeaderOutputBuffering]

[^HeaderOutputBuffering]: Output buffering can be used to buffer output until a later time.  During this time headers can be modified even though you have output.

# Cookies

## HTTP

* Recall that HTTP is stateless
* What does this mean?


## Cookies

> * What are cookies?
* Why do we use them?

## Cookies

* Use the [https://chrome.google.com/webstore](Chrome Web Store) to install "Edit this cookie"
	* Can be used to inspect, delete, and modify cookies

## Cookies

* Setting cookies is very easy
	* In the HTTP Response send a header `Set-Cookie: name=value`
	* Lets do it

## Cookies

* To access the cookie we can use another super global `$_COOKIE` 
	* Lets look at it and see what is in it

## Cookies

* According to the Netscape standard the **value** part of `Set-Cookie` *"is a sequence of characters excluding semi-colon, comma and white space."*

## Cookies

* What if I want to store a comma separated list of of the companies we called in the cookie

## Cookies

* According to the Netscape standard the **value** part of `Set-Cookie` *"is a sequence of characters excluding semi-colon, comma and white space. If there is a need to place such data in the name or value, some encoding method such as URL style %XX encoding is recommended, though no encoding is defined or required."*
* So we need to choose some encoding method.  The method of encoding is irrelevant as long as it does not contain a semi-colon, comma, or whitespace.

## Cookies

* Common encodings to chose for cookies include
	* `urlencode()`
	* `urldecode()`
	* `base64_encode()`
	* `base64_decode()`

* Lets do it
