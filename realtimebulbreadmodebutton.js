fs = require('fs')
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {
	res.sendFile(__dirname + '/realtimebulb.html');
});


var clients = 0;
io.on('connection', function(client) {
        clients++;
	console.log('Client connected... ' + clients + ' online!');
	client.on('join', function(data) {
		console.log(data);
		fs.readFile('bulbmode.txt', 'utf8', function (err,datatxt) {
			if (err) {
				return console.log(err);
		  }
		  console.log('Read: ' + datatxt);
		  var datatxt;
		  if (datatxt > 5) {
			  io.emit('buttonUpdateBulbOff', data);
			  console.log('Do > 5: buttonUpdateBulbOff');
			  } else if (datatxt < 5) {
				  io.emit('buttonUpdateBulb', data);
				  console.log('Do < 5: buttonUpdateBulbOn');
			  } else {
				  console.log('Data bulbmode.txt = 5');
			  }				  
		});

	})
        client.on('disconnect', function() {
                clients--;
                console.log('Client disconnect! ' + clients + ' online!');
        });

	client.on('clickedbon', function(data) {
		io.emit('buttonUpdateBulb', data);
		fs.writeFile('bulbmode.txt','4', function (err,data) {
			if (err) {
				return console.log(err);
			}
			console.log('Write On!');
		});
	  });
	client.on('clickedboff', function(data) {
		io.emit('buttonUpdateBulbOff', data);
		fs.writeFile('bulbmode.txt','6', function (err,data) {
			if (err) {
				return console.log(err);
			}
			console.log('Write Off!');
		});
	});
});
server.listen(4200);
