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
import Head from "next/head";
import { CircularProgress } from "@mui/material";
import { Participant, FilterCriteria } from "@/utils/types";
import AppList from "@/components/AppList";
import RegistrationListFilter from "@/components/registration/RegistrationListFilter";

export default function RegistrationListPage() {
  // List
  const { data: participants } = useSelector(
    (state: { registrations: { data: Participant[] } }) => state.registrations
  );
  const { isLoading } = useSelector((state: RootState) => state.registrations);

  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();
  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  // Filter
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const searchFilters = useSelector((state: RootState) => state.searchFilters);

  function getAppliedFilters(filters: FilterCriteria): string[] {
    const appliedFilters = Object.values(filters).flat();
    return appliedFilters;
  }

  useEffect(() => {
    const theFilters = getAppliedFilters(searchFilters);
    setAppliedFilters(theFilters);
  }, [participants]);

  function handleFilterClear() {
    dispatch(removeSearchFilters());
    dispatch(fetchRegistrations());
  }

  function handleFilterSearch() {
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
  }

  function handleFilterUpdate(event: React.ChangeEvent<HTMLInputElement>) {
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
  }

  const searchResultsText =
    appliedFilters.length > 0 ? (
      <h1 className="text-lg">Search result(s) for: </h1>
    ) : (
      ""
    );

  const appliedFiltersDisplay =
    appliedFilters.length > 0 &&
    appliedFilters.map((filter, index) => (
      <button className="filter__chip" key={index}>
        {filter}
      </button>
    ));

  const registrationListDisplay = isLoading ? (
    <div className="flex flex-col justify-between items-center">
      <h1 className="text-center text-white text-2xl sm:text-4xl my-12">
        Loading data...
      </h1>
      <CircularProgress size={100} color="info" />
    </div>
  ) : (
    <AppList data={participants} />
  );

  return (
    <main className="py-8 px-5">
      <Head>
        <title>SFC TNC Breakthrough | Registration List</title>
      </Head>

      <header className="flex flex-col md:flex-row justify-between items-center">
        <div className="inline text-white text-md mb-4 sm:mb-2 mr-0 sm:mr-28">
          {searchResultsText}
          {appliedFiltersDisplay}
        </div>
        <RegistrationListFilter
          onFilterChange={handleFilterUpdate}
          onFilterClear={handleFilterClear}
          onFilterSearch={handleFilterSearch}
        />
      </header>

      {registrationListDisplay}
    </main>
  );
}
