
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('adverts', function(table) {
        table.increments('adv_id');
        table.text('adv_name').notNullable();
        table.text('adv_type').notNullable();
        table.integer('adv_tenants').notNullable();
        table.integer('adv_usr_id').notNullable();
        table.foreign('adv_usr_id').references('usr_id').inTable('users');
        table.boolean('adv_status').notNullable();
        table.boolean('adv_up').notNullable();
        table.bigint('adv_cri_limit').notNullable();
        table.timestamp('adv_created_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
        table.integer('adv_price').notNullable();
        table.text('adv_adress').notNullable();
        table.text('adv_city').notNullable();
        table.bigint('adv_postal').notNullable();
        table.bigInteger('adv_usr_phone').notNullable();
        table.foreign('adv_usr_phone').references('usr_phone').inTable('users');
        table.text('adv_usr_mail').notNullable();
        table.foreign('adv_usr_mail').references('usr_mail').inTable('users');
        table.text('adv_describe').notNullable();
        
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('adverts');
};
