import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addToCart } from '../features/cartSlice'
import { formatPrice } from '../utils/helpers'

const CATEGORY_COLORS = {
  smartphones: '#6366f1',
  laptops:     '#8b5cf6',
  audio:       '#ec4899',
  cameras:     '#f59e0b',
  accessories: '#10b981',
  gaming:      '#ef4444',
}

export default function ProductCard({ product, index = 0 }) {
  const dispatch = useDispatch()
  const accent = CATEGORY_COLORS[product.category] || '#00ffe5'
  const [imgError, setImgError]     = useState(false)
  const [imgLoaded, setImgLoaded]   = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    dispatch(addToCart(product))
  }

  const stars = Math.round(product.rating.rate)

  return (
    <Link
      to={`/products/${product.id}`}
      className={`block volt-card relative overflow-hidden anim-slide-up delay-${Math.min(index + 1, 8)} group`}
    >
      {/* Top accent line */}
      <div
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)`, height: '2px' }}
        className="absolute top-0 left-0 right-0 opacity-60 group-hover:opacity-100 transition-opacity"
      />

      {/* Image area */}
      <div
        style={{ background: 'var(--bg2)' }}
        className="relative h-52 flex items-center justify-center overflow-hidden"
      >
        {/* Ambient glow */}
        <div
          style={{ background: accent, filter: 'blur(50px)', opacity: 0.07, position: 'absolute', inset: 0 }}
          className="group-hover:opacity-15 transition-opacity"
        />

        {/* Category badge */}
        <span className="volt-tag absolute top-3 left-3 z-20">{product.category}</span>

        {/* Skeleton while loading */}
        {!imgLoaded && !imgError && (
          <div className="skeleton absolute inset-0" style={{ borderRadius: 0 }} />
        )}

        {/* Real product image from API */}
        {!imgError ? (
          <img
            src={product.image}
            alt={product.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true) }}
            className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
            style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
            loading="lazy"
          />
        ) : (
          /* Fallback: show brand initial + category */
          <div className="relative z-10 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <div
              style={{ width: 64, height: 64, background: accent + '20', border: `2px solid ${accent}40`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ color: accent, fontSize: 28, fontWeight: 'bold' }}>
                {product.title.charAt(0)}
              </span>
            </div>
            <span style={{ color: 'var(--text-dim)', fontSize: 10 }} className="font-mono-custom tracking-wider">
              {product.brand || product.category.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {product.brand && (
          <p className="font-mono-custom text-xs tracking-wider mb-1" style={{ color: accent, opacity: 0.8 }}>
            {product.brand.toUpperCase()}
          </p>
        )}

        <h3
          style={{ color: 'var(--text)', lineHeight: 1.4 }}
          className="font-body font-semibold text-sm mb-2 line-clamp-2 group-hover:text-neon transition-colors"
        >
          {product.title}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(s => (
              <span key={s} style={{ color: s <= stars ? '#fbbf24' : 'var(--text-dim)', fontSize: 12 }}>★</span>
            ))}
          </div>
          <span className="font-mono-custom text-xs" style={{ color: 'var(--text-muted)' }}>
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        {/* Price in ₹ + Add button */}
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--neon)' }} className="font-display font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            style={{ background: accent + '18', border: `1px solid ${accent}50`, color: accent }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity tracking-wider font-mono-custom"
          >
            + ADD
          </button>
        </div>
      </div>
    </Link>
  )
}
