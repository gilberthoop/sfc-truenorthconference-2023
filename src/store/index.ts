import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { searchFiltersReducer } from "./slices/searchFiltersSlice";
import {
  setSearchFilter,
  removeSearchFilters,
} from "./slices/searchFiltersSlice";
import { registrationsReducer } from "./slices/participantsSlice";
import { fetchRegistrations, filterRegistrations } from "./thunks";

export const store = configureStore({
  reducer: {
    registrations: registrationsReducer,
    searchFilters: searchFiltersReducer,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {
  fetchRegistrations,
  filterRegistrations,
  setSearchFilter,
  removeSearchFilters,
};
