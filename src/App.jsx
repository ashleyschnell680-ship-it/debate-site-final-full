import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Home from './components/Home'
import DebateList from './components/DebateList'
import DebateDetail from './components/DebateDetail'
import About from './components/About'
import Auth from './components/Auth'
import AdminLogin from './components/AdminLogin'
import AdminPanel from './components/AdminPanel'
import ContentManager from './components/ContentManager'
import MyLibrary from './components/MyLibrary'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuthenticated')
    setIsAdminAuthenticated(isAuth === 'true')
  }, [])

  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/debates" element={<DebateList />} />
          <Route path="/debates/:id" element={<DebateDetail />} />
          <Route path="/debate/:categoryId/:subItemName" element={<DebateDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/login" 
            element={<AdminLogin onLogin={setIsAdminAuthenticated} />} 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                <AdminPanel onLogout={setIsAdminAuthenticated} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/content" 
            element={
              <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                <ContentManager />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App