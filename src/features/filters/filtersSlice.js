import { createSlice } from "@reduxjs/toolkit"


//Initial State
const initialState = {
    stockFilter: "",
    sizeFilter: "",
    colorFilter: "",
    priceFilter: ""
}


//Create Filter Slice
const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filterByStock: (state, action) => {
            state.stockFilter = action.payload
        },
        filterBySize: (state, action) => {
            state.sizeFilter = action.payload
        },
        filterByColor: (state, action) => {
            state.colorFilter = action.payload
        },
        filterByPrice: (state, action) => {
            state.priceFilter = action.payload
        },
    }
})

export default filterSlice.reducer;
export const { filterByStock, filterBySize, filterByColor, filterByPrice } = filterSlice.actions;