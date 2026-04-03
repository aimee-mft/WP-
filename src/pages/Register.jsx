import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { api } from '../lib/api'

export default function Register() {
  const navigate = useNavigate()
  const setUser = useAuthStore(s => s.setUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      const user = await api.register(email, password)
      if (user) {
        setUser(user)
        navigate('/', { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--md-background)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Branding */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: 'var(--md-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '22px',
            margin: '0 auto 16px',
          }}>W</div>
          <h1 style={{ fontSize: '24px', fontWeight: 400, color: 'var(--md-on-surface)', letterSpacing: '0.005em' }}>
            Create your account
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--md-on-surface-variant)', marginTop: '6px' }}>
            Start building websites today
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--md-surface)',
          borderRadius: 'var(--md-radius-dialog)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          padding: '32px',
        }}>
          <form onSubmit={handleSubmit}>
            {/* Error */}
            {error && (
              <div style={{
                background: '#FCE8E6', border: '1px solid #F28B82',
                borderRadius: 'var(--md-radius-sm)', padding: '10px 14px',
                fontSize: '13px', color: 'var(--md-error)', marginBottom: '20px',
              }}>
                {error}
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: 'var(--md-on-surface-variant)', marginBottom: '6px',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>Email</label>
              <input
                className="md3-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: 'var(--md-on-surface-variant)', marginBottom: '6px',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>Password</label>
              <input
                className="md3-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
              />
            </div>

            {/* Confirm password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: 'var(--md-on-surface-variant)', marginBottom: '6px',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>Confirm Password</label>
              <input
                className="md3-input"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: '40px', border: 'none',
                background: loading ? 'var(--md-outline)' : 'var(--md-primary)',
                color: '#fff', borderRadius: 'var(--md-radius-pill)',
                fontSize: '14px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', transition: 'filter 0.15s',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.filter = 'brightness(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--md-on-surface-variant)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--md-primary)', textDecoration: 'none', fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
