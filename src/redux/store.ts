import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";

import { productsApi } from "../services/products";
import {authApi} from "../services/auth"


export const store = configureStore({
  reducer: {
    cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productsApi.middleware,authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
