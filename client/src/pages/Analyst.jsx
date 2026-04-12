import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchCustomer } from '../api/customers';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import AnalysisPanel from '../components/AnalysisPanel';

const QUICK_SEARCHES = ['ABC Corp', 'TechWave Inc', 'Zenith Finance', 'Nova Retail', 'Apex Media'];

export default function Analyst() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('name') || '');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-search if name is passed via URL
  useEffect(() => {
    const name = searchParams.get('name');
    if (name) {
      setQuery(name);
      runSearch(name);
    }
  }, []);

  function runSearch(name) {
    setError('');
    setResult(null);
    setLoading(true);
    searchCustomer(name)
      .then((res) => setResult(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to fetch customer data.'))
      .finally(() => setLoading(false));
  }

  function handleSearch() {
    if (query.trim()) runSearch(query.trim());
  }

  function handleQuick(name) {
    setQuery(name);
    runSearch(name);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-xl font-bold text-gray-900">Customer Analysis</h1>
          <p className="text-sm text-gray-400 mt-0.5">Look up a customer to see their full health report</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Customer Lookup</p>
          <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} loading={loading} />
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs text-gray-400 self-center">Quick search:</span>
            {QUICK_SEARCHES.map((name) => (
              <button
                key={name}
                onClick={() => handleQuick(name)}
                className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-500 px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-blue-200"
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
        {result && !loading && <AnalysisPanel result={result} />}

        {/* Empty state */}
        {!result && !loading && !error && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">Search a customer to see their health report</p>
            <p className="text-xs text-gray-400 mt-1">Use quick search above or type a customer name</p>
          </div>
        )}
      </div>
    </div>
  );
}
