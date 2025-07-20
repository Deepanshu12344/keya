import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/product.js';

const router = express.Router();

// Get all products
router.get('/', getProducts);   
// Get product by ID
router.get('/:id', getProductById);
// Create a new product
router.post('/', createProduct);

// Update a product (not implemented in the provided code)
// router.put('/:id', updateProduct); // Uncomment and implement if needed      
// Delete a product (not implemented in the provided code)
// router.delete('/:id', deleteProduct); // Uncomment and implement if needed
export default router;