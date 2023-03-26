const { apiSlice } = require("../api/apiSlice");



//CREATE REVIEWS API
const reviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllReviews: builder.query({
            query: () => ({
                url: "/reviews"
            })
        }),

        getReviewsByProId: builder.query({
            query: (productId) => ({
                url: `/reviews/product?productId=${productId}`
            }),
            providesTags: ["Review"]
        }),

        addReview: builder.mutation({
            query: (data) => ({
                url: "/reviews",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Review"]
        }),

        updateReview: builder.mutation({
            query: (query) => ({
                url: `/reviews/${query.id}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(query.data)
            })
        }),

        deleteReviewById: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "DELETE",
            })
        })

    })
});


export const { useGetAllReviewsQuery, useAddReviewMutation, useGetReviewsByProIdQuery, useUpdateReviewMutation, useDeleteReviewByIdMutation } = reviewApi;