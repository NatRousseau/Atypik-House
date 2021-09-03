
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('roles', function(table) {
        table.increments('rol_id');
        table.text('rol_name').notNullable();
        })
        .then(function(){
                return knex('roles').insert([
                    {rol_id:1, rol_name:"Admin"},
                    {rol_id:2, rol_name:"Moderator"}
                ]);
            }
        );
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('roles');
};
