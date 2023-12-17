import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';

const initialState = {
  userInfo: [],
  products: [],
  productsFavorite: [],
  csrfToken: null,
};

export const madamBoutiqueSlice = createSlice({
  name: "madamBoutique",
  initialState,
  reducers: {
    csrfTokenReducer: (state, action) => {
      switch (action.type) {
        case 'SET_AUTH_TOKEN':
          state.csrfToken = action.payload;
          break;
        default:
          return state;
      }
    },
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      // 
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully added to cart",
        showConfirmButton: false,
        timer: 1500
      });
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload._id
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    addProductsFavorite: (state, action) => {
      const item = state.productsFavorite.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productsFavorite.push(action.payload);
      }
      // 
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully added to cart",
        showConfirmButton: false,
        timer: 1500
      });
    },
    deleteFavoriteItem: (state, action) => {
      state.productsFavorite = state.productsFavorite.filter(
        (item) => item._id !== action.payload
      );
    },
    resetFavoriteList: (state) => {
      state.productsFavorite = [];
    },
    addAllToCart: (state, action) => {
      state.productsFavorite.map((item) => (
        state.products.push(item)
      ))
    }
  }
});

export const {
  csrfTokenReducer,
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  addProductsFavorite,
  deleteFavoriteItem,
  resetFavoriteList,
  addAllToCart
} = madamBoutiqueSlice.actions;
export default madamBoutiqueSlice.reducer;
