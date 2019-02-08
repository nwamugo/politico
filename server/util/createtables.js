import pool from './database';


const queryText = `
CREATE TABLE IF NOT EXISTS
parties(
id SERIAL PRIMARY KEY,
name VARCHAR(128) UNIQUE NOT NULL,
hq_address TEXT,
logo_url VARCHAR(128),
created_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS
offices(
id SERIAL PRIMARY KEY,
type VARCHAR(128) NOT NULL,
name VARCHAR(128) UNIQUE NOT NULL,
created_date TIMESTAMP
);  

CREATE TABLE IF NOT EXISTS
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
);

CREATE TABLE IF NOT EXISTS
candidates(
id SERIAL UNIQUE,
office INT REFERENCES offices(id),
party INT REFERENCES parties(id),
candidate INT REFERENCES users(id),
created_date TIMESTAMP,
PRIMARY KEY(office, candidate)
);

CREATE TABLE IF NOT EXISTS
votes(
id SERIAL UNIQUE,
created_on TIMESTAMP,
created_by INT REFERENCES users(id),
office INT REFERENCES offices(id),
candidate INT REFERENCES candidates(id),
PRIMARY KEY(office, created_by)
);

CREATE TABLE IF NOT EXISTS
petitions(
id SERIAL PRIMARY KEY,
created_on TIMESTAMP,
created_by INT NOT NULL,
office INT NOT NULL,
FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE,
FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
body TEXT NOT NULL
);
`;

pool.query(queryText)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err.toString());
    pool.end();
  });


pool.on('remove', () => {
  console.log('We are going up!');
  process.exit(0);
});
