// routes/carts.js

const express = require('express');
const router = express.Router();
const CartManager = require('../CartManager');

const cartManager = new CartManager('./carrito.json');

router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCart(cartId);

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    const cart = await cartManager.addToCart(cartId, productId, quantity);

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
