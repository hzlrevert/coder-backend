const express = require('express');
const router = express.Router();

// Ruta para la vista de login
router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Ruta para el proceso de login
router.post('/login', (req, res) => {
    // Aquí manejaremos el proceso de login
});

// Ruta para la vista de productos
router.get('/products', (req, res) => {
    // Aquí renderizaremos la vista de productos
});

module.exports = router;
