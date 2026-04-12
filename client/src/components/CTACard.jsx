export default function CTACard({ cta, status }) {
  const colors = {
    'Good':    'bg-emerald-600',
    'Warning': 'bg-amber-500',
    'At Risk': 'bg-red-600',
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
        <span className="w-5 h-5 bg-purple-100 rounded-md flex items-center justify-center text-xs">★</span>
        Suggested CTA
      </h3>
      <span className={`inline-block ${colors[status] || 'bg-gray-600'} text-white text-sm font-semibold px-4 py-2 rounded-xl`}>
        {cta}
      </span>
    </div>
  );
}
