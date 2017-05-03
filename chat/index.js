var app = require('express')();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

var websocket = require("./test");

app.get('/', function(req, res){
	//res.send('<h1>Hello world</h1>');
	//res.sendFile(__dirname + '/index.html');
	res.sendFile(__dirname + '/test.html');
});

/*var server = http.createServer(function(req , res){
    router.route(req , res);
}).listen(9030);
*/
websocket.upgrad(http , function(ws){
    ws.on('close' , function(reason){
        console.log("socket closed:"+reason);
    });

    ws.on('message' , function(data){
        websocket.brocast(data);
    });
});

/*io.on('connection', function(socket){
	//console.log('a user connected');
	
  	socket.on('chat message', function(msg){
    	//console.log('message: ' + msg);
    	io.emit('chat message', msg);
  	});
  	
  	socket.on('disconnect', function(){
		//console.log('a user disconnected');
	})
});*/

http.listen(3000, function(){
	console.log('listening on *:3000');
})




