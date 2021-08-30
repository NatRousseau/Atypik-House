const environment = process.env.ENVIRONMENT || 'development'  //'production'
const config = require('../../knexfile.js')[environment];
module.exports = require('knex')(config);
