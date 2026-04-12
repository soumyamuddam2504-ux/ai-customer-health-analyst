export default function ActionsList({ actions }) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
        <span className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center text-xs">✓</span>
        Recommended Actions
      </h3>
      <ol className="space-y-2">
        {actions.map((action, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
            <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            {action}
          </li>
        ))}
      </ol>
    </div>
  );
}
