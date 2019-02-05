const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new pg.Pool({
  user: 'fdjjtdih',
  host: 'pellefant.db.elephantsql.com',
  database: 'fdjjtdih',
  password: process.env.DATABASE_PASSWORD,
  port: 5432
});

pool.on('connect', () => {
  console.log('connected to the Database');
});


/**
 * Create Parties Table
 */
const createPartiesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  parties(
  id SERIAL PRIMARY KEY,
  name VARCHAR(128) UNIQUE NOT NULL,
  hq_address TEXT,
  logo_url VARCHAR(128),
  created_date TIMESTAMP
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


const createOfficesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  offices(
  id SERIAL PRIMARY KEY,
  type VARCHAR(128) NOT NULL,
  name VARCHAR(128) UNIQUE NOT NULL,
  created_date TIMESTAMP
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

const createPetitionsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  petitions(
  id SERIAL PRIMARY KEY,
  created_on TIMESTAMP,
  created_by INT NOT NULL,
  office INT NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
  body TEXT NOT NULL
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
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(128) NOT NULL,
  last_name VARCHAR(128) NOT NULL,
  other_name VARCHAR(128),
  phone_number VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  passport_url VARCHAR(128),
  is_admin BOOLEAN,
  created_date TIMESTAMP
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

const createCandidatesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  candidates(
  id SERIAL UNIQUE,
  office INT REFERENCES offices(id),
  party INT REFERENCES parties(id),
  candidate INT REFERENCES users(id),
  created_date TIMESTAMP,
  PRIMARY KEY(office, candidate)
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

const createVotesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  votes(
  id SERIAL UNIQUE,
  created_on TIMESTAMP,
  created_by INT REFERENCES users(id),
  office INT REFERENCES offices(id),
  candidate INT REFERENCES candidates(id),
  PRIMARY KEY(office, created_by)
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
 * Drop Parties Table
 */
const dropPartiesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS parties';
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

const dropOfficesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS offices';
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

const dropCandidatesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS candidates';
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

const dropVotesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS votes';
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

const dropPetitionsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS petitions';
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
  createPartiesTable();
  createOfficesTable();
  createUsersTable();
  createPetitionsTable();
  createCandidatesTable();
  createVotesTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropPartiesTable();
  dropOfficesTable();
  dropUsersTable();
  dropPetitionsTable();
  dropCandidatesTable();
  dropVotesTable();
};

pool.on('remove', () => {
  console.log('We are going up!');
  process.exit(0);
});

module.exports = {
  createPartiesTable,
  createOfficesTable,
  createCandidatesTable,
  createVotesTable,
  createPetitionsTable,
  createUsersTable,
  createAllTables,
  dropUsersTable,
  dropPetitionsTable,
  dropVotesTable,
  dropCandidatesTable,
  dropOfficesTable,
  dropPartiesTable,
  dropAllTables
};

require('make-runnable');
