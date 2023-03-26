import { apiSlice } from "../api/apiSlice";



//create orders apiSlice
export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getOrders: builder.query({
            query: () => ({
                url: "/orders"
            })
        }),

        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/orders?email=${email}`
            })
        }),

        createOrder: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }),

        updateOrderById: builder.query({
            query: (query) => ({
                url: `/orders/${query.id}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(query.data)
            })
        }),

        deleteOrderById: builder.query({
            query: (id) => ({
                url: `/orders/${id}`
            })
        }),


    })
});

export const {useCreateOrderMutation, useDeleteOrderByIdQuery, useGetOrdersByEmailQuery, useGetOrdersQuery, useUpdateOrderByIdQuery} = ordersApi;