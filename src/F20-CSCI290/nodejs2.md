% Node.js
% Dr. Andrew Besmer
% The Basics



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
		response.write(((uploadedBytes / uploadSize) * 100) + "%\n");
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
