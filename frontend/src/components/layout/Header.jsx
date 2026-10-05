import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-white transition hover:text-emerald-200 sm:text-2xl"
        >
          White Lotus Properties
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4">

          <Link
            to="/"
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 sm:px-5 sm:py-2.5 sm:text-base ${
              location.pathname === '/'
                ? 'border-white bg-white text-emerald-900'
                : 'border-emerald-300 text-white hover:border-white hover:bg-white hover:text-emerald-900'
            }`}
          >
            Properties
          </Link>

          <Link
            to="/admin"
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 sm:px-5 sm:py-2.5 sm:text-base ${
              location.pathname.startsWith('/admin')
                ? 'border-white bg-white text-emerald-900'
                : 'border-emerald-300 text-white hover:border-white hover:bg-white hover:text-emerald-900'
            }`}
          >
            Admin
          </Link>

        </nav>
      </div>
    </header>
  )
}

export default Header

