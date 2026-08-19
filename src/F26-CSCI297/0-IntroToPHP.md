% Intro to PHP
% Dr. Andrew Besmer

# About PHP

## The Language
PHP
:   PHP Hypertext Preprocessor

* Recursive acronym
* Open source
* Available on most OS
* Portable code

## Similarities
* Code similar to
	* C
	* Java
	* Perl
* Take some concepts with you or reuse existing
* Used primarily to write dynamic server side web apps
	* Can be used to make cli scripts

## Running PHP
* You can run PHP several ways:
	* Through a web server like [Apache](http://httpd.apache.org/) 
	```php
	http://localhost/myFile.php
	```
	* Directly from the command line
	```bash
	php myFile.php
	```

## Interpreted Language
PHP is an interpreted language

* Pros
	* Program can change dynamically at runtime
	* Easier to program with, just code and run!
	* Easier to move from one OS/Architecture to another
* Cons
	* Without compiling syntax errors may go undetected
	* Can be problematic for performance
		* Can be mitigated via caching

# Basic Syntax

## PHP mode
* Can move in and out of "PHP mode" as you need
	* Move into using the start tag `<?php` 
	* Can exit by using the end tag `?>`
```php
<?php
	//PHP mode
?>
```
* Execution depends on code location
	* Inside is code to be run on the server
	* Outside is ignored by interpreter and outputted[^advancedIf]
* It is good practice to leave off the closing tag in a PHP only file

[^advancedIf]: Exception is using conditionals for output, more on this later.

## PHP mode
* PHP is most frequently combined with HTML/CSS/JS for making web apps
```php
<!DOCTYPE html>
<html>
	<head>
		<title>First App</title>
	</head>
	<body>
		<?php echo "Hi CSCI Students!"; ?>
	</body>
</html>
```
* Can be used to do many other things
	* Generate PNG/JPG 
	* Generate JSON/XML
	* Generate PDF

## Statements
Statement
:   Instruction given within the language. 

* When in PHP mode the interpreter will evaluate and execute each statement then move to the next
* Each statement **must** end with a semicolon `;`[^semicolonException]

[^semicolonException]: Exception is when closing the PHP tag.  Don't do this!

## Comments

* Single line comments use `//`
```php
<?php
// This is a single line comment
echo "This line is run!";
```
* Multi line comments use `/*` to start them and `*/` to end them
```php
<?php
/*
 This is a multi line comment
 echo "These statements were commented out.";
 echo "So they will not be executed or output";
*/
```
* A `#` can also be used but seldom is
```php
<?php
# I'm not used often
```

## Comments
### Warning {.warning}

* Do not nest the multi line comments they end at the first `*/`
```php
<?php
/*
	echo 'This will not end well!'; /* Do you see the problem? */
*/
```

# Variables

## Variables
Variable
:   Named reference to a storage location in main memory (RAM) who's value can change.

* Which would you rather? 
```cpp
0x00BAB10C
```
```php
$uberBlock
```

## Variables

* Variable names should start with a `$` 
* Variable names
	* Are case sensitive
	* Must start with letter or _ followed by letters, numbers, or underscores
	* Variable names should be `$camelCasedForReadability`
	* `$this` is a reserved variable (more later)
	 
