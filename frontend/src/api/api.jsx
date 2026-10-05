const API_BASE_URL = import.meta.env.VITE_API_URL

export const getProperties = async () => {
  const response = await fetch(`${API_BASE_URL}/properties/`)

  if (!response.ok) {
    throw new Error('Failed to fetch properties')
  }

  return response.json()
}

export const createProperty = async (propertyData) => {
  const response = await fetch(`${API_BASE_URL}/properties/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(propertyData),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to create property')
  }

  return result
}

export const updateProperty = async (id, propertyData) => {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(propertyData),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to update property')
  }

  return result
}

export const deleteProperty = async (id) => {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
    method: 'DELETE',
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.detail || 'Failed to delete property')
  }

  return result
}

export const createInquiry = async (inquiryData) => {
  const response = await fetch(`${API_BASE_URL}/inquiries/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inquiryData),
  })

  const result = await response.json()

  if (!response.ok) {
    let errorMessage = 'Failed to submit inquiry'

    if (Array.isArray(result.detail)) {
      errorMessage = result.detail
        .map((error) => {
          const field = error.loc?.[1] || 'Field'
          return `${field}: ${error.msg}`
        })
        .join(', ')
    } else if (typeof result.detail === 'string') {
      errorMessage = result.detail
    }

    throw new Error(errorMessage)
  }

  return result
}

export const getInquiries = async () => {
  const response = await fetch(`${API_BASE_URL}/inquiries/`)

  if (!response.ok) {
    throw new Error('Failed to fetch inquiries')
  }

  return response.json()
}