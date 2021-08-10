const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express')
const server = express()
// const database = require("./configs/database");
const knex = require('./configs/knex/knex.js')
const morgan = require("morgan");
const port =  process.env.PORT || 4500 ;

server.use(morgan("common"));

// --------------- CORS ---------------

const whitelist = [
  'http://localhost:4200'
];
server.options('*', cors());
server.use(cors((req, callback) => {
  const corsOptions =
      (whitelist.indexOf(req.header('Origin')) !== -1)
          ? { origin: true } : { origin: false };
  callback(null, corsOptions);
}));

// --------------- KNEX ---------------

server.get('/tasks',(req, res) =>{
  knex.schema.createTable('beta', function (table) {
    table.increments();
    table.string('name');
    table.timestamps();
  })
  console.log("a run");
  return "done";
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

