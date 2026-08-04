import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useApp } from '../../context/ResumeContext'
import "./header.css";

function Header() {
  const { currentUser, logout, darkMode, toggleDarkMode } = useApp()

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <div className="header__logo-icon">✦</div>
        <span>Resume<strong style={{color: 'var(--primary)'}}>AI</strong></span>
      </Link>

      <nav className="header__nav">
        {/* Dark Mode Toggle */}
        <button
          className="btn btn-ghost header__dark-btn"
          onClick={toggleDarkMode}
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {currentUser ? (
          <>
            <Link to="/dashboard">
              <button className="btn btn-ghost">Dashboard</button>
            </Link>
            <button
              className="btn btn-primary"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-ghost">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-primary">Get Started →</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header