import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-28 text-center anim-fade-in">
      <div className="font-display font-black text-8xl text-neon glow mb-4" style={{ letterSpacing:'-0.04em' }}>404</div>
      <h1 className="font-display font-bold text-2xl text-white mb-3" style={{ letterSpacing:'-0.02em' }}>SIGNAL LOST</h1>
      <p style={{ color:'#64748b' }} className="font-mono-custom text-xs tracking-wider mb-8">THE PAGE YOU REQUESTED DOES NOT EXIST</p>
      <Link to="/" className="btn-neon-solid font-display text-xs tracking-widest">← RETURN HOME</Link>
    </div>
  )
}
