<?php
// Démarrer la session si nécessaire
session_start();

// Inclure la configuration et le routeur
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/controllers/router.php';


// Exemple de routage avec un objet $router (tu peux utiliser des routes simples pour maintenant)
$router->get('/', function() {
    require __DIR__ . '/views/home.php';  // Page d'accueil
});

// Dispatcher les routes
$router->dispatch();
?>
