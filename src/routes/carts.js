const express = require('express');
const router = express.Router();
const { Cart } = require('../models');
const { Product } = require('../models');

// Ruta para obtener un carrito específico
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Utiliza el método populate para obtener los productos completos
    const cart = await Cart.findById(cartId).populate('products.product');

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    // Buscar el carrito y el producto
    const cart = await Cart.findById(cartId);
    const product = await Product.findById(productId);

    if (!cart || !product) {
      return res.status(404).json({ error: 'Cart or Product not found' });
    }

    // Ver si el producto ya está en el carrito
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex !== -1) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      cart.products[productIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      cart.products.push({ product: productId, quantity: 1 });
    }

    // Guardar el carrito actualizado
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta para eliminar un producto de un carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    // Buscar el carrito
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Filtrar los productos para eliminar el producto deseado
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    // Guardar el carrito actualizado
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta para eliminar todos los productos de un carrito
router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Buscar el carrito
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Vaciar el carrito
    cart.products = [];

    // Guardar el carrito actualizado
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta para actualizar la cantidad de ejemplares de un producto en un carrito
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    // Buscar el carrito
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Buscar el producto en el carrito
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    // Actualizar la cantidad de ejemplares
    cart.products[productIndex].quantity = quantity;

    // Guardar el carrito actualizado
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta para actualizar un carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const { products } = req.body;

    // Buscar el carrito
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Reemplazar los productos en el carrito
    cart.products = products;

    // Guardar el carrito actualizado
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
