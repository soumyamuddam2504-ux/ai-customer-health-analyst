export default function IssuesList({ issues }) {
  if (!issues || issues.length === 0) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
        <span className="w-5 h-5 bg-red-100 rounded-md flex items-center justify-center text-xs">⚠</span>
        Issues Detected
      </h3>
      <ul className="space-y-2">
        {issues.map((issue, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
            {issue}
          </li>
        ))}
      </ul>
    </div>
  );
}
