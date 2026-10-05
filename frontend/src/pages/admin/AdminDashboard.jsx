import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'

function AdminDashboard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/properties/'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch properties')
      }

      const data = await response.json()
      setProperties(data)
    } catch (err) {
      console.error(err)
      setError('Unable to load properties.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this property?'
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/properties/${propertyId}`,
        {
          method: 'DELETE',
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.detail || 'Failed to delete property'
        )
      }

      // Remove deleted property immediately from UI
      setProperties((previousProperties) =>
        previousProperties.filter(
          (property) => property.id !== propertyId
        )
      )

      alert('Property deleted successfully!')
    } catch (err) {
      console.error('Delete error:', err)
      alert(`Failed to delete property: ${err.message}`)
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Property Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage properties and review your portfolio.
            </p>
          </div>

          <Link to="/admin/properties/new">
            <Button>
              + Add Property
            </Button>
          </Link>
        </div>

        {error && (
          <div className="mt-8 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Property
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Location
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Size
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Bedrooms
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {properties.map((property) => (
                  <tr
                    key={property.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-5">
                      <p className="font-semibold text-gray-900">
                        {property.name}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">
                      {property.location}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-gray-900">
                      ₹{Number(property.price).toLocaleString('en-IN')}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">
                      {Number(property.size_sqft).toLocaleString()} sq ft
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">
                      {property.bedrooms}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-right">
                      <Link
                        to={`/admin/properties/${property.id}/edit`}
                        className="text-sm font-semibold text-gray-900 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(property.id)}
                        className="ml-4 text-sm font-semibold text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  )
}
export default AdminDashboard

