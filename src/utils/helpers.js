export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

export const truncate = (str, n = 60) =>
  str && str.length > n ? str.slice(0, n) + '…' : str

export const getFilteredProducts = (products, filter) => {
  if (!products || products.length === 0) return []

  let result = [...products]

  // 1. Search
  const q = filter.searchQuery ? filter.searchQuery.trim().toLowerCase() : ''
  if (q) {
    result = result.filter(p =>
      (p.title       && p.title.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.category    && p.category.toLowerCase().includes(q)) ||
      (p.brand       && p.brand.toLowerCase().includes(q))
    )
  }

  // 2. Category — EXACT match, 'all' shows everything
  if (filter.category && filter.category !== 'all') {
    result = result.filter(p => p.category === filter.category)
  }

  // 3. Price — only filter if user actually moved sliders (maxPrice < default)
  if (filter.maxPrice < 500000) {
    result = result.filter(p => p.price >= filter.minPrice && p.price <= filter.maxPrice)
  } else if (filter.minPrice > 0) {
    result = result.filter(p => p.price >= filter.minPrice)
  }

  // 4. Rating
  if (filter.minRating > 0) {
    result = result.filter(p => p.rating && p.rating.rate >= filter.minRating)
  }

  // 5. Sort
  if (filter.sortBy === 'price_asc')   result.sort((a, b) => a.price - b.price)
  if (filter.sortBy === 'price_desc')  result.sort((a, b) => b.price - a.price)
  if (filter.sortBy === 'rating_desc') result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))

  return result
}

export const paginateProducts = (products, page, perPage) => {
  const start = (page - 1) * perPage
  return products.slice(start, start + perPage)
}

export const validators = {
  required:   v => (v && v.trim() ? null : 'This field is required'),
  email:      v => (/\S+@\S+\.\S+/.test(v) ? null : 'Enter a valid email'),
  phone:      v => (/^\d{10}$/.test(v) ? null : 'Enter a valid 10-digit phone number'),
  pincode:    v => (/^\d{6}$/.test(v) ? null : 'Enter a valid 6-digit PIN code'),
  cardNumber: v => (/^\d{16}$/.test(v.replace(/\s/g, '')) ? null : 'Enter a valid 16-digit card number'),
  expiry:     v => (/^(0[1-9]|1[0-2])\/\d{2}$/.test(v) ? null : 'Format: MM/YY'),
  cvv:        v => (/^\d{3,4}$/.test(v) ? null : 'Enter a valid CVV'),
}
