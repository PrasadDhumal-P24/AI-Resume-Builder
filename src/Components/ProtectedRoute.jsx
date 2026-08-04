import { Navigate } from 'react-router-dom'
import { useApp } from '../context/ResumeContext'

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useApp()

  if (loading) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          border: '4px solid #EEF0FF',
          borderTop: '4px solid #6C63FF',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{
          color: '#6B7280',
          fontSize: '0.9rem',
          fontFamily: 'Inter, sans-serif'
        }}>
          Loading your account...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }


  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute