
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('reserves', function(table) {
        table.increments('res_id');
        table.integer('res_usr_id').notNullable();
        table.foreign('res_usr_id').references('usr_id').inTable('users');
        table.text('res_usr_mail').notNullable();
        table.foreign('res_usr_mail').references('usr_mail').inTable('users');
        table.bigInteger('res_usr_phone').notNullable();
        table.foreign('res_usr_phone').references('usr_phone').inTable('users');
        table.integer('res_adv_id').notNullable();
        table.foreign('res_adv_id').references('adv_id').inTable('adverts');
        table.date('res_date').notNullable();
        table.timestamp('res_created_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
        table.integer('res_adv_price').notNullable();
        table.boolean('res_payment').defaultTo('false').notNullable();
        table.text('res_payment_timer').notNullable();
        table.integer('res_adv_tenants').notNullable();
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reserves');
};