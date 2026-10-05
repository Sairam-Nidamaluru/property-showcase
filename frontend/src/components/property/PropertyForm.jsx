import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'

const initialForm = {
  name: '',
  location: '',
  price: '',
  size_sqft: '',
  bedrooms: '',
  description: '',
  image_url: '',
}

function PropertyForm({
  initialValues = initialForm,
  onSubmit,
  submitText = 'Save Property',
}) {
  const [formData, setFormData] = useState({
    ...initialForm,
    ...initialValues,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Property name is required.'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.'
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0.'
    }

    if (!formData.size_sqft || Number(formData.size_sqft) <= 0) {
      newErrors.size_sqft = 'Size must be greater than 0.'
    }

    if (!formData.bedrooms || Number(formData.bedrooms) <= 0) {
      newErrors.bedrooms = 'Bedrooms must be greater than 0.'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.'
    }

    if (!formData.image_url.trim()) {
      newErrors.image_url = 'Image path is required.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    onSubmit({
      ...formData,
      price: Number(formData.price),
      size_sqft: Number(formData.size_sqft),
      bedrooms: Number(formData.bedrooms),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Property Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Luxury Ocean Villa"
          required
          error={errors.name}
        />

        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Goa"
          required
          error={errors.location}
        />

        <Input
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="25000000"
          required
          error={errors.price}
        />

        <Input
          label="Size (sq ft)"
          name="size_sqft"
          type="number"
          value={formData.size_sqft}
          onChange={handleChange}
          placeholder="4200"
          required
          error={errors.size_sqft}
        />

        <Input
          label="Bedrooms"
          name="bedrooms"
          type="number"
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder="4"
          required
          error={errors.bedrooms}
        />

        <Input
          label="Image Path"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="/images/villa-1.jpg"
          required
          error={errors.image_url}
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Description
          <span className="ml-1 text-red-500">*</span>
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Enter property description..."
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
            errors.description
              ? 'border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200'
          }`}
        />

        {errors.description && (
          <p className="mt-2 text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="submit">
          {submitText}
        </Button>
      </div>
    </form>
  )
}

export default PropertyForm