import { useState } from 'react';

const STATUS_STYLES = {
  'Good':    { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-400', bar: 'bg-emerald-500' },
  'Warning': { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   dot: 'bg-amber-400',   bar: 'bg-amber-500'   },
  'At Risk': { bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     dot: 'bg-red-400',     bar: 'bg-red-500'     },
};

const CTA_COLORS = {
  'Good':    'bg-emerald-600 hover:bg-emerald-700',
  'Warning': 'bg-amber-500 hover:bg-amber-600',
  'At Risk': 'bg-red-600 hover:bg-red-700',
};

export default function AnalysisPanel({ result }) {
  const [copied, setCopied] = useState(false);
  const { customer, health, issues, actions, cta, email } = result;
  const s = STATUS_STYLES[health.status] || STATUS_STYLES['Good'];

  function handleCopy() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Customer header card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">{customer.name[0]}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">
                {customer.industry} &middot; {customer.plan} Plan &middot; CSM: {customer.csm}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Monthly Recurring Revenue</p>
            <p className="text-2xl font-bold text-gray-900">${customer.mrr.toLocaleString()}</p>
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Metric label="Last Login" value={`${customer.lastLoginDaysAgo}d ago`}
            alert={customer.lastLoginDaysAgo >= 14} />
          <Metric label="Usage Change"
            value={`${customer.usageChangePercent > 0 ? '+' : ''}${customer.usageChangePercent}%`}
            alert={customer.usageChangePercent <= -10} />
          <Metric label="Support Tickets" value={customer.supportTicketsCount}
            alert={customer.supportTicketsCount > 2} />
          <Metric label="Renewal In" value={`${customer.renewalDaysLeft} days`}
            alert={customer.renewalDaysLeft <= 30} />
        </div>
      </div>

      {/* Health score */}
      <div className={`${s.bg} ${s.border} border rounded-2xl p-5`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className={`w-3 h-3 rounded-full ${s.dot}`} />
            <span className={`text-base font-bold ${s.text}`}>{health.status}</span>
          </div>
          <div className="text-right">
            <span className={`text-4xl font-bold ${s.text}`}>{health.score}</span>
            <span className={`text-sm ${s.text} ml-1`}>/100</span>
          </div>
        </div>
        <div className="w-full bg-white/50 rounded-full h-3">
          <div className={`${s.bar} h-3 rounded-full transition-all duration-700`}
            style={{ width: `${health.score}%` }} />
        </div>
        <p className={`text-xs ${s.text} opacity-70 mt-2`}>Health Score</p>
      </div>

      {/* Issues + Actions side by side on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Issues */}
        {issues.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 text-xs font-bold">!</span>
              </div>
              <h3 className="text-sm font-bold text-gray-700">Issues Detected</h3>
              <span className="ml-auto bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{issues.length}</span>
            </div>
            <ul className="space-y-2.5">
              {issues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                  <p className="text-sm text-gray-600 leading-relaxed">{issue}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-xs font-bold">✓</span>
              </div>
              <h3 className="text-sm font-bold text-gray-700">Recommended Actions</h3>
              <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{actions.length}</span>
            </div>
            <ol className="space-y-2.5">
              {actions.map((action, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{action}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-purple-600 text-xs">★</span>
          </div>
          <h3 className="text-sm font-bold text-gray-700">Suggested CTA</h3>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-gray-500">Recommended Gainsight Call-To-Action:</p>
          <span className={`inline-flex items-center ${CTA_COLORS[health.status] || 'bg-gray-600'} text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm`}>
            {cta}
          </span>
        </div>
      </div>

      {/* Email draft */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 text-xs">✉</span>
            </div>
            <h3 className="text-sm font-bold text-gray-700">Email Draft</h3>
          </div>
          <button
            onClick={handleCopy}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
              copied
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {copied ? '✓ Copied' : 'Copy Email'}
          </button>
        </div>
        <pre className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap bg-slate-50 rounded-xl p-4 border border-gray-100 font-sans">
          {email}
        </pre>
      </div>
    </div>
  );
}

function Metric({ label, value, alert }) {
  return (
    <div className={`rounded-xl px-3 py-2.5 ${alert ? 'bg-red-50 border border-red-100' : 'bg-slate-50'}`}>
      <p className={`text-xs mb-0.5 ${alert ? 'text-red-400' : 'text-gray-400'}`}>{label}</p>
      <p className={`text-sm font-bold ${alert ? 'text-red-700' : 'text-gray-800'}`}>{value}</p>
    </div>
  );
}
