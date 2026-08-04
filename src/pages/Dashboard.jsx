import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/ResumeContext'
import { FileText, Plus, Sparkles, LogOut } from 'lucide-react'
import './Dashboard.css'

function Dashboard() {
  const { currentUser, logout } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dashboard">

      {/* Welcome Section */}
      <div className="dashboard__hero">
        <div className="dashboard__welcome">
          <div className="dashboard__avatar">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>Welcome, {currentUser?.name}! 👋</h1>
            <p>Ready to build your perfect resume?</p>
          </div>
        </div>
        <button className="dashboard__logout" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="dashboard__stats">
        <div className="dashboard__stat">
          <strong>0</strong>
          <span>Resumes Created</span>
        </div>
        <div className="dashboard__stat">
          <strong>0</strong>
          <span>Downloads</span>
        </div>
        <div className="dashboard__stat">
          <strong>Free</strong>
          <span>Current Plan</span>
        </div>
      </div>

      {/* Create New Resume */}
      <div className="dashboard__section">
        <h2>My Resumes</h2>

        {/* Empty State */}
        <div className="dashboard__empty">
          <div className="dashboard__empty-icon">
            <FileText size={48} color="var(--primary)" />
          </div>
          <h3>No resumes yet!</h3>
          <p>Create your first AI-powered resume in minutes</p>
          <button
            className="dashboard__create-btn"
            onClick={() => navigate('/builder')}
          >
            <Plus size={20} />
            Create New Resume
          </button>
        </div>
      </div>

      {/* AI Tip */}
      <div className="dashboard__tip">
        <Sparkles size={20} color="var(--primary)" />
        <p>
          <strong>Pro Tip:</strong> Let our AI enhance your resume content —
          it transforms simple descriptions into powerful, recruiter-friendly bullet points!
        </p>
      </div>

    </div>
  )
}

export default Dashboard