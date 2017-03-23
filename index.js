var settings    = require("./config");
var express     = require("express");
var app         = express();
var http        = require("http").createServer(app);
var io          = require("socket.io")(http);
var MessageFeed = require('./server/app/messagefeed');
var Viewer = require('./server/app/viewer');

app.use(express.static('resource'));
app.use(express.static('dst'));

var streamNs = io.of('stream');

var messageFeed = new MessageFeed(streamNs);
var viewer = new Viewer(streamNs);

http.listen(settings.port, function() {
    setTimeout(function() {
        viewer.setUrl('https://www.youtube.com/embed/8VIllAilTnE');
    }, 5000);
    setInterval(function() {
        messageFeed.newMessage({
            avatar: "http://0.gravatar.com/avatar/50663963c0a91eb97788148b7485681e",
            username: "SamP20",
            timestamp: new Date().toISOString(),
            message: "Hello world!"
        });
    }, 5000);
});
