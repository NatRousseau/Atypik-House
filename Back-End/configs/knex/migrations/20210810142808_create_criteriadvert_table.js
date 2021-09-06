
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('criteriadvert', function(table) {
        table.increments('ria_id');
        table.bigint('ria_cri_id').notNullable();
        table.bigint('ria_adv_id').notNullable();
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('criteriadvert');
};
