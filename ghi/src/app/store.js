import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { accountSlice } from "./accountSlice";
import { apiSlice } from "./api";
import { profilePageSlice } from "./profilePageSlice";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		[accountSlice.name]: accountSlice.reducer,
		[profilePageSlice.name]: profilePageSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	},
});

setupListeners(store.dispatch);
