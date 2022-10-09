// Load variabel .env ketika development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME_DEVELOPMENT,
    password: process.env.DATABASE_PASSWORD_DEVELOPMENT,
    database: process.env.DATABASE_DEVELOPMENT,
    host: process.env.DATABASE_HOST_DEVELOPMENT,
    timezone: process.env.DATABASE_TIMEZONE_DEVELOPMENT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    timezone: process.env.DATABASE_TIMEZONE,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
