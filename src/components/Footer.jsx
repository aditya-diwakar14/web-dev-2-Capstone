import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--divider)', background: 'var(--footer-bg)' }} className="mt-24 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div style={{ background: 'linear-gradient(135deg, var(--neon), #0d9488)', boxShadow: '0 0 16px color-mix(in srgb, var(--neon) 30%, transparent)' }}
              className="w-7 h-7 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" style={{ color: '#0a0f1a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-display font-bold tracking-widest text-white">VOLT</span>
            <span className="font-mono-custom text-xs" style={{ color: '#475569' }}>ELECTRONICS</span>
          </div>
          <p className="font-mono-custom text-xs tracking-wider" style={{ color: '#475569' }}>© 2024 VOLT ELECTRONICS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            {[['/','HOME'],['/products','SHOP'],['/cart','CART']].map(([href, label]) => (
              <Link key={href} to={href}
                className="font-mono-custom text-xs tracking-widest hover:text-neon transition-colors"
                style={{ color: '#64748b' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
