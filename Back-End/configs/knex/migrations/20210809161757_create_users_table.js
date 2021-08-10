
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('users', function(table) {
        table.increments('usr_id');
        table.text('usr_mail').notNullable();
        table.text('usr_password').notNullable();
        table.integer('usr_rol_id');                                            //TO DO notNullable 
        table.foreign('usr_rol_id').references('rol_id').inTable('roles');                     
        table.text('usr_firstName');
        table.text('usr_lastName');
        table.text('usr_access_token');
        table.text('usr_refresh_token');
        table.text('usr_expires_in');

        
      })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};