<?php

class Database {
    private static $instance = null;
    private $pdo;

    // Constructeur privé pour éviter la création directe de l'objet
    private function __construct() {
        try {
            // Utiliser les constantes définies dans config.php pour se connecter
            $this->pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS);
            // Configuration des attributs de la connexion PDO
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            // Si la connexion échoue, on arrête tout et on affiche l'erreur
            die("Échec de la connexion à la base de données: " . $e->getMessage());
        }
    }

    // Méthode pour obtenir la connexion à la base de données (instance unique)
    public static function getConnection() {
        // Si l'instance n'existe pas encore, on la crée
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        // On retourne l'instance de la connexion PDO
        return self::$instance->pdo;
    }
}
?>
