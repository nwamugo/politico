import { Pool } from 'pg';
import dotenv from 'dotenv';

import dbConfig from '../config/database_config';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const connectionObject = dbConfig[env.trim()];
const pool = new Pool(connectionObject);

// const pool = new Pool({
//   user: 'fdjjtdih',
//   host: 'pellefant.db.elephantsql.com',
//   database: 'fdjjtdih',
//   password: process.env.DATABASE_PASSWORD,
//   port: '5432'
// });


export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err.toString());
        });
    });
  },
};
