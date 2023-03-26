import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


//Crate Api Slice
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/v1"
        // baseUrl: "https://trendy-tees.onrender.com/api/v1"
    }),
    tagTypes: ["Cart", "Review"],
    endpoints: (builder) => ({})
});