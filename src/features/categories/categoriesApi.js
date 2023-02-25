import { apiSlice } from "../api/apiSlice";




//Create categories api
export const categoriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: "/categories"
            })
        })
    })
})

export const { useGetCategoriesQuery } = categoriesApi;