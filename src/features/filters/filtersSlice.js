import { createSlice } from "@reduxjs/toolkit";


//Initial State
const initialState = {
    stockFilter: [],
    sizeFilter: [],
    colorFilter: [],
    priceFilterStart: 0,
    priceFilterEnd: 0,
    searchFilter: "",
}


//Create Filter Slice
const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filterByStock: (state, action) => {
            state.stockFilter.push(action.payload)
        },
        removeStockFilter: (state, action) => {
            const index = state.stockFilter.indexOf(action.payload);
            if (index > -1) {
                state.stockFilter.splice(index, 1);
            }
        },
        filterBySize: (state, action) => {
            state.sizeFilter.push(action.payload)
        },
        removeSizeFilter: (state, action) => {
            const index = state.sizeFilter.indexOf(action.payload);
            if (index > -1) {
                state.sizeFilter.splice(index, 1);
            }
        },
        filterByColor: (state, action) => {
            state.colorFilter = action.payload
        },
        filterByPriceStart: (state, action) => {
            state.priceFilterStart = action.payload
        },
        filterByPriceEnd: (state, action) => {
            state.priceFilterEnd = action.payload
        },
        filterBySearch: (state, action) => {
            state.searchFilter = action.payload
        }
    }
})

export default filterSlice.reducer;
export const { filterByStock, removeStockFilter, filterBySize, removeSizeFilter, filterByColor, filterByPriceStart, filterByPriceEnd, filterBySearch } = filterSlice.actions;