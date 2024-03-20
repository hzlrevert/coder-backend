// routes/products.js

const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager');

const productManager = new ProductManager('./productos.json');

router.get('/', async (req, res) => {
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

router.get('/:pid', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productManager.addProduct(newProduct);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    const product = await productManager.updateProduct(productId, updatedProduct);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.deleteProduct(productId);

    if (product) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
