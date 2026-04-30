import { useDispatch, useSelector } from 'react-redux'
import {
  setCategory, setMinPrice, setMaxPrice,
  setMinRating, setSortBy, resetFilters, selectFilter
} from '../features/filterSlice'
import { selectCategories } from '../features/productSlice'
import { formatPrice } from '../utils/helpers'

const CATEGORY_ICONS = {
  smartphones: '📱',
  laptops:     '💻',
  audio:       '🎧',
  cameras:     '📷',
  accessories: '⌚',
  gaming:      '🎮',
}

export default function FilterSidebar({ onClose }) {
  const dispatch   = useDispatch()
  const filter     = useSelector(selectFilter)
  const categories = useSelector(selectCategories)

  function handleReset() {
    dispatch(resetFilters())
    if (onClose) onClose()
  }

  return (
    <aside className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono-custom text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>
          FILTERS
        </span>
        <button onClick={handleReset} className="font-mono-custom text-xs tracking-wider text-neon hover:underline">
          RESET ALL
        </button>
      </div>

      {/* Sort */}
      <div>
        <p className="font-mono-custom text-xs tracking-widest mb-2" style={{ color: 'var(--text-dim)' }}>SORT BY</p>
        <select value={filter.sortBy} onChange={e => dispatch(setSortBy(e.target.value))}>
          <option value="default">Default</option>
          <option value="price_asc">Price ↑ Low to High</option>
          <option value="price_desc">Price ↓ High to Low</option>
          <option value="rating_desc">⭐ Top Rated</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <p className="font-mono-custom text-xs tracking-widest mb-2" style={{ color: 'var(--text-dim)' }}>CATEGORY</p>
        <div className="space-y-1">

          {/* All */}
          <button
            onClick={() => dispatch(setCategory('all'))}
            style={filter.category === 'all'
              ? { background: 'var(--neon-dim)', border: '1px solid var(--card-hover)', color: 'var(--neon)' }
              : { border: '1px solid transparent', color: 'var(--text-muted)' }}
            className="w-full text-left text-sm px-3 py-2 rounded-lg transition-all hover:text-neon font-body"
          >
            🌐 All Categories
          </button>

          {/* Dynamic categories from API */}
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              style={filter.category === cat
                ? { background: 'var(--neon-dim)', border: '1px solid var(--card-hover)', color: 'var(--neon)' }
                : { border: '1px solid transparent', color: 'var(--text-muted)' }}
              className="w-full text-left text-sm px-3 py-2 rounded-lg transition-all hover:text-neon font-body capitalize flex items-center gap-2"
            >
              <span>{CATEGORY_ICONS[cat] || '🔌'}</span>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <p className="font-mono-custom text-xs tracking-widest mb-1" style={{ color: 'var(--text-dim)' }}>PRICE RANGE</p>
        <p className="font-mono-custom text-xs text-neon mb-3">
          {formatPrice(filter.minPrice)} – {formatPrice(filter.maxPrice)}
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-xs block mb-1" style={{ color: 'var(--text-dim)' }}>Min Price</label>
            <input
              type="range" min={0} max={500000} step={5000}
              value={filter.minPrice}
              onChange={e => dispatch(setMinPrice(Number(e.target.value)))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs block mb-1" style={{ color: 'var(--text-dim)' }}>Max Price</label>
            <input
              type="range" min={0} max={500000} step={5000}
              value={filter.maxPrice}
              onChange={e => dispatch(setMaxPrice(Number(e.target.value)))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <p className="font-mono-custom text-xs tracking-widest mb-2" style={{ color: 'var(--text-dim)' }}>MIN RATING</p>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map(r => (
            <button
              key={r}
              onClick={() => dispatch(setMinRating(r))}
              style={filter.minRating === r
                ? { background: 'var(--neon)', color: '#0a0f1a', border: '1px solid var(--neon)' }
                : { border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}
              className="flex-1 text-xs py-2 rounded-lg font-semibold transition-all font-mono-custom"
            >
              {r === 0 ? 'ALL' : `${r}★`}
            </button>
          ))}
        </div>
      </div>

    </aside>
  )
}
