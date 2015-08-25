% socket.io
% Dr. Andrew Besmer

# socket.io

## Chat Server

* Options for chat server
	* Short Polling (Very Bad)
	* Long Polling (Good)
	* Web Sockets (Good)

## Web Socket vs Request/Response

<img src="http://www.websocket.org/img/latency-comparison.gif">


## Socket.io Server

```bash
npm install socket.io
```

```javascript
// app.js

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io');
var io = socket.listen(server);

app.use(express.static(__dirname + '/public')); //shares a static folder

io.sockets.on('connection', function(client) {
  console.log('New Chat User Connected');
});

server.listen(8024, function() {
  console.log('Express server is listening on port 8024...');
});
```


## Client Template
* Template we will use 


```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
 <head>
  <title>\o/ Chat</title>
 </head>
 <body>
  <h1>\o/ Chat</h1>

   <div id="users"></div>

   <div id="chatRoom">
     <h3 id="chatStatus"></h3>
     <ul>
     </ul>
   </div>

 <form id="chatForm">
   <input id="chatInput" type="text">
   <input type="submit" value="Send">
  </form>
 </body>
</html>
```

## Socket.io Client

* Don't forget to put the `socket.io.js` and `jquery-2.1.3.min.js` in the `public/libs` folder!

```html
<!-- public/index.html -->

 <script src="libs/socket.io.js"></script>
 <script src="libs/jquery-2.1.3.min.js"></script>
 <script>
   var server = io.connect('http://winthrop.dbms.rocks:8024');
</script>
```





## Sending Events Client to Server

* Use `emit()` passing object to send
* Object will be sent to server using socket.io

```html
<!-- public/index.html -->

<script>
     server.emit('setUsername', {username : 'bsmith'});
</script>
```

## Receiving Events on Server

* Register a `.on()` to listen for events 
	* A `connection` event is a built in event for when a new client is connected
	* The `setUsername` is a custom event specific to the client socket


```javascript
// app.js

io.sockets.on('connection', function(client) {
  console.log('New Chat User Connected');

  client.on('setUsername', function(data) {
    console.log(data);
    client.username = data.username;
  });

});
```

## Sending Events Client to Server

* Probably don't want everyone to have `bsmith` 
* Lets ask them for their user

```html
<!-- public/index.html -->

<script>
 server.on('connect', function(data) {
     var username = prompt("What is your chat name?");

     $('#chatStatus').html('Connected to \\o/ Chat');

     server.emit('setUsername', {username : username});
   });
</script>
```

## Try it

* Practice Time


## Sending Events Server to Client

* Use `emit()`!
	* Can emit using a reference to the client socket or to all 

```javascript
// app.js

io.sockets.on('connection', function(client) {
  client.on('myEvent', function(data) {
    client.emit('someEvent', {}); //Send to socket data from
    //Note: you could use a reference to other client sockets provided it is in scope
  });
```
\ 
or

```javascript
// app.js

io.sockets.on('connection', function(client) {
  client.on('myEvent', function(data) {
    io.emit('someEvent', {}); //broadcast to all connected sockets
  });
```

## Receiving Events on Client

* Register a `on()`!
* Thats it!

```html
<!-- index.html -->

   server.on('someEvent', function(data) {
     console.log(data);
   });
```



## Try it

* Practice Time
	* Emit from the client a `chatMessage` event sending the `message` you enter
	* When the event is received by the server 
		* Send the message in an object to the other chatters 
			* `username` and `message` properties
	* Starter code and hints on next few slides

## Hint App

```javascript
//app.js

io.sockets.on('connection', function(client) {

  //setUsername event...

  // register the chatMessage event and when received
     // emit the username and message to a single client or everyone?
});

```

## Hint Index

```html
<script>
   // socket io and username setup stuff

   //register listener chat messages and when they arrive
       // $('#chatRoom ul').append("<li>" + ??????????? + ": " + ????????????? + "</li>");

   $(document).ready(function() {
     $('#chatForm').submit(function(e) {
       e.preventDefault();

       var message = $('#chatInput').val();

       //emit the ‘chatMessage’ event on the server

       $('#chatInput').val("");
     });
   });
 </script>
```


## Try it

* Practice Time


## Solution App

```javascript

// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io');
var io = socket.listen(server);

app.use(express.static(__dirname + '/public')); //shares a static folder

io.sockets.on('connection', function(client) {
  console.log('New Chat User Connected');

  client.on('setUsername', function(data) {
    client.username = data.username;
  });

  client.on('chatMessage', function(data) {
    io.emit('chatMessage', {username: client.username, message: data.message }); //broadcast to all clients connected
  });
});

server.listen(8024, function() {
  console.log('Express server is listening on port 8024...');
});
```

## Solution Index

```html
<!DOCTYPE html>
<html>
 <head>
  <title>\o/ Chat</title>
 </head>
 <body>
  <h1>\o/ Chat</h1>

  <form id="chatForm">

   <div id="users"></div>

   <div id="chatRoom">
     <h3 id="chatStatus"></h3>
     <ul>
     </ul>
   </div>
   <input id="chatInput" type="text">
   <input type="submit" value="Send">
  </form>
 </body>

 <script src="libs/socket.io.js"></script>
 <script src="libs/jquery-2.1.3.min.js"></script>
 <script>
   var server = io.connect('http://winthrop.dbms.rocks:8024');

   server.on('connect', function(data) {
     var username = prompt("What is your chat name?");

     $('#chatStatus').html('Connected to \\o/ Chat');

     server.emit('setUsername', {username : username});
   });

   server.on('chatMessage', function(data) {
     $('#chatRoom ul').append("<li>" + data.username + ": " + data.message + "</li>");
   }); // listen for message events

   $(document).ready(function() {
     $('#chatForm').submit(function(e) {

       e.preventDefault();

       var message = $('#chatInput').val();

       //emit the ‘chatMessage’ event on the server
       server.emit('chatMessage', { message : message });

       $('#chatInput').val("");
     });
   });
 </script>

</html>
```

# Persistence

## Persistence

* What happens when you first get to the chatroom?

## Persistence

* Show the last 10 messages by storing them in mongodb capped collection

```javascript
// 3145728 bytes = 3MB x (1024KB/1MB) x (1024B/1KB)
db.createCollection("chat", {capped: true, size: 3145728, max: 10});
```
 



