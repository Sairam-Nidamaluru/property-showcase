import PropertyCard from './PropertyCard'
import EmptyState from '../common/EmptyState'

function PropertyGrid({ properties }) {
  if (!properties || properties.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  )
}

export default PropertyGrid