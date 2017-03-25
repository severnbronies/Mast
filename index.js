var settings    = require("./config");
var express     = require("express");
var app         = express();
var http        = require("http").createServer(app);
var io          = require("socket.io")(http);
var MessageFeed = require('./server/app/messagefeed');
var Viewer = require('./server/app/viewer');
var TwitterFrontend = require('./server/frontend/twitter');

app.use(express.static('resource'));
app.use(express.static('dst'));

var streamNs = io.of('stream');

/**
 * Initialize applications here
 */
var messageFeed = new MessageFeed(streamNs);
var viewer = new Viewer(streamNs);

/**
 * Initialize frontends here
 */
var twitterFront = new TwitterFrontend(settings, messageFeed);

http.listen(settings.port, function() {
    twitterFront.initialize();
    setTimeout(function() {
        viewer.setUrl('https://www.youtube.com/embed/8VIllAilTnE');
    }, 5000);

});
