const fs = require("fs");

// Constants
module.exports = {
  database: {
    host:"185.171.202.192",
    port: 49174,
    database: 'AtypikHouse',
    user: 'atplead',
    password: 'atprnl'
  },
  port: process.env.PORT || 4500
};
