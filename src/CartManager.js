class CartManager {
  async createCart() {
    const newCart = new Cart();
    await newCart.save();
    return newCart;
  }

  async getCartById(cid) {
    const cart = await Cart.findById(cid).populate('products.product');
    return cart;
  }

  async addProductToCart(cid, pid) {
    const cart = await Cart.findById(cid);
    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
    
    if (productIndex !== -1) {
      cart.products[productIndex].quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    return cart;
  }

  async removeProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
  }

  async updateCart(cid, updatedProducts) {
    const cart = await Cart.findById(cid);
    cart.products = updatedProducts;
    await cart.save();
  }

  async deleteCart(cid) {
    await Cart.findByIdAndRemove(cid);
  }
}

module.exports = CartManager;

const { Product, Cart } = require('./models');
