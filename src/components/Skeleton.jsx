export function ProductCardSkeleton() {
  return (
    <div className="volt-card overflow-hidden">
      <div className="skeleton h-52 w-full" style={{ borderRadius: 0 }} />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="flex justify-between items-center mt-4">
          <div className="skeleton h-6 w-24 rounded" />
          <div className="skeleton h-8 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="skeleton rounded-2xl h-96" />
      <div className="space-y-4">
        <div className="skeleton h-3 w-1/4 rounded" />
        <div className="skeleton h-7 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="skeleton h-10 w-1/3 rounded mt-4" />
        <div className="skeleton h-12 w-full rounded-xl mt-6" />
      </div>
    </div>
  )
}
