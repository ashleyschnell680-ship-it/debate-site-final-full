import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin({ onLogin }) {
  const [step, setStep] = useState(1) // 1: login, 2: 2FA
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [twoFACode, setTwoFACode] = useState('')
  const [error, setError] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const navigate = useNavigate()

  // Demo credentials (in real app, this would be handled by backend)
  const ADMIN_USERNAME = 'admin'
  const ADMIN_PASSWORD = 'password123'

  const generateTwoFACode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      const code = generateTwoFACode()
      setGeneratedCode(code)
      
      // In a real app, this would be sent via SMS/email
      alert(`Your 2FA code is: ${code}`)
      setStep(2)
    } else {
      setError('Invalid username or password')
    }
  }

  const handleTwoFA = (e) => {
    e.preventDefault()
    setError('')

    if (twoFACode === generatedCode) {
      // Set session storage to remember login
      sessionStorage.setItem('adminAuthenticated', 'true')
      onLogin(true)
      navigate('/admin')
    } else {
      setError('Invalid 2FA code')
    }
  }

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h1>
        
        {step === 1 ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-600 text-white rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleTwoFA}>
            <div className="mb-4 text-center">
              <p className="text-gray-300 mb-4">Enter the 6-digit code sent to your device</p>
              <input
                type="text"
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="000000"
                maxLength="6"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-600 text-white rounded">
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                Verify
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Back to Site
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin