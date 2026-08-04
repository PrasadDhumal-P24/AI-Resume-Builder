import { useApp } from '../../context/ResumeContext'
import { FolderOpen, Plus, Sparkles, GitBranch, Globe } from 'lucide-react'

function Projects({ onNext, onPrev }) {
  const { resumeData, updateResumeData } = useApp()
  const projects = resumeData.projects

  const handleChange = (id, e) => {
    const updated = projects.map(proj =>
      proj.id === id
        ? { ...proj, [e.target.name]: e.target.value }
        : proj
    )
    updateResumeData('projects', updated)
  }

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '', description: '',
      techStack: '', github: '',
      liveUrl: '', highlights: ''
    }
    updateResumeData('projects', [...projects, newProject])
  }

  const removeProject = (id) => {
    updateResumeData('projects',
      projects.filter(p => p.id !== id)
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__section">

        <div className="form__section-title">
          <FolderOpen size={24} color="var(--primary)" />
          Projects
        </div>
        <p className="form__section-subtitle">
          Showcase your portfolio — this is the most important 
          section for freshers!
        </p>

        <div className="form__tip">
          <Sparkles size={16} />
          <span>
            <strong>AI Tip:</strong> Describe your project simply — 
            AI will transform it into powerful, professional bullet 
            points that impress any recruiter!
          </span>
        </div>

        {projects.length === 0 && (
          <div className="exp__empty">
            <FolderOpen size={40} color="var(--text-light)" />
            <p>No projects added yet!</p>
            <span>
              Add at least 2-3 projects — 
              this is your strongest asset as a fresher!
            </span>
          </div>
        )}

        {projects.map((proj, index) => (
          <div key={proj.id} className="edu__card">
            <div className="edu__card-header">
              <span className="edu__card-title">
                🚀 Project {index + 1}
              </span>
              <button
                type="button"
                className="edu__remove-btn"
                onClick={() => removeProject(proj.id)}
              >
                Remove
              </button>
            </div>

            <div className="form__grid">

              <div className="form__field">
                <label>Project Name <span>*</span></label>
                <input
                  className="form__input"
                  type="text"
                  name="name"
                  placeholder="Ex: AI Resume Builder"
                  value={proj.name}
                  onChange={(e) => handleChange(proj.id, e)}
                  required
                />
              </div>

              <div className="form__field">
                <label>Tech Stack Used <span>*</span></label>
                <input
                  className="form__input"
                  type="text"
                  name="techStack"
                  placeholder="Ex: React, Node.js, MongoDB, Gemini API"
                  value={proj.techStack}
                  onChange={(e) => handleChange(proj.id, e)}
                  required
                />
              </div>

              <div className="form__field">
                <label>
                  <GitBranch size={14} /> GitHub Link
                </label>
                <input
                  className="form__input"
                  type="url"
                  name="github"
                  placeholder="github.com/username/project"
                  value={proj.github}
                  onChange={(e) => handleChange(proj.id, e)}
                />
              </div>

              <div className="form__field">
                <label>
                  <Globe size={14} /> Live Demo URL
                </label>
                <input
                  className="form__input"
                  type="url"
                  name="liveUrl"
                  placeholder="project-name.vercel.app"
                  value={proj.liveUrl}
                  onChange={(e) => handleChange(proj.id, e)}
                />
              </div>

              <div className="form__field form__grid--full">
                <label>Project Description <span>*</span></label>
                <textarea
                  className="form__input"
                  name="description"
                  placeholder="Ex: Built an AI-powered resume builder where users fill their details and Gemini AI generates professional content. Features include authentication, live preview, and PDF download."
                  value={proj.description}
                  onChange={(e) => handleChange(proj.id, e)}
                  rows={3}
                  required
                />
              </div>

              <div className="form__field form__grid--full">
                <label>Key Features & Highlights</label>
                <textarea
                  className="form__input"
                  name="highlights"
                  placeholder={`Ex:\n- AI content generation using Gemini API\n- User authentication with LocalStorage\n- Real-time resume preview\n- One-click PDF download`}
                  value={proj.highlights}
                  onChange={(e) => handleChange(proj.id, e)}
                  rows={4}
                />
              </div>

            </div>
          </div>
        ))}

        <button
          type="button"
          className="form__add-btn"
          onClick={addProject}
        >
          <Plus size={18} />
          {projects.length === 0
            ? '+ Add Your First Project'
            : '+ Add Another Project'}
        </button>

      </div>

      <div className="form__navigation">
        <button
          type="button"
          className="form__btn form__btn--prev"
          onClick={onPrev}
        >
          ← Previous
        </button>
        <button type="submit" className="form__btn form__btn--next">
          Preview My Resume →
        </button>
      </div>
    </form>
  )
}

export default Projects