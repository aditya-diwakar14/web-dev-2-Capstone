import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadProducts, loadCategories,
  selectAllProducts, selectProductStatus
} from '../features/productSlice'
import { setCategory, resetFilters } from '../features/filterSlice'
import ProductCard from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/Skeleton'

// Match EXACTLY to what dummyjson returns after our mapping
const CATS = [
  { id: 'smartphones', icon: '📱', label: 'Smartphones', color: '#6366f1' },
  { id: 'laptops',     icon: '💻', label: 'Laptops',     color: '#8b5cf6' },
  { id: 'accessories', icon: '⌚', label: 'Accessories', color: '#10b981' },
]

const STATS = [
  { val: '60+',  label: 'PRODUCTS' },
  { val: '3',    label: 'CATEGORIES' },
  { val: '4.5★', label: 'AVG RATING' },
  { val: 'FREE', label: 'SHIPPING' },
]

export default function Home() {
  const dispatch  = useDispatch()
  const products  = useSelector(selectAllProducts)
  const status    = useSelector(selectProductStatus)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadProducts())
      dispatch(loadCategories())
    }
  }, [dispatch, status])

  // Top rated featured products
  const featured = [...products]
    .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    .slice(0, 4)

  return (
    <div className="anim-fade-in">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden grid-bg"
        style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}
      >
        <div style={{ position:'absolute', top:'15%', left:'5%', width:500, height:500,
          background:'color-mix(in srgb, var(--neon) 4%, transparent)',
          borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'5%', width:400, height:400,
          background:'rgba(99,102,241,0.06)', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none' }} />

        <div className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 32, height: 1, background: 'var(--neon)' }} />
              <span className="font-mono-custom text-xs tracking-widest text-neon">NEXT-GEN ELECTRONICS</span>
            </div>

            <h1 className="font-display font-black leading-none mb-6"
              style={{ fontSize: 'clamp(3rem,8vw,6rem)', letterSpacing: '-0.02em', color: 'var(--text)' }}>
              <span>POWER</span><br />
              <span style={{ WebkitTextStroke: '1px var(--neon)', color: 'transparent' }}>YOUR</span><br />
              <span style={{ color: 'var(--neon)', textShadow: '0 0 40px color-mix(in srgb, var(--neon) 40%, transparent)' }}>
                WORLD
              </span>
            </h1>

            <p style={{ color: 'var(--text-muted)', maxWidth: 480, lineHeight: 1.8 }}
              className="font-body text-lg mb-10">
              Discover the latest smartphones, laptops, and accessories.
              Curated for those who demand the best.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                onClick={() => dispatch(resetFilters())}
                className="btn-neon-solid font-display text-xs tracking-widest"
              >
                EXPLORE STORE →
              </Link>
              <Link
                to="/products"
                onClick={() => dispatch(setCategory('smartphones'))}
                className="btn-neon font-display text-xs tracking-widest"
              >
                📱 SMARTPHONES
              </Link>
            </div>
          </div>
        </div>

        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'40%',
          backgroundImage:'repeating-linear-gradient(90deg, color-mix(in srgb, var(--neon) 3%, transparent) 0px, color-mix(in srgb, var(--neon) 3%, transparent) 1px, transparent 1px, transparent 80px)',
          pointerEvents:'none' }} />
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <section
        style={{ borderTop: '1px solid var(--divider)', borderBottom: '1px solid var(--divider)', background: 'var(--bg2)' }}
        className="py-5 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.val} className="text-center py-2"
                style={{ borderRight: i < 3 ? '1px solid var(--divider)' : 'none' }}>
                <div className="font-display font-bold text-xl glow-sm text-neon">{s.val}</div>
                <div className="font-mono-custom text-xs tracking-widest mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-10">
          <div style={{ width: 24, height: 1, background: 'var(--neon)' }} />
          <span className="font-mono-custom text-xs tracking-widest text-neon">BROWSE BY CATEGORY</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATS.map(cat => (
            <Link
              key={cat.id}
              to="/products"
              onClick={() => dispatch(setCategory(cat.id))}
              className="volt-card p-8 text-center group cursor-pointer relative overflow-hidden"
            >
              <div style={{ background: cat.color, opacity: 0.07, position: 'absolute', inset: 0, transition: 'opacity 0.3s' }} />
              <div className="text-5xl mb-4 relative z-10">{cat.icon}</div>
              <p style={{ color: cat.color }} className="font-display text-sm tracking-widest font-bold relative z-10">
                {cat.label.toUpperCase()}
              </p>
              <p style={{ color: 'var(--text-dim)' }} className="font-mono-custom text-xs mt-2 relative z-10">
                {products.filter(p => p.category === cat.id).length} products →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div style={{ width: 24, height: 1, background: 'var(--neon)' }} />
            <span className="font-mono-custom text-xs tracking-widest text-neon">TOP RATED GEAR</span>
          </div>
          <Link
            to="/products"
            onClick={() => dispatch(resetFilters())}
            className="font-mono-custom text-xs tracking-widest hover:text-neon transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {status === 'loading'
            ? Array(4).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
            : featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
          }
        </div>
      </section>

      {/* ── CATEGORY QUICK LINKS ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Smartphones quick section */}
          <div className="volt-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-sm font-bold" style={{ color: '#6366f1' }}>📱 SMARTPHONES</span>
              <Link to="/products" onClick={() => dispatch(setCategory('smartphones'))}
                className="font-mono-custom text-xs text-neon hover:underline">SEE ALL →</Link>
            </div>
            <div className="space-y-2">
              {products.filter(p => p.category === 'smartphones').slice(0, 3).map(p => (
                <Link key={p.id} to={`/products/${p.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-opacity-50 transition-all group"
                  style={{ background: 'var(--bg2)' }}>
                  <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded-lg"
                    onError={e => e.target.style.display='none'} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate group-hover:text-neon transition-colors" style={{ color: 'var(--text)' }}>{p.title}</p>
                    <p className="text-xs font-mono-custom" style={{ color: 'var(--neon)' }}>
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Laptops quick section */}
          <div className="volt-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-sm font-bold" style={{ color: '#8b5cf6' }}>💻 LAPTOPS</span>
              <Link to="/products" onClick={() => dispatch(setCategory('laptops'))}
                className="font-mono-custom text-xs text-neon hover:underline">SEE ALL →</Link>
            </div>
            <div className="space-y-2">
              {products.filter(p => p.category === 'laptops').slice(0, 3).map(p => (
                <Link key={p.id} to={`/products/${p.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-opacity-50 transition-all group"
                  style={{ background: 'var(--bg2)' }}>
                  <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded-lg"
                    onError={e => e.target.style.display='none'} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate group-hover:text-neon transition-colors" style={{ color: 'var(--text)' }}>{p.title}</p>
                    <p className="text-xs font-mono-custom" style={{ color: 'var(--neon)' }}>
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Accessories quick section */}
          <div className="volt-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-sm font-bold" style={{ color: '#10b981' }}>⌚ ACCESSORIES</span>
              <Link to="/products" onClick={() => dispatch(setCategory('accessories'))}
                className="font-mono-custom text-xs text-neon hover:underline">SEE ALL →</Link>
            </div>
            <div className="space-y-2">
              {products.filter(p => p.category === 'accessories').slice(0, 3).map(p => (
                <Link key={p.id} to={`/products/${p.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-opacity-50 transition-all group"
                  style={{ background: 'var(--bg2)' }}>
                  <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded-lg"
                    onError={e => e.target.style.display='none'} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate group-hover:text-neon transition-colors" style={{ color: 'var(--text)' }}>{p.title}</p>
                    <p className="text-xs font-mono-custom" style={{ color: 'var(--neon)' }}>
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-2xl p-12 text-center volt-card">
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
            width:400, height:400, background:'color-mix(in srgb, var(--neon) 4%, transparent)',
            borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none' }} />
          <span className="volt-tag relative z-10">FREE DELIVERY</span>
          <h2 className="font-display font-bold text-3xl mt-4 mb-3 relative z-10"
            style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            FREE SHIPPING ON ALL ORDERS
          </h2>
          <p style={{ color: 'var(--text-muted)' }} className="font-body mb-8 relative z-10">
            No minimum order. Fast delivery across India. Easy returns.
          </p>
          <Link
            to="/products"
            onClick={() => dispatch(resetFilters())}
            className="btn-neon-solid font-display text-xs tracking-widest relative z-10"
          >
            SHOP NOW →
          </Link>
        </div>
      </section>

    </div>
  )
}
