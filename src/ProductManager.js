class ProductManager {
  async getAllProducts(limit, page, sort, query) {
    const filter = query ? { [query]: req.query[query] } : {};
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
    };
    
    const result = await Product.paginate(filter, options);
    return result;
  }

  async getProductById(pid) {
    const product = await Product.findById(pid);
    return product;
  }

  async addProduct(productData) {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  }

  async updateProduct(pid, updatedData) {
    const updatedProduct = await Product.findByIdAndUpdate(pid, updatedData, { new: true });
    return updatedProduct;
  }

  async deleteProduct(pid) {
    await Product.findByIdAndRemove(pid);
  }
}

module.exports = ProductManager;


const { Product, Cart } = require('./models');
