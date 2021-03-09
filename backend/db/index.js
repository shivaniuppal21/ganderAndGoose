const pg = require("pg");

const client = new pg.Client({
  //connectionString: process.env.DATABASE_URL || ""
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

client
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;