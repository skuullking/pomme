/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/iphones/route";
exports.ids = ["app/api/iphones/route"];
exports.modules = {

/***/ "(rsc)/./app/api/iphones/route.ts":
/*!**********************************!*\
  !*** ./app/api/iphones/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _vercel_postgres__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vercel/postgres */ \"(rsc)/./node_modules/@vercel/postgres/dist/index-node.js\");\n\n\n// Détection du mode prévisualisation\nconst isPreview = process.env.VERCEL_ENV === \"preview\" || !process.env.POSTGRES_URL || !process.env.DATABASE_URL || \"development\" === \"development\";\nasync function GET() {\n    try {\n        console.log(\"Récupération des iPhones...\");\n        console.log(\"Mode prévisualisation:\", isPreview ? \"Oui\" : \"Non\");\n        // En mode prévisualisation ou sans connexion à la base de données, retourner directement les données fictives\n        if (isPreview) {\n            console.log(\"Utilisation des données fictives (mode prévisualisation)\");\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(mockIphones);\n        }\n        // Uniquement tenter de se connecter à la base de données si nous ne sommes pas en mode prévisualisation\n        try {\n            console.log(\"Tentative de connexion à la base de données...\");\n            const { rows } = await (0,_vercel_postgres__WEBPACK_IMPORTED_MODULE_1__.sql)`\n        SELECT * FROM iphones \n        ORDER BY release_year DESC, price DESC\n      `;\n            console.log(`${rows.length} iPhones récupérés depuis la base de données`);\n            // Si aucune donnée n'est récupérée, utiliser les données fictives\n            if (!rows || rows.length === 0) {\n                console.log(\"Aucune donnée récupérée, utilisation des données fictives\");\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(mockIphones);\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(rows);\n        } catch (dbError) {\n            console.error(\"Erreur de base de données:\", dbError);\n            console.log(\"Utilisation des données fictives suite à une erreur de base de données\");\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(mockIphones);\n        }\n    } catch (error) {\n        console.error(\"Erreur générale:\", error);\n        console.log(\"Utilisation des données fictives suite à une erreur générale\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(mockIphones);\n    }\n}\n// Données fictives pour les utiliser quand la base de données n'est pas disponible\nconst mockIphones = [\n    // iPhone 16 Series (fictifs)\n    {\n        id: 1,\n        name: \"iPhone 16 Pro Max\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 1299.0,\n        colors: \"Titane doré, Titane graphite, Titane argent, Titane bleu nuit\",\n        display: \"Écran Super Retina XDR 6,9 pouces avec ProMotion 120Hz et Always-On\",\n        chip: \"Puce A18 Pro\",\n        camera: \"Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 5x)\",\n        battery: \"Jusqu'à 32 heures de lecture vidéo\",\n        features: \"Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W\",\n        release_year: 2024,\n        storage_options: \"256 Go, 512 Go, 1 To, 2 To\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"160,2 x 77,1 x 8,1 mm\",\n        weight: 219.0,\n        series: \"iPhone 16\"\n    },\n    {\n        id: 2,\n        name: \"iPhone 16 Pro\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 1099.0,\n        colors: \"Titane doré, Titane graphite, Titane argent, Titane bleu nuit\",\n        display: \"Écran Super Retina XDR 6,3 pouces avec ProMotion 120Hz et Always-On\",\n        chip: \"Puce A18 Pro\",\n        camera: \"Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 3x)\",\n        battery: \"Jusqu'à 26 heures de lecture vidéo\",\n        features: \"Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W\",\n        release_year: 2024,\n        storage_options: \"256 Go, 512 Go, 1 To, 2 To\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"147,0 x 71,2 x 8,1 mm\",\n        weight: 185.0,\n        series: \"iPhone 16\"\n    },\n    {\n        id: 3,\n        name: \"iPhone 16 Plus\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 999.0,\n        colors: \"Bleu océan, Vert forêt, Violet lavande, Gris sidéral, Lumière stellaire\",\n        display: \"Écran Super Retina XDR 6,7 pouces avec 90Hz\",\n        chip: \"Puce A18\",\n        camera: \"Système à double caméra (48MP principal, Ultra grand-angle 16MP)\",\n        battery: \"Jusqu'à 28 heures de lecture vidéo\",\n        features: \"Dynamic Island, USB-C, Bouton Action, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 30W\",\n        release_year: 2024,\n        storage_options: \"128 Go, 256 Go, 512 Go, 1 To\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"161,0 x 77,9 x 7,7 mm\",\n        weight: 199.0,\n        series: \"iPhone 16\"\n    },\n    {\n        id: 4,\n        name: \"iPhone 16\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 899.0,\n        colors: \"Bleu océan, Vert forêt, Violet lavande, Gris sidéral, Lumière stellaire\",\n        display: \"Écran Super Retina XDR 6,1 pouces avec 90Hz\",\n        chip: \"Puce A18\",\n        camera: \"Système à double caméra (48MP principal, Ultra grand-angle 16MP)\",\n        battery: \"Jusqu'à 22 heures de lecture vidéo\",\n        features: \"Dynamic Island, USB-C, Bouton Action, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 30W\",\n        release_year: 2024,\n        storage_options: \"128 Go, 256 Go, 512 Go, 1 To\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"147,8 x 71,8 x 7,7 mm\",\n        weight: 169.0,\n        series: \"iPhone 16\"\n    },\n    {\n        id: 5,\n        name: \"iPhone 16E\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 799.0,\n        colors: \"Corail, Menthe, Indigo, Sable, Noir\",\n        display: \"Écran Super Retina XDR 6,1 pouces\",\n        chip: \"Puce A18\",\n        camera: \"Système à double caméra (48MP principal, Ultra grand-angle 12MP)\",\n        battery: \"Jusqu'à 20 heures de lecture vidéo\",\n        features: \"Dynamic Island, USB-C, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 25W\",\n        release_year: 2024,\n        storage_options: \"128 Go, 256 Go, 512 Go\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"147,8 x 71,8 x 7,8 mm\",\n        weight: 167.0,\n        series: \"iPhone 16\"\n    },\n    // iPhone 15 Series\n    {\n        id: 6,\n        name: \"iPhone 15 Pro Max\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 1199.0,\n        colors: \"Titane naturel, Titane bleu, Titane blanc, Titane noir\",\n        display: \"Écran Super Retina XDR 6,7 pouces avec ProMotion 120Hz et Always-On\",\n        chip: \"Puce A17 Pro\",\n        camera: \"Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 5x)\",\n        battery: \"Jusqu'à 29 heures de lecture vidéo\",\n        features: \"Dynamic Island, USB-C 3.0, Bouton Action, Design en titane, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 27W\",\n        release_year: 2023,\n        storage_options: \"256 Go, 512 Go, 1 To\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"159,9 x 76,7 x 8,25 mm\",\n        weight: 221.0,\n        series: \"iPhone 15\"\n    },\n    {\n        id: 7,\n        name: \"iPhone 15 Pro\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 999.0,\n        colors: \"Titane naturel, Titane bleu, Titane blanc, Titane noir\",\n        display: \"Écran Super Retina XDR 6,1 pouces avec ProMotion 120Hz et Always-On\",\n        chip: \"Puce A17 Pro\",\n        camera: \"Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 3x)\",\n        battery: \"Jusqu'à 23 heures de lecture vidéo\",\n        features: \"Dynamic Island, USB-C 3.0, Bouton Action, Design en titane, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 27W\",\n        release_year: 2023,\n        storage_options: \"128 Go, 256 Go, 512 Go, 1 To\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"146,6 x 70,6 x 8,25 mm\",\n        weight: 187.0,\n        series: \"iPhone 15\"\n    },\n    {\n        id: 8,\n        name: \"iPhone 15 Plus\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 899.0,\n        colors: \"Noir, Bleu, Vert, Jaune, Rose\",\n        display: \"Écran Super Retina XDR 6,7 pouces\",\n        chip: \"Puce A16 Bionic\",\n        camera: \"Système à double caméra (48MP principal, Ultra grand-angle 12MP)\",\n        battery: \"Jusqu'à 26 heures de lecture vidéo\",\n        features: \"Dynamic Island, USB-C 2.0, SOS d'urgence, Wi-Fi 6, Bluetooth 5.3, Charge rapide 20W\",\n        release_year: 2023,\n        storage_options: \"128 Go, 256 Go, 512 Go\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"160,9 x 77,8 x 7,80 mm\",\n        weight: 201.0,\n        series: \"iPhone 15\"\n    },\n    {\n        id: 9,\n        name: \"iPhone 15\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 799.0,\n        colors: \"Noir, Bleu, Vert, Jaune, Rose\",\n        display: \"Écran Super Retina XDR 6,1 pouces\",\n        chip: \"Puce A16 Bionic\",\n        camera: \"Système à double caméra (48MP principal, Ultra grand-angle 12MP)\",\n        battery: \"Jusqu'à 20 heures de lecture vidéo\",\n        features: \"Dynamic Island, USB-C 2.0, SOS d'urgence, Wi-Fi 6, Bluetooth 5.3, Charge rapide 20W\",\n        release_year: 2023,\n        storage_options: \"128 Go, 256 Go, 512 Go\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"147,6 x 71,6 x 7,80 mm\",\n        weight: 171.0,\n        series: \"iPhone 15\"\n    },\n    // iPhone 14 Series\n    {\n        id: 10,\n        name: \"iPhone 14 Pro Max\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 1099.0,\n        colors: \"Violet intense, Or, Argent, Noir sidéral\",\n        display: \"Écran Super Retina XDR 6,7 pouces avec ProMotion 120Hz et Always-On\",\n        chip: \"Puce A16 Bionic\",\n        camera: \"Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 3x)\",\n        battery: \"Jusqu'à 29 heures de lecture vidéo\",\n        features: \"Dynamic Island, Lightning, SOS d'urgence, Détection d'accident, Wi-Fi 6, Bluetooth 5.3, Charge rapide 27W\",\n        release_year: 2022,\n        storage_options: \"128 Go, 256 Go, 512 Go, 1 To\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"160,7 x 77,6 x 7,85 mm\",\n        weight: 240.0,\n        series: \"iPhone 14\"\n    },\n    {\n        id: 11,\n        name: \"iPhone 14 Pro\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 999.0,\n        colors: \"Violet intense, Or, Argent, Noir sidéral\",\n        display: \"Écran Super Retina XDR 6,1 pouces avec ProMotion 120Hz et Always-On\",\n        chip: \"Puce A16 Bionic\",\n        camera: \"Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 3x)\",\n        battery: \"Jusqu'à 23 heures de lecture vidéo\",\n        features: \"Dynamic Island, Lightning, SOS d'urgence, Détection d'accident, Wi-Fi 6, Bluetooth 5.3, Charge rapide 27W\",\n        release_year: 2022,\n        storage_options: \"128 Go, 256 Go, 512 Go, 1 To\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"147,5 x 71,5 x 7,85 mm\",\n        weight: 206.0,\n        series: \"iPhone 14\"\n    },\n    {\n        id: 12,\n        name: \"iPhone 14 Plus\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 899.0,\n        colors: \"Bleu (14), Violet, Jaune (14), Minuit, Lumière stellaire, PRODUCT(RED)\",\n        display: \"Écran Super Retina XDR 6,7 pouces\",\n        chip: \"Puce A15 Bionic\",\n        camera: \"Système à double caméra (12MP principal, Ultra grand-angle 12MP)\",\n        battery: \"Jusqu'à 26 heures de lecture vidéo\",\n        features: \"Encoche, Lightning, SOS d'urgence, Détection d'accident, Wi-Fi 6, Bluetooth 5.3, Charge rapide 20W\",\n        release_year: 2022,\n        storage_options: \"128 Go, 256 Go, 512 Go\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"160,8 x 78,1 x 7,80 mm\",\n        weight: 203.0,\n        series: \"iPhone 14\"\n    },\n    {\n        id: 13,\n        name: \"iPhone 14\",\n        image_url: \"/placeholder.svg?height=400&width=200\",\n        price: 799.0,\n        colors: \"Bleu (14), Violet, Jaune (14), Minuit, Lumière stellaire, PRODUCT(RED)\",\n        display: \"Écran Super Retina XDR 6,1 pouces\",\n        chip: \"Puce A15 Bionic\",\n        camera: \"Système à double caméra (12MP principal, Ultra grand-angle 12MP)\",\n        battery: \"Jusqu'à 20 heures de lecture vidéo\",\n        features: \"Encoche, Lightning, SOS d'urgence, Détection d'accident, Wi-Fi 6, Bluetooth 5.3, Charge rapide 20W\",\n        release_year: 2022,\n        storage_options: \"128 Go, 256 Go, 512 Go\",\n        water_resistance: \"IP68 (6 mètres pendant 30 minutes maximum)\",\n        dimensions: \"146,7 x 71,5 x 7,80 mm\",\n        weight: 172.0,\n        series: \"iPhone 14\"\n    }\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFrQjtRQUNsQkMsWUFBWTtRQUNaQyxRQUFRO1FBQ1JDLFFBQVE7SUFDVjtJQUNBLG1CQUFtQjtJQUNuQjtRQUNFZixJQUFJO1FBQ0pDLE1BQU07UUFDTkMsV0FBVztRQUNYQyxPQUFPO1FBQ1BDLFFBQVE7UUFDUkMsU0FBUztRQUNUQyxNQUFNO1FBQ05DLFFBQVE7UUFDUkMsU0FBUztRQUNUQyxVQUNFO1FBQ0ZDLGNBQWM7UUFDZEMsaUJBQWlCO1FBQ2pCQyxrQkFBa0I7UUFDbEJDLFlBQVk7UUFDWkMsUUFBUTtRQUNSQyxRQUFRO0lBQ1Y7SUFDQTtRQUNFZixJQUFJO1FBQ0pDLE1BQU07UUFDTkMsV0FBVztRQUNYQyxPQUFPO1FBQ1BDLFFBQVE7UUFDUkMsU0FBUztRQUNUQyxNQUFNO1FBQ05DLFFBQVE7UUFDUkMsU0FBUztRQUNUQyxVQUNFO1FBQ0ZDLGNBQWM7UUFDZEMsaUJBQWlCO1FBQ2pCQyxrQkFBa0I7UUFDbEJDLFlBQVk7UUFDWkMsUUFBUTtRQUNSQyxRQUFRO0lBQ1Y7SUFDQTtRQUNFZixJQUFJO1FBQ0pDLE1BQU07UUFDTkMsV0FBVztRQUNYQyxPQUFPO1FBQ1BDLFFBQVE7UUFDUkMsU0FBUztRQUNUQyxNQUFNO1FBQ05DLFFBQVE7UUFDUkMsU0FBUztRQUNUQyxVQUFVO1FBQ1ZDLGNBQWM7UUFDZEMsaUJBQWlCO1FBQ2pCQyxrQkFBa0I7UUFDbEJDLFlBQVk7UUFDWkMsUUFBUTtRQUNSQyxRQUFRO0lBQ1Y7SUFDQTtRQUNFZixJQUFJO1FBQ0pDLE1BQU07UUFDTkMsV0FBVztRQUNYQyxPQUFPO1FBQ1BDLFFBQVE7UUFDUkMsU0FBUztRQUNUQyxNQUFNO1FBQ05DLFFBQVE7UUFDUkMsU0FBUztRQUNUQyxVQUFVO1FBQ1ZDLGNBQWM7UUFDZEMsaUJBQWlCO1FBQ2pCQyxrQkFBa0I7UUFDbEJDLFlBQVk7UUFDWkMsUUFBUTtRQUNSQyxRQUFRO0lBQ1Y7Q0FDRCIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxuaWphMVxcRG93bmxvYWRzXFxhcHBsZS1pcGhvbmUtY29tcGFyYXRvclxcYXBwXFxhcGlcXGlwaG9uZXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXG5pbXBvcnQgdHlwZSB7IFBob25lTW9kZWwgfSBmcm9tIFwiQC90eXBlcy9waG9uZVwiXG5pbXBvcnQgeyBzcWwgfSBmcm9tIFwiQHZlcmNlbC9wb3N0Z3Jlc1wiXG5cbi8vIETDqXRlY3Rpb24gZHUgbW9kZSBwcsOpdmlzdWFsaXNhdGlvblxuY29uc3QgaXNQcmV2aWV3ID1cbiAgcHJvY2Vzcy5lbnYuVkVSQ0VMX0VOViA9PT0gXCJwcmV2aWV3XCIgfHxcbiAgIXByb2Nlc3MuZW52LlBPU1RHUkVTX1VSTCB8fFxuICAhcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMIHx8XG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCJcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZyhcIlLDqWN1cMOpcmF0aW9uIGRlcyBpUGhvbmVzLi4uXCIpXG4gICAgY29uc29sZS5sb2coXCJNb2RlIHByw6l2aXN1YWxpc2F0aW9uOlwiLCBpc1ByZXZpZXcgPyBcIk91aVwiIDogXCJOb25cIilcblxuICAgIC8vIEVuIG1vZGUgcHLDqXZpc3VhbGlzYXRpb24gb3Ugc2FucyBjb25uZXhpb24gw6AgbGEgYmFzZSBkZSBkb25uw6llcywgcmV0b3VybmVyIGRpcmVjdGVtZW50IGxlcyBkb25uw6llcyBmaWN0aXZlc1xuICAgIGlmIChpc1ByZXZpZXcpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVXRpbGlzYXRpb24gZGVzIGRvbm7DqWVzIGZpY3RpdmVzIChtb2RlIHByw6l2aXN1YWxpc2F0aW9uKVwiKVxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG1vY2tJcGhvbmVzKVxuICAgIH1cblxuICAgIC8vIFVuaXF1ZW1lbnQgdGVudGVyIGRlIHNlIGNvbm5lY3RlciDDoCBsYSBiYXNlIGRlIGRvbm7DqWVzIHNpIG5vdXMgbmUgc29tbWVzIHBhcyBlbiBtb2RlIHByw6l2aXN1YWxpc2F0aW9uXG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVGVudGF0aXZlIGRlIGNvbm5leGlvbiDDoCBsYSBiYXNlIGRlIGRvbm7DqWVzLi4uXCIpXG5cbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgc3FsPFBob25lTW9kZWw+YFxuICAgICAgICBTRUxFQ1QgKiBGUk9NIGlwaG9uZXMgXG4gICAgICAgIE9SREVSIEJZIHJlbGVhc2VfeWVhciBERVNDLCBwcmljZSBERVNDXG4gICAgICBgXG4gICAgICBjb25zb2xlLmxvZyhgJHtyb3dzLmxlbmd0aH0gaVBob25lcyByw6ljdXDDqXLDqXMgZGVwdWlzIGxhIGJhc2UgZGUgZG9ubsOpZXNgKVxuXG4gICAgICAvLyBTaSBhdWN1bmUgZG9ubsOpZSBuJ2VzdCByw6ljdXDDqXLDqWUsIHV0aWxpc2VyIGxlcyBkb25uw6llcyBmaWN0aXZlc1xuICAgICAgaWYgKCFyb3dzIHx8IHJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXVjdW5lIGRvbm7DqWUgcsOpY3Vww6lyw6llLCB1dGlsaXNhdGlvbiBkZXMgZG9ubsOpZXMgZmljdGl2ZXNcIilcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG1vY2tJcGhvbmVzKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocm93cylcbiAgICB9IGNhdGNoIChkYkVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGRlIGJhc2UgZGUgZG9ubsOpZXM6XCIsIGRiRXJyb3IpXG4gICAgICBjb25zb2xlLmxvZyhcIlV0aWxpc2F0aW9uIGRlcyBkb25uw6llcyBmaWN0aXZlcyBzdWl0ZSDDoCB1bmUgZXJyZXVyIGRlIGJhc2UgZGUgZG9ubsOpZXNcIilcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihtb2NrSXBob25lcylcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBnw6luw6lyYWxlOlwiLCBlcnJvcilcbiAgICBjb25zb2xlLmxvZyhcIlV0aWxpc2F0aW9uIGRlcyBkb25uw6llcyBmaWN0aXZlcyBzdWl0ZSDDoCB1bmUgZXJyZXVyIGfDqW7DqXJhbGVcIilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obW9ja0lwaG9uZXMpXG4gIH1cbn1cblxuLy8gRG9ubsOpZXMgZmljdGl2ZXMgcG91ciBsZXMgdXRpbGlzZXIgcXVhbmQgbGEgYmFzZSBkZSBkb25uw6llcyBuJ2VzdCBwYXMgZGlzcG9uaWJsZVxuY29uc3QgbW9ja0lwaG9uZXM6IFBob25lTW9kZWxbXSA9IFtcbiAgLy8gaVBob25lIDE2IFNlcmllcyAoZmljdGlmcylcbiAge1xuICAgIGlkOiAxLFxuICAgIG5hbWU6IFwiaVBob25lIDE2IFBybyBNYXhcIixcbiAgICBpbWFnZV91cmw6IFwiL3BsYWNlaG9sZGVyLnN2Zz9oZWlnaHQ9NDAwJndpZHRoPTIwMFwiLFxuICAgIHByaWNlOiAxMjk5LjAsXG4gICAgY29sb3JzOiBcIlRpdGFuZSBkb3LDqSwgVGl0YW5lIGdyYXBoaXRlLCBUaXRhbmUgYXJnZW50LCBUaXRhbmUgYmxldSBudWl0XCIsXG4gICAgZGlzcGxheTogXCLDiWNyYW4gU3VwZXIgUmV0aW5hIFhEUiA2LDkgcG91Y2VzIGF2ZWMgUHJvTW90aW9uIDEyMEh6IGV0IEFsd2F5cy1PblwiLFxuICAgIGNoaXA6IFwiUHVjZSBBMTggUHJvXCIsXG4gICAgY2FtZXJhOiBcIlN5c3TDqG1lIGRlIGNhbcOpcmEgUHJvICg1ME1QIHByaW5jaXBhbCwgVWx0cmEgZ3JhbmQtYW5nbGUgNDhNUCwgVMOpbMOpb2JqZWN0aWYgNXgpXCIsXG4gICAgYmF0dGVyeTogXCJKdXNxdSfDoCAzMiBoZXVyZXMgZGUgbGVjdHVyZSB2aWTDqW9cIixcbiAgICBmZWF0dXJlczogXCJEeW5hbWljIElzbGFuZCwgVVNCLUMgMy4yLCBCb3V0b24gQWN0aW9uLCBEZXNpZ24gZW4gdGl0YW5lLCBXaS1GaSA3LCBCbHVldG9vdGggNS4zLCBDaGFyZ2UgcmFwaWRlIDQ1V1wiLFxuICAgIHJlbGVhc2VfeWVhcjogMjAyNCxcbiAgICBzdG9yYWdlX29wdGlvbnM6IFwiMjU2IEdvLCA1MTIgR28sIDEgVG8sIDIgVG9cIixcbiAgICB3YXRlcl9yZXNpc3RhbmNlOiBcIklQNjggKDYgbcOodHJlcyBwZW5kYW50IDMwIG1pbnV0ZXMgbWF4aW11bSlcIixcbiAgICBkaW1lbnNpb25zOiBcIjE2MCwyIHggNzcsMSB4IDgsMSBtbVwiLFxuICAgIHdlaWdodDogMjE5LjAsXG4gICAgc2VyaWVzOiBcImlQaG9uZSAxNlwiLFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgbmFtZTogXCJpUGhvbmUgMTYgUHJvXCIsXG4gICAgaW1hZ2VfdXJsOiBcIi9wbGFjZWhvbGRlci5zdmc/aGVpZ2h0PTQwMCZ3aWR0aD0yMDBcIixcbiAgICBwcmljZTogMTA5OS4wLFxuICAgIGNvbG9yczogXCJUaXRhbmUgZG9yw6ksIFRpdGFuZSBncmFwaGl0ZSwgVGl0YW5lIGFyZ2VudCwgVGl0YW5lIGJsZXUgbnVpdFwiLFxuICAgIGRpc3BsYXk6IFwiw4ljcmFuIFN1cGVyIFJldGluYSBYRFIgNiwzIHBvdWNlcyBhdmVjIFByb01vdGlvbiAxMjBIeiBldCBBbHdheXMtT25cIixcbiAgICBjaGlwOiBcIlB1Y2UgQTE4IFByb1wiLFxuICAgIGNhbWVyYTogXCJTeXN0w6htZSBkZSBjYW3DqXJhIFBybyAoNTBNUCBwcmluY2lwYWwsIFVsdHJhIGdyYW5kLWFuZ2xlIDQ4TVAsIFTDqWzDqW9iamVjdGlmIDN4KVwiLFxuICAgIGJhdHRlcnk6IFwiSnVzcXUnw6AgMjYgaGV1cmVzIGRlIGxlY3R1cmUgdmlkw6lvXCIsXG4gICAgZmVhdHVyZXM6IFwiRHluYW1pYyBJc2xhbmQsIFVTQi1DIDMuMiwgQm91dG9uIEFjdGlvbiwgRGVzaWduIGVuIHRpdGFuZSwgV2ktRmkgNywgQmx1ZXRvb3RoIDUuMywgQ2hhcmdlIHJhcGlkZSA0NVdcIixcbiAgICByZWxlYXNlX3llYXI6IDIwMjQsXG4gICAgc3RvcmFnZV9vcHRpb25zOiBcIjI1NiBHbywgNTEyIEdvLCAxIFRvLCAyIFRvXCIsXG4gICAgd2F0ZXJfcmVzaXN0YW5jZTogXCJJUDY4ICg2IG3DqHRyZXMgcGVuZGFudCAzMCBtaW51dGVzIG1heGltdW0pXCIsXG4gICAgZGltZW5zaW9uczogXCIxNDcsMCB4IDcxLDIgeCA4LDEgbW1cIixcbiAgICB3ZWlnaHQ6IDE4NS4wLFxuICAgIHNlcmllczogXCJpUGhvbmUgMTZcIixcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIG5hbWU6IFwiaVBob25lIDE2IFBsdXNcIixcbiAgICBpbWFnZV91cmw6IFwiL3BsYWNlaG9sZGVyLnN2Zz9oZWlnaHQ9NDAwJndpZHRoPTIwMFwiLFxuICAgIHByaWNlOiA5OTkuMCxcbiAgICBjb2xvcnM6IFwiQmxldSBvY8OpYW4sIFZlcnQgZm9yw6p0LCBWaW9sZXQgbGF2YW5kZSwgR3JpcyBzaWTDqXJhbCwgTHVtacOocmUgc3RlbGxhaXJlXCIsXG4gICAgZGlzcGxheTogXCLDiWNyYW4gU3VwZXIgUmV0aW5hIFhEUiA2LDcgcG91Y2VzIGF2ZWMgOTBIelwiLFxuICAgIGNoaXA6IFwiUHVjZSBBMThcIixcbiAgICBjYW1lcmE6IFwiU3lzdMOobWUgw6AgZG91YmxlIGNhbcOpcmEgKDQ4TVAgcHJpbmNpcGFsLCBVbHRyYSBncmFuZC1hbmdsZSAxNk1QKVwiLFxuICAgIGJhdHRlcnk6IFwiSnVzcXUnw6AgMjggaGV1cmVzIGRlIGxlY3R1cmUgdmlkw6lvXCIsXG4gICAgZmVhdHVyZXM6IFwiRHluYW1pYyBJc2xhbmQsIFVTQi1DLCBCb3V0b24gQWN0aW9uLCBXaS1GaSA2RSwgQmx1ZXRvb3RoIDUuMywgQ2hhcmdlIHJhcGlkZSAzMFdcIixcbiAgICByZWxlYXNlX3llYXI6IDIwMjQsXG4gICAgc3RvcmFnZV9vcHRpb25zOiBcIjEyOCBHbywgMjU2IEdvLCA1MTIgR28sIDEgVG9cIixcbiAgICB3YXRlcl9yZXNpc3RhbmNlOiBcIklQNjggKDYgbcOodHJlcyBwZW5kYW50IDMwIG1pbnV0ZXMgbWF4aW11bSlcIixcbiAgICBkaW1lbnNpb25zOiBcIjE2MSwwIHggNzcsOSB4IDcsNyBtbVwiLFxuICAgIHdlaWdodDogMTk5LjAsXG4gICAgc2VyaWVzOiBcImlQaG9uZSAxNlwiLFxuICB9LFxuICB7XG4gICAgaWQ6IDQsXG4gICAgbmFtZTogXCJpUGhvbmUgMTZcIixcbiAgICBpbWFnZV91cmw6IFwiL3BsYWNlaG9sZGVyLnN2Zz9oZWlnaHQ9NDAwJndpZHRoPTIwMFwiLFxuICAgIHByaWNlOiA4OTkuMCxcbiAgICBjb2xvcnM6IFwiQmxldSBvY8OpYW4sIFZlcnQgZm9yw6p0LCBWaW9sZXQgbGF2YW5kZSwgR3JpcyBzaWTDqXJhbCwgTHVtacOocmUgc3RlbGxhaXJlXCIsXG4gICAgZGlzcGxheTogXCLDiWNyYW4gU3VwZXIgUmV0aW5hIFhEUiA2LDEgcG91Y2VzIGF2ZWMgOTBIelwiLFxuICAgIGNoaXA6IFwiUHVjZSBBMThcIixcbiAgICBjYW1lcmE6IFwiU3lzdMOobWUgw6AgZG91YmxlIGNhbcOpcmEgKDQ4TVAgcHJpbmNpcGFsLCBVbHRyYSBncmFuZC1hbmdsZSAxNk1QKVwiLFxuICAgIGJhdHRlcnk6IFwiSnVzcXUnw6AgMjIgaGV1cmVzIGRlIGxlY3R1cmUgdmlkw6lvXCIsXG4gICAgZmVhdHVyZXM6IFwiRHluYW1pYyBJc2xhbmQsIFVTQi1DLCBCb3V0b24gQWN0aW9uLCBXaS1GaSA2RSwgQmx1ZXRvb3RoIDUuMywgQ2hhcmdlIHJhcGlkZSAzMFdcIixcbiAgICByZWxlYXNlX3llYXI6IDIwMjQsXG4gICAgc3RvcmFnZV9vcHRpb25zOiBcIjEyOCBHbywgMjU2IEdvLCA1MTIgR28sIDEgVG9cIixcbiAgICB3YXRlcl9yZXNpc3RhbmNlOiBcIklQNjggKDYgbcOodHJlcyBwZW5kYW50IDMwIG1pbnV0ZXMgbWF4aW11bSlcIixcbiAgICBkaW1lbnNpb25zOiBcIjE0Nyw4IHggNzEsOCB4IDcsNyBtbVwiLFxuICAgIHdlaWdodDogMTY5LjAsXG4gICAgc2VyaWVzOiBcImlQaG9uZSAxNlwiLFxuICB9LFxuICB7XG4gICAgaWQ6IDUsXG4gICAgbmFtZTogXCJpUGhvbmUgMTZFXCIsXG4gICAgaW1hZ2VfdXJsOiBcIi9wbGFjZWhvbGRlci5zdmc/aGVpZ2h0PTQwMCZ3aWR0aD0yMDBcIixcbiAgICBwcmljZTogNzk5LjAsXG4gICAgY29sb3JzOiBcIkNvcmFpbCwgTWVudGhlLCBJbmRpZ28sIFNhYmxlLCBOb2lyXCIsXG4gICAgZGlzcGxheTogXCLDiWNyYW4gU3VwZXIgUmV0aW5hIFhEUiA2LDEgcG91Y2VzXCIsXG4gICAgY2hpcDogXCJQdWNlIEExOFwiLFxuICAgIGNhbWVyYTogXCJTeXN0w6htZSDDoCBkb3VibGUgY2Ftw6lyYSAoNDhNUCBwcmluY2lwYWwsIFVsdHJhIGdyYW5kLWFuZ2xlIDEyTVApXCIsXG4gICAgYmF0dGVyeTogXCJKdXNxdSfDoCAyMCBoZXVyZXMgZGUgbGVjdHVyZSB2aWTDqW9cIixcbiAgICBmZWF0dXJlczogXCJEeW5hbWljIElzbGFuZCwgVVNCLUMsIFdpLUZpIDZFLCBCbHVldG9vdGggNS4zLCBDaGFyZ2UgcmFwaWRlIDI1V1wiLFxuICAgIHJlbGVhc2VfeWVhcjogMjAyNCxcbiAgICBzdG9yYWdlX29wdGlvbnM6IFwiMTI4IEdvLCAyNTYgR28sIDUxMiBHb1wiLFxuICAgIHdhdGVyX3Jlc2lzdGFuY2U6IFwiSVA2OCAoNiBtw6h0cmVzIHBlbmRhbnQgMzAgbWludXRlcyBtYXhpbXVtKVwiLFxuICAgIGRpbWVuc2lvbnM6IFwiMTQ3LDggeCA3MSw4IHggNyw4IG1tXCIsXG4gICAgd2VpZ2h0OiAxNjcuMCxcbiAgICBzZXJpZXM6IFwiaVBob25lIDE2XCIsXG4gIH0sXG4gIC8vIGlQaG9uZSAxNSBTZXJpZXNcbiAge1xuICAgIGlkOiA2LFxuICAgIG5hbWU6IFwiaVBob25lIDE1IFBybyBNYXhcIixcbiAgICBpbWFnZV91cmw6IFwiL3BsYWNlaG9sZGVyLnN2Zz9oZWlnaHQ9NDAwJndpZHRoPTIwMFwiLFxuICAgIHByaWNlOiAxMTk5LjAsXG4gICAgY29sb3JzOiBcIlRpdGFuZSBuYXR1cmVsLCBUaXRhbmUgYmxldSwgVGl0YW5lIGJsYW5jLCBUaXRhbmUgbm9pclwiLFxuICAgIGRpc3BsYXk6IFwiw4ljcmFuIFN1cGVyIFJldGluYSBYRFIgNiw3IHBvdWNlcyBhdmVjIFByb01vdGlvbiAxMjBIeiBldCBBbHdheXMtT25cIixcbiAgICBjaGlwOiBcIlB1Y2UgQTE3IFByb1wiLFxuICAgIGNhbWVyYTogXCJTeXN0w6htZSBkZSBjYW3DqXJhIFBybyAoNDhNUCBwcmluY2lwYWwsIFVsdHJhIGdyYW5kLWFuZ2xlIDEyTVAsIFTDqWzDqW9iamVjdGlmIDV4KVwiLFxuICAgIGJhdHRlcnk6IFwiSnVzcXUnw6AgMjkgaGV1cmVzIGRlIGxlY3R1cmUgdmlkw6lvXCIsXG4gICAgZmVhdHVyZXM6IFwiRHluYW1pYyBJc2xhbmQsIFVTQi1DIDMuMCwgQm91dG9uIEFjdGlvbiwgRGVzaWduIGVuIHRpdGFuZSwgV2ktRmkgNkUsIEJsdWV0b290aCA1LjMsIENoYXJnZSByYXBpZGUgMjdXXCIsXG4gICAgcmVsZWFzZV95ZWFyOiAyMDIzLFxuICAgIHN0b3JhZ2Vfb3B0aW9uczogXCIyNTYgR28sIDUxMiBHbywgMSBUb1wiLFxuICAgIHdhdGVyX3Jlc2lzdGFuY2U6IFwiSVA2OCAoNiBtw6h0cmVzIHBlbmRhbnQgMzAgbWludXRlcyBtYXhpbXVtKVwiLFxuICAgIGRpbWVuc2lvbnM6IFwiMTU5LDkgeCA3Niw3IHggOCwyNSBtbVwiLFxuICAgIHdlaWdodDogMjIxLjAsXG4gICAgc2VyaWVzOiBcImlQaG9uZSAxNVwiLFxuICB9LFxuICB7XG4gICAgaWQ6IDcsXG4gICAgbmFtZTogXCJpUGhvbmUgMTUgUHJvXCIsXG4gICAgaW1hZ2VfdXJsOiBcIi9wbGFjZWhvbGRlci5zdmc/aGVpZ2h0PTQwMCZ3aWR0aD0yMDBcIixcbiAgICBwcmljZTogOTk5LjAsXG4gICAgY29sb3JzOiBcIlRpdGFuZSBuYXR1cmVsLCBUaXRhbmUgYmxldSwgVGl0YW5lIGJsYW5jLCBUaXRhbmUgbm9pclwiLFxuICAgIGRpc3BsYXk6IFwiw4ljcmFuIFN1cGVyIFJldGluYSBYRFIgNiwxIHBvdWNlcyBhdmVjIFByb01vdGlvbiAxMjBIeiBldCBBbHdheXMtT25cIixcbiAgICBjaGlwOiBcIlB1Y2UgQTE3IFByb1wiLFxuICAgIGNhbWVyYTogXCJTeXN0w6htZSBkZSBjYW3DqXJhIFBybyAoNDhNUCBwcmluY2lwYWwsIFVsdHJhIGdyYW5kLWFuZ2xlIDEyTVAsIFTDqWzDqW9iamVjdGlmIDN4KVwiLFxuICAgIGJhdHRlcnk6IFwiSnVzcXUnw6AgMjMgaGV1cmVzIGRlIGxlY3R1cmUgdmlkw6lvXCIsXG4gICAgZmVhdHVyZXM6IFwiRHluYW1pYyBJc2xhbmQsIFVTQi1DIDMuMCwgQm91dG9uIEFjdGlvbiwgRGVzaWduIGVuIHRpdGFuZSwgV2ktRmkgNkUsIEJsdWV0b290aCA1LjMsIENoYXJnZSByYXBpZGUgMjdXXCIsXG4gICAgcmVsZWFzZV95ZWFyOiAyMDIzLFxuICAgIHN0b3JhZ2Vfb3B0aW9uczogXCIxMjggR28sIDI1NiBHbywgNTEyIEdvLCAxIFRvXCIsXG4gICAgd2F0ZXJfcmVzaXN0YW5jZTogXCJJUDY4ICg2IG3DqHRyZXMgcGVuZGFudCAzMCBtaW51dGVzIG1heGltdW0pXCIsXG4gICAgZGltZW5zaW9uczogXCIxNDYsNiB4IDcwLDYgeCA4LDI1IG1tXCIsXG4gICAgd2VpZ2h0OiAxODcuMCxcbiAgICBzZXJpZXM6IFwiaVBob25lIDE1XCIsXG4gIH0sXG4gIHtcbiAgICBpZDogOCxcbiAgICBuYW1lOiBcImlQaG9uZSAxNSBQbHVzXCIsXG4gICAgaW1hZ2VfdXJsOiBcIi9wbGFjZWhvbGRlci5zdmc/aGVpZ2h0PTQwMCZ3aWR0aD0yMDBcIixcbiAgICBwcmljZTogODk5LjAsXG4gICAgY29sb3JzOiBcIk5vaXIsIEJsZXUsIFZlcnQsIEphdW5lLCBSb3NlXCIsXG4gICAgZGlzcGxheTogXCLDiWNyYW4gU3VwZXIgUmV0aW5hIFhEUiA2LDcgcG91Y2VzXCIsXG4gICAgY2hpcDogXCJQdWNlIEExNiBCaW9uaWNcIixcbiAgICBjYW1lcmE6IFwiU3lzdMOobWUgw6AgZG91YmxlIGNhbcOpcmEgKDQ4TVAgcHJpbmNpcGFsLCBVbHRyYSBncmFuZC1hbmdsZSAxMk1QKVwiLFxuICAgIGJhdHRlcnk6IFwiSnVzcXUnw6AgMjYgaGV1cmVzIGRlIGxlY3R1cmUgdmlkw6lvXCIsXG4gICAgZmVhdHVyZXM6IFwiRHluYW1pYyBJc2xhbmQsIFVTQi1DIDIuMCwgU09TIGQndXJnZW5jZSwgV2ktRmkgNiwgQmx1ZXRvb3RoIDUuMywgQ2hhcmdlIHJhcGlkZSAyMFdcIixcbiAgICByZWxlYXNlX3llYXI6IDIwMjMsXG4gICAgc3RvcmFnZV9vcHRpb25zOiBcIjEyOCBHbywgMjU2IEdvLCA1MTIgR29cIixcbiAgICB3YXRlcl9yZXNpc3RhbmNlOiBcIklQNjggKDYgbcOodHJlcyBwZW5kYW50IDMwIG1pbnV0ZXMgbWF4aW11bSlcIixcbiAgICBkaW1lbnNpb25zOiBcIjE2MCw5IHggNzcsOCB4IDcsODAgbW1cIixcbiAgICB3ZWlnaHQ6IDIwMS4wLFxuICAgIHNlcmllczogXCJpUGhvbmUgMTVcIixcbiAgfSxcbiAge1xuICAgIGlkOiA5LFxuICAgIG5hbWU6IFwiaVBob25lIDE1XCIsXG4gICAgaW1hZ2VfdXJsOiBcIi9wbGFjZWhvbGRlci5zdmc/aGVpZ2h0PTQwMCZ3aWR0aD0yMDBcIixcbiAgICBwcmljZTogNzk5LjAsXG4gICAgY29sb3JzOiBcIk5vaXIsIEJsZXUsIFZlcnQsIEphdW5lLCBSb3NlXCIsXG4gICAgZGlzcGxheTogXCLDiWNyYW4gU3VwZXIgUmV0aW5hIFhEUiA2LDEgcG91Y2VzXCIsXG4gICAgY2hpcDogXCJQdWNlIEExNiBCaW9uaWNcIixcbiAgICBjYW1lcmE6IFwiU3lzdMOobWUgw6AgZG91YmxlIGNhbcOpcmEgKDQ4TVAgcHJpbmNpcGFsLCBVbHRyYSBncmFuZC1hbmdsZSAxMk1QKVwiLFxuICAgIGJhdHRlcnk6IFwiSnVzcXUnw6AgMjAgaGV1cmVzIGRlIGxlY3R1cmUgdmlkw6lvXCIsXG4gICAgZmVhdHVyZXM6IFwiRHluYW1pYyBJc2xhbmQsIFVTQi1DIDIuMCwgU09TIGQndXJnZW5jZSwgV2ktRmkgNiwgQmx1ZXRvb3RoIDUuMywgQ2hhcmdlIHJhcGlkZSAyMFdcIixcbiAgICByZWxlYXNlX3llYXI6IDIwMjMsXG4gICAgc3RvcmFnZV9vcHRpb25zOiBcIjEyOCBHbywgMjU2IEdvLCA1MTIgR29cIixcbiAgICB3YXRlcl9yZXNpc3RhbmNlOiBcIklQNjggKDYgbcOodHJlcyBwZW5kYW50IDMwIG1pbnV0ZXMgbWF4aW11bSlcIixcbiAgICBkaW1lbnNpb25zOiBcIjE0Nyw2IHggNzEsNiB4IDcsODAgbW1cIixcbiAgICB3ZWlnaHQ6IDE3MS4wLFxuICAgIHNlcmllczogXCJpUGhvbmUgMTVcIixcbiAgfSxcbiAgLy8gaVBob25lIDE0IFNlcmllc1xuICB7XG4gICAgaWQ6IDEwLFxuICAgIG5hbWU6IFwiaVBob25lIDE0IFBybyBNYXhcIixcbiAgICBpbWFnZV91cmw6IFwiL3BsYWNlaG9sZGVyLnN2Zz9oZWlnaHQ9NDAwJndpZHRoPTIwMFwiLFxuICAgIHByaWNlOiAxMDk5LjAsXG4gICAgY29sb3JzOiBcIlZpb2xldCBpbnRlbnNlLCBPciwgQXJnZW50LCBOb2lyIHNpZMOpcmFsXCIsXG4gICAgZGlzcGxheTogXCLDiWNyYW4gU3VwZXIgUmV0aW5hIFhEUiA2LDcgcG91Y2VzIGF2ZWMgUHJvTW90aW9uIDEyMEh6IGV0IEFsd2F5cy1PblwiLFxuICAgIGNoaXA6IFwiUHVjZSBBMTYgQmlvbmljXCIsXG4gICAgY2FtZXJhOiBcIlN5c3TDqG1lIGRlIGNhbcOpcmEgUHJvICg0OE1QIHByaW5jaXBhbCwgVWx0cmEgZ3JhbmQtYW5nbGUgMTJNUCwgVMOpbMOpb2JqZWN0aWYgM3gpXCIsXG4gICAgYmF0dGVyeTogXCJKdXNxdSfDoCAyOSBoZXVyZXMgZGUgbGVjdHVyZSB2aWTDqW9cIixcbiAgICBmZWF0dXJlczpcbiAgICAgIFwiRHluYW1pYyBJc2xhbmQsIExpZ2h0bmluZywgU09TIGQndXJnZW5jZSwgRMOpdGVjdGlvbiBkJ2FjY2lkZW50LCBXaS1GaSA2LCBCbHVldG9vdGggNS4zLCBDaGFyZ2UgcmFwaWRlIDI3V1wiLFxuICAgIHJlbGVhc2VfeWVhcjogMjAyMixcbiAgICBzdG9yYWdlX29wdGlvbnM6IFwiMTI4IEdvLCAyNTYgR28sIDUxMiBHbywgMSBUb1wiLFxuICAgIHdhdGVyX3Jlc2lzdGFuY2U6IFwiSVA2OCAoNiBtw6h0cmVzIHBlbmRhbnQgMzAgbWludXRlcyBtYXhpbXVtKVwiLFxuICAgIGRpbWVuc2lvbnM6IFwiMTYwLDcgeCA3Nyw2IHggNyw4NSBtbVwiLFxuICAgIHdlaWdodDogMjQwLjAsXG4gICAgc2VyaWVzOiBcImlQaG9uZSAxNFwiLFxuICB9LFxuICB7XG4gICAgaWQ6IDExLFxuICAgIG5hbWU6IFwiaVBob25lIDE0IFByb1wiLFxuICAgIGltYWdlX3VybDogXCIvcGxhY2Vob2xkZXIuc3ZnP2hlaWdodD00MDAmd2lkdGg9MjAwXCIsXG4gICAgcHJpY2U6IDk5OS4wLFxuICAgIGNvbG9yczogXCJWaW9sZXQgaW50ZW5zZSwgT3IsIEFyZ2VudCwgTm9pciBzaWTDqXJhbFwiLFxuICAgIGRpc3BsYXk6IFwiw4ljcmFuIFN1cGVyIFJldGluYSBYRFIgNiwxIHBvdWNlcyBhdmVjIFByb01vdGlvbiAxMjBIeiBldCBBbHdheXMtT25cIixcbiAgICBjaGlwOiBcIlB1Y2UgQTE2IEJpb25pY1wiLFxuICAgIGNhbWVyYTogXCJTeXN0w6htZSBkZSBjYW3DqXJhIFBybyAoNDhNUCBwcmluY2lwYWwsIFVsdHJhIGdyYW5kLWFuZ2xlIDEyTVAsIFTDqWzDqW9iamVjdGlmIDN4KVwiLFxuICAgIGJhdHRlcnk6IFwiSnVzcXUnw6AgMjMgaGV1cmVzIGRlIGxlY3R1cmUgdmlkw6lvXCIsXG4gICAgZmVhdHVyZXM6XG4gICAgICBcIkR5bmFtaWMgSXNsYW5kLCBMaWdodG5pbmcsIFNPUyBkJ3VyZ2VuY2UsIETDqXRlY3Rpb24gZCdhY2NpZGVudCwgV2ktRmkgNiwgQmx1ZXRvb3RoIDUuMywgQ2hhcmdlIHJhcGlkZSAyN1dcIixcbiAgICByZWxlYXNlX3llYXI6IDIwMjIsXG4gICAgc3RvcmFnZV9vcHRpb25zOiBcIjEyOCBHbywgMjU2IEdvLCA1MTIgR28sIDEgVG9cIixcbiAgICB3YXRlcl9yZXNpc3RhbmNlOiBcIklQNjggKDYgbcOodHJlcyBwZW5kYW50IDMwIG1pbnV0ZXMgbWF4aW11bSlcIixcbiAgICBkaW1lbnNpb25zOiBcIjE0Nyw1IHggNzEsNSB4IDcsODUgbW1cIixcbiAgICB3ZWlnaHQ6IDIwNi4wLFxuICAgIHNlcmllczogXCJpUGhvbmUgMTRcIixcbiAgfSxcbiAge1xuICAgIGlkOiAxMixcbiAgICBuYW1lOiBcImlQaG9uZSAxNCBQbHVzXCIsXG4gICAgaW1hZ2VfdXJsOiBcIi9wbGFjZWhvbGRlci5zdmc/aGVpZ2h0PTQwMCZ3aWR0aD0yMDBcIixcbiAgICBwcmljZTogODk5LjAsXG4gICAgY29sb3JzOiBcIkJsZXUgKDE0KSwgVmlvbGV0LCBKYXVuZSAoMTQpLCBNaW51aXQsIEx1bWnDqHJlIHN0ZWxsYWlyZSwgUFJPRFVDVChSRUQpXCIsXG4gICAgZGlzcGxheTogXCLDiWNyYW4gU3VwZXIgUmV0aW5hIFhEUiA2LDcgcG91Y2VzXCIsXG4gICAgY2hpcDogXCJQdWNlIEExNSBCaW9uaWNcIixcbiAgICBjYW1lcmE6IFwiU3lzdMOobWUgw6AgZG91YmxlIGNhbcOpcmEgKDEyTVAgcHJpbmNpcGFsLCBVbHRyYSBncmFuZC1hbmdsZSAxMk1QKVwiLFxuICAgIGJhdHRlcnk6IFwiSnVzcXUnw6AgMjYgaGV1cmVzIGRlIGxlY3R1cmUgdmlkw6lvXCIsXG4gICAgZmVhdHVyZXM6IFwiRW5jb2NoZSwgTGlnaHRuaW5nLCBTT1MgZCd1cmdlbmNlLCBEw6l0ZWN0aW9uIGQnYWNjaWRlbnQsIFdpLUZpIDYsIEJsdWV0b290aCA1LjMsIENoYXJnZSByYXBpZGUgMjBXXCIsXG4gICAgcmVsZWFzZV95ZWFyOiAyMDIyLFxuICAgIHN0b3JhZ2Vfb3B0aW9uczogXCIxMjggR28sIDI1NiBHbywgNTEyIEdvXCIsXG4gICAgd2F0ZXJfcmVzaXN0YW5jZTogXCJJUDY4ICg2IG3DqHRyZXMgcGVuZGFudCAzMCBtaW51dGVzIG1heGltdW0pXCIsXG4gICAgZGltZW5zaW9uczogXCIxNjAsOCB4IDc4LDEgeCA3LDgwIG1tXCIsXG4gICAgd2VpZ2h0OiAyMDMuMCxcbiAgICBzZXJpZXM6IFwiaVBob25lIDE0XCIsXG4gIH0sXG4gIHtcbiAgICBpZDogMTMsXG4gICAgbmFtZTogXCJpUGhvbmUgMTRcIixcbiAgICBpbWFnZV91cmw6IFwiL3BsYWNlaG9sZGVyLnN2Zz9oZWlnaHQ9NDAwJndpZHRoPTIwMFwiLFxuICAgIHByaWNlOiA3OTkuMCxcbiAgICBjb2xvcnM6IFwiQmxldSAoMTQpLCBWaW9sZXQsIEphdW5lICgxNCksIE1pbnVpdCwgTHVtacOocmUgc3RlbGxhaXJlLCBQUk9EVUNUKFJFRClcIixcbiAgICBkaXNwbGF5OiBcIsOJY3JhbiBTdXBlciBSZXRpbmEgWERSIDYsMSBwb3VjZXNcIixcbiAgICBjaGlwOiBcIlB1Y2UgQTE1IEJpb25pY1wiLFxuICAgIGNhbWVyYTogXCJTeXN0w6htZSDDoCBkb3VibGUgY2Ftw6lyYSAoMTJNUCBwcmluY2lwYWwsIFVsdHJhIGdyYW5kLWFuZ2xlIDEyTVApXCIsXG4gICAgYmF0dGVyeTogXCJKdXNxdSfDoCAyMCBoZXVyZXMgZGUgbGVjdHVyZSB2aWTDqW9cIixcbiAgICBmZWF0dXJlczogXCJFbmNvY2hlLCBMaWdodG5pbmcsIFNPUyBkJ3VyZ2VuY2UsIETDqXRlY3Rpb24gZCdhY2NpZGVudCwgV2ktRmkgNiwgQmx1ZXRvb3RoIDUuMywgQ2hhcmdlIHJhcGlkZSAyMFdcIixcbiAgICByZWxlYXNlX3llYXI6IDIwMjIsXG4gICAgc3RvcmFnZV9vcHRpb25zOiBcIjEyOCBHbywgMjU2IEdvLCA1MTIgR29cIixcbiAgICB3YXRlcl9yZXNpc3RhbmNlOiBcIklQNjggKDYgbcOodHJlcyBwZW5kYW50IDMwIG1pbnV0ZXMgbWF4aW11bSlcIixcbiAgICBkaW1lbnNpb25zOiBcIjE0Niw3IHggNzEsNSB4IDcsODAgbW1cIixcbiAgICB3ZWlnaHQ6IDE3Mi4wLFxuICAgIHNlcmllczogXCJpUGhvbmUgMTRcIixcbiAgfSxcbl1cblxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInNxbCIsImlzUHJldmlldyIsInByb2Nlc3MiLCJlbnYiLCJWRVJDRUxfRU5WIiwiUE9TVEdSRVNfVVJMIiwiREFUQUJBU0VfVVJMIiwiR0VUIiwiY29uc29sZSIsImxvZyIsImpzb24iLCJtb2NrSXBob25lcyIsInJvd3MiLCJsZW5ndGgiLCJkYkVycm9yIiwiZXJyb3IiLCJpZCIsIm5hbWUiLCJpbWFnZV91cmwiLCJwcmljZSIsImNvbG9ycyIsImRpc3BsYXkiLCJjaGlwIiwiY2FtZXJhIiwiYmF0dGVyeSIsImZlYXR1cmVzIiwicmVsZWFzZV95ZWFyIiwic3RvcmFnZV9vcHRpb25zIiwid2F0ZXJfcmVzaXN0YW5jZSIsImRpbWVuc2lvbnMiLCJ3ZWlnaHQiLCJzZXJpZXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/iphones/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fiphones%2Froute&page=%2Fapi%2Fiphones%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fiphones%2Froute.ts&appDir=C%3A%5CUsers%5Cnija1%5CDownloads%5Capple-iphone-comparator%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnija1%5CDownloads%5Capple-iphone-comparator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fiphones%2Froute&page=%2Fapi%2Fiphones%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fiphones%2Froute.ts&appDir=C%3A%5CUsers%5Cnija1%5CDownloads%5Capple-iphone-comparator%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnija1%5CDownloads%5Capple-iphone-comparator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_nija1_Downloads_apple_iphone_comparator_app_api_iphones_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/iphones/route.ts */ \"(rsc)/./app/api/iphones/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/iphones/route\",\n        pathname: \"/api/iphones\",\n        filename: \"route\",\n        bundlePath: \"app/api/iphones/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\nija1\\\\Downloads\\\\apple-iphone-comparator\\\\app\\\\api\\\\iphones\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_nija1_Downloads_apple_iphone_comparator_app_api_iphones_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZpcGhvbmVzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZpcGhvbmVzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGaXBob25lcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNuaWphMSU1Q0Rvd25sb2FkcyU1Q2FwcGxlLWlwaG9uZS1jb21wYXJhdG9yJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNuaWphMSU1Q0Rvd25sb2FkcyU1Q2FwcGxlLWlwaG9uZS1jb21wYXJhdG9yJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNpQztBQUM5RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcbmlqYTFcXFxcRG93bmxvYWRzXFxcXGFwcGxlLWlwaG9uZS1jb21wYXJhdG9yXFxcXGFwcFxcXFxhcGlcXFxcaXBob25lc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvaXBob25lcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2lwaG9uZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2lwaG9uZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxuaWphMVxcXFxEb3dubG9hZHNcXFxcYXBwbGUtaXBob25lLWNvbXBhcmF0b3JcXFxcYXBwXFxcXGFwaVxcXFxpcGhvbmVzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fiphones%2Froute&page=%2Fapi%2Fiphones%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fiphones%2Froute.ts&appDir=C%3A%5CUsers%5Cnija1%5CDownloads%5Capple-iphone-comparator%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnija1%5CDownloads%5Capple-iphone-comparator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ws","vendor-chunks/@vercel","vendor-chunks/node-gyp-build","vendor-chunks/bufferutil","vendor-chunks/@neondatabase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fiphones%2Froute&page=%2Fapi%2Fiphones%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fiphones%2Froute.ts&appDir=C%3A%5CUsers%5Cnija1%5CDownloads%5Capple-iphone-comparator%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnija1%5CDownloads%5Capple-iphone-comparator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();