<?php
$config = require __DIR__ . '/../config/config.php';

try {
    $pdo = new PDO(
        "mysql:host=" . $config['db_host'] . ";dbname=" . $config['db_name'], 
        $config['db_user'], 
        $config['db_pass']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie à la base de données ! 🎉";
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

