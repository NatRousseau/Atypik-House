const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express')
const server = express()
// const knex = require('./configs/knex/knex.js')
const morgan = require("morgan");
const port =  process.env.PORT || 4500 ;

server.use(morgan("common"));

// --------------- CORS ---------------

const whitelist = [
  'http://localhost:4200',
    'https://atypikhouse.art'
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
require('./routes/advertRoutes')(server);
require('./routes/reserveRoutes')(server);

server.get("/healthz", function(req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});
