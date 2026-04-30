import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

const Home          = lazy(() => import('./pages/Home'))
const Products      = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart          = lazy(() => import('./pages/Cart'))
const Checkout      = lazy(() => import('./pages/Checkout'))
const OrderSuccess  = lazy(() => import('./pages/OrderSuccess'))
const NotFound      = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="flex items-center gap-3">
        <div style={{
          width:20, height:20,
          border:'2px solid var(--neon-dim)',
          borderTopColor:'var(--neon)',
          borderRadius:'50%'
        }} className="animate-spin" />
        <span className="font-mono-custom text-xs tracking-widest" style={{ color:'var(--text-dim)' }}>LOADING…</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* background synced to CSS var */}
      <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', transition:'background 0.3s ease, color 0.3s ease' }}>
        <Navbar />
        <main>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"              element={<Home />} />
                <Route path="/products"      element={<Products />} />
                <Route path="/products/:id"  element={<ProductDetail />} />
                <Route path="/cart"          element={<Cart />} />
                <Route path="/checkout"      element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="*"             element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
