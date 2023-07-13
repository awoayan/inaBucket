import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearForm } from './accountSlice';

export const apiSlice = createApi({
    reducerPath: 'books',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            const selector = apiSlice.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Account', 'Books', 'Token'],
    endpoints: builder => ({
        signUp: builder.mutation({
            query: data => ({
                url: '/api/accounts',
                method: 'post',
                body: data,
                credentials: 'include',
            }),
            providesTags: ['Account'],
            invalidatesTags: result => {
                return (result && ['Token']) || [];
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearForm());
                } catch (err) { }
            },
        }),
        logIn: builder.mutation({
            query: info => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData();
                    formData.append('username', info.email);
                    formData.append('password', info.password);
                }
                return {
                    url: '/token',
                    method: 'post',
                    body: formData,
                    credentials: 'include',
                };
            },
            providesTags: ['Account'],
            invalidatesTags: result => {
                return (result && ['Token']) || [];
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearForm());
                } catch (err) { }
            },
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'delete',
                credentials: 'include',
            }),
            invalidatesTags: ['Account', 'Token'],
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            providesTags: ['Token'],
        }),
//         addBook: builder.mutation({
//             query: form => {
//                 const formData = new FormData(form);
//                 const entries = Array.from(formData.entries());
//                 const data = entries.reduce((acc, [key, value]) => { acc[key] = Number.parseInt(value) || value; return acc; }, {});
//                 return {
//                     method: 'post',
//                     url: '/api/books',
//                     credentials: 'include',
//                     body: data,
//                 }
//             },
//             invalidatesTags: [{ type: 'Books', id: 'LIST' }],
//         }),
//         getBooks: builder.query({
//             query: () => `/api/books`,
//             providesTags: data => {
//                 const tags = [{ type: 'Books', id: 'LIST' }];
//                 if (!data || !data.books) return tags;

//                 const { books } = data;
//                 if (books) {
//                     tags.concat(...books.map(({ id }) => ({ type: 'Books', id })));
//                 }
//                 return tags;
//             }
//         }),
//         borrowBook: builder.mutation({
//             query: bookId => ({
//                 method: 'post',
//                 url: `/api/books/${bookId}/loans`,
//             }),
//             invalidatesTags: [{ type: 'Books', id: 'LIST' }],
//         }),
//         returnBook: builder.mutation({
//             query: bookId => ({
//                 method: 'delete',
//                 url: `/api/books/${bookId}/loans`,
//             }),
//             invalidatesTags: [{ type: 'Books', id: 'LIST' }],
//         }),
    }),
});

export const {
    useAddBookMutation,
    useBorrowBookMutation,
    useGetBooksQuery,
    useGetTokenQuery,
    useLogInMutation,
    useLogOutMutation,
    useReturnBookMutation,
    useSignUpMutation,
} = apiSlice;