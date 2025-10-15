import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, CheckSquare, Info, User, Settings, LogOut, CheckCircle2 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-white via-yellow-50 to-amber-50 border-b-2 border-amber-200 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-2 rounded-lg shadow-md">
              <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/dashboard')
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-white shadow-md'
                  : 'text-gray-700 hover:bg-yellow-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/tasks"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/tasks')
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-white shadow-md'
                  : 'text-gray-700 hover:bg-yellow-100'
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              <span className="font-medium">Tasks</span>
            </Link>

            <Link
              to="/about"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/about')
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-white shadow-md'
                  : 'text-gray-700 hover:bg-yellow-100'
              }`}
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/profile')
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-white shadow-md'
                  : 'text-gray-700 hover:bg-yellow-100'
              }`}
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-600 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
