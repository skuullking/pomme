<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produits</title>
</head>
<body>
    <h1>Liste des produits</h1>
    <ul>
        <?php foreach ($produits as $produit): ?>
            <li><?= htmlspecialchars($produit['nom']) ?> - <?= htmlspecialchars($produit['prix']) ?>€</li>
        <?php endforeach; ?>
    </ul>
    <a href="index.php">Retour à l'accueil</a>
</body>
</html>
