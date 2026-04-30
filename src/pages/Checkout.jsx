import { formatPrice } from '../utils/helpers'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCartItems, selectCartTotal, clearCart } from '../features/cartSlice'
import { validators } from '../utils/helpers'

const STEPS = ['SHIPPING', 'PAYMENT', 'REVIEW']

const Field = ({ label, name, value, onChange, placeholder, type='text', error, half=false }) => (
  <div className={half ? 'flex-1' : 'w-full'}>
    <label className="font-mono-custom text-xs tracking-widest text-slate-500 block mb-1.5">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
      style={{ borderColor: error ? '#ef4444' : undefined }} />
    {error && <p className="font-mono-custom text-xs text-red-400 mt-1 tracking-wider">{error}</p>}
  </div>
)

export default function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [shipping, setShipping] = useState({ fullName:'', email:'', phone:'', address:'', city:'', state:'', pincode:'' })
  const [payment, setPayment] = useState({ cardNumber:'', expiry:'', cvv:'', nameOnCard:'' })

  if (items.length === 0) { navigate('/cart'); return null }

  const handleShipping = e => { setShipping(p => ({...p,[e.target.name]:e.target.value})); setErrors(p=>({...p,[e.target.name]:null})) }
  const handlePayment = e => {
    let val = e.target.value
    if (e.target.name==='cardNumber') val = val.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
    if (e.target.name==='expiry') { val=val.replace(/\D/g,'').slice(0,4); if(val.length>=3) val=val.slice(0,2)+'/'+val.slice(2) }
    if (e.target.name==='cvv') val=val.replace(/\D/g,'').slice(0,4)
    setPayment(p=>({...p,[e.target.name]:val})); setErrors(p=>({...p,[e.target.name]:null}))
  }

  const validateShipping = () => {
    const e = {}
    if(validators.required(shipping.fullName)) e.fullName=validators.required(shipping.fullName)
    if(validators.email(shipping.email)) e.email=validators.email(shipping.email)
    if(validators.phone(shipping.phone)) e.phone=validators.phone(shipping.phone)
    if(validators.required(shipping.address)) e.address=validators.required(shipping.address)
    if(validators.required(shipping.city)) e.city=validators.required(shipping.city)
    if(validators.required(shipping.state)) e.state=validators.required(shipping.state)
    if(validators.pincode(shipping.pincode)) e.pincode=validators.pincode(shipping.pincode)
    return e
  }
  const validatePayment = () => {
    const e = {}
    const raw = payment.cardNumber.replace(/\s/g,'')
    if(validators.cardNumber(raw)) e.cardNumber=validators.cardNumber(raw)
    if(validators.expiry(payment.expiry)) e.expiry=validators.expiry(payment.expiry)
    if(validators.cvv(payment.cvv)) e.cvv=validators.cvv(payment.cvv)
    if(validators.required(payment.nameOnCard)) e.nameOnCard=validators.required(payment.nameOnCard)
    return e
  }

  const handleNext = () => {
    const e = step===0 ? validateShipping() : step===1 ? validatePayment() : {}
    if(Object.keys(e).length) { setErrors(e); return }
    setErrors({}); setStep(s=>s+1)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 anim-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div style={{ width:20, height:1, background:'#00ffe5' }} />
        <span className="font-mono-custom text-xs tracking-widest text-neon">SECURE CHECKOUT</span>
      </div>
      <h1 className="font-display font-bold text-3xl text-white mb-8" style={{ letterSpacing:'-0.02em' }}>CHECKOUT</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div style={i<step ? {background:'#00ffe5',border:'1px solid #00ffe5',color:'#0a0f1a'} : i===step ? {border:'1px solid #00ffe5',color:'#00ffe5',background:'rgba(0,255,229,0.06)'} : {border:'1px solid rgba(0,255,229,0.15)',color:'var(--text-dim)'}}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-mono-custom text-xs font-bold">
                {i<step ? '✓' : i+1}
              </div>
              <span style={i<=step?{color:'#00ffe5'}:{color:'var(--text-dim)'}} className="font-mono-custom text-xs tracking-widest hidden sm:block">{s}</span>
            </div>
            {i<STEPS.length-1 && (
              <div className="flex-1 mx-3 h-px" style={{ background:'var(--divider)', overflow:'hidden' }}>
                <div style={{ width:i<step?'100%':'0%', height:'100%', background:'#00ffe5', transition:'width 0.5s ease' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 volt-card p-6">

          {step===0 && (
            <div className="space-y-4 anim-slide-up">
              <p className="font-mono-custom text-xs tracking-widest text-neon mb-5">SHIPPING ADDRESS</p>
              <Field label="FULL NAME" name="fullName" value={shipping.fullName} onChange={handleShipping} placeholder="John Doe" error={errors.fullName} />
              <div className="flex gap-4">
                <Field label="EMAIL" name="email" value={shipping.email} onChange={handleShipping} placeholder="john@example.com" error={errors.email} half />
                <Field label="PHONE" name="phone" value={shipping.phone} onChange={handleShipping} placeholder="10-digit" error={errors.phone} half />
              </div>
              <Field label="STREET ADDRESS" name="address" value={shipping.address} onChange={handleShipping} placeholder="123 Tech Street" error={errors.address} />
              <div className="flex gap-4">
                <Field label="CITY" name="city" value={shipping.city} onChange={handleShipping} placeholder="Mumbai" error={errors.city} half />
                <Field label="STATE" name="state" value={shipping.state} onChange={handleShipping} placeholder="Maharashtra" error={errors.state} half />
              </div>
              <Field label="PIN CODE" name="pincode" value={shipping.pincode} onChange={handleShipping} placeholder="400001" error={errors.pincode} />
            </div>
          )}

          {step===1 && (
            <div className="space-y-4 anim-slide-up">
              <p className="font-mono-custom text-xs tracking-widest text-neon mb-5">PAYMENT DETAILS</p>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="font-mono-custom text-xs text-slate-500 tracking-wider">DEMO — NO REAL PAYMENT PROCESSED</span>
              </div>
              <Field label="CARD NUMBER" name="cardNumber" value={payment.cardNumber} onChange={handlePayment} placeholder="1234 5678 9012 3456" error={errors.cardNumber} />
              <Field label="NAME ON CARD" name="nameOnCard" value={payment.nameOnCard} onChange={handlePayment} placeholder="John Doe" error={errors.nameOnCard} />
              <div className="flex gap-4">
                <Field label="EXPIRY (MM/YY)" name="expiry" value={payment.expiry} onChange={handlePayment} placeholder="12/26" error={errors.expiry} half />
                <Field label="CVV" name="cvv" value={payment.cvv} onChange={handlePayment} placeholder="123" type="password" error={errors.cvv} half />
              </div>
            </div>
          )}

          {step===2 && (
            <div className="anim-slide-up">
              <p className="font-mono-custom text-xs tracking-widest text-neon mb-5">REVIEW ORDER</p>
              {[
                { icon:'📦', title:'SHIPPING TO', content:`${shipping.fullName} · ${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.pincode} · ${shipping.phone}` },
                { icon:'💳', title:'PAYMENT', content:`Card ending in ${payment.cardNumber.slice(-4)} · ${payment.nameOnCard}` },
              ].map(s => (
                <div key={s.title} className="mb-4 p-4 rounded-xl" style={{ background:'var(--bg2)', border:'1px solid rgba(0,255,229,0.08)' }}>
                  <p className="font-mono-custom text-xs tracking-widest text-slate-400 mb-2">{s.icon} {s.title}</p>
                  <p style={{ color:'var(--text-muted)' }} className="font-body text-sm">{s.content}</p>
                </div>
              ))}
              <div className="p-4 rounded-xl" style={{ background:'var(--bg2)', border:'1px solid rgba(0,255,229,0.08)' }}>
                <p className="font-mono-custom text-xs tracking-widest text-slate-400 mb-3">🛒 ITEMS</p>
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm mb-1">
                    <span style={{ color:'var(--text-muted)' }}>{item.title.slice(0,35)}… ×{item.quantity}</span>
                    <span style={{ color:'var(--text)' }} className="font-mono-custom ml-2">${formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-3 pt-3" style={{ borderTop:'1px solid rgba(0,255,229,0.08)' }}>
                  <span className="font-display font-bold text-white text-sm">TOTAL</span>
                  <span style={{ color:'#00ffe5' }} className="font-display font-bold">${formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step>0 && <button onClick={()=>setStep(s=>s-1)} className="flex-1 btn-neon font-display text-xs tracking-widest py-3">← BACK</button>}
            {step<2
              ? <button onClick={handleNext} className="flex-1 btn-neon-solid font-display text-xs tracking-widest py-4">CONTINUE →</button>
              : <button onClick={()=>{dispatch(clearCart());navigate('/order-success')}} className="flex-1 font-display text-xs tracking-widest py-4 rounded-lg font-bold transition-all"
                  style={{background:'#22c55e',color:'#fff',boxShadow:'0 0 20px rgba(34,197,94,0.3)'}}>
                  ✓ PLACE ORDER
                </button>
            }
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="volt-card p-5 sticky top-24">
            <p className="font-mono-custom text-xs tracking-widest text-neon mb-4">ORDER</p>
            {items.map(item => (
              <div key={item.id} className="flex gap-2 mb-3">
                <img src={item.image} alt="" className="w-10 h-10 object-contain rounded-lg flex-shrink-0" style={{background:'var(--bg2)', padding:4}} />
                <div className="min-w-0">
                  <p style={{ color:'var(--text-muted)', fontSize:11, lineHeight:1.4 }} className="line-clamp-2">{item.title}</p>
                  <p style={{ color:'#00ffe5', fontSize:11 }} className="font-mono-custom mt-0.5">${formatPrice(item.price)} ×{item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between pt-3 mt-3" style={{ borderTop:'1px solid rgba(0,255,229,0.1)' }}>
              <span className="font-display font-bold text-white text-sm">TOTAL</span>
              <span style={{ color:'#00ffe5' }} className="font-display font-bold">${formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
