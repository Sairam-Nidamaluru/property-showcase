import { Link, useNavigate } from 'react-router-dom'
import PropertyForm from '../../components/property/PropertyForm'
import { createProperty } from '../../api/api'

function PropertyCreate() {
  const navigate = useNavigate()

 const handleSubmit = async (formData) => {
    try {
      await createProperty({
        name: formData.name,
        location: formData.location,
        price: Number(formData.price),
        size_sqft: Number(formData.size_sqft),
        bedrooms: Number(formData.bedrooms),
        description: formData.description,
        image_url: formData.image_url,
      })

      alert('Property created successfully!')
      navigate('/admin')
    } catch (error) {
      console.error('Create property error:', error)
      alert(`Failed to create property:\n${error.message}`)
    }
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">

        <Link
          to="/admin"
          className="text-sm font-semibold text-gray-600 hover:text-gray-900"
        >
          ← Back to Dashboard
        </Link>

        <div className="mb-8 mt-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Add Property
          </h1>

          <p className="mt-2 text-gray-600">
            Add a new luxury property to the portfolio.
          </p>
        </div>

        <PropertyForm
          onSubmit={handleSubmit}
          submitText="Create Property"
        />

      </div>
    </section>
  )
}
export default PropertyCreate

