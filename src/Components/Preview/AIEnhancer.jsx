import { useState } from 'react'
import {
  Sparkles, CheckCircle, Loader,
  AlertCircle, Zap
} from 'lucide-react'
import { useApp } from '../../context/ResumeContext'
import {
  enhanceSummary,
  enhanceExperience,
  enhanceProjects,
  enhanceSkills
} from '../../services/gemini'
import './AIEnhancer.css'

function AIEnhancer() {
  const { resumeData, updateResumeData } = useApp()
  const [status, setStatus] = useState('idle')
  const [currentTask, setCurrentTask] = useState('')
  const [enhanced, setEnhanced] = useState(false)

  const handleEnhance = async () => {
    const key = import.meta.env.VITE_GEMINI_API_KEY

    if (!key) {
      setStatus('error')
      setCurrentTask('API key not found in .env file!')
      return
    }

    if (key.length < 10) {
      setStatus('error')
      setCurrentTask('API key seems invalid — check .env file!')
      return
    }

    try {
      setStatus('loading')
      setEnhanced(false)

      if (resumeData.personalInfo.summary) {
        setCurrentTask('✨ Enhancing your professional summary...')
        const enhancedSummary = await enhanceSummary(
          resumeData.personalInfo.summary,
          resumeData.personalInfo.fullName
        )
        updateResumeData('personalInfo', {
          ...resumeData.personalInfo,
          summary: enhancedSummary
        })
      }

      if (resumeData.experience.some(e => e.company)) {
        setCurrentTask('💼 Enhancing work experience...')
        const enhancedExp = await enhanceExperience(
          resumeData.experience.filter(e => e.company)
        )
        updateResumeData('experience', enhancedExp)
      }

      if (resumeData.projects.some(p => p.name)) {
        setCurrentTask('🚀 Enhancing project descriptions...')
        const enhancedProj = await enhanceProjects(
          resumeData.projects.filter(p => p.name)
        )
        updateResumeData('projects', enhancedProj)
      }

      if (resumeData.skills.technical) {
        setCurrentTask('⚡ Formatting skills section...')
        const enhancedSkills = await enhanceSkills(resumeData.skills)
        updateResumeData('skills', enhancedSkills)
      }

      setStatus('success')
      setCurrentTask('Your resume has been AI-enhanced!')
      setEnhanced(true)

    } catch (error) {
      console.error('AI Error:', error)
      setStatus('error')

      if (error.message.includes('quota')) {
        setCurrentTask('API quota exceeded! Create new key at aistudio.google.com')
      } else if (error.message.includes('API key')) {
        setCurrentTask('Invalid API key! Check .env file.')
      } else {
        setCurrentTask(`Error: ${error.message}`)
      }
    }
  }

  return (
    <div className="ai-enhancer">

      {/* Main Card */}
      <div className={`ai-enhancer__card 
        ${status === 'success' ? 'ai-enhancer__card--success' : ''}
        ${status === 'error' ? 'ai-enhancer__card--error' : ''}`}
      >

        {/* Header */}
        <div className="ai-enhancer__header">
          <div className="ai-enhancer__icon">
            {status === 'loading' && (
              <Loader size={28} className="ai-enhancer__spin" />
            )}
            {status === 'success' && (
              <CheckCircle size={28} color="#10B981" />
            )}
            {status === 'error' && (
              <AlertCircle size={28} color="#EF4444" />
            )}
            {status === 'idle' && (
              <Sparkles size={28} color="var(--primary)" />
            )}
          </div>

          <div className="ai-enhancer__text">
            {status === 'idle' && (
              <>
                <h3>Enhance with AI ✨</h3>
                <p>
                  Let Claude AI transform your content into
                  powerful, recruiter-ready language!
                </p>
              </>
            )}
            {status === 'loading' && (
              <>
                <h3>AI is working its magic...</h3>
                <p className="ai-enhancer__task">{currentTask}</p>
              </>
            )}
            {status === 'success' && (
              <>
                <h3>Resume Enhanced! 🎉</h3>
                <p>
                  Your resume content has been professionally
                  rewritten by AI. Check the preview below!
                </p>
              </>
            )}
            {status === 'error' && (
              <>
                <h3>Enhancement Failed</h3>
                <p className="ai-enhancer__error-text">
                  {currentTask}
                </p>
              </>
            )}
          </div>
        </div>

        {status === 'idle' && (
          <div className="ai-enhancer__features">
            <div className="ai-enhancer__feature">
              <Zap size={14} />
              <span>Rewrites summary professionally</span>
            </div>
            <div className="ai-enhancer__feature">
              <Zap size={14} />
              <span>Adds action verbs to experience</span>
            </div>
            <div className="ai-enhancer__feature">
              <Zap size={14} />
              <span>Makes project descriptions impressive</span>
            </div>
            <div className="ai-enhancer__feature">
              <Zap size={14} />
              <span>Formats skills for ATS systems</span>
            </div>
          </div>
        )}

        {/* Loading Progress Bar */}
        {status === 'loading' && (
          <div className="ai-enhancer__progress">
            <div className="ai-enhancer__progress-bar"></div>
          </div>
        )}

        {/* Action Button */}
        {status !== 'loading' && (
          <button
            className={`ai-enhancer__btn 
              ${status === 'success' ? 'ai-enhancer__btn--success' : ''}
              ${status === 'error' ? 'ai-enhancer__btn--error' : ''}`}
            onClick={handleEnhance}
            disabled={status === 'loading'}
          >
            {status === 'idle' && (
              <><Sparkles size={18} /> Enhance My Resume with AI</>
            )}
            {status === 'success' && (
              <><Sparkles size={18} /> Re-Enhance Resume</>
            )}
            {status === 'error' && (
              <><Sparkles size={18} /> Try Again</>
            )}
          </button>
        )}

      </div>
    </div>
  )
}

export default AIEnhancer