// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const path = require('path');
// const { check, validationResult } = require('express-validator');
// require('dotenv').config(); // Charger les variables d'environnement

// const router = express.Router();
// const Product = require('../models/Product');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Formulaire pour ajouter un produit
// router.get('/add-product', (req, res) => {
//     res.render('addProduct'); // Affiche la page avec le formulaire
// });

// router.get('/products', async (req, res) => {
//     const products = await Product.find();
//     res.render('products', { products });
// });


// // Soumission du formulaire
// router.post('/add-product', async (req, res) => {
//     try {
//         const { name, price, description } = req.body;
//         const newProduct = new Product({
//             name,
//             price,
//             description,
//         });
//         await newProduct.save();
//         res.redirect('/products'); // Redirige vers une page listant les produits
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Erreur lors de l'ajout du produit");
//     }
// });

// module.exports = router;

// // Middleware pour analyser les données du formulaire
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// // Servir les fichiers statiques (CSS, images, etc.)
// app.use(express.static(path.join(__dirname, 'public')));

// // Configuration du moteur de vue EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Routes pour les différentes pages
// app.get('/', (req, res) => {
//     res.render('index', { title: 'Accueil' });
// });

// app.get('/about', (req, res) => {
//     res.render('about', { title: 'À propos de moi' });
// });

// app.get('/projects', (req, res) => {
//     res.render('projects', { title: 'Ce que je fais' });
// });

// app.get('/future', (req, res) => {
//     res.render('future', { title: 'Mes projections' });
// });

// app.get('/contact', (req, res) => {
//     res.render('contact', { title: 'Contact', success: false, error: null });
// });

// // Configuration de Nodemailer
// let transporter = nodemailer.createTransport({
//     host: 'smtp.mail.yahoo.com',
//     port: 465,
//     secure: true, // true pour le port 465
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     }
// });


// // Route pour le formulaire de contact
// // Route pour afficher le formulaire de contact
// app.get('/contact', (req, res) => {
//     res.render('contact', { title: 'Contact', success: false, error: null });
//   });
  
//   // Route pour gérer la soumission du formulaire avec validation
//   app.post(
//     '/contact',
//     [
//       check('nom').not().isEmpty().withMessage('Le nom est obligatoire'),
//       check('email').isEmail().withMessage('Veuillez fournir une adresse email valide'),
//       check('message').not().isEmpty().withMessage('Le message ne peut pas être vide')
//     ],
//     (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.render('contact', {
//           title: 'Contact',
//           success: false,
//           error: errors.array().map(err => err.msg).join(', ')
//         });
//       }
  
//       const { nom, email, message } = req.body;
  
//       let mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: 'destinataire@example.com',
//         subject: `Nouveau message de ${nom}`,
//         text: `Vous avez reçu un nouveau message de la part de ${nom} (${email}) :\n\n${message}`
//       };
  
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           return res.render('contact', {
//             title: 'Contact',
//             success: false,
//             error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
//           });
//         }
//         console.log('Email envoyé : ' + info.response);
//         res.render('contact', { title: 'Contact', success: true, error: null });
//       });
//     }
//   );
//       // Gestion des erreurs de validation
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.render('contact', {
//           title: 'Contact',
//           success: false,
//           error: errors.array().map(err => err.msg).join(', ')
//         });
//       }
  
//       const { nom, email, message } = req.body;
  
//       // Configuration de l'email
//       let mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: 'destinataire@example.com',
//         subject: `Nouveau message de ${nom}`,
//         text: `Vous avez reçu un nouveau message de la part de ${nom} (${email}) :\n\n${message}`
//       };
  
//       // Envoi de l'email
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           return res.render('contact', {
//             title: 'Contact',
//             success: false,
//             error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
//           });
//         }
//         console.log('Email envoyé : ' + info.response);
//         res.render('contact', { title: 'Contact', success: true, error: null });
//       });
//     }
//   );

//     // Envoyer l'email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.render('contact', { title: 'Contact', success: false, error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' });
//         } else {
//             console.log('Email envoyé : ' + info.response);
//             res.render('contact', { title: 'Contact', success: true, error: null });
//         }
//     });
// });

// // Démarrer le serveur
// app.listen(PORT, () => {
//     console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
// });

// console.log('EMAIL_USER:', process.env.EMAIL_USER);
// console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

// transporter.verify(function(error, success) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Le serveur de messagerie est prêt à envoyer des emails");
//     }
// });


const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const { check, validationResult } = require('express-validator');
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

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 465,
  secure: true, // true pour le port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Vérifier le serveur de messagerie
transporter.verify((error, success) => {
  if (error) {
    console.error("Erreur avec le serveur de messagerie :", error);
  } else {
    console.log("Serveur de messagerie prêt à envoyer des emails.");
  }
});

// Routes pour les pages principales
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

// Route pour afficher le formulaire de contact
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', success: false, error: null });
});

// Route pour gérer la soumission du formulaire de contact avec validation
app.post(
  '/contact',
  [
    check('nom').not().isEmpty().withMessage('Le nom est obligatoire'),
    check('email').isEmail().withMessage('Veuillez fournir une adresse email valide'),
    check('message').not().isEmpty().withMessage('Le message ne peut pas être vide'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Renvoyer les erreurs au client
      return res.render('contact', {
        title: 'Contact',
        success: false,
        error: errors.array().map(err => err.msg).join(', '),
      });
    }

    const { nom, email, message } = req.body;

    // Configuration de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'destinataire@example.com', // Adresse de réception
      subject: `Nouveau message de ${nom}`,
      text: `Vous avez reçu un nouveau message de la part de ${nom} (${email}) :\n\n${message}`,
    };

    // Envoi de l'email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur d'envoi :", error);
        return res.render('contact', {
          title: 'Contact',
          success: false,
          error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.',
        });
      }
      console.log('Email envoyé : ' + info.response);
      res.render('contact', { title: 'Contact', success: true, error: null });
    });
  }
);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
