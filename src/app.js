
const express = require('express');
const ProductManager = require('./ProductManager');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const CartManager = require('./CartManager');

const app = express();
const port = 8080;

const productManager = new ProductManager('./src/productos.json');
const cartManager = new CartManager('./carrito.json');

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const allProducts = await productManager.getAllProducts();

    if (limit) {
      res.json(allProducts.slice(0, limit));
    } else {
      res.json(allProducts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});