import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import Builder from './pages/Builder'
import Login from './pages/Login'
import Register from './pages/Register'
import useAuthStore from './store/authStore'

// Checks /api/auth/me once on app mount to rehydrate session
function AuthBootstrap({ children }) {
  const setUser = useAuthStore(s => s.setUser)
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then(r => r.ok ? r.json() : null)
      .then(user => setUser(user))
      .catch(() => setUser(null))
  }, [])
  return children
}

// Full-page spinner (shown while /me is in-flight)
function Spinner() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: 'var(--md-background)',
    }}>
      <div style={{
        width: '36px', height: '36px',
        border: '3px solid var(--md-primary-container)',
        borderTopColor: 'var(--md-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

// Wraps any route that requires a logged-in user
function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthBootstrap>
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"         element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/builder/:id" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </AuthBootstrap>
    </BrowserRouter>
  )
}
