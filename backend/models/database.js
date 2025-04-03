const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.pass,
    database: config.db.name
});

connection.connect((err) => {
    if (err) {
        console.error('Échec de la connexion à la base de données: ' + err.stack);
        return;
    }
    console.log('Connecté à la base de données en tant que ' + connection.threadId);
});

module.exports;
