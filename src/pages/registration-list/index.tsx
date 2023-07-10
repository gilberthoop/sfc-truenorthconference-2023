import Head from "next/head";
import { CircularProgress } from "@mui/material";
import AppList from "@/components/AppList";
import RegistrationListFilter from "@/components/registration/RegistrationListFilter";
import useParticipants from "@/hooks/use-participants";
import useSearchFilters from "@/hooks/use-search-filters";

export default function RegistrationListPage() {
  const { participants, isLoading } = useParticipants();
  const {
    appliedFilters,
    handleFilterClear,
    handleFilterSearch,
    handleFilterUpdate,
  } = useSearchFilters();

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
