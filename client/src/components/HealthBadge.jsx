const STATUS_STYLES = {
  'Good':    { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-400', bar: 'bg-emerald-500' },
  'Warning': { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   dot: 'bg-amber-400',   bar: 'bg-amber-500'   },
  'At Risk': { bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     dot: 'bg-red-400',     bar: 'bg-red-500'     },
};

export default function HealthBadge({ score, status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES['Good'];

  return (
    <div className={`${s.bg} ${s.border} border rounded-2xl p-5`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
          <span className={`text-sm font-bold uppercase tracking-wide ${s.text}`}>{status}</span>
        </div>
        <span className={`text-3xl font-bold ${s.text}`}>{score}</span>
      </div>
      <div className="w-full bg-white/60 rounded-full h-2.5">
        <div
          className={`${s.bar} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2">Health Score out of 100</p>
    </div>
  );
}
