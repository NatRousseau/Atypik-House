
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('reserves', function(table) {
        table.increments('res_id');
        table.integer('res_usr_id').notNullable();
        table.foreign('res_usr_id').references('usr_id').inTable('users');
        table.integer('res_adv_id').notNullable();
        table.foreign('res_adv_id').references('adv_id').inTable('adverts');
        table.date('res_date').notNullable();
        table.timestamp('res_created_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
        table.integer('res_adv_price').notNullable();
        table.boolean('res_payment').defaultTo('false').notNullable();
        table.timestamp('res_payment_timer').notNullable();

    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reserves');
};