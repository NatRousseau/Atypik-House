const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express')
const server = express()
const database = require("./configs/database");
const morgan = require("morgan");
const { port } = require("./configs/config");

server.use(morgan("common"));

// --------------- CORS ---------------

const whitelist = [
  '127.0.0.1'
];
server.options('*', cors());
server.use(cors((req, callback) => {
  const corsOptions =
      (whitelist.indexOf(req.header('Origin')) !== -1)
          ? { origin: true } : { origin: false };
  callback(null, corsOptions);
}));


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

