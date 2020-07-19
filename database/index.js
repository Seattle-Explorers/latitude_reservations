const { Client } = require('pg');

const host = process.env.DB || 'localhost';
const client = new Client({ host, database: 'sdc' });

client.connect();

module.exports.client = client;
