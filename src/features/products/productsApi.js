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
        })

    })
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;