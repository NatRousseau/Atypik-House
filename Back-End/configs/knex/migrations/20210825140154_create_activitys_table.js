
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('activitys', function(table) {
        table.increments('act_id');
        table.text('act_name').notNullable();
        table.integer('act_adv_id').notNullable();
        table.foreign('act_adv_id').references('adv_id').inTable('adverts');
        table.text('act_adress').notNullable();
        table.text('act_city').notNullable();
        table.bigint('act_postal').notNullable();
        table.text('act_describe').notNullable();

    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('activitys');
};
