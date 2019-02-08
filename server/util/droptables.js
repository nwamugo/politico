import pool from './database';

const queryText = `
DROP TABLE IF EXISTS parties, offices, candidates, votes, petitions, users CASCADE;
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
