import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCustomers } from '../api/customers';
import Navbar from '../components/Navbar';

const STATUS_STYLES = {
  'Good':    'bg-emerald-100 text-emerald-700',
  'Warning': 'bg-amber-100 text-amber-700',
  'At Risk': 'bg-red-100 text-red-700',
};

const FILTERS = ['All', 'At Risk', 'Warning', 'Good'];

export default function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllCustomers()
      .then((res) => setCustomers(res.data.customers))
      .catch(() => setError('Failed to load customers.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers
    .filter((c) => filter === 'All' || c.health.status === filter)
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.csm.toLowerCase().includes(search.toLowerCase())
    );

  function handleAnalyse(name) {
    navigate(`/analyse?name=${encodeURIComponent(name)}`);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Customers</h1>
              <p className="text-sm text-gray-400 mt-0.5">{customers.length} total customers in your portfolio</p>
            </div>
            <input
              type="text"
              placeholder="Search name, industry, CSM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full sm:w-64"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1.5 mt-4 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {f}
                {f !== 'All' && (
                  <span className="ml-1 opacity-70">
                    {customers.filter((c) => c.health.status === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-24">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-400">Loading customers...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <p className="text-sm font-medium">No customers match your filter</p>
          </div>
        ) : (
          <>
            {/* Mobile card layout */}
            <div className="sm:hidden space-y-3">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleAnalyse(c.name)}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm active:bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">{c.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.industry}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[c.health.status]}`}>
                      {c.health.status} · {c.health.score}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-slate-50 rounded-lg px-2 py-1.5">
                      <p className="text-gray-400">MRR</p>
                      <p className="font-bold text-gray-700">${c.mrr.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-2 py-1.5">
                      <p className="text-gray-400">Renewal</p>
                      <p className={`font-bold ${c.renewalDaysLeft <= 30 ? 'text-red-600' : 'text-gray-700'}`}>{c.renewalDaysLeft}d</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-2 py-1.5">
                      <p className="text-gray-400">Plan</p>
                      <p className="font-bold text-gray-700">{c.plan}</p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 font-semibold mt-3 text-right">Analyse →</p>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <div className="col-span-3">Customer</div>
                <div className="col-span-2">Industry</div>
                <div className="col-span-2">CSM</div>
                <div className="col-span-1">Plan</div>
                <div className="col-span-1">MRR</div>
                <div className="col-span-1">Renewal</div>
                <div className="col-span-1">Health</div>
                <div className="col-span-1"></div>
              </div>
              <div className="divide-y divide-gray-50">
                {filtered.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-slate-50 transition-colors items-center">
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-blue-600">{c.name[0]}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                    </div>
                    <div className="col-span-2 text-sm text-gray-500 truncate">{c.industry}</div>
                    <div className="col-span-2 text-sm text-gray-500 truncate">{c.csm}</div>
                    <div className="col-span-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{c.plan}</span>
                    </div>
                    <div className="col-span-1 text-sm font-semibold text-gray-700">${c.mrr.toLocaleString()}</div>
                    <div className="col-span-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        c.renewalDaysLeft <= 30 ? 'bg-red-100 text-red-700' :
                        c.renewalDaysLeft <= 60 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {c.renewalDaysLeft}d
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[c.health.status]}`}>
                        {c.health.score}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <button
                        onClick={() => handleAnalyse(c.name)}
                        className="text-xs text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                      >
                        Analyse →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
