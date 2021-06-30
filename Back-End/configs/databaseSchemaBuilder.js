const knex = require('knex');


knex.schema.withSchema('public').createTable('beta', function (table) {
    table.increments(betid);
    table.string('val');
})
