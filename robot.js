const WebSocket = require('ws');
const http = require('http');
const wss = new WebSocket.Server({ port: 8080 });
const key = "";
function getPage(url) {
    var pm = new Promise(function (resolve, reject) {
        http.get(url, function (res) {
            var html = '';
            res.on('data', function (d) {
                html += d.toString()
            });
            res.on('end', function () {
                resolve(html);
            });
        });
    });
    return pm;
}
wss.on('connection', function connection(ws) {
	ws.send(JSON.stringify({
            "body": {
                "eventName": "PlayerMessage"
            },
            "header": {
                "requestId": "0ffae098-00ff-ffff-abbbbbbbbbdf3344",
                "messagePurpose": "subscribe",
                "version": 1,
                "messageType": "commandRequest"
            }}));
	function ai_output(cmd) {
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
	ws.on("message", function input(message) {
		if (JSON.parse(message).body.eventName == "PlayerMessage" && JSON.parse(message).body.properties.MessageType=="chat") {
    		var player_message = JSON.parse(message).body.properties.Message;
    		getPage("http://www.tuling123.com/openapi/api?key="+key+"&info="+player_message).then(function(d){
    			ai_output("me " + JSON.parse(d).text);
    		});
    	}
	});
});
