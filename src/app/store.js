import { configureStore } from '@reduxjs/toolkit';
import NavToggleSlice from "../features/NavToggles/NavToggle.slice";


export const store = configureStore({
  reducer: {
    navToggle: NavToggleSlice
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat()
});
