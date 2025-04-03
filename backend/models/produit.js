const client = require('./database');

const Produit = {
    getAll: (callback) => {
        const query = 'SELECT * FROM produits';
        client.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.rows);
        });
    }
};

module.exports = Produit;
