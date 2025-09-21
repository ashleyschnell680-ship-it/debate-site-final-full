import { Link } from 'react-router-dom'
import { Flag, Home, FileText, Info, BookOpen, LogIn, LogOut, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="relative bg-white/90 backdrop-blur-sm border-b-4 border-red-600 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Flag size={32} className="text-red-600 group-hover:text-red-700 transition-colors" />
            <div>
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                Debate Site
              </h1>
              <p className="text-xs text-gray-600 font-medium">Political Analysis</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <Home size={18} />
              Home
            </Link>
            
            <Link 
              to="/debates" 
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <FileText size={18} />
              Debates
            </Link>
            
            <Link 
              to="/about" 
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <Info size={18} />
              About
            </Link>

            {/* Auth-dependent links */}
            {user ? (
              <>
                <Link 
                  to="/my-library" 
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                >
                  <BookOpen size={18} />
                  My Library
                </Link>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} />
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogIn size={18} />
                Sign In
              </Link>
            )}

            {/* Admin Link (subtle) */}
            <Link 
              to="/admin/login" 
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-2 py-1 rounded"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar