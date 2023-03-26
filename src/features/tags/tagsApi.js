import { apiSlice } from "../api/apiSlice";




//Create Tags api
export const tagsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query({
            query: () => ({
                url: "/tags"
            })
        })
    })
})

export const { useGetTagsQuery } = tagsApi;