const express = require('express');
const router = express.Router();
const homeController = require('./homeController');
const produitController = require('./produitController');

router.get('/', homeController.index);
router.get('/produits', produitController.index);

module.exports = router;
