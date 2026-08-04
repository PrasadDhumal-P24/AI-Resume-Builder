import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useApp } from '../../context/ResumeContext'
import './Auth.css'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const { login } = useApp()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('') // Type kelavar error clear hoil
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Small delay — realistic feel sathi
    await new Promise(r => setTimeout(r, 800))

    const result = login(formData.email, formData.password)

    if (result.success) {
      navigate('/dashboard') // Dashboard var jau
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
        {/* Left Side */}
        <div className="auth__left">
          <div className="auth__brand">
            <div className="auth__brand-icon">✦</div>
            <span>ResumeAI</span>
          </div>
          <h2>Build Resumes That<br />Get You Hired</h2>
          <p>Join 10,000+ professionals who landed their dream jobs using ResumeAI</p>
          <div className="auth__features">
            <div className="auth__feature">✅ AI-powered content writing</div>
            <div className="auth__feature">✅ ATS-friendly templates</div>
            <div className="auth__feature">✅ Instant PDF download</div>
            <div className="auth__feature">✅ 100% Free forever</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth__right">
          <div className="auth__card">
            <div className="auth__header">
              <Sparkles size={28} color="var(--primary)" />
              <h1>Welcome Back!</h1>
              <p>Login to access your resumes</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="auth__error">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth__form">
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
                    placeholder="Enter your password"
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
                {loading ? 'Logging in...' : 'Login to ResumeAI →'}
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
              Don't have an account?{' '}
              <Link to="/signup">Sign Up Free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login