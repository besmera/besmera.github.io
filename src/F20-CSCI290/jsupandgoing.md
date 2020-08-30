% JavaScript 
% Dr. Andrew Besmer
% Up & Going
	
# The Basics

## Statements/Expressions

* Statements - `a = b * 2;`
* Expressions 
	* Any reference to a variable or value
	* or a set of variable(s) and value(s) combined with operators
* Litterals 
	* Explicitly written and set without being stored in a variable

## Comments 

* Two forms
	* `//`
	* `/* */`

## Operators

* Logical
	* `&&` `||` `!`
* Relational
	* `==` `===` `!=` `!==` `!`
	* `<` `>` `<=` `>=`

## Blocks

* Code blocks can be formed with `{` and `}`


## Conditionals

* `if`
* `if else`
* `if else if`

```
if (a == 2) {
	// do something
}
else if (a == 10) {
	// do another thing
}
else if (a == 42) {
	// do yet another thing
}
else {
	// fallback to here
}
```

## Switching 

```
switch (a) {
	case 2:
		// do something
		break;
	case 10:
		// do another thing
		break;
	case 42:
		// do yet another thing
		break;
	default:
		// fallback to here
}
```

## Ternary

```
var a = 42;

var b = (a > 41) ? "hello" : "world";

// similar to:

// if (a > 41) {
//    b = "hello";
// }
// else {
//    b = "world";
// }
```

## Looping

* `for`
* `while`
* `do while`
* `break;` and `continue;`

```
var i=0;

for (i = 0; i < 5; i++) {
    console.log(i);
}

while (i < 10) {
    console.log( "The number is " + i++);
}

do {
    console.log( "The number is " + i++);
}
while (i < 10);
```

## Variables

* Names of variables and functions must start with `a`-`z`, `A`-`Z`, `$`, or `_` then can contain any `0`-`9` 
* They also can not contain reserved words for example, `null`, `true`, `false`
* Use `var` or `let` 
	* More later

```
var x=5;
let x=5;
```

# Types

## Types

* Primatives
	* `string`
	* `number`
	* `boolean`
	* `null` and `undefined`
	* `object`
	* `symbol` (new)

## Types

* `typeof` - returns string of one of the above which represents what type the value in the variable is, not what type the variable is

```
var a;
typeof a;				// "undefined"

a = "hello world";
typeof a;				// "string"

a = 42;
typeof a;				// "number"

a = true;
typeof a;				// "boolean"

a = null;
typeof a;				// "object" -- weird, bug

a = undefined;
typeof a;				// "undefined"

a = { b: "c" };
typeof a;				// "object"
```
## Types

* Other types like `array`s or `function`s are specialized versions of the `object` type
* An `array` is meant to be accessed numerically (`0` based) and can be easily declared
* Automatically have properties like length

```
var arr = [
	"hello world",
	42,
	true
];

arr[0];			// "hello world"
arr[1];			// 42
arr[2];			// true
arr.length;		// 3

typeof arr;		// "object"
```

## Constants

* `var` vs `const`
* Convention is to use all caps

## Functions

* Making 
* Calling
* Returns
* `typeof` returns `function` but it is possible to set properties etc.. because it is an `object`

```
function printAmount(amt) {
	return amt.toFixed(2);
}

console.log(printAmount(99.9999));
```

* Creating functions inside of functions is possible!

# Type Coercion

## Typing

* Static typing/type enforcement
* Weak typing/dynamic typing/loosly typed
* A variables type can change

```
var amount = 99.99;

amount = amount * 2;

console.log( amount );		// 199.98

// convert `amount` to a string, and
// add "$" on the beginning
amount = "$" + String( amount );

console.log( amount );		// "$199.98"
```


## Type Coercion
 
* Explicit coercion 

```js
var a = "42";
var b = Number( a );

console.log( a );	// "42"
console.log( b );	// 42
```
* Implicit coercion

```
var a = "42";

var b = a * 1;	// "42" implicitly coerced to 42 here

a;				// "42"
b;				// 42 -- the number!
```


## Corecion

* Type coercion frequently occurs

```
var a = "42";
var b = 42;

a == b;			// true
a === b;		// false
```

* [Double Equality Coercion Rules](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)
* `if` expects `boolean`, pass `number` -> `boolean`

## boolean falsy

* The following are falsy, all others truthy

```
"" (empty string)
0, -0, NaN (invalid number)
null, undefined
false
```

## boolean falsy

* Same occurs in `switch`, `while`, `for`, etc... where conditional is used
* More on this later [Chapter 4 of the Types & Grammar]
* Author recommends:

```
If either value (aka side) in a comparison could be the true or false value, avoid == and use ===.
If either value in a comparison could be one of these specific values (0, "", or [] -- empty array), avoid == and use ===.
In all other cases, you're safe to use ==. Not only is it safe, but in many cases it simplifies your code in a way that improves readability.
```
## Type Coercion

```
var a = [1,2,3];
var b = [1,2,3];
var c = "1,2,3";

a == c;		// true, coercion to string
b == c;		// true coercion to string
a == b;		// false by ref
```

## Type Coerceion

* Relational operators also have coercion occur

```
var a = 41;
var b = "42";
var c = "43";

a < b;		// true coercion to number
b < c;		// true lexographic
```

## Unpredictably predictable?

* Not any?

```
var a = 42;
var b = "foo";

a < b;		// false
a > b;		// false
a == b;		// false
```

* `NaN` is not `<` `>` or `==` any other value so does `NaN`==`NaN`?
* Equality could be `42 == NaN` or `"42" == "foo"`

# Scoping

## Lexical Scope

* Collection of variables that can be accessed and rules for how those variables are accessed by name
* Each function has it's own scope
* Each variable name must be unique within a scope, but same name can be used in different scopes

```
function one() {
	// this `a` only belongs to the `one()` function
	var a = 1;
	console.log( a );
}

function two() {
	// this `a` only belongs to the `two()` function
	var a = 2;
	console.log( a );
}

one();		// 1
two();		// 2
```

## Lexical Scope

* Scopes can be nested
* Inner gets access to outer but not vice versa

```
function outer() {
	var a = 1;

	function inner() {
		var b = 2;

		// we can access both `a` and `b` here
		console.log( a + b );	// 3
	}

	inner();

	// we can only access `a` here
	console.log( a );			// 1
}

outer();
```

* Will get `ReferenceError` thrown if accessing variables out of scope

## Lexical Scope

* Variables outside all functions and scopes are global variables
* Variables and functions are hoisted

```
var a = 2;

foo();					// works because `foo()`
						// declaration is "hoisted"

function foo() {
	a = 3;

	console.log( a );	// 3

	var a;				// declaration is "hoisted"
						// to the top of `foo()`
}

console.log( a );	// 2
```

## Hoisting

* By convention avoid using hoisting for variables
* Functions are generally acceptable but may be coding conventions to apply
* More on this later

# Objects & More

## Objects


* JSON
* Syntax
* Accessing
* `.` most times, `[]` for special characters in property names e.g. `first name` or using variable

```
var obj = {
	a: "hello world",
	b: 42,
	c: true
};

obj.a;		// "hello world"
obj.b;		// 42
obj.c;		// true

obj["a"];	// "hello world"
obj["b"];	// 42
obj["c"];	// true

var b = "a";

obj[b];			// "hello world"
obj["b"];		// 42
```

## let vs var

* Can also use `let` to restrict scope to a block

```
function foo() {
	var a = 1;

	if (a >= 1) {
		let b = 2;

		while (b < 5) {
			let c = b * 2;
			b++;

			console.log( a + c );
		}
	}
}

foo();
// 5 7 9
```

## Undeclared Variables

* Undeclared variables become global variables. Don't do this!!!

```
function foo() {
	a = 1;	// `a` not formally declared
}

foo();
a;			// 1 -- oops, auto global variable :(
```

## Strict Mode 

* Use Strict Mode

```
"use strict";

function foo() {
	// this code is strict mode
        a=1; //`var` missing, ReferenceError
	function bar() {
		// this code is strict mode
	}
}

// this code is strict mode
foo();
```

# Functions

## Functions 

* Functions are values just like `42`
* Thus we can assign it to other variables, pass it or return it from a function


```
function foo() {
	// ..
}
```
```
var foo = function() {
	// ..
};
```
## Functions

* Similarly first function expression is `anonymous function expression` second is `named function expression`
* Both common

```
var foo = function() {
	// ..
};

var x = function bar(){
	// ..
};
```

## IIFE

* IIFE - Immediately Invoked Function Expression

```
(function(){
console.log('I am an IFFE');
})();
```

* Commonly used to avoid affecting surrounding code

```
var a = 42;

(function IIFE(){
	var a = 10;
	console.log( a );	// 10
})();

console.log( a );		// 42
```

## Closure

```
function makeAdder(x) {
	// parameter `x` is an inner variable

	// inner function `add()` uses `x`, so
	// it has a "closure" over it
	function add(y) {
		return y + x;
	};

	return add;
}
```

now 

```
// `plusOne` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusOne = makeAdder( 1 );

// `plusTen` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusTen = makeAdder( 10 );

plusOne( 3 );		// 4  <-- 1 + 3
plusOne( 41 );		// 42 <-- 1 + 41

plusTen( 13 );		// 23 <-- 10 + 13
```

## Module Pattern

* Most common usage of closure
* Allow 'private' variables/functions and public API

```
function User(){
	var username, password;

	function doLogin(user,pw) {
		username = user;
		password = pw;

		// do the rest of the login work
	}

	var publicAPI = {
		login: doLogin
	};

	return publicAPI;
}

// create a `User` module instance
var fred = User();

fred.login( "fred", "12Battery34!" );
```

* More on this later

## Polyfill

* Polyfill - adding code to replicate newer feature

```
if (!Number.isNaN) {
	Number.isNaN = function isNaN(x) {
		return x !== x;
	};
}
```
* Some features can't be polyfilled
* In general don't do your own polyfill

## Transpiling

* Transpiling - Transforming + Compiling

```
function foo(a = 2) {
	console.log( a );
}

foo();		// 2
foo( 42 );	// 42
```

```
function foo() {
	var a = arguments[0] !== (void 0) ? arguments[0] : 2;
	console.log( a );
}
```
## Transpiling

* New syntax typically more readable and maintainable
* Newer browsers get performance increase by not using transpiled code
* Allows for early feedback 
* [Traceur](https://github.com/google/traceur-compiler)


