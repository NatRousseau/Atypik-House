
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('users', function(table) {
        table.increments('usr_id');
        table.string('usr_mail').notNullable();
        table.string('usr_password').notNullable();
        table.string('usr_firstName');
        table.string('usr_lastName');
        table.string('usr_access_token');
        table.string('usr_refresh_token');
        table.string('usr_expires_in');

        
      })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};