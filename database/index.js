require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool(
  {
    user: process.env.DB_USER,
    host: process.env.HOST || 'localhost',
    database: process.env.DB || 'sdc',
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
);

module.exports.pool = pool;
