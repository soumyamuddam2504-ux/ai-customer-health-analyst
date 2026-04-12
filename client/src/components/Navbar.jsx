import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-none">Customer Health Analyst</p>
            <p className="text-xs text-gray-400 mt-0.5">Gainsight-aligned CSM Intelligence</p>
          </div>
        </div>

        {/* Right side */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs text-gray-400">Logged in as</p>
              <p className="text-sm font-semibold text-gray-700">{user.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
