const WebSocket = require('ws');
const uuid = require('node-uuid');
const terminal = require('terminal-kit').terminal;
const socket = new WebSocket.Server({
	port: 8080
});
const events = new Array("AgentCommand", "AgentCreated", "PlayerMessage");
terminal.bold("Please connect to 127.0.0.1:8080 \n");
terminal.slowTyping("FastBuilder by CAIMEO! \nEnjoy it!", {
	flashStyle: terminal.red
});
socket.on('connection',
function connection(ws) {
	var uuid_0 = uuid.v4();
	for (var c = 0; c < events.length; c++) {
		ws.send(JSON.stringify({
			"body": {
				"eventName": events[c]
			},
			"header": {
				"requestId": uuid_0,
				"messagePurpose": "subscribe",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
	}
	let x,
	y,
	z = 0;
	let dx = 0;
	let dy = 0;
	let dz = 0;
	let block_1 = "iron_block";
	let block_2 = "diamond_block";
	let entity = "tnt";
	let data_1 = 0;
	let data_2 = 0;
	let method = "replace";
	let buildType = "-b";
	let output_mod = "say §l§";
	let output_color = "e";
	let get_object;
	let values = null;
	function output(command, requestId) {
		ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": command,
				"version": 1
			},
			"header": {
				"requestId": requestId,
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
	}
	var requestId_1 = uuid.v4();
	var requestId_2 = uuid.v4();
	var requestId_3 = uuid.v4();
	function external(cmd) {
		output(cmd, requestId_1);
	}
	function getValue(cmd) {
		output(cmd, requestId_2);
	}
	function agent_mod(cmd) {
		output(cmd, requestId_3);
	}
	function get_number(String) {
		var reg = /[1-9][0-9]*/g;
		return List = String.match(reg);
	}
	function build(x, y, z, mod) {
		switch (mod) {
		case "block":
			external("fill " + x + " " + y + " " + z + " " + (x + dx) + " " + (y + dy) + " " + (z + dz) + " " + block_1 + " " + data_1 + " " + method);
			console.log("fill " + x + " " + y + " " + z + " " + (x + dx) + " " + (y + dy) + " " + (z + dz) + " " + block_1 + " " + data_1 + " " + method);
			break;
		case "block2":
			external("fill " + x + " " + y + " " + z + " " + (x + dx) + " " + (y + dy) + " " + (z + dz) + " " + block_1 + " " + data_1 + " " + method);
			console.log("fill " + x + " " + y + " " + z + " " + (x + dx) + " " + (y + dy) + " " + (z + dz) + " " + block_1 + " " + data_1 + " " + method);
			break;
		case "entity":
			external("summon " + entity + " " + x + " " + y + " " + z);
			console.log("summon " + entity + " " + x + " " + y + " " + z);
		default:
			external("fill " + x + " " + y + " " + z + " " + (x + dx) + " " + (y + dy) + " " + (z + dz) + " " + block_1 + " " + data_1 + " " + method);
			console.log("fill " + x + " " + y + " " + z + " " + (x + dx) + " " + (y + dy) + " " + (z + dz) + " " + block_1 + " " + data_1 + " " + method);
			break;
		}
	}
	//Circle
	const circle = {
		"x": function(x, y, z, r) {
			for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) build(x, y + i, z + j, buildType);
				}
			}
		},
		"y": function(x, y, z, r) {
			for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) build(x + i, y, z + j, buildType);
				}
			}
		},
		"z": function(x, y, z, r) {
			for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) build(x + i, y + j, z, buildType);
				}
			}
		}
	}
	//Round
	const round = {
		"x": function(x, y, z, r) {
			for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r) build(x, y + i, z + j, buildType);
				}
			}
		},
		"y": function(x, y, z, r) {
			for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r) build(x + i, y, z + j, buildType);
				}
			}
		},
		"z": function(x, y, z, r) {
			for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r) build(x + i, y + j, z, buildType);
				}
			}
		}
	}
	//Sphere
	const sphere = {
		"hollow": function(x, y, z, r) {
			for (var x1 = -r; x1 <= r; x1++) for (var y1 = -r; y1 <= r; y1++) {
				for (var z1 = -r; z1 <= r; z1++) {
					if (x1 * x1 + y1 * y1 + z1 * z1 <= r * r && x1 * x1 + y1 * y1 + z1 * z1 >= (r - 1) * (r - 1)) {
						build(x + x1, y + y1, z + z1, buildType);
					}
				}
			}
		},
		"solid": function(x, y, z, r) {
			for (var x1 = -r; x1 <= r; x1++) {
				for (var y1 = -r; y1 <= r; y1++) {
					for (var z1 = -r; z1 <= r; z1++) {
						if (x1 * x1 + y1 * y1 + z1 * z1 <= r * r) {
							build(x + x1, y + y1, z + z1, buildType);
						}
					}
				}
			}
		},
		"framework": function(x, y, z, r) {
			circle.x(x, y, z, r);
			circle.y(x, y, z, r);
			circle.z(x, y, z, r);
		}
	}
	//Ring
	const ring = {
		"x": function(x, y, z, r, h) {
			for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
						if (h - j >= 0)
						circle.x(x + i, y, z, h - j, r);
					}
				}
			}
		},
		"y": function(x, y, z, r, h) {
			for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
						if (h - j >= 0)
						circle.y(x, y + i, z, h - j, r);
					}
				}
			}
		},
		"z": function(x, y, z, r, h) {
			for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
						if (h - j >= 0)
						circle.z(x, y, z + i, h - j, r);
					}
				}
			}
		}
	}
	//WSON
	ws.on("message",
	function incoming(message) {
		var json = JSON.parse(message);
		if (json.header.requestId == requestId_2) {
			var return_data = json.body.statusMessage;
			get_number(return_data);
			switch (get_object) {
			case "pos":
				x = List[0] * 1;
				y = List[1] * 1;
				z = List[2] * 1;
				external(output_mod + output_color + "Position acquired.\nX: " + x + " ; Y : " + y + " ; Z : " + z);
				break;
			default:
				external(output_mod + output_color + "Can not get value");
				break;
			}
		}
		if (json.header.requestId == requestId_3) {
			var agent_message = json.body.statusMessage;
			external(output_mod + output_color + agent_message);
		}
		if (json.body.eventName == "PlayerMessage") {
			var player_message = json.body.properties.Message;
			//Agent Command
			if (player_message.substring(0, 5) == "agent") {
				var agent_command = player_message.substring(5, player_message.length).trim().toLowerCase();
				agent_mod("agent " + agent_command);
			}
			//Get values
			if (player_message.substring(0, 3) == "get") {
				values = player_message.substring(3, player_message.length).trim().toLowerCase().split(" ");
				switch (values[0]) {
				case "pos":
					getValue("testforblock ~~~ air");
					get_object = "pos"
					break;
				default:
					external("Value not found");
					break;
				}
			}
			//Set values
			if (player_message.substring(0, 3) == "set") {
				values = player_message.substring(3, player_message.length).trim().toLowerCase().split(" ");
				switch (values[0]) {
				case "pos":
					x = values[1] * 1;
					y = values[2] * 1;
					z = values[3] * 1;
					external(output_mod + output_color + "Position Set.\nX: " + x + " ; Y : " + y + " ; Z : " + z);
					break;
				default:
					external(output_mod + output_color + "Can not set values");
					break;
				}
			}
			//Edit value
			if (player_message.substring(0, 1) == "+"){
				values = player_message.substring(1, player_message.length).trim().toLowerCase().split(" ");
				switch (values[0]) {
					case "block1":
						block_1 = values[1];
						break;
					case "block2":
						block_2 = values[1];
						break;
					case "data1":
						data_1 = values[1] * 1;
						break;
					case "data2":
						data_2 = values[1] * 1;
						break;
					case "entity":
						entity = values[1];
					case "build":
						buildType = values[1];
						// external( output_mod + output_color + "Build Mod :" + buildType);
						break;
					default:
						external( output_mod + output_color + "Value not found or access denied");
						break;
				}
			}
			//Create circle
			if (player_message.substring(0, 6) == "circle") {
				values = player_message.substring(6, player_message.length).trim().toLowerCase().split(" ");
				switch (values[0]) {
				case "x":
					circle.x(x, y, z, values[1]);
					break;
				case "y":
					circle.y(x, y, z, values[1]);
					break;
				case "z":
					circle.z(x, y, z, values[1]);
					break;
				default:
					external(output_mod + output_color + "Method not found");
					break;
				}
			}
			//Create round
			if (player_message.substring(0, 5) == "round") {
				values = player_message.substring(5, player_message.length).trim().toLowerCase().split(" ");
				switch (values[0]) {
				case "x":
					round.x(x, y, z, values[1]);
					break;
				case "y":
					round.y(x, y, z, values[1]);
					break;
				case "z":
					round.z(x, y, z, values[1]);
					break;
				default:
					external(output_mod + output_color + "Method not found");
					break;
				}
			}
			//Create sphere
			if (player_message.substring(0, 6) == "sphere") {
				values = player_message.substring(6, player_message.length).trim().toLowerCase().split(" ");
				switch (values[0]) {
				case "solid":
					sphere.solid(x, y, z, values[1]);
					break;
				case "hollow":
					sphere.hollow(x, y, z, values[1]);
					break;
				case "framework":
					sphere.framework(x, y, z, values[1]);
					break;
				default:
					external(output_mod + output_color + "Method not found");
					break;
				}
			}
			//Create Ring
			if (player_message.substring(0, 4) == "ring") {
				values = player_message.substring(4, player_message.length).trim().toLowerCase().split(" ");
				switch (values[0]) {
				case "x":
					ring.x(x, y, z, values[1], values[2]);
					break;
				case "y":
					ring.y(x, y, z, values[1], values[2]);
					break;
				case "z":
					ring.z(x, y, z, values[1], values[2]);
					break;
				default:
					external(output_mod + output_color + "Method not found");
					break;
				}
			}
		}
	});
});
