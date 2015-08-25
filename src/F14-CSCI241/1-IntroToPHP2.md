% Intro To PHP Cont.
% Dr. Andrew Besmer

# Operators

## Operators

| Operator | Purpose        | Example    |
| ------   | -------        | -------    |
| `+`      | Addition       | `$x + $y;` |
| `-`      | Substraction   | `$x - $y;` |
| `*`      | Multiplication | `$x * $y;` |
| `/`      | Division       | `$x / $y;` |
| `%`      | Modulus        | `$x % $y;` |
| `=`      | Assignment     | `$x = $y;` |
| `.`      | Concatentation | `$x . $y;` |

\ 

* Modulus Example

## Combined

| Operator | Example     | Becomes         |
| -------  | -------     | --------        |
| `+=`     | `$x += $y;` | `$x = $x + $y;` |
| `-=`     | `$x -= $y;` | `$x = $x - $y;` |
| `*=`     | `$x *= $y;` | `$x = $x * $y;` | 
| `/=`     | `$x /= $y;` | `$x = $x / $y;` |
| `%=`     | `$x %= $y;` | `$x = $x % $y;` |
| `.=`     | `$x .= $y;` | `$x = $x . $y;` |

\ 

* Combined example

## (Inc)(Dec)rement 

| Operator | Purpose   | Example |
| -------  | -------   | ------- |
| `++`     | Increment | `$x++;` |
| `--`     | Decrement | `$x--;` | 

\ 

* Increment or Decrement will increase or decrease the value of the variable by 1
* No assignment is needed since the operator operates directly on the variable
* Can increment or decrement either pre or post
	* Pre before statement and use in expression
	* Post after statement and use in expression

## (Inc)(Dec)rement 

* Examples

# Conditionals

## Code Block

Code Block
:   One or more statements surrounded by curly braces `{` and `}`

```php
<?php

{
	echo "hi";
	echo "csci 241";
}
```

* Use with control structures to indicate which statements to execute 
* When you open a curly you must close it
* Curly braces should surrond complete statements and should not be interspersed

## If Statements

* If statements help control program logic

```php
if(expression)
{
	/*
	* The code in these curly braces run only 
	* if expression is true	
	*/
}
else
{
	/*
	* The code in these curly braces run only 
	* if expression is false	
	*/
}
```

* Which code will run if the expression is `false`?

## If Statements

* Can conditionally condition!

```php
if(expression) //Always checked
{
	//Some code
}
else if(expression2) //Checked only if prior is false
{
	//Some code
}

...

else if(exprssion7) //Checked only if all prior are false
{
	//Some code
}
else //Runs if all tests resulted in false
{
	//Some code
}

```

## Comparrison Operators

| Operator | Purpose               | Example     |
| -------  | -------               | -------     |
| `==`     | Equal                 | `$x == $y;` |
| `!=`     | Not Equal             | `$x != y;`  |
| `<`      | Less Than             | `$x < $y`   |
| `>`      | More Than             | `$x > $y`   |
| `<=`     | Less Than or Equal To | `$x <= $y`  |
| `>=`     | More Than or Equal To | `$x >= $y`  |

## Comparrison Operators

| Operator | Purpose       | Example      |
| -------  | -------       | -------      |
| `===`    | Exactly Equal | `$x === $y;` |

\ 

* Difference between `==` and `===` is the addition of the type comparrison (or no type juggling)

\ 

```php
$x = 5;
$y = "5";
var_dump((bool)($x==$y)); //true
var_dump((bool)($x===$y)); //false
```

## Operators Warnings

* Careful of 
	* `=` operator, why?
	* ` ` ` operator, why?

```php
$x = 5;
$y = 6;
var_dump((bool)($x=$y)); // true

`rm -rf ~/somefolder`; // Deletes the folder!
```

# Logical

## Logical Operators

| Operator | Purpose | Example    |
| -------  | ------- | -------    |
| `&&`     | And     | `$x && $y` |
| `\\`     | Or      | `$x || y`  |
| `!`      | Not     | `!$x`      |

\ 

* Can be combined to form more complex logic

## Operator Precedence


| Priority  | Operators             |
| :-------: | ------                |
| 1         | `()`                  |
| 2         | `!` `++` `--` `(type)`|
| 3         | `*` `/` `%`           |
| 4         | `+` `-` `.`           |
| 5         | `<` `<=` `>` `>=`     |
| 6         | `==` `!=` `===` `!==` |
| 7         | `&&`                  |
| 8         | `||`                  | 

* Examples

## Existance

* Check `$_GET` and `$_POST` data to see if a name or key value pair was transmitted using `isset()`
* `isset()` returns true or false... perfect for conditionals
