const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

// Esquema para el modelo de Producto
const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: [String], required: false }, // Array de rutas de imágenes
});



// Agregar plugin de paginación al esquema de Producto


productSchema.plugin(mongoosePaginate);

// Crear el modelo de Producto
const Product = mongoose.model('Product', productSchema);



// Esquema para el modelo de Carrito
const cartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' }, // Referencia a modelo de Producto
      quantity: { type: Number, required: true },
    },
  ],
});



 cartSchema.plugin(mongoosePaginate);


 
// Crear el modelo de Carrito
const Cart = mongoose.model('Cart', cartSchema);

// Exportar los modelos
module.exports = { Product, Cart };
