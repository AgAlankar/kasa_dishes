// const mysql = require("postgresql");
const dbConfig = require("../config/db.config.js");
// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });
// // open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });
// module.exports = connection;


// const { Pool } = require("pg");
// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
// const pool = new Pool({
//   connectionString: isProduction
//     ? process.env.DATABASE_URL // Heroku will supply us with a string called DATABASE_URL for the connectionString,
//     : connectionString,
//   ssl: isProduction ? { rejectUnauthorized: false } : false,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };


// const Pool = require("pg").Pool;
// const connection = {
//   host: dbConfig.PG_HOST,
//   user: dbConfig.PG_USER,
//   // password: toString(dbConfig.PG_PASSWORD),
//   password: dbConfig.PG_PASSWORD,
//   database: dbConfig.PG_DATABASE,
//   port: dbConfig.PG_PORT
// };
// const pool = new Pool(connection);

// module.exports = pool;


// const { Client } = require('pg');

// const client = new Client({
//   connectionString: connectionString,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();

// client.query('SELECT * FROM dish;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

const { Pool, Client } = require('pg')
const pool = new Pool({
  host: dbConfig.PG_HOST,
  user: dbConfig.PG_USER,
  // password: toString(dbConfig.PG_PASSWORD),
  password: dbConfig.PG_PASSWORD,
  database: dbConfig.PG_DATABASE,
  port: dbConfig.PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})
pool.query('SELECT * from users', (err, res) => {
  console.log(err, res)
  // pool.end()
})
// const client = new Client({
//   host: dbConfig.PG_HOST,
//   user: dbConfig.PG_USER,
//   // password: toString(dbConfig.PG_PASSWORD),
//   password: dbConfig.PG_PASSWORD,
//   database: dbConfig.PG_DATABASE,
//   port: dbConfig.PG_PORT,
//   ssl: {
//     rejectUnauthorized: false
//   }
// })
// client.connect()
// client.query('SELECT * from admins', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

module.exports = pool;