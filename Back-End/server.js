var address = require('address');
var express = require('express');
var server = express();


port = process.env.PORT || 4500;

server.listen(port);

console.log('todo list RESTful API server started on: ' + port);

//==========        BODY PARSER     ==========

var bodyParser = require('body-parser');
server.use(bodyParser.json({
    limit: '9000mb'
}));
server.use(bodyParser.urlencoded({
    extended: true,
    limit: '9000mb'
}));



//==========        LAUNCH      ===========

var port = process.env.PORT || 450;
var hostname = '0.0.0.0' || '127.0.0.1';
server.listen(port, hostname, function () {
    console.log('Server launched on ' + hostname + ":" + port);
});

//==========        ROUTES      ==========

server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('ATP Rest API - ' + address.ip());
});
require('./routes/userRoutes')(server);
