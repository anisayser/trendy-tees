import { apiSlice } from "../api/apiSlice";


//Create colors api
export const colorsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getColors: builder.query({
            query: () => ({
                url: "/colors"
            })
        })
    })
})

export const { useGetColorsQuery } = colorsApi;