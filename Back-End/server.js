const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { get } = require('http');
const server = express()
const reserveServices = require ('./services/reserve_services.ts');
const morgan = require("morgan");
const port =  process.env.PORT || 4500 ;

server.use(morgan("common"));
// --------------- HealthcheckDocker ---------------

const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: "http://eba994b968404e9eb11db412344c0904@whyz-trap.fr:9000/7",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// --------------- HealthcheckDocker ---------------

server.get("/healthz", function(req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

// --------------- CRON SCHELDULE ---------------

// var cron = require('node-cron');

// cron.schedule('* * */4 * * *', () => {
//   var Hours =  new Date().getHours();
//   var Mins  =  new Date().getMinutes();
//   var currentDate= new Date();
//   currentDate = formatDate(currentDate);

//   function formatDate(currentDate) {
//     var date = new Date(currentDate),
//         month = '' + (date.getMonth() + 1),
//         day = '' + date.getDate(),
//         year = date.getFullYear();

//     if (month.length < 2)
//         month = '0' + month;
//     if (day.length < 2)
//         day = '0' + day;

//     return [year, month, day].join('-');
//   }
//   const currentTimer = currentDate +"-"+ Hours +":"+ Mins;

//   reserveServices.cancelGlobalUnpaidReserve(currentTimer)
//   .then(result => {
//     if (result.length != 0) {
//       console.log({'succes': 'Suppresion de :',result});
//       //L'affichage des "result" est temporaire, cela sert ?? titre de benchmark ?? d??tecter
//       //s\'il y aune faille r??currente qui permettrait des r??servations non pay??s.
//       //Cela permete aussi d??viter de surcharger la BDD de datas inutiles.
//     } else {
//       console.log({ 'succes': 'Pas de suppresion n??cessaire' });
//     }
//     })
//     .catch(error => {
//         console.log({ 'error': 'Une r??servation anormale a stopper la suppression.' });
//     });
//   console.log('running a task every 4 hours to clear unresolved reserves');
// });

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
require('./routes/criteriaRoutes')(server);
require('./routes/activityRoutes')(server);
require('./routes/commentaryRoutes')(server);

module.exports = server;
