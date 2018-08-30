% Node.js 
% Dr. Andrew Besmer
% The Basics
	
# Overview

## What is Node.js
 
* Environment to run JavaScript
	* Uses the Google v8 engine
	* Event Driven
	* Non-Blocking
	* Comes with API
* Good for I/O tasks
	* Web server for data
	* Chat/real-time social media server
* Not good for CPU tasks
	* Resizing photographs

## Comparison Example

* Node vs PHP

```javascript
//start_finish.js
var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200);
  response.write("Started.\n");
  setTimeout(function () {
    response.write("Finished.\n");
    response.end();
  }, 5000); 
}).listen(8000);

console.log('listening on port 8000...');
```

```php
//start_finish.php
<?php

echo "Started";

sleep(5);

echo "Finished";
```
```bash
ab -r -n 1000 -c 1000 http://node
ab -r -n 1000 -c 1000 http://php
```

## What Happened?
* Breakdown of the Apache vs Node Requests
* Node.js uses a single process
	* Event Loop
	* Blocking vs Non-Blocking 
		* `start_finish.js` timeline comparrison blocking vs non-blocking
```
var startTime = new Date().getTime();
while (new Date().getTime() < startTime + 5000);
```
	
## I/O Latency
	
* L1 CPU Cache: 3 CPU cycles
* L2 CPU Cache: 14 CPU cycles
* RAM: 250 CPU cycles
* DISK: 41,000,000 cycles
* NETWORK: 240,000,000 cycles

# Node

## Create an App

* Creating a node app is easy... make a JavaScript file
	* Regular JavaScript syntax 

```
//hello.js
var name = "World"
console.log("Hello " + name);
```

## Node Globals

* Commonly used globals [^globals]
	* `__filename` - Absolute path to file executing the code 
	* `__dirname` - Absolute path to directory the code is in
	* `module` - Reference to the current module
	* `exports` - Reference to `module.exports` used to provide 
	* `process` - Work with the current running node process
		* `process.argv` - Get the argument vector
* And some familar
	* `setTimeout()`, `setInterval()`, `clearInterval()`, `console()`
	
[^globals]: Note that some of these are per module thus not actually global

## Assignment 1 - Hello World! 

* Remake the hello world app using `process.argv`

