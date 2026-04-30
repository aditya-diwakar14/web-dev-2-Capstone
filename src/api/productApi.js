import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
})

const USD_TO_INR = 83.5

// EXACT dummyjson category names → our app category names
const CAT_MAP = {
  'smartphones':        'smartphones',
  'tablets':            'smartphones',
  'laptops':            'laptops',
  'mobile-accessories': 'accessories',
  'mens-watches':       'accessories',
  'womens-watches':     'accessories',
}

// These are the EXACT category slugs that exist in dummyjson
const FETCH_CATS = [
  'smartphones',
  'laptops',
  'tablets',
  'mobile-accessories',
  'mens-watches',
  'womens-watches',
]

function mapProduct(p) {
  return {
    id:          p.id,
    title:       p.title,
    price:       Math.round((p.price || 10) * USD_TO_INR),
    description: p.description || '',
    category:    CAT_MAP[p.category] || 'accessories',
    image:       p.thumbnail || `https://cdn.dummyjson.com/product-images/${p.id}/thumbnail.png`,
    images:      Array.isArray(p.images) && p.images.length ? p.images : [p.thumbnail],
    brand:       p.brand || '',
    rating: {
      rate:  typeof p.rating === 'number' ? parseFloat(p.rating.toFixed(1)) : 4.0,
      count: p.stock ? p.stock * 20 : 150,
    },
  }
}

export const fetchProducts = async () => {
  try {
    // Fetch all products from each relevant category in parallel
    const requests = FETCH_CATS.map(cat =>
      api.get(`/products/category/${cat}?limit=10&select=id,title,price,description,category,thumbnail,images,brand,rating,stock`)
         .then(r => r.data.products || [])
         .catch(() => [])   // if one category fails, return empty not crash
    )

    const results = await Promise.all(requests)
    const all = results.flat()

    // deduplicate by id
    const seen = new Set()
    const unique = all.filter(p => {
      if (seen.has(p.id)) return false
      seen.add(p.id)
      return true
    })

    return unique.map(mapProduct)
  } catch (err) {
    console.error('fetchProducts failed:', err)
    return FALLBACK_PRODUCTS
  }
}

export const fetchProductById = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`)
    return mapProduct(data)
  } catch {
    return FALLBACK_PRODUCTS.find(p => p.id === Number(id)) || FALLBACK_PRODUCTS[0]
  }
}

export const fetchCategories = async () => {
  return ['smartphones', 'laptops', 'accessories']
}

// ── FALLBACK DATA (shown if API is completely unreachable) ──────────────────
// Images from cdn.dummyjson.com which is a separate CDN (no auth needed)
const FALLBACK_PRODUCTS = [
  {
    id: 1, title: 'iPhone 9', brand: 'Apple',
    price: Math.round(549 * USD_TO_INR), category: 'smartphones',
    image: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
    images: ['https://cdn.dummyjson.com/product-images/2/thumbnail.jpg'],
    description: 'An apple mobile which is nothing like apple. 16MP front/16MP back.',
    rating: { rate: 4.5, count: 400 },
  },
  {
    id: 2, title: 'Samsung Galaxy S21', brand: 'Samsung',
    price: Math.round(699 * USD_TO_INR), category: 'smartphones',
    image: 'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg',
    images: ['https://cdn.dummyjson.com/product-images/3/thumbnail.jpg'],
    description: 'Super smooth 120Hz, 5G ready, 64MP camera system.',
    rating: { rate: 4.7, count: 600 },
  },
  {
    id: 5, title: 'MacBook Pro', brand: 'Apple',
    price: Math.round(1749 * USD_TO_INR), category: 'laptops',
    image: 'https://cdn.dummyjson.com/product-images/6/thumbnail.png',
    images: ['https://cdn.dummyjson.com/product-images/6/thumbnail.png'],
    description: 'MacBook Pro 2021 with mini-LED display may have 14 and 16 Inch variants.',
    rating: { rate: 4.8, count: 850 },
  },
]
