import { configureStore } from "@reduxjs/toolkit";
import {orderApiSlice} from "../features/api/orderApiSlice";


export const store = configureStore({
    reducer: {
        [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(orderApiSlice.middleware),
});