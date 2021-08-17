
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('criterias', function(table) {
        table.increments('cri_id');
        table.text('cri_name').notNullable();
        
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('criterias');
};
