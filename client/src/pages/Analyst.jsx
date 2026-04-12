import { useState } from 'react';
import { searchCustomer } from '../api/customers';
import SearchBar from '../components/SearchBar';
import HealthBadge from '../components/HealthBadge';
import IssuesList from '../components/IssuesList';
import ActionsList from '../components/ActionsList';
import CTACard from '../components/CTACard';
import EmailDraft from '../components/EmailDraft';

const QUICK_SEARCHES = ['ABC Corp', 'TechWave Inc', 'Zenith Finance', 'Nova Retail', 'Apex Media'];

export default function Analyst() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch() {
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await searchCustomer(query);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch customer data.');
    } finally {
      setLoading(false);
    }
  }

  function handleQuick(name) {
    setQuery(name);
    setError('');
    setResult(null);
    setLoading(true);
    searchCustomer(name)
      .then((res) => setResult(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to fetch customer data.'))
      .finally(() => setLoading(false));
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">AI Customer Health Analyst</h1>
            <p className="text-xs text-gray-400">Gainsight-aligned CSM Intelligence</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Search section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
            Customer Lookup
          </h2>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            loading={loading}
          />

          {/* Quick search chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-gray-400 self-center">Quick:</span>
            {QUICK_SEARCHES.map((name) => (
              <button
                key={name}
                onClick={() => handleQuick(name)}
                className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-600 px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-blue-200"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-400">Analysing customer health...</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-5">
            {/* Customer meta */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{result.customer.name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {result.customer.industry} &middot; {result.customer.plan} Plan &middot; CSM: {result.customer.csm}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">MRR</p>
                  <p className="text-xl font-bold text-gray-900">${result.customer.mrr.toLocaleString()}</p>
                </div>
              </div>

              {/* Data chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <Chip label="Last Login" value={`${result.customer.lastLoginDaysAgo}d ago`} />
                <Chip label="Usage Change" value={`${result.customer.usageChangePercent > 0 ? '+' : ''}${result.customer.usageChangePercent}%`} />
                <Chip label="Support Tickets" value={result.customer.supportTicketsCount} />
                <Chip label="Renewal In" value={`${result.customer.renewalDaysLeft}d`} />
              </div>
            </div>

            <HealthBadge score={result.health.score} status={result.health.status} />
            <IssuesList issues={result.issues} />
            <ActionsList actions={result.actions} />
            <CTACard cta={result.cta} status={result.health.status} />
            <EmailDraft email={result.email} />
          </div>
        )}

        {/* Empty state */}
        {!result && !loading && !error && (
          <div className="text-center py-20 text-gray-400">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">Search a customer to see their health report</p>
            <p className="text-xs text-gray-400 mt-1">Try one of the quick search options above</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl px-3 py-2.5">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  );
}
