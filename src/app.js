
const express = require('express');
const ProductManager = require('./ProductManager');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const CartManager = require('./CartManager');



const mongoose = require('mongoose');


const app = express();
const port = 8080;

const productManager = new ProductManager();
const cartManager = new CartManager();

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.get('/api/products', async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  const result = await productManager.getAllProducts(limit, page, sort, query);

  res.json({
    status: 'success',
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
    nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null,
  });
});

app.put('/api/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  const updatedData = req.body;
  const updatedProduct = await productManager.updateProduct(pid, updatedData);

  if (!updatedProduct) {
    return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
  }

  res.json({ status: 'success', payload: updatedProduct });
});

app.delete('/api/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  await productManager.deleteProduct(pid);

  res.json({ status: 'success', message: 'Producto eliminado' });
});

app.delete('/api/carts/:cid/products/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  await cartManager.removeProductFromCart(cid, pid);

  res.json({ status: 'success', message: 'Producto eliminado del carrito' });
});

app.put('/api/carts/:cid', async (req, res) => {
  const cid = req.params.cid;
  const updatedProducts = req.body.products;
  const updatedCart = await cartManager.updateCart(cid, updatedProducts);

  if (!updatedCart) {
    return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
  }

  res.json({ status: 'success', payload: updatedCart });
});

app.put('/api/carts/:cid/products/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const { quantity } = req.body;
  const cart = await cartManager.addProductToCart(cid, pid);

  if (!cart) {
    return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
  }

  const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
  if (productIndex === -1) {
    return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
  }

  cart.products[productIndex].quantity = quantity;
  await cart.save();

  res.json({ status: 'success', payload: cart });
});

app.delete('/api/carts/:cid', async (req, res) => {
  const cid = req.params.cid;
  await cartManager.deleteCart(cid);

  res.json({ status: 'success', message: 'Carrito eliminado' });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


mongoose.connect('mongodb://localhost:27017/Base_Datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a la base de datos'))
.catch((error) => console.error('Error al conectar a la base de datos:', error));