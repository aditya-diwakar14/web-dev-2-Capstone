import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  const orderId = `VLT-${Math.floor(100000 + Math.random() * 900000)}`
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center anim-fade-in">
      <div style={{ width:96, height:96, background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:24, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
        <svg style={{ width:48, height:48, color:'#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="volt-tag">ORDER CONFIRMED</span>
      <h1 className="font-display font-bold text-3xl text-white mt-4 mb-3" style={{ letterSpacing:'-0.02em' }}>ORDER PLACED!</h1>
      <p style={{ color:'#64748b' }} className="font-body mb-2">Thank you for shopping at <span style={{ color:'#00ffe5' }}>VOLT</span></p>
      <p className="font-mono-custom text-xs text-slate-600 mb-8 tracking-wider">ORDER ID: <span style={{ color:'#e2e8f0' }}>{orderId}</span></p>
      <div className="volt-card p-6 mb-8 text-left space-y-3">
        {[['📦','Order confirmed and processing'],['🚚','Estimated delivery: 1–3 business days'],['📧','Confirmation sent to your email']].map(([icon,text])=>(
          <div key={text} className="flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <span style={{ color:'#94a3b8' }} className="font-body text-sm">{text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3 justify-center">
        <Link to="/products" className="btn-neon-solid font-display text-xs tracking-widest">CONTINUE SHOPPING →</Link>
        <Link to="/" className="btn-neon font-display text-xs tracking-widest">HOME</Link>
      </div>
    </div>
  )
}
