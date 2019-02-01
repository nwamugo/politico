const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();


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

  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
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

  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
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

  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
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

  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
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

  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
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

  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
    });
};

/**
 * Drop Parties Table
 */
const dropPartiesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS parties';
  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
    });
};

const dropOfficesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS offices';
  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
    });
};

const dropCandidatesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS candidates';
  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
    });
};

const dropVotesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS votes';
  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
    });
};

const dropPetitionsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS petitions';
  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
    });
};

/**
 * Drop Users Table
 */
const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err.toString());
      client.end();
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

client.on('end', () => {
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
