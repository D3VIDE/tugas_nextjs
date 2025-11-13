import Link from 'next/link'

export default function Header() {
  const cartCount = 0 // Static value untuk sekarang

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">LuxuryStore</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
          </nav>

          {/* Cart & Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 13m-7.5 5.5V21a1 1 0 001 1h4a1 1 0 001-1v-2.5" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}