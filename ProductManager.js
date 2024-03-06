const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading products file:', error);
      throw error;
    }
  }

  async getProductById(productId) {
    const allProducts = await this.getAllProducts();
    return allProducts.find(product => product.id === productId);
  }
}

module.exports = ProductManager;