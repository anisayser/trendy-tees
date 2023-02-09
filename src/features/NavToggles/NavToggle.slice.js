import { createSlice } from "@reduxjs/toolkit";

//Initial State
const initialState = {
    cartOpen: false,
    mobileSearchBox: false,
}


//Crate NavToggle Slice
const navToggleSlice = createSlice({
    name: "navToggleSlice",
    initialState,
    reducers: {
        openCart: (state, action) => {
            state.cartOpen = action.payload
        },
        openMobileSearch: (state, action) => {
            state.mobileSearchBox = action.payload
        }
    }
})

export default navToggleSlice.reducer;
export const { openCart, openMobileSearch } = navToggleSlice.actions;