function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary:
      'bg-gray-900 text-white hover:bg-black hover:shadow-lg',
    secondary:
      'border border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:bg-gray-50',
    danger:
      'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  )
}

export default Button