import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadProductById, clearSelected, selectSelectedProduct, selectDetailStatus } from '../features/productSlice'
import { addToCart } from '../features/cartSlice'
import { formatPrice } from '../utils/helpers'
import { ProductDetailSkeleton } from '../components/Skeleton'

const CATEGORY_COLORS = {
  smartphones:'#6366f1', laptops:'#8b5cf6', audio:'#ec4899',
  cameras:'#f59e0b', accessories:'#10b981', gaming:'#ef4444',
}

export default function ProductDetail() {
  const { id }     = useParams()
  const dispatch   = useDispatch()
  const navigate   = useNavigate()
  const product    = useSelector(selectSelectedProduct)
  const status     = useSelector(selectDetailStatus)
  const [imgError, setImgError]   = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    dispatch(loadProductById(id))
    return () => dispatch(clearSelected())
  }, [id, dispatch])

  if (status === 'loading' || status === 'idle') return <ProductDetailSkeleton />
  if (!product) return (
    <div className="text-center py-24">
      <p className="font-mono-custom text-sm" style={{ color: 'var(--text-muted)' }}>PRODUCT NOT FOUND</p>
      <button onClick={() => navigate('/products')} className="btn-neon text-xs tracking-widest mt-4">← BACK</button>
    </div>
  )

  const accent   = CATEGORY_COLORS[product.category] || '#00ffe5'
  const stars    = Math.round(product.rating.rate)
  const allImgs  = product.images && product.images.length > 0 ? product.images : [product.image]

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 anim-fade-in">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-10">
        <button onClick={() => navigate('/')} className="font-mono-custom text-xs hover:text-neon transition-colors tracking-wider" style={{ color: 'var(--text-dim)' }}>HOME</button>
        <span style={{ color: 'var(--text-dim)' }}>/</span>
        <button onClick={() => navigate('/products')} className="font-mono-custom text-xs hover:text-neon transition-colors tracking-wider" style={{ color: 'var(--text-dim)' }}>SHOP</button>
        <span style={{ color: 'var(--text-dim)' }}>/</span>
        <span className="font-mono-custom text-xs text-neon tracking-wider truncate max-w-xs">{product.title.toUpperCase().slice(0, 35)}…</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image gallery */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative volt-card overflow-hidden" style={{ minHeight: 360 }}>
            <div style={{ position: 'absolute', inset: 0, background: accent, opacity: 0.04 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${accent},transparent)` }} />

            {!imgLoaded && <div className="skeleton absolute inset-0" style={{ borderRadius: 12 }} />}

            {!imgError ? (
              <img
                src={allImgs[activeImg]}
                alt={product.title}
                onLoad={() => setImgLoaded(true)}
                onError={() => { setImgError(true); setImgLoaded(true) }}
                className="w-full object-cover relative z-10"
                style={{ height: 360, opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
              />
            ) : (
              <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3" style={{ minHeight: 360 }}>
                <div style={{ width: 80, height: 80, background: accent + '20', border: `2px solid ${accent}40`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: accent, fontSize: 36, fontWeight: 'bold' }}>{product.title.charAt(0)}</span>
                </div>
                <span className="font-mono-custom text-xs tracking-wider" style={{ color: 'var(--text-dim)' }}>
                  {product.brand || product.category.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {allImgs.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImgs.slice(0, 5).map((img, i) => (
                <button key={i} onClick={() => { setActiveImg(i); setImgLoaded(false) }}
                  style={{ border: `2px solid ${activeImg === i ? accent : 'var(--card-border)'}`, borderRadius: 8, overflow: 'hidden', flexShrink: 0, width: 60, height: 60 }}>
                  <img src={img} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-5">
          {product.brand && (
            <span style={{ color: accent }} className="font-display text-xs tracking-widest font-bold">{product.brand.toUpperCase()}</span>
          )}
          <span className="volt-tag block w-fit" style={{ color: accent, borderColor: accent + '40', background: accent + '12' }}>
            {product.category.toUpperCase()}
          </span>

          <h1 className="font-display font-bold text-2xl leading-tight" style={{ letterSpacing: '-0.01em', color: 'var(--text)' }}>
            {product.title}
          </h1>

          {/* Stars */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ color: s <= stars ? '#fbbf24' : 'var(--text-dim)', fontSize: 18 }}>★</span>
              ))}
            </div>
            <span className="font-mono-custom text-xs" style={{ color: 'var(--text-muted)' }}>{product.rating.rate} / 5</span>
            <span className="font-mono-custom text-xs" style={{ color: 'var(--text-dim)' }}>({product.rating.count} reviews)</span>
          </div>

          {/* Price in ₹ */}
          <div>
            <span style={{ color: 'var(--neon)', textShadow: '0 0 20px color-mix(in srgb, var(--neon) 40%, transparent)' }}
              className="font-display font-bold text-4xl">
              {formatPrice(product.price)}
            </span>
            <p className="font-mono-custom text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
              Inclusive of all taxes • Free delivery
            </p>
          </div>

          {/* Description */}
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, borderTop: '1px solid var(--divider)', borderBottom: '1px solid var(--divider)', paddingTop: 16, paddingBottom: 16 }}
            className="font-body text-sm">
            {product.description}
          </p>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            <span className="font-mono-custom text-xs text-green-400 tracking-wider">IN STOCK — SHIPS IN 24H</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button onClick={() => { dispatch(addToCart(product)); navigate('/cart') }}
              className="flex-1 btn-neon-solid font-display text-xs tracking-widest py-4">
              ADD TO CART & CHECKOUT
            </button>
            <button onClick={() => dispatch(addToCart(product))}
              className="btn-neon font-display text-xs tracking-widest px-5 py-4">
              + CART
            </button>
          </div>

          <button onClick={() => navigate('/products')}
            className="font-mono-custom text-xs hover:text-neon transition-colors tracking-wider w-full text-center"
            style={{ color: 'var(--text-dim)' }}>
            ← CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  )
}
