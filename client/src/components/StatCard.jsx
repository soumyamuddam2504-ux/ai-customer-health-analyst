const COLORS = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-100',   icon: 'bg-blue-600',   text: 'text-blue-700',   val: 'text-blue-900' },
  green:  { bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'bg-emerald-600', text: 'text-emerald-700', val: 'text-emerald-900' },
  red:    { bg: 'bg-red-50',    border: 'border-red-100',    icon: 'bg-red-600',    text: 'text-red-700',    val: 'text-red-900' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-100',  icon: 'bg-amber-500',  text: 'text-amber-700',  val: 'text-amber-900' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-100', icon: 'bg-purple-600', text: 'text-purple-700', val: 'text-purple-900' },
};

export default function StatCard({ label, value, sub, color = 'blue', icon }) {
  const c = COLORS[color] || COLORS.blue;
  return (
    <div className={`${c.bg} ${c.border} border rounded-2xl p-5 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wide ${c.text}`}>{label}</p>
        {icon && (
          <div className={`w-8 h-8 ${c.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-sm">{icon}</span>
          </div>
        )}
      </div>
      <div>
        <p className={`text-2xl font-bold ${c.val}`}>{value}</p>
        {sub && <p className={`text-xs ${c.text} mt-0.5 opacity-80`}>{sub}</p>}
      </div>
    </div>
  );
}
