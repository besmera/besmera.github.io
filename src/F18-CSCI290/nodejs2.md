% Node.js 
% Dr. Andrew Besmer
% The Basics
	
# Modules

## Overview
* Do you rewrite 100% of your code each time you have a new app?
* Do you write 100% of code for your site?
* Modules allow for code reuse and third party consumption
	* Modules can be grouped into packages
	* Similar to?

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

## npm

* `npm` is similar to `composer`
	* Dependency management
* Solves similar issues
	* Packages depend on other packages
	* Those packages depend on even more packages
	* Require a certain package version

	
## npm
* Find packages at [http://npmjs.com](http://npmjs.com)
	* Install locally `npm install packageName` 
	* Then just `require('packageName')`
* Can install globally `npm install -g packageName` but then can't require
	* `node-inspector` or `http-server` are examples

# Events

## Events

* We have expierence with events using jQuery

```javascript
$("#albums").on("click", ".album",function(){
	//Do something with this album
});
```

## Node Events

* Node events are similar in that you can listen for them using `.on()`
* Events you can listen for are `emit()`ed from objects
* If an object emits events it must be a child of `EventEmitter`

```javascript
var EventEmitter = require('events').EventEmitter;

var attendant = new EventEmitter();

attendant.on('door bell', function(){
        console.log("Answer the door");
});

//at some random point

attendant.emit('door bell');
```

## Node Events

* Many of the node objects will emit events for your to listen to
	* `http` emits `request` events
	* The http `request` object will emit `data` as the request comes in
	
## HTTP Server

* Setup a basic http server by listening for the `request` event

```javascript
var http = require('http');
var server = http.createServer();
server.on('request', function(request, response){
        console.log("http request event fired!");
        response.end("http request event fired!");
});
server.listen(8000);
```

## HTTP Server

* Alternatively 
	* See [the docs](http://nodejs.org/api/)

```javascript
var http = require('http');
http.createServer(function(request, response){
        console.log("http request event fired!");
        response.end("http request event fired!");
}).listen(8000);
```

## Try it!

* Let's make a home page `/` and an about page `/about`
	* Just basic html structure and the name of page
* Use the `request`/`response` objects and multiple `reponse.write()`s
* Don't forget `node-debug`

# Streams

## Streams

* We also have experience with streams!
* What is a stream?

## Streams

* According to Node.js

> A stream is an abstract interface implemented by various objects in Node. For example a request to an HTTP server is a stream, as is stdout. Streams are readable, writable, or both. All streams are instances of EventEmitter. 

## Streams

* What kind of stream is `request`?
* What kind of stream is `response`?
* What would an example of a stream that is both readable and writable?

```javascript
var http = require('http');
http.createServer(function(request, response){
        console.log("http request event fired!");
        response.end("http request event fired!");
}).listen(8000);
```

## Request Stream

* The http server emits `request` event
* Callback is called passing `request` stream object
	* `request` stream object emits `data` and `end`
	
```javascript
var http = require('http');

http.createServer(function(request, response){
        request.on('data', function(data){
                console.log(data.toString());
        });

        request.on('end', function(){
                response.writeHead(200);
                response.end();
        });
}).listen(8000);
```	

## Try it!

* Make the request stream send the incoming data back out to the response stream

\ 

* After completing
	* How might bandwidth create a problem with our example?
	
## Streams

* A stream `.write()` will return whether or not there is more space in the buffer
	* If there is no space in the buffer you will begin exhausting RAM
* One option is to `.pause()` the stream you are reading from and waiting for the write stream to `drain()`
		
```javascript
var http = require('http');

http.createServer(function(request, response){
        request.on('data', function(data){
                if(response.write(data) == false)
					request.pause();
        });
		
		response.on('drain', function(){
			request.resume();
		})

        request.on('end', function(){
                response.writeHead(200);
                response.end();
        });
}).listen(8000);
```	
		
		
## Piping

* Another option is using a pipe
* Piping does handles the pause, resuming for you

```javascript
var http = require('http');

http.createServer(function(request, response){
        request.pipe(response);
		request.on('end',function(){
			response.end();
		});
}).listen(8000);
```	

## File Uploads

* Pipe is useful for file uploads, why?

```javascript
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
	var outFile = fs.createWriteStream("outFile");
	var uploadSize = request.headers['content-length'];
	var uploadedBytes = 0;

	request.pipe(outFile);
	
	request.on('data', function(data) {
		uploadedBytes += data.length;
		response.write((uploadedBytes / uploadSize) * 100) + "%\n");
	});

	request.on('end', function() {
		response.end("Complete\n");
	});
}).listen(8000);
```

# Express

## Express

* Node.js is very low level, not a framework like Symfony2
* Express is a framework
	* Request routing
	* Middleware for 
		* Url decoding
		* Query string parsing 
		* File uploads
		* etc ...
		
## Getting Express

* Get express `npm install express`
* Require it!

```javascript
var express = require('express');
app = express();

app.get('/', function(request, response){
        response.write("Hello");
        response.end();
});

app.listen(8000);
```

## Slugs

* Can use slugs in express routing 

```javascript
var express = require('express');
app = express();

app.get('/hello/:name', function(request, response){
        response.write("Hello " + request.params.name);
        response.end();
});

app.listen(8000);
```
