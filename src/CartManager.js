

const fs = require('fs').promises;

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllCarts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading carts file:', error);
      throw error;
    }
  }

  async addCart(cart) {
    try {
      const carts = await this.getAllCarts();
      carts.push(cart);
      await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    } catch (error) {
      console.error('Error adding cart:', error);
      throw error;
    }
  }

  
}

module.exports = CartManager;
