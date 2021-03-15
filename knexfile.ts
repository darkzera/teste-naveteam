// Update with your config settings.
const knexConfig = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      database: 'naveteam'
    }
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations'
  },
  seeds: {
    directory: './seeds'
  }
};
export default knexConfig;
