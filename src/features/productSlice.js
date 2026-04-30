import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, fetchProductById, fetchCategories } from '../api/productApi'

export const loadProducts = createAsyncThunk('products/loadAll', fetchProducts)
export const loadProductById = createAsyncThunk('products/loadOne', fetchProductById)
export const loadCategories = createAsyncThunk('products/loadCategories', fetchCategories)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items:        [],
    selected:     null,
    categories:   [],
    status:       'idle',   // idle | loading | succeeded | failed
    detailStatus: 'idle',
    error:        null,
  },
  reducers: {
    clearSelected(state) { state.selected = null },
  },
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending,   s => { s.status = 'loading'; s.error = null })
      .addCase(loadProducts.fulfilled, (s, a) => {
        s.status = 'succeeded'
        s.items  = a.payload
        // Auto-derive categories from fetched products
        const cats = [...new Set(a.payload.map(p => p.category))].filter(Boolean)
        if (cats.length && s.categories.length === 0) s.categories = cats
      })
      .addCase(loadProducts.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message })

      .addCase(loadProductById.pending,   s => { s.detailStatus = 'loading' })
      .addCase(loadProductById.fulfilled, (s, a) => { s.detailStatus = 'succeeded'; s.selected = a.payload })
      .addCase(loadProductById.rejected,  s => { s.detailStatus = 'failed' })

      .addCase(loadCategories.fulfilled, (s, a) => { s.categories = a.payload })
  },
})

export const { clearSelected } = productSlice.actions
export const selectAllProducts     = s => s.products.items
export const selectProductStatus   = s => s.products.status
export const selectProductError    = s => s.products.error
export const selectSelectedProduct = s => s.products.selected
export const selectDetailStatus    = s => s.products.detailStatus
export const selectCategories      = s => s.products.categories
export default productSlice.reducer
