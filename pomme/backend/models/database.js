const { Client } = require('pg');
const config = require('../config/config');

const client = new Client({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port
});

client.connect()
    .then(() => console.log('Connecté à PostgreSQL'))
    .catch(err => console.error('Erreur de connexion à PostgreSQL', err.stack));

module.exports = client;
