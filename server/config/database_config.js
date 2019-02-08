const dotenv = require('dotenv');

dotenv.config();

export default {
  test: {
    user: 'plhpvtzz',
    host: 'baasu.db.elephantsql.com',
    database: 'plhpvtzz',
    password: process.env.test_DATABASE,
    port: 5432
  },
  development: {
    user: 'fdjjtdih',
    host: 'pellefant.db.elephantsql.com',
    database: 'fdjjtdih',
    password: process.env.DATABASE_PASSWORD,
    port: 5432
  }
};
