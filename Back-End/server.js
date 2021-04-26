const bodyParser = require('body-parser');
const express = require('express')
const server = express()
const database = require("./configs/database");
const morgan = require("morgan");
const { port } = require("./configs/config");

server.use(morgan("common"));

server.get("/healthz", function(req, res) {
    // do app logic here to determine if app is truly healthy
    // you should return 200 if healthy, and anything else will fail
    // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
    res.send("I am happy and healthy\n");
  });

// --------------- BODY PARSER ---------------

server.use(bodyParser.json({
    limit: '9000mb'
}));
server.use(bodyParser.urlencoded({
    extended: true,
    limit: '9000mb'
}));

//==========        LAUNCH      ===========

server.listen(port, function() {
    console.log("Webserver is ready on " +port);
  });

//==========        ROUTES      ==========

require('./routes/userRoutes')(server);

