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
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
  },
}
