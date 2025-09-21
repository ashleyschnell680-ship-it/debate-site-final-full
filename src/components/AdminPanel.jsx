import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminPanel({ onLogout }) {
  const [stats, setStats] = useState({
    totalCategories: 13,
    totalSubcategories: 42,
    lastLogin: new Date().toLocaleString()
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = sessionStorage.getItem('adminAuthenticated')
    if (!isAuth) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    onLogout(false)
    navigate('/')
  }

  const quickActions = [
    { name: 'View Site Analytics', action: () => alert('Analytics feature coming soon') },
    { name: 'Backup Data', action: () => alert('Backup completed successfully') },
    { name: 'Clear Cache', action: () => alert('Cache cleared') },
    { name: 'Export Content', action: () => alert('Export feature coming soon') }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Categories</h3>
            <p className="text-3xl font-bold text-blue-400">{stats.totalCategories}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Subcategories</h3>
            <p className="text-3xl font-bold text-green-400">{stats.totalSubcategories}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Last Login</h3>
            <p className="text-lg text-gray-300">{stats.lastLogin}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-center"
              >
                {action.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-700 rounded">
                <p className="text-sm text-gray-300">System started</p>
                <p className="text-xs text-gray-400">Just now</p>
              </div>
              <div className="p-3 bg-gray-700 rounded">
                <p className="text-sm text-gray-300">Admin logged in</p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
              </div>
              <div className="p-3 bg-gray-700 rounded">
                <p className="text-sm text-gray-300">Database backup completed</p>
                <p className="text-xs text-gray-400">1 hour ago</p>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Server Status</span>
                <span className="px-2 py-1 bg-green-600 text-xs rounded">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="px-2 py-1 bg-green-600 text-xs rounded">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Backup</span>
                <span className="text-gray-300 text-sm">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage Used</span>
                <span className="text-gray-300 text-sm">45%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Site Navigation</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
            >
              View Homepage
            </button>
            <button
              onClick={() => navigate('/debates')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
            >
              View Debates
            </button>
            <button
              onClick={() => navigate('/admin/content')}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
            >
              Manage Content
            </button>
            <button
              onClick={() => alert('User management coming soon')}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
            >
              Manage Users
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminPanel