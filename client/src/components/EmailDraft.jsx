import { useState } from 'react';

export default function EmailDraft({ email }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
          <span className="w-5 h-5 bg-indigo-100 rounded-md flex items-center justify-center text-xs">✉</span>
          Email Draft
        </h3>
        <button
          onClick={handleCopy}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-lg transition-all"
        >
          {copied ? 'Copied!' : 'Copy Email'}
        </button>
      </div>
      <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4 font-sans border border-gray-100">
        {email}
      </pre>
    </div>
  );
}
