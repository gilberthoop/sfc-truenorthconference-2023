import { useState } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState, filterRegistrations, fetchRegistrations } from "@/store";
import { REGIONS, AREALIST, MEMBERSHIP_ROLE } from "@/utils/global-values";
import { FilterCriteria } from "@/utils/types";

function ListFilter() {
  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();
  const regionsOptions = REGIONS.map((region) => region.value);
  // OPTIONALLY, const areasOptions: string[] = AREALIST.flatMap((area) => area);
  const areasOptions: string[] = AREALIST.reduce(
    (acc, areas) => acc.concat(areas),
    []
  );
  const roleOptions = MEMBERSHIP_ROLE;

  // Filters-related
  const [showFilters, setShowFilters] = useState(false);
  const [filterVisibility, setFilterVisibility] = useState({
    region: false,
    area: false,
    sfcRole: false,
  });
  const [filters, setFilters] = useState<FilterCriteria>({
    region: [],
    area: [],
    sfcRole: [],
  });

  function handleFilterVisibility(criteria: keyof typeof filterVisibility) {
    setFilterVisibility((prevFilterVisibility) => ({
      ...prevFilterVisibility,
      [criteria]: !prevFilterVisibility[criteria],
    }));
  }

  function clearFiltersSelection() {
    setFilters({
      region: [],
      area: [],
      sfcRole: [],
    });
    setShowFilters(false);
    dispatch(fetchRegistrations());
  }

  function updateFilters(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = event.target;

    setFilters((prevFilters) => {
      const updatedArray = [
        ...(prevFilters[name as keyof FilterCriteria] ?? []),
      ];
      const existingArray = prevFilters[name as keyof FilterCriteria] ?? [];

      if (checked) {
        updatedArray.push(value);
      } else {
        const index = existingArray.indexOf(value);
        if (index !== -1) {
          updatedArray.splice(index, 1);
        }
      }

      return {
        ...prevFilters,
        [name as keyof FilterCriteria]: updatedArray,
      };
    });
  }

  function handleFilterSearch(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, values]) => {
        values.forEach((value: string) => {
          queryParams.append(key, value);
        });
      });
      dispatch(filterRegistrations(queryParams));
    } catch (e) {
      console.error(e);
    } finally {
      closeFilters();
    }
  }

  function closeFilters() {
    setShowFilters(false);
  }

  return (
    <main className="bg-white w-full sm:w-40 p-2 rounded-md">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full h-7"
      >
        Filter search
      </button>
      <section
        className={`filter__content ${
          showFilters ? "filter__content--slide-in" : "hidden"
        }`}
      >
        <form onSubmit={(event) => event.preventDefault()}>
          <section className="flex justify-between border-b-2 pb-4 underline">
            <button onClick={clearFiltersSelection}>Clear All</button>
            <button onClick={closeFilters}>Close</button>
          </section>
          {/* Regions */}
          <section className="py-4 border-b-2">
            <button
              className="w-full"
              onClick={() => handleFilterVisibility("region")}
            >
              <h3 className="mb-1 text-lg underline">Regions</h3>
            </button>
            <div
              style={{
                display: filterVisibility.region ? "block" : "none",
              }}
              className="mb-1"
            >
              {regionsOptions.map((regionOption, index) => (
                <div key={index} className="filter__form-option">
                  <input
                    type="checkbox"
                    name="region"
                    id={regionOption}
                    value={regionOption}
                    checked={filters.region.includes(regionOption)}
                    onChange={updateFilters}
                    className="mr-2"
                  />
                  <label htmlFor={regionOption}>{regionOption}</label>
                </div>
              ))}
            </div>
          </section>

          {/* Areas */}
          <section className="py-4 border-b-2">
            <button
              className="w-full"
              onClick={() => handleFilterVisibility("area")}
            >
              <h3 className="mb-1 text-lg underline">Areas</h3>
            </button>
            <div
              style={{ display: filterVisibility.area ? "block" : "none" }}
              className="mb-1"
            >
              {areasOptions.map((areaOption, index) => (
                <div key={index} className="filter__form-option">
                  <input
                    type="checkbox"
                    name="area"
                    id={areaOption}
                    value={areaOption}
                    checked={filters.area.includes(areaOption)}
                    onChange={updateFilters}
                    className="mr-2"
                  />
                  <label htmlFor={areaOption}>{areaOption}</label>
                </div>
              ))}
            </div>
          </section>

          {/* Roles */}
          <section className="pt-4">
            <button
              className="w-full"
              onClick={() => handleFilterVisibility("sfcRole")}
            >
              <h3 className="mb-1 text-lg underline">Roles</h3>
            </button>
            <div
              style={{ display: filterVisibility.sfcRole ? "block" : "none" }}
              className="mb-1"
            >
              {roleOptions.map((roleOption, index) => (
                <div key={index} className="filter__form-option">
                  <input
                    type="checkbox"
                    name="sfcRole"
                    id={roleOption}
                    value={roleOption}
                    checked={filters.sfcRole.includes(roleOption)}
                    onChange={updateFilters}
                    className="mr-2"
                  />
                  <label htmlFor={roleOption}>{roleOption}</label>
                </div>
              ))}
            </div>
          </section>
        </form>
        <button onClick={handleFilterSearch} className="filter__search-btn">
          Search
        </button>
      </section>
    </main>
  );
}

export default ListFilter;