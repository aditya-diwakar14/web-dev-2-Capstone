import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '../features/cartSlice'
import { formatPrice } from '../utils/helpers'

export default function Cart() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const items     = useSelector(selectCartItems)
  const total     = useSelector(selectCartTotal)

  if (items.length === 0) return (
    <div className="max-w-xl mx-auto px-6 py-28 text-center anim-fade-in">
      <p className="text-6xl mb-6">🛒</p>
      <h2 className="font-display font-bold text-2xl mb-3" style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}>CART IS EMPTY</h2>
      <p className="font-mono-custom text-xs tracking-wider mb-8" style={{ color: 'var(--text-muted)' }}>Add some gadgets to get started</p>
      <Link to="/products" className="btn-neon-solid font-display text-xs tracking-widest">BROWSE PRODUCTS →</Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 anim-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div style={{ width: 20, height: 1, background: 'var(--neon)' }} />
        <span className="font-mono-custom text-xs tracking-widest text-neon">SHOPPING CART</span>
      </div>
      <h1 className="font-display font-bold text-3xl mb-8" style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}>
        YOUR CART <span style={{ color: 'var(--neon)' }}>({items.length})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="volt-card p-4 flex gap-4">
              <div style={{ width: 80, height: 80, background: 'var(--bg2)', borderRadius: 10, flexShrink: 0, overflow: 'hidden' }}>
                <img src={item.image} alt={item.title}
                  onError={e => { e.target.style.display='none' }}
                  className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`}
                  className="font-body font-semibold text-sm hover:text-neon transition-colors line-clamp-2 block mb-1"
                  style={{ color: 'var(--text)' }}>
                  {item.title}
                </Link>
                {item.brand && (
                  <span className="font-mono-custom text-xs tracking-wider" style={{ color: 'var(--text-dim)' }}>{item.brand}</span>
                )}
                <div className="flex items-center justify-between mt-3">
                  {/* Qty controls */}
                  <div className="flex items-center gap-2"
                    style={{ background: 'var(--bg2)', borderRadius: 8, padding: '4px 8px', border: '1px solid var(--divider)' }}>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      className="hover:text-neon font-bold text-lg w-6 h-6 flex items-center justify-center transition-colors"
                      style={{ color: 'var(--text-muted)' }}>−</button>
                    <span className="font-mono-custom text-sm w-5 text-center" style={{ color: 'var(--text)' }}>{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="hover:text-neon font-bold text-lg w-6 h-6 flex items-center justify-center transition-colors"
                      style={{ color: 'var(--text-muted)' }}>+</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display font-bold text-neon">{formatPrice(item.price * item.quantity)}</span>
                    <button onClick={() => dispatch(removeFromCart(item.id))}
                      className="font-mono-custom text-xs tracking-wider hover:text-red-400 transition-colors"
                      style={{ color: 'var(--text-dim)' }}>REMOVE</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="volt-card p-6 sticky top-24">
            <p className="font-mono-custom text-xs tracking-widest text-neon mb-5">ORDER SUMMARY</p>
            <div className="space-y-2 mb-5">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="truncate max-w-36" style={{ color: 'var(--text-muted)' }}>
                    {item.title.slice(0, 22)}… ×{item.quantity}
                  </span>
                  <span className="font-mono-custom ml-2 flex-shrink-0" style={{ color: 'var(--text)' }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--divider)' }} className="pt-4 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>TOTAL</span>
                <span className="font-display font-bold text-2xl text-neon">{formatPrice(total)}</span>
              </div>
              <p className="font-mono-custom text-xs mt-1 tracking-wider" style={{ color: 'var(--text-dim)' }}>
                Incl. taxes • FREE delivery
              </p>
            </div>
            <button onClick={() => navigate('/checkout')} className="btn-neon-solid w-full font-display text-xs tracking-widest py-4">
              PROCEED TO CHECKOUT →
            </button>
            <Link to="/products" className="block text-center font-mono-custom text-xs hover:text-neon transition-colors mt-4 tracking-wider"
              style={{ color: 'var(--text-dim)' }}>
              ← CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
