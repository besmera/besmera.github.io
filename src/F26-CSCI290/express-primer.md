% Node.js
% Dr. Andrew Besmer
% Express

# Express

## Express

* Node.js is very low level
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
