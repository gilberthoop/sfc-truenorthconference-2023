import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { registrationsReducer } from "./slices/participantsSlice";
import { fetchRegistrations, filterRegistrations } from "./thunks";

export const store = configureStore({
  reducer: {
    registrations: registrationsReducer,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { fetchRegistrations, filterRegistrations };
