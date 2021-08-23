% Node.js
% Dr. Andrew Besmer
% Debugging and Modules

# Debugging

## JavaScript Debugging

* Lets look at debugging in JavaScript
  * Break Points
	* Step In/Out/Over
	* Conditional Break Points

## JavaScript Debugging

* A broken program

```
let andrew = {
    'name' : 'Andrew Besmer',
    'grades' : [99, 75, 87, 95, 100, 68]
 };

function average(student)
{
    let sum=0;
    let count=0;
    for(let ct=0; ct <= student.grades.length; ct++)
    {
        sum = sum + student.grades[ct];
        count++;
    }
    return sum/count;
}

function studentInfo(student)
{
    let studentAverage = average(student);
    //Using Template Strings
    return `The student ${student.name} has an average score of ${studentAverage}`;
}

let andrewInfo = studentInfo(andrew);

console.log(andrewInfo)
```

# Modules

## Overview
* Do you rewrite 100% of your code each time you have a new app?
* Modules allow for code reuse and third party consumption
	* Modules can be grouped into packages
* Two "standards" `CommonJS` and (`ECMAScript Modules` or `ES Modules`)
    * There are even more e.g. `AMD` or Asynchronous Module Definition

# CommonJS

## Requiring Modules

* Use `require()`
* Require looks for:
	* Exact file match
	* File ending in `.js` - treated as a JavaScript file
	* File ending in `.json` - parsed as json
	* File ending in `.node` - Treated as a compiled addon

## Requiring Modules

* `require()` has similar rules to other includes
	* `/` considered absolute
	* `./` considered relative to files in same directory
	* `../` relative to parent directory, and so on
* If not `/`, `./`, etc... it is considered a "core module"
	* If it is native core module like `http` it is loaded
	* Otherwise loaded from one of many `node_modules` folders by starting at `./node_modules` and working up to root file system

## Requiring Modules

* When requiring a directory
	* First node looks for `package.json`
	* Then `index.js`
	* Then `index.node`

## Making a Module

* Create a javascript file that `exports`
    * Note that `exports` is `module.exports` 

```javascript
//greeting.js
exports.sayHello = function(name)
{
	console.log("Hello " + name);
};
```

```javascript
//app.js
var greeting = require("greeting");

greeting.sayHello("World");
```

## Making a Module

* Create a javascript file that `exports`

```javascript
//greeting.js
exports.sayHello = function(name)
{
	console.log("Hello " + name);
};

exports.sayGoodbye = function(name)
{
	console.log("Goodbye " + name);
};

```

```javascript
//app.js
var greeting = require("./greeting");

greeting.sayHello("World");
greeting.sayGoodbye("World");
```


## Making a Module

* Anything that isn't exported is not accessible outside module

```javascript
//greeting.js
exports.sayHello = function(name)
{
	console.log("Hello " + name);
};

var sayGoodbye = function(name)
{
	console.log("Goodbye " + name);
};

```

```javascript
//app.js
var greeting = require("./greeting");

greeting.sayHello("World");
greeting.sayGoodbye("World"); //Error!
```


## Modules

* Modules can also require other modules
* Exports may not be done in callbacks

# ES Modules

## ES Modules

* Supports multiple *named exports* 
    * `export`
* Supports a single *default* export
    * `export default`
* Uses `import` either named or default to access that exported modules pieces

## Named Exports

* Example named export

```
export function foo() {
	// ..
}

export var awesome = 42;

var bar = [1,2,3];
export { bar };
```

## Default Exports

* Only one default per module

```
export default function foo(..) {
	// ..
}
```

## ES Modules

* Imports must be at the top level unlike CommonJS
    * E.g. no conditional inclusion
* Similar to `export` you can `import` using either named or default exports

## Named Imports

* Named imports use `{` and `}` braces
    * These are not the same as JSON objects

```
import { foo, bar, baz } from "foo";

foo();
```

## Named Imports

* Imports can be renamed

```
import { foo as theFooFunc } from "foo";

theFooFunc();
```

## Named Imports

* Can use a wildcard `*` to import many named items at once
    * General advice is not to import everything since this can waste resources
    * Will need to balance against ease of programming

```
export function bar() { .. }
export var x = 42;
export function baz() { .. }
```

```
import * as foo from "foo";

foo.bar();
foo.x;			// 42
foo.baz();
```

## Default Imports

* Imports whatever was exported as `default`

```
import foo from "foo";
```


## Named and Default

* Named and default import/exports are not mutually exclusive but are somewhat discouraged

```
export default function foo() { .. }

export function bar() { .. }
export function baz() { .. }
```

```
import FOOFN, { bar, baz as BAZ } from "foo";

FOOFN();
bar();
BAZ();
```


# npm

## npm

* `npm` or [node package manager](https://www.npmjs.com/) is used to help management project dependencies
	* Packages depend on other packages
	* Those packages depend on even more packages
	* Require a certain package version

## npm

* Find packages at [http://npmjs.com](http://npmjs.com)
	* Install locally `npm install packageName`
	* Then just 
        * `require('packageName')`
        * or
        * `import packageName from "packageName"`
* Can install globally `npm install -g packageName` but then can't require
	* `http-server` is example

## npm usage

* Lets style some text with `chalk`