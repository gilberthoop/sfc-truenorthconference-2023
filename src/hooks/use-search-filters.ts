import { useState, useEffect } from "react";
import { Action } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  RootState,
  fetchRegistrations,
  filterRegistrations,
  setSearchFilter,
  removeSearchFilters,
} from "@/store";
import { Participant, FilterCriteria } from "@/utils/types";

export default function useSearchFilters() {
  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const searchFilters = useSelector((state: RootState) => state.searchFilters);
  const { data: participants } = useSelector(
    (state: { registrations: { data: Participant[] } }) => state.registrations
  );

  const getAppliedFilters = (filters: FilterCriteria): string[] => {
    const appliedFilters = Object.values(filters).flat();
    return appliedFilters;
  };

  useEffect(() => {
    const theFilters = getAppliedFilters(searchFilters);
    setAppliedFilters(theFilters);
  }, [participants]);

  const handleFilterClear = () => {
    dispatch(removeSearchFilters());
    dispatch(fetchRegistrations());
  };

  const handleFilterSearch = () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchFilters).forEach(([key, values]) => {
        values.forEach((value: string) => {
          queryParams.append(key, value);
        });
      });
      dispatch(filterRegistrations(queryParams));
    } catch (e) {
      console.error(e);
    }
  };

  const handleFilterUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    const updatedSearchFilters = {
      ...searchFilters,
      [name as keyof FilterCriteria]: checked
        ? [...searchFilters[name as keyof FilterCriteria], value]
        : searchFilters[name as keyof FilterCriteria].filter(
            (item) => item !== value
          ),
    };

    dispatch(setSearchFilter(updatedSearchFilters));
  };

  return {
    appliedFilters,
    handleFilterClear,
    handleFilterSearch,
    handleFilterUpdate,
  };
}
