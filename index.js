var settings    = require("./config");
var express     = require("express");
var app         = express();
var http        = require("http").createServer(app);
var io          = require("socket.io")(http);
var MessageFeed = require('./lib/message_feed');

app.use(express.static('resource'));
app.use(express.static('dst'));

var streamNs = io.of('stream');

var messageFeed = new MessageFeed(streamNs);

http.listen(settings.port, function() {
    var counter = 0;
    setInterval(function() {
        messageFeed.newMessage("Message "+counter);
        counter += 1;
    }, 1000);
});
