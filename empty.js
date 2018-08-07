const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 2000 });
wss.on('connection', function connection(ws) {
	ws.on("message", function incoming(message) {
		console.log(message);
	});
});
