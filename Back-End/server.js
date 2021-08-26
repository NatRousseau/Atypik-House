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
    'http://atypikhouse.art'
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
require('./routes/activityRoutes')(server);
require('./routes/commentaryRoutes')(server);

