import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, Sparkles } from 'lucide-react'
import { useApp } from '../../context/ResumeContext'
import './Auth.css'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '', email: '', password: ''
  })

  const { signup } = useApp()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters!')
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 800))

    const result = signup(formData.name, formData.email, formData.password)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="auth__page">
      <div className="auth__blob auth__blob--1"></div>
      <div className="auth__blob auth__blob--2"></div>

      <div className="auth__container">
        <div className="auth__left">
          <div className="auth__brand">
            <div className="auth__brand-icon">✦</div>
            <span>ResumeAI</span>
          </div>
          <h2>Your Dream Job<br />Starts Here</h2>
          <p>Create your professional AI resume in under 5 minutes!</p>
          <div className="auth__features">
            <div className="auth__feature">🚀 Setup in 2 minutes</div>
            <div className="auth__feature">🤖 AI writes for you</div>
            <div className="auth__feature">📄 Multiple templates</div>
            <div className="auth__feature">💾 Auto-save progress</div>
          </div>
        </div>

        <div className="auth__right">
          <div className="auth__card">
            <div className="auth__header">
              <Sparkles size={28} color="var(--primary)" />
              <h1>Create Account</h1>
              <p>Start building your perfect resume</p>
            </div>

            {error && (
              <div className="auth__error">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth__form">
              <div className="auth__field">
                <label>Full Name</label>
                <div className="auth__input-wrap">
                  <User size={18} className="auth__input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="auth__field">
                <label>Email Address</label>
                <div className="auth__input-wrap">
                  <Mail size={18} className="auth__input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="auth__field">
                <label>Password</label>
                <div className="auth__input-wrap">
                  <Lock size={18} className="auth__input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="auth__eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth__submit"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Free Account →'}
              </button>

              <div className="auth__divider"><span>or</span></div>

              <button type="button" className="auth__google">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google" width="20"
                />
                Continue with Google
              </button>
            </form>

            <p className="auth__switch">
              Already have an account?{' '}
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup