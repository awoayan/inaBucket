import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { accountSlice } from "./accountSlice";
import { apiSlice } from "./api";

export const store = configureStore({
	reducer: {
		[accountSlice.name]: accountSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	},
});

setupListeners(store.dispatch);
