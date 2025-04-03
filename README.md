# 🚀 Installation et Résolution des Dépendances

Ce guide décrit les étapes pour installer et exécuter le projet en local, ainsi que pour résoudre les conflits de dépendances liés à `date-fns` et `react-day-picker`.

---

## 📌 Étapes d'installation


1️⃣ Désinstaller date-fns avec --legacy-peer-deps
```sh
npm uninstall date-fns --legacy-peer-deps
```


# 2️⃣ Installer une version compatible de date-fns
```sh
npm install date-fns@2.28.0 --legacy-peer-deps
```
# 3️⃣ Réinstaller react-day-picker (si nécessaire)
```sh
npm uninstall react-day-picker --legacy-peer-deps
npm install react-day-picker@8.9.0 --legacy-peer-deps
```

# 4️⃣ Supprimer et réinstaller toutes les dépendances (si nécessaire)
```sh
rm -rf node_modules package-lock.json
npm install
```

# 5️⃣ Vérifier la version de React
```sh
npm install react@18 react-dom@18 --legacy-peer-deps
```
# 6️⃣ Démarrer le projet
```sh
npm run dev
```
