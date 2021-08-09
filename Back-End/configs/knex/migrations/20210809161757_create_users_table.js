
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('users', function(table) {
        table.increments('usr_id');
        table.string('usr_mail').notNullable();
        table.string('usr_password').notNullable();
        
      })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};