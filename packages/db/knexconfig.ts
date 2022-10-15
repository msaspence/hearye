module.exports = {
  timezone: 'UTC',
  client: 'postgresql',
  connection: {
    database: 'hearye',
  },

  development: {
    client: 'postgresql',
    connection: {
      database: 'hearye',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_DSN,
    pool: {
      min: 2,
      max: 10,
    },
  },
}
