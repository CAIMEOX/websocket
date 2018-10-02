const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const probe = require('probe-image-size');:
const wss = new WebSocket.Server({ port: 878 });
const events = new Array("AgentCommand","AgentCreated","PlayerMessage");
var clothColorsOptHD = [
	makeColor(168, 168, 168), // 白色
	makeColor(143, 59, 0), // 橙色
	makeColor(152, 0, 67), // 品红色
	makeColor(0, 153, 153), // 亮蓝色
	makeColor(150, 150, 0), // 黄色
	makeColor(59, 143, 0), // 绿色
	makeColor(167, 83, 125), // 粉色
	makeColor(64, 64, 64), // 灰色
	makeColor(101, 101, 101), // 亮灰
	makeColor(0, 83, 83), // 蓝绿色
	makeColor(43, 12, 75), // 紫色
	makeColor(0, 38, 77), // 蓝色
	makeColor(52, 25, 0), // 棕色
	makeColor(10, 76, 10), // 仙人掌绿
	makeColor(127, 9, 9), // 红色
	makeColor(17, 17, 17), // 黑色
]
function colorDistance(c1, c2) {
    var rmean = (c1.getRed() + c2.getRed()) / 2;
    var r = c1.getRed() - c2.getRed();
    var g = c1.getGreen() - c2.getGreen();
    var b = c1.getBlue() - c2.getBlue();
    var weightR = 2 + rmean/256;
    var weightG = 4.0;
    var weightB = 2 + (255-rmean)/256
    return Math.sqrt(weightR*r*r + weightG*g*g + weightB*b*b);
}
function findClosestWoolColor(col, clothColors) {
	var closestId = 0;
	var closestDistance = colorDistance(col, clothColors[0]);

	for(var i = 1; i < clothColors.length; i++) {
		var dist = colorDistance(col, clothColors[i]);

		if(dist < closestDistance) {
			closestId = i;
			closestDistance = dist;
		}
	}

	return closestId;
}
console.log("Please connect to 127.0.0.1:878");
console.log("Painting generator by CAIMEO!");
console.log("Have a good time!");
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
	function setblock(x, y, z, b, d){
	    command("setblock " + x + " " + y + " " + z + " " + b + " " + d);
        console.log("setblock " + x + " " + y + " " + z + " " + b + " " + d);
	}
	function draw(){
        for (var x_ = 0; x_ < width; x_++) {
        for (var y_ = 0; y_ < height; y_++) {
            var c = new Color(img.getRGB(x, y));
            var data = findClosestWoolColor(c,colors);
            setblock(x + x_, y + y_, z + z_, "wool", data);
        }
    }
}
	ws.on("message", function incoming(message) {
		if (JSON.parse(message).body.eventName == "PlayerMessage") {
            var pm = JSON.parse(message).body.properties.Message;
            if (pm.substring(0, 4) == "draw") {
            var values = pm.substring(4, pm.length).trim().toLowerCase().split(" ");
            draw();
            }}
	});
});
