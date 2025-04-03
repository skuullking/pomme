-- Création de la base de données
CREATE DATABASE IF NOT EXISTS pomme;
USE pomme;

-- Table des catégories de produits
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table des produits
CREATE TABLE IF NOT EXISTS produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    categorie_id INT,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
);

-- Table des caractéristiques des produits
CREATE TABLE IF NOT EXISTS caracteristiques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produit_id INT,
    nom VARCHAR(255) NOT NULL,
    valeur VARCHAR(255) NOT NULL,
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE
);

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('En attente', 'Expédiée', 'Livrée', 'Annulée') DEFAULT 'En attente',
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

-- Table des détails des commandes
CREATE TABLE IF NOT EXISTS details_commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT,
    produit_id INT,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);

-- Table pour comparer les produits
CREATE TABLE IF NOT EXISTS comparaisons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT,
    produit1_id INT,
    produit2_id INT,
    date_comparaison