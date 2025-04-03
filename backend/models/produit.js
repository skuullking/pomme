const db = require('./database');

const Produit = {
    getAll: (callback) => {
        const query = 'SELECT * FROM produits';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Produit;
