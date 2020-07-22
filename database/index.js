const { Client } = require('pg');
require('dotenv').config();

// const localhost = {
//   host: 'localhost',
//   database: 'sdc',
// };

// const host = process.env.DB || localhost;
// const host = 'ec2-34-213-169-83.us-west-2.compute.amazonaws.com';
const client = new Client(
  {
    user: process.env.DB_USER,
    host: process.env.HOST || 'localhost',
    database: process.env.DB || 'sdc',
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  },
);

client.connect();

module.exports.client = client;
