const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL2 || process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

/**
 * Create Parcels Table
 */
const createParcelsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  parcels(
  id UUID PRIMARY KEY,
  destination TEXT NOT NULL,
  user_id UUID NOT NULL,
  price INT,
  pickup_location TEXT NOT NULL,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  status VARCHAR(128),
  present_location TEXT,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err.toString());
      pool.end();
    });
};

/**
 * Create Users Table
 */
const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  users(
  id UUID PRIMARY KEY,
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  other_name VARCHAR(128),
  phone INTEGER,
  email VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  is_admin BOOLEAN,
  created_date TIMESTAMP,
  modified_date TIMESTAMP
  )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err.toString());
      pool.end();
    });
};

/**
 * Drop Parcels Table
 */
const dropParcelsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS parcels';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err.toString());
      pool.end();
    });
};

/**
 * Drop Users Table
 */
const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err.toString());
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createParcelsTable();
  createUsersTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropParcelsTable();
  dropUsersTable();
};

pool.on('remove', () => {
  process.exit(0);
});

module.exports = {
  createParcelsTable,
  createUsersTable,
  createAllTables,
  dropUsersTable,
  dropParcelsTable,
  dropAllTables
};

require('make-runnable');
