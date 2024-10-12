const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config(); // Charger les variables d'environnement

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Configuration du moteur de vue EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes pour les différentes pages
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
    res.render('contact', { title: 'Contact', success: false, error: null });
});

// Configuration de Nodemailer
let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true, // true pour le port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});


// Route pour le formulaire de contact
app.post('/contact', (req, res) => {
    const { nom, email, message } = req.body;

    // Configuration de l'email à envoyer
    let mailOptions = {
        from: process.env.EMAIL_USER, // Assurez-vous que c'est la même adresse que l'authentification
        to: 'destinataire@example.com', // Remplacez par votre adresse de réception
        subject: `Nouveau message de ${nom}`,
        text: `Vous avez reçu un nouveau message de la part de ${nom} (${email}) :\n\n${message}`
    };

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.render('contact', { title: 'Contact', success: false, error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' });
        } else {
            console.log('Email envoyé : ' + info.response);
            res.render('contact', { title: 'Contact', success: true, error: null });
        }
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Le serveur de messagerie est prêt à envoyer des emails");
    }
});
