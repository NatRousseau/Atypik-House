
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('adverts', function(table) {
        table.increments('adv_id');
        table.text('adv_name').notNullable();
        table.bigint('adv_usr_id').notNullable();
        table.bool('adv_status').notNullable();
        table.bigint('adv_estate_type').notNullable();
        

        
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('adverts');
};
