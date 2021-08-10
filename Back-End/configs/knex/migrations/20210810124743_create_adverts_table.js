
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('adverts', function(table) {
        table.increments('adv_id');
        table.text('adv_name').notNullable();
        table.text('adv_type').notNullable();
        table.text('adv_tenants').notNullable();
        table.integer('adv_usr_id').notNullable();
        table.foreign('adv_usr_id').references('usr_id').inTable('users');
        table.bool('adv_status').notNullable();
        table.bigint('adv_cri_limit').notNullable();
        

        
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('adverts');
};
