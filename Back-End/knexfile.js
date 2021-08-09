module.exports = {
    development: {
      client: 'pg',
      connection: {
            host:"localhost",
            port: 49174,
            database: 'AtypikHouse',
            user: 'atplead',
            password: 'atprnl',
            searchPath: ['knex', 'public'],
      },
      migrations: {
        directory: __dirname + '/configs/knex/migrations',
      },
      seeds: {
        directory: __dirname + '/configs/knex/seeds'
      }
    },
    staging: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
    production: {
      client: 'pg',
      connection: {
        host:"185.171.202.192",
        port: 49174,
        database: 'AtypikHouse',
        user: 'atplead',
        password: 'atprnl',
        searchPath: ['knex', 'public'],
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  };