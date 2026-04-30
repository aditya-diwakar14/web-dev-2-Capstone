import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadProducts, loadCategories,
  selectAllProducts, selectProductStatus, selectProductError
} from '../features/productSlice'
import { setSearchQuery, selectFilter } from '../features/filterSlice'
import { useDebounce } from '../hooks/useDebounce'
import { getFilteredProducts, paginateProducts } from '../utils/helpers'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'
import Pagination from '../components/Pagination'
import { ProductCardSkeleton } from '../components/Skeleton'

export default function Products() {
  const dispatch  = useDispatch()
  const products  = useSelector(selectAllProducts)
  const status    = useSelector(selectProductStatus)
  const error     = useSelector(selectProductError)
  const filter    = useSelector(selectFilter)

  const [inputValue, setInputValue]       = useState(filter.searchQuery)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const debouncedSearch = useDebounce(inputValue, 300)

  // Fetch on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadProducts())
      dispatch(loadCategories())
    }
  }, [dispatch, status])

  // Dispatch debounced search to Redux
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch))
  }, [debouncedSearch, dispatch])

  // Apply filters
  const filtered  = useMemo(() => getFilteredProducts(products, filter), [products, filter])
  const paginated = useMemo(
    () => paginateProducts(filtered, filter.page, filter.perPage),
    [filtered, filter.page, filter.perPage]
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 anim-fade-in">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div style={{ width: 20, height: 1, background: 'var(--neon)' }} />
          <span className="font-mono-custom text-xs tracking-widest text-neon">PRODUCT CATALOG</span>
        </div>
        <h1 className="font-display font-bold text-3xl" style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}>
          ALL ELECTRONICS
        </h1>
        <p className="font-mono-custom text-xs mt-2 tracking-wider" style={{ color: 'var(--text-muted)' }}>
          {status === 'loading' ? 'LOADING…' : `${filtered.length} PRODUCTS FOUND`}
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-dim)' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search products… (debounced 300ms)"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          style={{ paddingLeft: 44, paddingRight: inputValue ? 40 : 16 }}
        />
        {inputValue && (
          <button
            onClick={() => { setInputValue(''); dispatch(setSearchQuery('')) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl transition-colors hover:text-neon"
            style={{ color: 'var(--text-dim)' }}
          >×</button>
        )}
      </div>

      {/* Mobile filter button */}
      <button
        onClick={() => setShowMobileFilter(true)}
        className="md:hidden btn-neon text-xs tracking-widest mb-5 flex items-center gap-2"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 4h18M7 8h10M11 12h2" />
        </svg>
        FILTERS &amp; SORT
      </button>

      {/* Mobile filter drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60" onClick={() => setShowMobileFilter(false)} />
          <div
            style={{ background: 'var(--bg2)', borderLeft: '1px solid var(--divider)', width: 300 }}
            className="h-full overflow-y-auto p-5"
          >
            <button
              onClick={() => setShowMobileFilter(false)}
              className="font-mono-custom text-xs text-neon mb-6 block tracking-wider"
            >
              ✕ CLOSE
            </button>
            <FilterSidebar onClose={() => setShowMobileFilter(false)} />
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="flex gap-8">

        {/* Desktop sidebar */}
        <div className="hidden md:block w-56 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Product grid area */}
        <div className="flex-1 min-w-0">

          {/* Loading skeletons */}
          {status === 'loading' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array(6).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          )}

          {/* API Error */}
          {status === 'failed' && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">⚠️</p>
              <p className="font-display text-lg mb-2" style={{ color: 'var(--text)' }}>FAILED TO LOAD</p>
              <p className="font-mono-custom text-xs tracking-wider mb-6" style={{ color: 'var(--text-muted)' }}>
                {error}
              </p>
              <button
                onClick={() => dispatch(loadProducts())}
                className="btn-neon text-xs tracking-widest"
              >
                RETRY
              </button>
            </div>
          )}

          {/* No results */}
          {status === 'succeeded' && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-display text-lg mb-2" style={{ color: 'var(--text)' }}>NO PRODUCTS FOUND</p>
              <p className="font-mono-custom text-xs tracking-wider mb-6" style={{ color: 'var(--text-muted)' }}>
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setInputValue('')
                  dispatch(setSearchQuery(''))
                  // Reset all filters via the reset button in sidebar, or import resetFilters
                  window.location.reload()
                }}
                className="btn-neon text-xs tracking-widest"
              >
                CLEAR FILTERS
              </button>
            </div>
          )}

          {/* Products grid */}
          {status === 'succeeded' && paginated.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginated.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
              <Pagination totalItems={filtered.length} />
            </>
          )}

        </div>
      </div>
    </div>
  )
}
