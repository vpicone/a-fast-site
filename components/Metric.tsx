export function Metric({
  icon,
  bg,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  bg: string
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="bg-black/20 border border-zinc-800 rounded-2xl p-6 h-full text-center space-y-4">
      <div className={`w-8 h-8 bg-${bg}/20 rounded-lg flex items-center justify-center mx-auto`}>{icon}</div>
      <div className="text-xs text-zinc-400 uppercase tracking-widest">{label}</div>
      <div className="text-2xl font-bold tracking-wider text-white">{value}</div>
      {sub && <div className="text-sm text-zinc-400 tracking-wide">{sub}</div>}
    </div>
  )
}
