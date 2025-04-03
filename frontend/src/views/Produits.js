import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Produits() {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        axios.get('/produits')
            .then(response => {
                setProduits(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits:', error);
            });
    }, []);

    return (
        <div>
            <h1>Liste des produits</h1>
            <ul>
                {produits.map(produit => (
                    <li key={produit.id}>{produit.nom} - {produit.prix}€</li>
                ))}
            </ul>
            <a href="/">Retour à l'accueil</a>
        </div>
    );
}

export default Produits;
