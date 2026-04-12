import { useNavigate } from 'react-router-dom';

const STATUS_STYLES = {
  'Good':    'bg-emerald-100 text-emerald-700',
  'Warning': 'bg-amber-100 text-amber-700',
  'At Risk': 'bg-red-100 text-red-700',
};

export default function RiskTable({ customers }) {
  const navigate = useNavigate();
  const atRisk = [...customers]
    .filter((c) => c.health.status !== 'Good')
    .sort((a, b) => a.health.score - b.health.score)
    .slice(0, 5);

  if (atRisk.length === 0) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <p className="text-sm font-bold text-gray-700">Customers Needing Attention</p>
        <p className="text-xs text-gray-400 mt-0.5">Sorted by lowest health score</p>
      </div>
      <div className="divide-y divide-gray-50">
        {atRisk.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(`/analyse?name=${encodeURIComponent(c.name)}`)}
            className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-gray-500">{c.name[0]}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-400">{c.industry} · {c.csm}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500">${c.mrr.toLocaleString()}/mo</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[c.health.status]}`}>
                {c.health.status} · {c.health.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
