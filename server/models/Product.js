import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true }, // e.g. 'Party Wear'
  subCategory: { type: String },              // e.g. 'Long Kurti'
  sizes: [{ type: String }],                  // e.g. ['S', 'M', 'L']
  colors: [{ type: String }],                 // optional
  stock: { type: Number, default: 0 },
  imageUrls: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
