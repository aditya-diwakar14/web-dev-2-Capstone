import { useDispatch, useSelector } from 'react-redux'
import { setPage, selectFilter } from '../features/filterSlice'

export default function Pagination({ totalItems }) {
  const dispatch = useDispatch()
  const { page, perPage } = useSelector(selectFilter)
  const totalPages = Math.ceil(totalItems / perPage)
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1}
        className="btn-neon px-4 py-2 text-xs disabled:opacity-30">← PREV</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => dispatch(setPage(p))}
          style={p === page ? { background: '#00ffe5', color: '#0a0f1a', boxShadow: '0 0 16px rgba(0,255,229,0.4)' } : { border: '1px solid rgba(0,255,229,0.15)', color: '#64748b' }}
          className="w-9 h-9 rounded-lg text-sm font-mono-custom font-bold transition-all hover:border-neon">
          {p}
        </button>
      ))}
      <button onClick={() => dispatch(setPage(page + 1))} disabled={page === totalPages}
        className="btn-neon px-4 py-2 text-xs disabled:opacity-30">NEXT →</button>
    </div>
  )
}
