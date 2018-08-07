const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const events = new Array("AgentCommand","AgentCreated","PlayerMessage");
console.log("Please connect to 127.0.0.1:8080");
console.log("You can use \"-\" control agent.")
wss.on('connection', function connection(ws) {
	for (var c = 0 ; c < events.length ; c++){
		ws.send(JSON.stringify({
            "body": {
                "eventName": events[c]
            },
            "header": {
                "requestId": "0ffae098-00ff-ffff-abbbbbbbbbdf3344",
                "messagePurpose": "subscribe",
                "version": 1,
                "messageType": "commandRequest"
            }}));
	}
	function command(cmd){
		ws.send(JSON.stringify({
            "body": {
                "origin": {
                    "type": "player"
                },
                "commandLine": cmd,
                "version": 1
            },
            "header": {
                "requestId": "add538f2-94c1-422b-8334-41fa5e8778c9",
                "messagePurpose": "commandRequest",
                "version": 1,
                "messageType": "commandRequest"
            }
        }));
	}
	ws.on("message", function incoming(message) {
		if (JSON.parse(message).body.eventName == "PlayerMessage") {
            var agent_command = JSON.parse(message).body.properties.Message;
            if (agent_command.substring(0, 1) == "-") {
                command(agent_command.substring(1, agent_command.length));
            }}
	});
});
