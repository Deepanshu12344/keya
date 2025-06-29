import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  cart: [],       
  favorites: [],   
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.cart = action.payload.cart || [];
      state.favorites = action.payload.favorites || [];
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.cart = [];
      state.favorites = [];
    },
    setCart: (state, action) => {
      state.cart = action.payload.cart;
    },
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const index = state.cart.findIndex((item) => item.product._id === product._id);
      if (index >= 0) {
        state.cart[index].quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.product._id !== productId);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload.favorites;
    },
    addToFavorites: (state, action) => {
      const product = action.payload;
      if (!state.favorites.find((fav) => fav._id === product._id)) {
        state.favorites.push(product);
      }
    },
    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      state.favorites = state.favorites.filter((fav) => fav._id !== productId);
    },
  },
});

export const {
  setLogin,
  setLogout,
  setCart,
  addToCart,
  removeFromCart,
  setFavorites,
  addToFavorites,
  removeFromFavorites,
} = authSlice.actions;

export default authSlice.reducer;
