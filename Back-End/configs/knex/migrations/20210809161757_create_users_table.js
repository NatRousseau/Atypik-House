
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('users', function(table) {
        table.increments('usr_id');
        table.text('usr_mail').unique().notNullable();
        table.text('usr_password').notNullable();
        table.bigInteger('usr_phone').unique().notNullable();
        table.integer('usr_rol_id');                                            //TO DO notNullable 
        table.foreign('usr_rol_id').references('rol_id').inTable('roles');                     
        table.text('usr_firstName');
        table.text('usr_lastName');
        table.text('usr_access_token');
        table.text('usr_refresh_token');
        table.text('usr_expires_in');

        
    })
    .then(function(){//password: "Admin1"
        return knex('users').insert([
            {usr_id:1,
            usr_mail:"admindefaultmail@testmail.com",
            usr_password:"$2b$05$hH8a3JfWwhGGgrOsMhfHW.8v5TQFtpafJ6LjKc5lWGmoomQ/8m7iS",
            usr_phone:33123456789,
            usr_rol_id:1,
            usr_firstName:"Admin"
            },
        ]);
    }
);

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
