
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PropertyForm from '../../components/property/PropertyForm'
import { getProperties, updateProperty } from '../../api/api'

function PropertyEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load property from backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getProperties()

        const selectedProperty = data.find(
          (item) => item.id === Number(id)
        )

        if (!selectedProperty) {
          setError('Property not found.')
          return
        }

        setProperty(selectedProperty)
      } catch (err) {
        console.error('Error loading property:', err)
        setError('Unable to load property.')
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  // Update property
  const handleSubmit = async (formData) => {
    try {
      const updatedData = {
        name: formData.name,
        location: formData.location,
        price: Number(formData.price),
        size_sqft: Number(formData.size_sqft),
        bedrooms: Number(formData.bedrooms),
        description: formData.description,
        image_url: formData.image_url,
      }

      await updateProperty(id, updatedData)

      alert('Property updated successfully!')
      navigate('/admin')
    } catch (err) {
      console.error('Update error:', err)
      alert(`Failed to update property: ${err.message}`)
    }
  }
  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-gray-600">
            Loading property...
          </p>
        </div>
      </section>
    )
  }

  // Error / property not found
  if (error || !property) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Property Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          {error}
        </p>

        <Link
          to="/admin"
          className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Dashboard
        </Link>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">

        {/* Back */}
        <Link
          to="/admin"
          className="text-sm font-semibold text-gray-600 hover:text-gray-900"
        >
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8 mt-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Edit Property
          </h1>

          <p className="mt-2 text-gray-600">
            Update property information.
          </p>
        </div>

        {/* Existing Property Form */}
        <PropertyForm
          initialValues={{
            name: property.name,
            location: property.location,
            price: property.price,
            size_sqft: property.size_sqft,
            bedrooms: property.bedrooms,
            description: property.description,
            image_url: property.image_url,
          }}
          onSubmit={handleSubmit}
          submitText="Update Property"
        />

      </div>
    </section>
  )
}

export default PropertyEdit

