import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme, selectIsDark } from '../features/themeSlice'
import { selectCartCount } from '../features/cartSlice'
import { setCategory, resetFilters } from '../features/filterSlice'

export default function Navbar() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const isDark    = useSelector(selectIsDark)
  const cartCount = useSelector(selectCartCount)

  function goTo(cat) {
    if (cat === 'all') {
      dispatch(resetFilters())
    } else {
      dispatch(setCategory(cat))
    }
    navigate('/products')
  }

  return (
    <nav
      style={{ background: 'var(--navbar-bg)', borderBottom: '1px solid var(--divider)', backdropFilter: 'blur(20px)' }}
      className="sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            style={{ background: 'linear-gradient(135deg, var(--neon), #0d9488)', boxShadow: '0 0 20px color-mix(in srgb, var(--neon) 40%, transparent)' }}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5" style={{ color: '#0a0f1a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-widest transition-colors" style={{ color: 'var(--text)' }}>
            VOLT
          </span>
        </Link>

        {/* Nav links — use real category names from API */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-mono-custom text-xs tracking-widest transition-colors hover:text-neon" style={{ color: 'var(--text-muted)' }}>
            HOME
          </Link>
          <button onClick={() => goTo('all')} className="font-mono-custom text-xs tracking-widest transition-colors hover:text-neon" style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            ALL PRODUCTS
          </button>
          <button onClick={() => goTo('smartphones')} className="font-mono-custom text-xs tracking-widest transition-colors hover:text-neon" style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            SMARTPHONES
          </button>
          <button onClick={() => goTo('laptops')} className="font-mono-custom text-xs tracking-widest transition-colors hover:text-neon" style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            LAPTOPS
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">

          {/* Dark/Light toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            style={{ background: 'var(--surface)', border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:border-neon hover:text-neon"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Cart */}
          <Link to="/cart" className="btn-neon text-xs tracking-widest relative">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            CART
            {cartCount > 0 && (
              <span
                style={{ background: 'var(--neon)', color: '#0a0f1a' }}
                className="absolute -top-2 -right-2 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono-custom"
              >
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  )
}
