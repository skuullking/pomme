<?php
require_once __DIR__ . '/Database.php';

class Produit {
    private $db;

    public function __construct() {
        // Récupérer la connexion à la base de données
        $this->db = Database::getConnection();
    }

    public function getAll() {
        // Exécuter la requête pour récupérer tous les produits
        $stmt = $this->db->query("SELECT * FROM produits");
        // Retourner tous les résultats sous forme de tableau associatif
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
