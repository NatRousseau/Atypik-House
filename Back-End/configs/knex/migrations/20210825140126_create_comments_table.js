
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('comments', function(table) {
        table.increments('com_id');
        table.text('com_text').notNullable();
        table.integer('com_adv_id').notNullable();
        table.foreign('com_adv_id').references('adv_id').inTable('adverts');
        table.integer('com_usr_id').notNullable();
        table.foreign('com_usr_id').references('usr_id').inTable('users');
        table.text('com_usr_firstName');
        table.text('com_usr_lastName');    
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');
};
