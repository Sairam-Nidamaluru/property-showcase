function EmptyState({
  title = 'No properties found',
  message = 'Try changing your filters to find more properties.',
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
        🏠
      </div>

      <h3 className="mt-5 text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {message}
      </p>
    </div>
  )
}

export default EmptyState