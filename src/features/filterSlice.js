import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    searchQuery: '',
    category:    'all',
    minPrice:    0,
    maxPrice:    500000,
    minRating:   0,
    sortBy:      'default',
    page:        1,
    perPage:     8,
  },
  reducers: {
    setSearchQuery(s, a) { s.searchQuery = a.payload; s.page = 1 },
    setCategory(s, a)    { s.category    = a.payload; s.page = 1 },
    setMinPrice(s, a)    { s.minPrice    = a.payload; s.page = 1 },
    setMaxPrice(s, a)    { s.maxPrice    = a.payload; s.page = 1 },
    setMinRating(s, a)   { s.minRating   = a.payload; s.page = 1 },
    setSortBy(s, a)      { s.sortBy      = a.payload; s.page = 1 },
    setPage(s, a)        { s.page        = a.payload },
    resetFilters(s) {
      s.searchQuery = ''
      s.category    = 'all'
      s.minPrice    = 0
      s.maxPrice    = 500000
      s.minRating   = 0
      s.sortBy      = 'default'
      s.page        = 1
    },
  },
})

export const {
  setSearchQuery, setCategory, setMinPrice, setMaxPrice,
  setMinRating, setSortBy, setPage, resetFilters,
} = filterSlice.actions

export const selectFilter = s => s.filter
export default filterSlice.reducer
