
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('criteriadvert', function(table) {
        table.increments('ria_id');
        table.bigint('ria_cri_id').notNullable();
        table.foreign('ria_cri_id').references('cri_id').inTable('criterias');
        table.bigint('ria_adv_id').notNullable();
        table.foreign('ria_adv_id').references('adv_id').inTable('adverts');
        
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('criteriadvert');
};
