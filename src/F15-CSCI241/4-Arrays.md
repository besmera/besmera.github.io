% Arrays
% Dr. Andrew Besmer

# Arrays

## About Arrays

* What if you needed to average all of the grades for a student in a class?  One possibility is:

```php
<?php

$grade1 = 88;
$grade2 = 92;
$grade3 = 75;
...
...
$gradeN = 97;
```

* What sort of issues would this have?

## About Arrays

* Arrays can hold multiple values
	* Each value is called an **element**
* Lend themselves well to looping structures we have learned
* It's not required to know how many you need to store at the time of development

## About Arrays

* PHP arrays are not really arrays, they are much more flexible
* PHP arrays allow values of different types to be stored
	* Not limited to only `integer` or only `float`
	* Typed languages generally do not allow this
	* Underneath arrays are actually hash maps

# Sequential Arrays

## Sequential Arrays

* Lets look at storing a students grades in an array
* Observe 
	* Structure
	* Indexing - zero based
	* Retrieval
	* Properties

## Creating Arrays

* Use `array()` to create arrays
	* Pass your values each separated by a comma

```php
<?php

$grades = array(88, 92, 75, 97);

var_dump($grades);
```


## Creating Arrays

* Optionally use `[]` for assigning one at a time


```php
<?php

$grades[] = 88;
$grades[] = 92;
$grades[] = 75;
$grades[] = 97;

var_dump($grades);
```


## Accessing Array

* Subscripts `[]`
	* integer - `$grades[0]`
	* string - `$grades["test1"]`
* Casting
	* booleans ***don't use*** - `true` to `1` and `false` to `0` 
	* floats ***don't use*** - `5.4` to `5`
	* strings - Depends!

## Deleting Array Element

* `unset($grades[0])` - Removes item from an array
* `unset($grades)` - Removes whole array



# Associative Arrays

## Associative

* Optionally create by specifying a key value pair with the `=>` operator

```php
<?php

$grades = array("test1" => 88, "hw1" => 92, "hw2" => 75, "midterm" => 97);

var_dump($grades);
```

## Accessing Array

* Access using string `$grades["test1"]`

## Accessing Array

* Can but should not use regular for loop
	* `count()` function and access in other languages
	* Instead use `foreach`

```php
foreach($myArray as $value)
{
	echo $value;
}

foreach($myArray as $key => $value)
{
	echo $key . " " . $value;
}
```

\ 

* Example

## Accessing Array

* Iteration
	* Order added not indexed

# Multi-dimensional Arrays

## Multi-dimensional Arrays

* Arrays within arrays

```php
$grades = array("Andrew" => array("test1" => 88, "hw1" => 92, "hw2" => 75, "midterm" => 97));

var_dump($grades);
```

* How can you access my test1 score?

# Additional Uses

## Stack

* Stacks are LIFO
	* `array_push($myArray, $value)` - Add element to the end of array
	* `array_pop($myArray)` - Remove and return last element from array

* Palindrome Example

## Queue

* Queues are FIFO
	* `array_shift($myArray)` - Remove and return first element in array


## Sorting

* `sort()` numerically and alphabetically ascending
	* New sorted array starts at 0
* `rsort()` numerically and alphabetically descending

\ 

* `asort()` numerically and alphabetically ascending keeping index key

## Sorting

* Consider an account with a balance of `$100` and the following transactions:
	* `12, 10, 5, 4, 3, 24, 15, 22, 52`
* Overdrafts are subject to `$35` fee
* Lets use an `array` and `array_shift` and `rsort` to see what kind of trouble we can get into

# Additional Functions

## Functions

* `isset($grades["Andrew"])` - check if an element exists
* `max($grades["Andrew"])` - get max element
* `min($grades["Andrew"])` - get min element
* `array_sum($grades["Andrew"])` - sum all elements
* `count($grades["Andrew"]")` - count of elements


