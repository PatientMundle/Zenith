const express = require('express');
const path = require('path'); // Nécessaire pour gérer les chemins de fichiers
const app = express();

// Le port utilisé par Render (ou 3000 sur votre ordinateur)
const PORT = process.env.PORT || 3000;

// 1. Permet au serveur de comprendre les messages (JSON) envoyés par votre site
app.use(express.json());

// 2. LA SOLUTION AU "Cannot GET /" : 
// Autorise le serveur à lire tous les fichiers (index.html, CSS, images) dans le dossier actuel
app.use(express.static(__dirname));

// 3. Quand quelqu'un arrive sur votre lien Render, on lui affiche l'interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// =================================================================
// INSÉREZ VOTRE CODE POUR L'IA (GROQ) JUSTE EN DESSOUS DE CETTE LIGNE
// (Vos "app.post", votre configuration Groq, etc.)
// =================================================================





// =================================================================
// FIN DE VOTRE CODE POUR L'IA
// =================================================================

// 4. Allumage du serveur
app.listen(PORT, () => {
    console.log(`Serveur Zenith en ligne sur le port ${PORT}`);
});
