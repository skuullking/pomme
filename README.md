# Installation et Résolution des Dépendances

Ce guide décrit les étapes pour installer et exécuter le projet en local, ainsi que pour résoudre les conflits de dépendances liés à `date-fns` et `react-day-picker`.

## Étapes d'installation

\`\`\`sh
# 1. Désinstaller date-fns avec --legacy-peer-deps
npm uninstall date-fns --legacy-peer-deps

# 2. Installer une version compatible de date-fns
npm install date-fns@2.28.0 --legacy-peer-deps

# 3. Réinstaller react-day-picker (si nécessaire)
npm uninstall react-day-picker --legacy-peer-deps
npm install react-day-picker@8.9.0 --legacy-peer-deps

# 4. Supprimer et réinstaller toutes les dépendances (si nécessaire)
rm -rf node_modules package-lock.json
npm install

# 5. Vérifier la version de React
npm install react@18 react-dom@18 --legacy-peer-deps

# 6. Démarrer le projet
npm run dev
\`\`\`