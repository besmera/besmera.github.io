% Node.js
% Dr. Andrew Besmer
% Events

# Events

## Events

* You may have experience with events using jQuery

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

* You can also pass relevant data with events

```javascript
var EventEmitter = require('events').EventEmitter;

var attendant = new EventEmitter();

attendant.on('door bell', function(eventTime, eventRandNum){
        console.log("Answered the door for ", eventTime, " and random number", eventRandNum);
});

//at some random point

attendant.emit('door bell', Date.now(), Math.random());
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


# Streams

## Streams

* According to Node.js

> A stream is an abstract interface implemented by various objects in Node. For example a request to an HTTP server is a stream, as is stdout. Streams are readable, writable, or both. All streams are instances of EventEmitter.


## Streams

* A stream `.write()` will return whether or not there is more space in the buffer
	* If there is no space in the buffer you will begin exhausting RAM


## Streams

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
		response.write(((uploadedBytes / uploadSize) * 100) + "%\n");
	});

	request.on('end', function() {
		response.end("Complete\n");
	});
}).listen(8000);
```