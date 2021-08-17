
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('roles', function(table) {
        table.increments('rol_id');
        table.text('rol_name').notNullable();
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('roles');
};
