import { useEffect, useState } from 'react';
import { getAllCustomers } from '../api/customers';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import HealthChart from '../components/HealthChart';
import MRRChart from '../components/MRRChart';
import RiskTable from '../components/RiskTable';

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllCustomers()
      .then((res) => setCustomers(res.data.customers))
      .catch(() => setError('Failed to load customer data.'))
      .finally(() => setLoading(false));
  }, []);

  const totalMRR     = customers.reduce((s, c) => s + c.mrr, 0);
  const atRisk       = customers.filter((c) => c.health.status === 'At Risk');
  const warning      = customers.filter((c) => c.health.status === 'Warning');
  const good         = customers.filter((c) => c.health.status === 'Good');
  const mrrAtRisk    = atRisk.reduce((s, c) => s + c.mrr, 0);
  const renewalsSoon = customers.filter((c) => c.renewalDaysLeft <= 30).length;
  const needAttention = atRisk.length + warning.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Customer health overview across your portfolio</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-24">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-400">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <StatCard label="Total Customers" value={customers.length} color="blue" icon="👥" />
              <StatCard label="Total MRR" value={`$${(totalMRR / 1000).toFixed(1)}k`} color="green" icon="💰" />
              <StatCard label="MRR at Risk" value={`$${(mrrAtRisk / 1000).toFixed(1)}k`} sub={`${atRisk.length} customers`} color="red" icon="⚠" />
              <StatCard label="Renewals Due" value={renewalsSoon} sub="within 30 days" color="amber" icon="📅" />
              <StatCard label="Need Attention" value={needAttention} sub="Warning + At Risk" color="purple" icon="🔔" />
              <StatCard label="Healthy" value={good.length} sub={`${Math.round((good.length / customers.length) * 100) || 0}% of portfolio`} color="green" icon="✓" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HealthChart customers={customers} />
              <MRRChart customers={customers} />
            </div>

            {/* At-risk table */}
            <RiskTable customers={customers} />

            {/* Renewal urgency list */}
            {customers.filter((c) => c.renewalDaysLeft <= 60).length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50">
                  <p className="text-sm font-bold text-gray-700">Upcoming Renewals</p>
                  <p className="text-xs text-gray-400 mt-0.5">Customers renewing in the next 60 days</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {customers
                    .filter((c) => c.renewalDaysLeft <= 60)
                    .sort((a, b) => a.renewalDaysLeft - b.renewalDaysLeft)
                    .map((c) => (
                      <div key={c.id} className="flex items-center justify-between px-5 py-3.5">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.plan} Plan · ${c.mrr.toLocaleString()}/mo</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            c.renewalDaysLeft <= 30 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {c.renewalDaysLeft}d left
                          </span>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            c.health.status === 'Good' ? 'bg-emerald-100 text-emerald-700' :
                            c.health.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {c.health.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
