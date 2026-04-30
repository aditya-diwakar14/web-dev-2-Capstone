import { createSlice } from '@reduxjs/toolkit'

const savedTheme = localStorage.getItem('volt_theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark

// apply on load before first render
if (initialDark) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { isDark: initialDark },
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark
      if (state.isDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('volt_theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('volt_theme', 'light')
      }
    },
    setDark(state) {
      state.isDark = true
      document.documentElement.classList.add('dark')
      localStorage.setItem('volt_theme', 'dark')
    },
    setLight(state) {
      state.isDark = false
      document.documentElement.classList.remove('dark')
      localStorage.setItem('volt_theme', 'light')
    },
  },
})

export const { toggleTheme, setDark, setLight } = themeSlice.actions
export const selectIsDark = s => s.theme.isDark
export default themeSlice.reducer
