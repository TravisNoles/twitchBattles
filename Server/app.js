var fs = require('fs');
var nconf = require('nconf');
    
var express = require('express');
var app = express();



//load up env based config file.
nconf.set('game_server_password', 'password');
nconf.set('twitch_name', 'test');
nconf.set('twitch_auth', 'test');
nconf.set('twitch_channel', '#test');
nconf.set('twitch_command', '!battle');

nconf.argv()
     .env()
     .file({file: './config.json'});
     
console.log(nconf.get("twitch_name"));

var GameServer = require("./gameServer/server.js");
var battleServer = GameServer.Instance();

//load up routes once globals are created
var godotRoutes = require("./routes/godot.js");
var webRoutes = require("./routes/web.js");
app.use("/headless", godotRoutes);
app.use("/web", webRoutes);

var server = app.listen(8080, function() {
   
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("twitchBattle server listen at http://%s:%s", host, port);
});




