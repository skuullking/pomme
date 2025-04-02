<?php
require_once __DIR__ . '/../models/Produit.php';

class ProduitController {
    public function index() {
        $produitModel = new Produit();
        $produits = $produitModel->getAll();
        require __DIR__ . '/../views/produit.php';
    }
}
