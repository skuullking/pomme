const Produit = require('../models/produit');

exports.index = (req, res) => {
    Produit.getAll((err, produits) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération des produits');
        }
        res.json(produits);
    });
};
