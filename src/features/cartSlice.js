import { createSlice } from '@reduxjs/toolkit'

const loadCart = () => {
  try {
    const saved = localStorage.getItem('volt_cart')
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}
const saveCart = items => {
  try { localStorage.setItem('volt_cart', JSON.stringify(items)) } catch {}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: loadCart() },
  reducers: {
    addToCart(state, action) {
      const p = action.payload
      const existing = state.items.find(i => i.id === p.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: p.id, title: p.title, price: p.price,
          image: p.image, images: p.images, category: p.category,
          brand: p.brand || '', quantity: 1
        })
      }
      saveCart(state.items)
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
      saveCart(state.items)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) state.items = state.items.filter(i => i.id !== id)
      }
      saveCart(state.items)
    },
    clearCart(state) {
      state.items = []
      saveCart([])
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export const selectCartItems = s => s.cart.items
export const selectCartCount = s => s.cart.items.reduce((a, i) => a + i.quantity, 0)
export const selectCartTotal = s => s.cart.items.reduce((a, i) => a + i.price * i.quantity, 0)
export default cartSlice.reducer
