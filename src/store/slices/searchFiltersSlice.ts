import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterCriteria } from "@/utils/types";

const initialFilters: FilterCriteria = {
  regions: [],
  areas: [],
  sfcRoles: [],
  shirtSizes: [],
  accommodationsNeeds: [],
};

const searchFiltersSlice = createSlice({
  name: "searchFilters",
  initialState: initialFilters,
  reducers: {
    setSearchFilter(
      state: FilterCriteria,
      action: PayloadAction<FilterCriteria>
    ) {
      return action.payload;
    },
    removeSearchFilters() {
      return initialFilters;
    },
  },
});

export const { setSearchFilter, removeSearchFilters } =
  searchFiltersSlice.actions;
export const searchFiltersReducer = searchFiltersSlice.reducer;
