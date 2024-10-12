const express = require('express');
const app = express();
const path = require('path');

// Configuration des middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Pour les fichiers statiques
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'À propos de moi' });
});

app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Ce que je fais' });
});

app.get('/future', (req, res) => {
    res.render('future', { title: 'Mes projections' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', success: false });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
