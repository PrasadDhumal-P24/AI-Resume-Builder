import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
      summary: ''
    },
    education: [{
      id: 1,
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      cgpa: '',
      achievements: ''
    }],
    experience: [],
    skills: {
      technical: '',
      soft: '',
      languages: '',
      tools: '',
      hobbies: '',
      certificates: '',
      programmingLangs: ''
    },
    projects: []
  })

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('resumeai_user')
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser))
      }

      const savedResume = localStorage.getItem('resumeai_data')
      if (savedResume) {
        setResumeData(JSON.parse(savedResume))
      }

      const savedDark = localStorage.getItem('resumeai_dark')
      if (savedDark === 'true') {
        setDarkMode(true)
        document.body.classList.add('dark-mode')
      }
    } catch (e) {
      console.error('Load error:', e)
    } finally {
      setLoading(false)
    }
  }, [])
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('resumeai_dark', String(newMode))

    if (newMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }
  const updateResumeData = (section, data) => {
    setResumeData(prev => {
      const updated = { ...prev, [section]: data }
      localStorage.setItem('resumeai_data', JSON.stringify(updated))
      return updated
    })
  }

  const signup = (name, email, password) => {
    const users = JSON.parse(
      localStorage.getItem('resumeai_users') || '[]'
    )

    const exists = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    )

    if (exists) {
      return { success: false, message: 'Email already registered!' }
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim()
    }

    users.push(newUser)
    localStorage.setItem('resumeai_users', JSON.stringify(users))

    const userToSave = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
    localStorage.setItem('resumeai_user', JSON.stringify(userToSave))
    setCurrentUser(userToSave)

    return { success: true }
  }

  const login = (email, password) => {
    const users = JSON.parse(
      localStorage.getItem('resumeai_users') || '[]'
    )

    const user = users.find(
      u =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password.trim()
    )

    if (!user) {
      return { success: false, message: 'Invalid email or password!' }
    }

    const userToSave = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    localStorage.setItem('resumeai_user', JSON.stringify(userToSave))
    setCurrentUser(userToSave)

    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('resumeai_user')
    localStorage.removeItem('resumeai_step')
    setCurrentUser(null)
  }

  return (
    <AppContext.Provider value={{
      currentUser,
      loading,
      darkMode,
      toggleDarkMode,
      signup,
      login,
      logout,
      resumeData,
      updateResumeData
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}