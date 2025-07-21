import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity = 1, size, color } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        quantity,
        price: product.price,
        size,
        color,
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    return res.status(200).json({ message: "Item added to cart", cart });

  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const removeFromCart = async (request, response) => {
  try {
    const { userId, itemId } = request.params;

    if (!userId || !itemId) {
      return response.status(400).json({ message: "userId and itemId are required" });
    }

    // Convert itemId to ObjectId
    const objectId = new mongoose.Types.ObjectId(itemId);

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: objectId } } },
      { new: true }
    );

    if (!updatedCart) {
      return response.status(404).json({ message: "Cart not found for this user" });
    }

    return response.status(200).json({
      message: "Item removed from cart successfully",
      cart: updatedCart
    });

  } catch (error) {
    console.error("Error removing item from cart:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};



export const clearCart = async (request, response) => {
  try {
    const { userId } = request.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return response.status(404).json({ message: "Cart not found." });
    }

    cart.items = [];
    await cart.save();

    response.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    console.error("Error clearing cart:", error);
    response.status(500).json({ message: "Server error while clearing cart." });
  }
};