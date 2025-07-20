import mongoose from "mongoose";

const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"];
const DEFAULT_COLORS = ["Blue", "Green", "Pine Green", "Sky Blue", "Yellow", "Pink", "Beige", "Avocado Green"];

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },       
  sizes: { type: [String], default: DEFAULT_SIZES },                  
  colors: { type: [String], default: DEFAULT_COLORS },                 
  imageUrls: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});


const Product = mongoose.model('Product', productSchema);
export default Product;
