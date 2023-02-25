import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from "../features/api/apiSlice";
import filtersSlice from "../features/filters/filtersSlice";
import NavToggleSlice from "../features/NavToggles/NavToggle.slice";


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    navToggle: NavToggleSlice,
    filters: filtersSlice
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});
