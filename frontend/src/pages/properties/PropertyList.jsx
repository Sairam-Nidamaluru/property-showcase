import { useEffect, useMemo, useState } from 'react'
import PropertyFilter from '../../components/property/PropertyFilter'
import PropertyGrid from '../../components/property/PropertyGrid'
import { getProperties } from '../../api/api'

function PropertyList() {
  const [properties, setProperties] = useState([])
  const [filters, setFilters] = useState({
    location: '',
    bedrooms: '',
    sort: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getProperties()
        setProperties(data)
      } catch (err) {
        console.error('Error loading properties:', err)
        setError('Unable to load properties.')
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  const handleFilterChange = (event) => {
    const { name, value } = event.target

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFilters({
      location: '',
      bedrooms: '',
      sort: '',
    })
  }

  const filteredProperties = useMemo(() => {
    let result = [...properties]

    if (filters.location) {
      result = result.filter((property) =>
        property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      )
    }

    if (filters.bedrooms) {
      result = result.filter(
        (property) =>
          property.bedrooms >= Number(filters.bedrooms)
      )
    }

    if (filters.sort === 'price_asc') {
      result.sort((a, b) => a.price - b.price)
    }

    if (filters.sort === 'price_desc') {
      result.sort((a, b) => b.price - a.price)
    }

    if (filters.sort === 'bedrooms_desc') {
      result.sort((a, b) => b.bedrooms - a.bedrooms)
    }

    return result
  }, [properties, filters])

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/40">

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50">

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            White Lotus Properties
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Exceptional properties
            <span className="block text-emerald-700">
              for refined living.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Explore our exclusive collection of luxury residences,
            carefully selected for comfort, design, and lifestyle.
          </p>

        </div>
      </div>

      {/* Properties Section */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

        {/* Luxury Properties Heading */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Premium Collection
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Luxury Properties
          </h2>

          <p className="mt-2 max-w-2xl text-gray-600">
            Discover exceptional homes designed for comfort, elegance,
            and refined living.
          </p>

        </div>

        {/* Property Count */}
        <p className="mb-6 text-sm font-medium text-slate-500">
          {loading
            ? 'Loading properties...'
            : `${filteredProperties.length} properties available`}
        </p>

        {/* Filters */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

          <PropertyFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-72 items-center justify-center rounded-3xl bg-white shadow-sm">

            <div className="text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-700" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading properties...
              </p>

            </div>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">

            <p className="font-semibold text-red-700">
              {error}
            </p>

          </div>
        )}

        {/* Property Grid */}
        {!loading && !error && (
          <PropertyGrid properties={filteredProperties} />
        )}

      </div>

    </section>
  )
}
export default PropertyList


