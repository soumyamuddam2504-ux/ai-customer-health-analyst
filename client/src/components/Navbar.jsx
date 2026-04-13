import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/customers', label: 'Customers' },
  { to: '/analyse',   label: 'Analyse' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
    setMenuOpen(false);
  }

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <span className="text-sm font-bold text-gray-900">Health Analyst</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop user + logout */}
        <div className="hidden sm:flex items-center gap-3">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 text-xs font-bold">{user.name[0].toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {user && (
            <div className="pt-2 border-t border-gray-100 mt-2">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-700 text-xs font-bold">{user.name[0].toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-500 font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
