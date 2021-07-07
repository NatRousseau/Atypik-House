const fs = require("fs");

// Constants
module.exports = {
  database: {
    host:"127.0.0.1",
    port: 49174,
    database: 'AtypikHouse',
    user: 'atplead',
    password: 'atprnl'
  },
  port: process.env.PORT || 4500
};
