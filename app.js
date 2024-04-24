const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const productsRouter = require('./src/routes/products');
const productsRouter = require('./src/routes/carts');

// Importar la configuración de la base de datos desde un archivo separado
const connectToDatabase = require('./config/db');

const app = express();
const port = 8080;

// Configurar middleware
app.use(express.json()); // Permitir el manejo de JSON
app.use(morgan('dev')); // Middleware de registro

// Conectar a la base de datos
connectToDatabase().then(() => {
  
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
});

// Definir rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
