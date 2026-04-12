export default function SearchBar({ value, onChange, onSearch, loading }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim()) onSearch();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter customer name (e.g. ABC Corp)"
        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Analysing...' : 'Analyse'}
      </button>
    </form>
  );
}
