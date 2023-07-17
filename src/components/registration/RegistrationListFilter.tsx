import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  REGIONS,
  AREALIST,
  MEMBERSHIP_ROLE,
  ACCOMMODATION_NEEDS,
  SHIRT_SIZES,
} from "@/utils/global-values";

interface FilterProps {
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterClear: () => void;
  onFilterSearch: () => void;
}

const RegistrationListFilter: React.FC<FilterProps> = ({
  onFilterChange,
  onFilterClear,
  onFilterSearch,
}) => {
  const regionsOptions = REGIONS.map((region) => region.value);
  // OPTIONALLY, const areasOptions: string[] = AREALIST.flatMap((area) => area);
  const areasOptions: string[] = AREALIST.reduce(
    (acc, areas) => acc.concat(areas),
    []
  );
  const roleOptions = MEMBERSHIP_ROLE;
  const accommodationNeedsOptions = ACCOMMODATION_NEEDS;
  const shirtSizesOptions = SHIRT_SIZES;

  // Filters-related
  const [showFilters, setShowFilters] = useState(false);
  const [filterVisibility, setFilterVisibility] = useState({
    region: false,
    area: false,
    sfcRole: false,
    shirtSize: false,
    accommodationNeeds: false,
  });
  const searchFilters = useSelector((state: RootState) => state.searchFilters);

  function handleFilterVisibility(criteria: keyof typeof filterVisibility) {
    setFilterVisibility((prevFilterVisibility) => ({
      ...prevFilterVisibility,
      [criteria]: !prevFilterVisibility[criteria],
    }));
  }

  function clearFiltersSelection() {
    setShowFilters(false);
    onFilterClear();
  }

  function updateFilters(event: React.ChangeEvent<HTMLInputElement>) {
    onFilterChange(event);
  }

  function handleFilterSearch(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    onFilterSearch();
    closeFilters();
  }

  function closeFilters() {
    setShowFilters(false);
  }

  return (
    <main className="filter">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full h-8"
      >
        Filter search
      </button>
      <section
        className={`filter__content ${
          showFilters ? "filter__content--slide-in" : "hidden"
        }`}
      >
        <form onSubmit={(event) => event.preventDefault()}>
          <section className="flex justify-between pb-8 underline">
            <button onClick={clearFiltersSelection}>Clear All</button>
            <button onClick={closeFilters}>Close</button>
          </section>
          {/* Regions */}
          <section className="py-4 border-t-2">
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
                    name="regions"
                    id={regionOption}
                    value={regionOption}
                    checked={searchFilters.regions.includes(regionOption)}
                    onChange={updateFilters}
                    className="mr-2"
                  />
                  <label htmlFor={regionOption}>{regionOption}</label>
                </div>
              ))}
            </div>
          </section>

          {/* Areas */}
          <section className="py-4 border-t-2">
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
                    name="areas"
                    id={areaOption}
                    value={areaOption}
                    checked={searchFilters.areas.includes(areaOption)}
                    onChange={updateFilters}
                    className="mr-2"
                  />
                  <label htmlFor={areaOption}>{areaOption}</label>
                </div>
              ))}
            </div>
          </section>

          {/* Roles */}
          <section className="py-4 border-t-2">
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
                    name="sfcRoles"
                    id={roleOption}
                    value={roleOption}
                    checked={searchFilters.sfcRoles.includes(roleOption)}
                    onChange={updateFilters}
                    className="mr-2"
                  />
                  <label htmlFor={roleOption}>{roleOption}</label>
                </div>
              ))}
            </div>
          </section>

          {/* Shirt sizes options */}
          <section className="py-4 border-t-2">
            <button
              className="w-full"
              onClick={() => handleFilterVisibility("shirtSize")}
            >
              <h3 className="mb-1 text-lg underline">Shirt Sizes</h3>
            </button>
            <div
              style={{
                display: filterVisibility.shirtSize ? "block" : "none",
              }}
              className="mb-1"
            >
              {shirtSizesOptions.map((sizeOption, index) => (
                <div key={index} className="filter__form-option">
                  <input
                    type="checkbox"
                    name="shirtSizes"
                    id={sizeOption}
                    value={sizeOption}
                    checked={searchFilters.shirtSizes.includes(sizeOption)}
                    onChange={updateFilters}
                    className="mr-2"
                  />
                  <label htmlFor={sizeOption}>{sizeOption}</label>
                </div>
              ))}
            </div>
          </section>

          {/* Accommodation Needs options */}
          <section className="py-4 border-t-2">
            <button
              className="w-full"
              onClick={() => handleFilterVisibility("accommodationNeeds")}
            >
              <h3 className="mb-1 text-lg underline">Accommodation Needs</h3>
            </button>
            <div
              style={{
                display: filterVisibility.accommodationNeeds ? "block" : "none",
              }}
              className="mb-1"
            >
              {accommodationNeedsOptions.map((needsOption, index) => (
                <div key={index} className="filter__form-option">
                  <input
                    type="checkbox"
                    name="accommodationsNeeds"
                    id={needsOption}
                    value={needsOption}
                    checked={searchFilters.accommodationsNeeds.includes(
                      needsOption
                    )}
                    onChange={updateFilters}
                    className="mr-2"
                  />
                  <label htmlFor={needsOption}>{needsOption}</label>
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
};

export default RegistrationListFilter;
