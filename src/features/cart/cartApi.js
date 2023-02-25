import { apiSlice } from "../api/apiSlice";



//Create Cart api
export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addToTheCart: builder.mutation({
            query: (data) => ({
                url: "/cart",
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: () => ["Cart"]
        }),

        getCartProductsByEmail: builder.query({
            query: (email) => ({
                url: `/cart?email=${email}`
            }),
            providesTags: () => ["Cart"]
        }),

        updateCartProduct: builder.mutation({
            query: (query) => ({
                url: `/cart/${query.id}`,
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(query.data)
            }),
            invalidatesTags: () => ["Cart"]
        }),

        deleteFromCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: () => ["Cart"]
        }),
    })
})

export const { useAddToTheCartMutation, useGetCartProductsByEmailQuery, useDeleteFromCartMutation, useUpdateCartProductMutation } = cartApi;

