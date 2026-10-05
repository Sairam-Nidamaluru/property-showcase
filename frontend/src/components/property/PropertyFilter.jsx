function PropertyFilter({
  filters,
  onFilterChange,
  onReset,
}) {
  return (
    <div className="mb-10 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900">
          Find your property
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Filter properties by location, bedrooms, or price.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            value={filters.location}
            onChange={onFilterChange}
            placeholder="Search location"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="bedrooms"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Bedrooms
          </label>

          <select
            id="bedrooms"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={onFilterChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">All Bedrooms</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Sort By
          </label>

          <select
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={onFilterChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="bedrooms_desc">
              Bedrooms: High to Low
            </option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyFilter