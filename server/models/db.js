import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: 'fdjjtdih',
  host: 'pellefant.db.elephantsql.com',
  database: 'fdjjtdih',
  password: process.env.DATABASE_PASSWORD,
  port: '5432'
});


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
