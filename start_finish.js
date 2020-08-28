//start_finish.js
var http = require('http');

for(let ct=6000; ct<65000; ct++)
{
if(ct==8080 || ct==33868 || ct == 34018 || ct == 34190 || ct == 34778 || ct== 35564 || ct == 35729 || ct == 37626)
	continue;
http.createServer(function(request, response) {
  response.writeHead(200);
  response.write("Started.\n");
  setTimeout(function () {
    response.write("Finished.\n");
    response.end();
  }, 0); 
}).listen(ct);

}
console.log('listening on port 8000...');
