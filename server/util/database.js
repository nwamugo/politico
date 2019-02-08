import pg from 'pg';
import dotenv from 'dotenv';

import dbConfig from '../config/database_config';

dotenv.config();


const env = process.env.NODE_ENV || 'production';
console.log(env);
const connectionObject = dbConfig[env];
const pool = new pg.Pool(connectionObject);


pool.on('connect', () => {
  console.log('connected to the Database');
});

pool.on('remove', () => {
  console.log('We are going up!');
  process.exit(0);
});

export default pool;
