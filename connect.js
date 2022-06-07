const { Client } = require('pg');

module.exports.getClient = async() => {
    const client = new Client({
    user:'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'pw6',
    port: 5432,
    method: 'peer'
    });
    await client.connect();
    return client;
};