import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRegistrations, filterRegistrations } from "../thunks";
import { ParticipantsState } from "@/utils/types";

const registrationsSlice = createSlice({
  name: "registrations",
  initialState: {
    data: [],
    isLoading: true,
    error: null,
  } as ParticipantsState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRegistrations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchRegistrations.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      fetchRegistrations.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(filterRegistrations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      filterRegistrations.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      filterRegistrations.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export const registrationsReducer = registrationsSlice.reducer;
