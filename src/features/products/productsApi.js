import { apiSlice } from "../api/apiSlice";



//CREATE PRODUCTS API
export const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: (query) => ({
                url: `/products?${query}`
            })
        }),

        getProductById: builder.query({
            query: (id) => ({
                url: `/products/${id}`
            })
        }),

        getProductsBySearch: builder.query({
            query: (searchText) => ({
                url: `/products/search?search=${searchText}`
            })
        }),

        addProduct: builder.mutation({
            query: (data) => ({
                url: "/products",
                method: "POST",
                body: data
            })
        })

    })
})

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductsBySearchQuery, useAddProductMutation } = productsApi;