<?php

// Classe Router simple pour gérer les routes
class Router {
    private $routes = [];

    // Méthode pour enregistrer une route GET
    public function get($route, $function) {
        $this->routes['GET'][$route] = $function;
    }

    // Méthode pour exécuter les routes
    public function dispatch() {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        if (isset($this->routes[$method][$uri])) {
            // Appeler la fonction associée à cette route
            $this->routes[$method][$uri]();
        } else {
            echo "Page non trouvée!";
        }
    }
}

// Créer une instance du routeur
$router = new Router();
?>
