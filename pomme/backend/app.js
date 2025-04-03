const express = require('express');
const app = express();
const router = require('./controllers/router');

app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
