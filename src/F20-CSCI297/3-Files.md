% Files
% Dr. Andrew Besmer

# Files

## Files

* Files can be very useful in *some* applications

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
Dictum Eu Company,1-194-286-3041
Proin Industries,1-319-137-9279
Enim Sit Industries,1-562-872-9219
Phasellus In Corp,1-128-930-9807
Dolor Quam Elementum PC,1-928-801-9652
Nibh Lacinia Orci PC,1-332-594-5321
Donec Porttitor Tellus Company,1-873-991-8646
Ut Dolor Consulting,1-514-308-9570
Suspendisse Ac Metus PC,1-466-488-2655
Lorem Incorporated,1-778-863-7253
Curabitur Consequat Incorporated,1-496-807-1201
Non Company,1-383-777-6247
Enim Inc,1-441-333-2507
Quisque Libero Industries,1-821-364-5581
At Pretium Aliquet Incorporated,1-651-831-1982
Mi Consulting,1-358-903-2637
Lacus Varius LLP,1-493-938-0338
Nibh Dolor Foundation,1-706-129-8454
Risus Associates,1-657-994-6688
Viverra LLC,1-857-231-3877
Nunc Corp,1-652-403-0424
Praesent Luctus Curabitur Foundation,1-363-243-2228
Risus PC,1-110-328-3877
Eleifend Nunc Risus Associates,1-873-927-9209
Vel Convallis LLP,1-430-846-6335
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

* What will `$line` contain during each iteration?
* When will this while loop end?

## Parsing

* On first iteration:

```
//How can we turn this:
"Dictum Eu Company,1-194-286-3041"

//Into this:
array("Dictum Eu Company", "1-194-286-3041");
```

## Explode

* Can use PHP functions to parse the line into an array for us[^csvAssumption]
	* `explode($delimiter, $source)` - returns an `array` of `string`s by splitting it up using the delimiter
	* `implode($delimiter, $source)` - returns a `string` by combining all the elements of the `array` inserting the delimiter between each


```php
$companies[]=explode(",", $line);

$line = implode(",",array("Dictum Eu Company", "1-194-286-3041"));
```


* Once all iterations have completed on `callList.csv` what will be in `$companies[0]`?

[^csvAssumption]: We are assuming that the csv file is a very simple one here. This in reality is a terrible assumption.

## In Array

* `in_array($needle, $haystack)` - Searches the haystack (`array`) for the needle (element) and returns `true` if found, `false` if not

```php
<?php

$colors = array("red", "green", "blue");
```

* How would you check to see if `indigo` is in the variable `$colors` using `in_array()`?



## In Array
 
```php
in_array("indigo",$colors);
```

## Array Search

* `array_search($needle, $haystack)` - Searches the haystack (`array`) for the needle (element) and returns the key (or index) if found, `false` if not

## Outputting

* Lets build the overview and details screen

