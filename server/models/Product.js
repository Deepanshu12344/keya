import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true }, 
  subCategory: { type: String },              
  sizes: [{ type: String }],                  
  colors: [{ type: String }],                 
  stock: { type: Number, default: 0 },
  imageUrls: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
