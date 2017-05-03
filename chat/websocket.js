var socket = new WebSocket('ws://localhost:3000');
socket.onopen = function(event){
	socket.send('I am the clent and i\'m listening');
}
socket.onmessage = function(event){
	console.log('client received a message')
}
socket.onclose = function(event){
	console.log('client notified socket has closed')
}
