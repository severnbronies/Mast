var settings    = require("./config");
var express     = require("express");
var app         = express();
var http        = require("http").createServer(app);
var io          = require("socket.io")(http);

app.use(express.static('resource'));
app.use(express.static('dst'));


http.listen(settings.port, function() {

});
