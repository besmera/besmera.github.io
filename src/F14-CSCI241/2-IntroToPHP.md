% Intro To PHP Cont.
% Dr. Andrew Besmer

# Before Class

## Logic Challenge

```php
$u = 0;
$v = "Andrew";
$w = true;
$x = 5;
$y = 22;
$z = false;

if($u || $v) 
{ //true or false? }

if(!$w == false && $y > 22) 
{ //true or false? }

if(!$z || ($z == true && $x)) 
{ //true or false? }

if(!$u && $v && ($w && $x) < $y && ($z || $y)) 
{ //true or false? }
```

## Approaching Problems

* No survey I have seen has programmers spending all (or even the majority) of their time coding
* Before writing a single line of code:
	* Fully understand the problem
	* Outline the steps required to accomplish your goal 
	* Then once you understand what you will code start programming

## Communicating

* Needs
	* Use my [faculty webpage](http://faculty.winthrop.edu/besmera/)
* Errors
	* Email: besmera@winthrop.edu
	* Better yet do a pull request against the Class-Slides :)

# Looping

## while Loop

* Executes code block only if expression evaluates to true
* This is a pre-test loop
* Two parts
	* Code block
	* Expression
* Each run of the code block is called an iteration

```php
while(conditional expression)
{
	//statements
}
```

## while Loop

* 1 check the condition
	* If true
		* Execute 2
		* Go back to 1
	* If false
		* Skip code block

```php
while(1)
{
	2
}
```


## while Loop

* What will the output of this script be?

```php
<?php
$takeoff = 3;

while($takeoff >= 0)
{
	echo $takeoff-- . "<br>";
}
```

## while Loop

* What will the output of this script be?

```php
<?php
$takeoff = -3;

while($takeoff >= 0)
{
	echo $takeoff-- . "<br>";
}
```

## while Loop

* What will the output of this script be?

```php
<?php
$takeoff = 3;

while($takeoff <= 3)
{
	echo $takeoff-- . "<br>";
}
```

. . . 

* Be careful of infinite loops
	* Ensure you will eventually reach an exit condition

## break

* `break` can be used to exit the nearest looping structure it is contained in
* This allows us to create intentional infinite loops or to exit a loop given a condition

```php 
while(true)
{
	//Get controller commands
	if(quit command received)
		break;
	//Process character movements
	//Update UI
}
```

## while Loop

* What will the output of this script be?

```php
<?php
$takeoff = 3;

while(true)
{
	echo $takeoff . "<br>";
	if(--$takeoff <= 0)
		break; 
}
```

> * What about `if($takeoff-- <= 0)`

## do while Loop

* Executes code block once
* Executes it again only if expression evaluates to true
* This is a post-test loop
* Notice a `;` is used here

```php
do
{
	//statements
} while(conditional expression);
```

## do while Loop

* Execute 1 then 
* Check condition 2
	* If true
		* Execute 1
		* Go back to check condition 2
	* If false
		* Skip code block		

```php
do
{
	1
} while(2);
```

## do while Loop

* What will the output of this script be?

```php
<?php
$takeoff = 3;

do
{
	echo --$takeoff . "<br>";
}
while ($takeoff >= 0);
```

## do while Loop

* What will the output of this script be?

```php
<?php
$takeoff = 3;

do
{
	echo $takeoff-- . "<br>";
}
while ($takeoff = 3);
```

> * Trick Question! Infinite 3's!

## do while Loop

* What will the output of this script be?

```php
<?php
$takeoff = 3;

do
{
	echo $takeoff-- . "<br>";
}
while ($takeoff <= 3);
```


## for Loop

* For loop is typically used when number of iterations is known
	* Known can be based on runtime variables like number of items entered by user
* For loops require three statements
	* initialization
	* conditional expression
	* incrementor

```php
for(initialization; conditional expression; incrementor)
{
	//statements
}
```

## for Loop

* 1 Initialize code
* 2 Check conditional expression
	* If true
		* Execute 3
		* Execute incrementor 4
		* Go back to check 2
	* If false
		* Stop and skip code block

```php
for(1; 2; 4)
{
	3
}
```

## for Loop

* What will the output of this script be?

```php
<?php
for($ct = 0; $ct < 5; $ct++)
{
	echo $ct . "<br>";
}
```

## for Loop

* What will the output of this script be?

```php
<?php
for($ct = 0; $ct < 5; ++$ct)
{
	echo $ct . "<br>";
}
```

## for Loop

* What will the output of this script be?

```php
<?php
for($ct = 0; $ct < 5; $ct+=2)
{
	echo $ct . "<br>";
}
```

## for Loop

* What will the output of this script be?

```php
<?php
$ct = 0;
for(; $ct < 4; )
{
	echo $ct++ . "<br>";
}
```

## continue

* `continue` can be used to exit the ***current*** iteration of the nearest looping structure it is contained in
* This means that the loop will go to whatever it's next step normally would be

## for Loop

* What will the output of this script be?

```php
<?php
for($ct = 0; $ct < 5; $ct++)
{
	if($ct == 3)
		continue;
	echo $ct . "<br>";
}
```

## Nested Loops

* Looping structures like conditionals can be nested within one another
* `for` loop is one commonly nested loop

```php
<?php
for($i = 1; $i <= 3; $i++)
{
	for($j = 1; $j <= 3; $j++)
	{
	}
}
```


## for Loop

* What is the output of the following script?

```php
<?php
echo "Before loops: \$i=$i & \$j=$j\n";
for($i = 1; $i <= 3; $i++)
{
	echo "Before nested: \$i=$i & \$j=$j\n";
	for($j = 1; $j <= 3; $j++)
	{
		echo "In nested: \$i=$i & \$j=$j\n";
	}
	echo "After nested: \$i=$i & \$j=$j\n";
}
echo "After Loops: \$i=$i & \$j=$j\n";
```

## for Loop

* Lets make stars using nested loops

![Nested For Loops Part 1 Example](nestedForLoopPart1.png)

## for Loop

* Lets make stars using nested loops

![Nested For Loops Part 2 Example](nestedForLoopPart2.png)

# More Conditionals

## Switch

* A switch statement can be used to simplify code such as multiple `if else` statements or complicated nested logic
* More importantly it supports falling through the structure 
	* Once matched it will execute the case and all cases below it

```php
switch ($var) {
    case val1:
        //runs if $var == val1
        break;
    case val2:
        //runs if $var == val2
        break;
    case val3:
        //runs if $var == val3
        break;
    default:
        //runs if nothing matched
}
```

## Switch

* Note the lack of `break`

```php
switch ($var) {
    case val1:
        //runs if $var == val1
    case val2:
        //runs if $var == val2 || $var == val1 
    case val3:
        //runs if $var == val3 || $var == val2 || $var == val1
    default:
        //runs always
}
```

## Switch

> * What will the output of this script be?
	* `$grade = 89;`
	* `$grade = 70;`
	* `$grade = 64;`
	* `$grade = -5;`

```php
<?php
switch ($grade) {
    case ($grade >= 90):
        echo "A";
	break;
    case ($grade >= 80):
        echo "B";
	break;
    case ($grade >= 70):
        echo "C";
	break;
    case ($grade >= 60):
        echo "D";
	break;
    case ($grade >= 0):
        echo "F";
	break;
    default:
        echo "Really?";
}
```

## Switch

> * What will the output of this script be?
	* `$grade = 89;`
	* `$grade = 70;`
	* `$grade = 64;`
	* `$grade = -5;`

```php
<?php
switch ($grade) {
    case ($grade >= 90):
        echo "A";
    case ($grade >= 80):
        echo "B";
    case ($grade >= 70):
        echo "C";
    case ($grade >= 60):
        echo "D";
    case ($grade >= 0):
        echo "F";
    default:
        echo "Really?";
}
```

## Switch

> * What will the output of this script be?
	* `$state = "NC";`
	* `$state = "SC";`
	* `$state = "FL";`	

```php
<?php
switch ($state) {
    case "NC":
        echo "North Carolina";
	break;
    case "SC":
        echo "South Carolina";
	break;    
default:
        echo "Twilight Zone";
}
```


