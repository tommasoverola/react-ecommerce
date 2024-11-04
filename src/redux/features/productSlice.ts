import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";
import { ProductSlice } from "../../models/ProductSlice";

const initialState: ProductSlice = {
  allProducts: []
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, allProducts: action.payload };
    },
  },
});

export const {
  addProducts,
} = productSlice.actions;
export default productSlice.reducer;
