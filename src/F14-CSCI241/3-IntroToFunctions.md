% Intro To Functions
% Dr. Andrew Besmer

# Functions

## Function

* Functions help make reusable code
* A function can be written once and used over and over
* Functions have a specific purpose like add two numbers
	* Calling the function with a different set of inputs can provide different results
* PHP has many different functions pre-built in for you to use
	* A [complete list](http://php.net/manual/en/indexes.functions.php)

## Function

* Functions can take 0, 1, or more arguments
	* The order of the arguments does matter
	* Arguments are mapped in order to their parameters (more next class)
* Functions may, but do not have to, return a value
	* If they do not have a return you are provided with `NULL`
* You call (or invoke) a function by providing it arguments

```php
myFunction(); //No arguments
myFunction($arg1); //One argument
myFunction($arg1, $arg2); //Two arguments
myFunction($arg1, $arg2, ..., $argN); //N arguments
```

## Function

* `is_numeric()` takes an argument and checks it to see if it is numeric
	* `true` if it is some sort of number
	* `false` if it is not
* It does not change the variables type if it is
* Example [^PHP]

[^PHP]: [PHP](http://php.net)

```php
<?php
$tests = array(
	"42",
	1337,
	0x539,
	02471,
	0b10100111001,
	1337e0,
	"not numeric",
	array(),
	9.1
);
``` 

## Function

* `is_int()` takes an argument and checks it to see if it is an integer
* Again, it does not change the data type
* Example[^PHP]

```php
$tests = array(
	23,
	"23",
	23.5,
	"23.5",
	null,
	true,
	false
);
```

## Function

* Others
	* `is_bool()`
	* `is_float()`
	* `is_numeric()`
	* `is_string()`
	* `is_array()`
	* `is_object()`
* These are all useful to check the actual data type
* All `$_GET` and `$_POST` are provided as a string

# Misc 

## Lab 3

* There is not one way to solve these lab problems or indeed any programming problem

. . . 

* Not everything we learn will immediately apply to a lab
	* Think about what we learned does
	* See if it helps you solve your problem
	* Did anyone use `%`, `$var++`, or `--$var` for Lab 3?	

. . . 

* Most used `isset($_POST["invoiceItem1"])`
	* Based on what we learned this was best option, why?
	* What problem does this technique have?

## $_SERVER

* New super global variable `$_SERVER`
* `var_dump()` takes an argument and outputs it to the screen

```php
<?php
var_dump($_SERVER); //Server is another super global
```

## Ternery

* `?` is called a ternary operator
* `:` indicates the separation of true/false values in the ternary

```php
conditional_expression ? true_value : false_value
```

## Ternary Application

* Useful for short handing certain conditional logic

```php
if (isset($_POST["taxRate"]) == true)
{
	$tax = $_POST["taxRate"];
}
else
{
	$tax = 0.00;
}

//Equivalent to

$tax = isset($_POST["taxRate"]) ? $_POST["taxRate"] : 0.00;
```


