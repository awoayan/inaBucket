import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from "./accountSlice";

export const apiSlice = createApi({
	reducerPath: "books",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
		prepareHeaders: (headers, { getState }) => {
			const selector = apiSlice.endpoints.getToken.select();
			const { data: tokenData } = selector(getState());
			if (tokenData && tokenData.access_token) {
				headers.set("Authorization", `Bearer ${tokenData.access_token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Account", "Books", "Token"],
	endpoints: (builder) => ({
		signUp: builder.mutation({
			query: (data) => ({
				url: "/api/accounts",
				method: "post",
				body: data,
				credentials: "include",
			}),
			providesTags: ["Account"],
			invalidatesTags: (result) => {
				return (result && ["Token"]) || [];
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(clearForm());
				} catch (err) {}
			},
		}),
		logIn: builder.mutation({
			query: (info) => {
				let formData = null;
				if (info instanceof HTMLElement) {
					formData = new FormData(info);
				} else {
					formData = new FormData();
					formData.append("username", info.email);
					formData.append("password", info.password);
				}
				return {
					url: "/token",
					method: "post",
					body: formData,
					credentials: "include",
				};
			},
			providesTags: ["Account"],
			invalidatesTags: (result) => {
				return (result && ["Token"]) || [];
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(clearForm());
				} catch (err) {}
			},
		}),
		logOut: builder.mutation({
			query: () => ({
				url: "/token",
				method: "delete",
				credentials: "include",
			}),
			invalidatesTags: ["Account", "Token"],
		}),
		getToken: builder.query({
			query: () => ({
				url: "/token",
				credentials: "include",
			}),
			providesTags: ["Token"],
		}),
		// addBucket: builder.mutation({
		// 	query: (info) => {
		// 		let formData = new FormData(form)
		// 		formData.append("title", info.title )
		// 		formData.append("coverPhoto", info.cover_photo)
		// 		formData.append("details", info.details)
		// 		formData.append("accountId", info.accountId)
		// 		return {
		// 			url: "api/buckets",
		// 			method: "post",
		// 			body: formData,
		// 			credentials: 'include' ,
		// 		}
		// 	}

		// })
	}),
});

export const {
	useLogInMutation,
	useLogOutMutation,
	useSignUpMutation,
	useGetTokenQuery,
	// useAddBucketMutation
} = apiSlice;
