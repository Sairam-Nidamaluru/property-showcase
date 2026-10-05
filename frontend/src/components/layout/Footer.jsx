function Footer() {
  return (
    <footer className="border-t border-emerald-800 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white shadow-inner">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:text-left lg:px-8">

        <div>
          <p className="text-xl font-bold tracking-wide text-white transition-colors duration-200 hover:text-emerald-200">
            White Lotus Properties
          </p>

          <p className="mt-2 text-sm leading-6 text-emerald-100">
            Luxury properties for refined living.
          </p>
        </div>

        <p className="text-sm text-emerald-200">
          © 2026 White Lotus Properties
        </p>

      </div>
    </footer>
  )
}

export default Footer
