import Cart from '../models/Cart.js';
import User from '../models/User.js'

export const getProfile = async (request, response) => {
  try {
    const { userId } = request.params;
    
    const user = await User.findById(userId);  
    
    if (!user) return response.status(404).send("User not found");

    response.status(201).send(user);
  } catch (error) {
    console.log(error);
    response.status(500).send("Something went wrong");
  }
};


export const updateProfile = async (request, response) => {
  try {
    const { userId } = request.params;
    const updateData = request.body;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return response.status(404).send("User not found");
    }

    return response.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    return response.status(500).send("Server error");
  }
};


export const getCart = async (request, response) => {
  try {
    const { userId } = request.params;

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return response.status(404).json({ message: "Cart not found for this user." });
    }

    response.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    response.status(500).json({ message: "Server error while fetching cart." });
  }
};