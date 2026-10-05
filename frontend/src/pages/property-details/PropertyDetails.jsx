import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

import { getProperties, createInquiry } from '../../api/api'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

function PropertyDetails() {
  const { id } = useParams()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch property from database
  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true)
        setError('')

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

    loadProperty()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
      submit: '',
    }))

    // Hide previous success message when user starts filling again
    setSubmitted(false)
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Please enter a valid email.'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    try {
      setSubmitting(true)
      setSubmitted(false)

      await createInquiry({
        property_id: property.id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      })

      // Show success message
      setSubmitted(true)

      // Clear form
      setFormData(initialForm)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)

    } catch (err) {
      console.error('Inquiry submission error:', err)

      setErrors((previous) => ({
        ...previous,
        submit:
          err.message ||
          'Unable to submit inquiry. Please try again.',
      }))
    } finally {
      setSubmitting(false)
    }
  }

  // Loading
  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-700" />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading property...
          </p>
        </div>
      </section>
    )
  }

  // Error / Not Found
  if (error || !property) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Property Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          {error || 'The property you are looking for does not exist.'}
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Properties
        </Link>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center text-sm font-semibold text-gray-600 transition hover:text-gray-900"
        >
          ← Back to Properties
        </Link>

        {/* Property */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <img
              src={property.image_url}
              alt={property.name}
              className="h-full min-h-[350px] w-full object-cover lg:min-h-[550px]"
            />
          </div>

          {/* Details */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              {property.location}
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {property.name}
            </h1>

            <p className="mt-6 text-3xl font-bold text-gray-900">
              ₹{Number(property.price).toLocaleString('en-IN')}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Property Size
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {Number(property.size_sqft).toLocaleString()} sq ft
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Bedrooms
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {property.bedrooms}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900">
                About this property
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Inquiry */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">

          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900">
              Interested in this property?
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Send us your details and our property team will get
              back to you shortly.
            </p>
          </div>

          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
            >

              {/* Success */}
              {submitted && (
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
                  Thank you! Your inquiry has been submitted successfully.
                </div>
              )}

              {/* Error */}
              {errors.submit && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                  {errors.submit}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  error={errors.name}
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  error={errors.email}
                />

                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  error={errors.phone}
                />

              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Message
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="I'm interested in this property..."
                  className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                    errors.message
                      ? 'border-red-500'
                      : 'border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200'
                  }`}
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyDetails