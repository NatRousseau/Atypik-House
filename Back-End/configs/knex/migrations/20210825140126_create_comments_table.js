
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('comments', function(table) {
        table.increments('com_id');
        
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');
};
