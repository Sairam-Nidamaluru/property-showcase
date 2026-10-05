import { Link } from 'react-router-dom'

function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image_url}
          alt={property.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src = '/images/villa-1.jpg'
          }}
        />

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
          Luxury Property
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <p className="text-sm font-medium text-gray-500">
          {property.location}
        </p>

        <h3 className="mt-1 text-xl font-bold text-gray-900">
          {property.name}
        </h3>

        <p className="mt-4 text-xl font-bold text-gray-900">
          ₹{Number(property.price).toLocaleString('en-IN')}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-y border-gray-100 py-4 text-sm text-gray-600">
          <span>
            {Number(property.size_sqft).toLocaleString()} sq ft
          </span>

          <span>
            {property.bedrooms} Bedrooms
          </span>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
          {property.description}
        </p>

        <Link
          to={`/property/${property.id}`}
          className="mt-5 block rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-black"
        >
          View Property
        </Link>
      </div>
    </article>
  )
}

export default PropertyCard