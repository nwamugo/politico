const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL2,
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
  id UUID PRIMARY KEY,
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
  id UUID PRIMARY KEY,
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


const createCandidatesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  candidates(
  id UUID PRIMARY KEY,
  office UUID NOT NULL,
  party UUID NOT NULL,
  user UUID NOT NULL,
  FOREIGN KEY (office) REFERENCES offices (id),
  FOREIGN KEY (party) REFERENCES parties (id),
  FOREIGN KEY (user) REFERENCES users (id) ON DELETE CASCADE,
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


const createVotesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  votes(
  id UUID PRIMARY KEY,
  created_on TIMESTAMP,
  created_by UUID NOT NULL,
  office UUID NOT NULL,
  candidate UUID NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
  FOREIGN KEY (candidate) REFERENCES candidates (id) ON DELETE CASCADE,
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
  id UUID PRIMARY KEY,
  created_on TIMESTAMP,
  created_by UUID NOT NULL,
  office UUID NOT NULL,
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
  id UUID PRIMARY KEY,
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  other_name VARCHAR(128),
  phone_number VARCHAR(128),
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
  console.log("We are going up!")
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
