
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('activities', function(table) {
        table.increments('act_id');
        
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('activities');
};
