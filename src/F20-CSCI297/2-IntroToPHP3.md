% Intro to PHP 2
% Dr. Andrew Besmer


# Arrays

## Arrays

* PHP Arrays are `0` 
* They can be accessed with typical array operators `[]`
* PHP will index values unless you provide one

```php
<?php
$animal[] = "aardvark";
$animal[] = "bat";
$animal[] = "cat";
$animal[1] = "bug";
$animal[4] = "elephant";

var_dump($animal);

/*
array(4) {
  [0]=>
  string(8) "aardvark"
  [1]=>
  string(3) "bug"
  [2]=>
  string(3) "cat"
  [4]=>
  string(8) "elephant"
}
*/
```

## Associative Arrays

* Arrays can also have indexes of a string

```php
<?php
$name['first'] = 'Andrew';
$name['last'] = 'Besmer';

echo "Hey there " . $name['first'];

//Hey there Andrew
```

## Looping Through an Array

* Never loop through a php array with a counter
* Always use a foreach or direct access to elements you are looking for

```php
<?php
$name['first'] = 'Andrew';
$name['last'] = 'Besmer';

foreach($name as $key => $value)
{
	//echo "Your " . $key . " name is " . $value . ".";
	echo "Your $key name is $value.";
}


//Your first name is Andrew.Your last name is Besmer.
```

## Useful Array Functions

* `is_array($animals)` - Is `$animals` an array `true` or `false`
* `count($animals)` - Return the number of elements in the array 
* `sort($animals)` - Sorts the array elements
* `explode(',', 'Blue,Green')` - Returns the array `['Blue','Green']`
* `unset($animals[0])` - Removes the element at index `0`
* `in_array(5, $values)` - Is `5` in the array of `$values`
* `isset($myArray['pos'])` - Does an element at position `pos` exist in `$myArray`?

## String Functions

* There are many string functions
	* `strtoupper('Andrew')` - Returns `ANDREW`
	* `strtolower('Andrew')` - Returns `andrew`
	* `substr($myString, 1, 5)` - Return characters at posistions 1-5
	* `substr($myString, -4)` - Return the last 4 characters of the string
	* `strpos('Andrew Besmer', 'Besmer')` - Returns location `Besmer` is at in the string `7` or `false` if not found
* [Complete List](https://www.php.net/manual/en/ref.strings.php) found in documentation

# Forms and Superglobals

## Typical Data Access

* Data is typically passed from the web server process by inserting that data into so called "superglobals"
* Data may also be inside files or databases

## Forms

* [We use forms all the time](https://www.winthrop.edu/web/site-feedback.aspx)

	* User sends data to server
	* Server processes data
		* Mail
		* DB
	* Server sends data to user

## Forms

<form action="http://deltona.birdnest.org/~acc.besmera2/simulators/FormData/echo.php" method="GET">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>



## Sending Data

* Lets fill out this form using the following pieces of data
	* Andrew
	* 4825
	* besmera
	* Thurmond 304

\ 

<label><input type="text" name="first"></label><br>
<label><input type="text" name="username"></label><br>
<label><input type="text" name="room"></label><br>
<label><input type="text" name="extension"></label><br>


## Sending Data

* Lets fill out this form using the following pieces of data
	* Andrew
	* 4825
	* besmera
	* Thurmond 304
* Labeling/naming is neccessary for both the human AND the server

\ 

<label>Name: <input type="text" name="first"></label><br>
<label>Username: <input type="text" name="username"></label><br>
<label>Room: <input type="text" name="room"></label><br>
<label>Ext: <input type="text" name="extension"></label><br>

## Name Value Pairs

* camelCaseIsUsedForMultipleWords
* itshardertoreadtextlikethis

## Query String

* Starts with `?`
* Uses name value pairs seperated by `=`
* More than one seperated by `&`
* [URL Encoding](https://upload.wikimedia.org/wikipedia/commons/d/dd/ASCII-Table.svg)

```html
?first=Andrew&last=Besmer
```

## Try it

* [Echo Tool](http://deltona.birdnest.org/~acc.besmera2/simulators/FormData/echo.php)


## Form Structure

* Forms use the `form` tag and require two attributes
	* `action` - Where the data will be sent
	* `method` - How the data will be sent

```html
<form action="http://deltona.birdnest.org/~acc.besmera2/simulators/FormData/echo.php" method="GET">

</form>
```


## Form Methods

* GET 
	* Visible in url
	* Saved in browser history
	* Has size limits

* POST
	* Sent as part of message body
	* Not stored in browser history
	* No practical size limits


## GET Form

<form action="http://deltona.birdnest.org/~acc.besmera2/simulators/FormData/echo.php" method="GET">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>

```html
<form action="http://deltona.birdnest.org/~acc.besmera2/simulators/FormData/echo.php" method="GET">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>
```

## POST Form

<form action="http://deltona.birdnest.org/~acc.besmera2/simulators/FormData/echo.php" method="POST">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>

```html
<form action="http://deltona.birdnest.org/~acc.besmera2/simulators/FormData/echo.php" method="POST">
  <label>First: <input type="text" name="first"></label><br>
  <label>Last: <input type="text" name="last"></label><br>
  <button type="submit">Submit</button>
</form>
```


## \$\_GET/\$\_POST

* The superglobals `$_GET` and `$_POST` contain the name value pairs sent as part of a GET/POST request from your form[^XSS]
* `$_SERVER` contains information relevant to the execution environment `['REQUEST_METHOD']` is of particular interest.


## \$\_GET/\$\_POST

```php
<!DOCTYPE html>
<html>
<head>
    <title>Hello There</title>
</head>
<body> 
<?php
        if($_SERVER['REQUEST_METHOD'] == 'GET')
        {
            ?>
                <form method="POST" action="index.php"> 
                    <label>First Name: <input type="text" name="firstName"></input></label><br /> 
                    <label>Last Name: <input type="text" name="lastName"></input></label>
                    <input type="submit" value="Submit" name="submit">
                </form>
            <?php
        } 
        else {
            if(isset($_POST['firstName']) && isset($_POST['lastName']))
            {
                $firstName = "Somebody";
                $lastName = "Cool";
    
                if($_POST['firstName'] != '')
                {
                    $firstName = $_POST['firstName'];
                }
    
                if($_POST['lastName'] != '')
                {
                    $lastName = $_POST['lastName'];
                }
    
                echo "Hello there $firstName $lastName.";
            }
            else
            {
                echo "Sorry you must access this page by filling out the form.";
            }
        }
        ?>
    </body>
</html>
```

[^XSS]: XSS has been left in example for simplicity.

<div class="notes">
This is some notes
</div>
