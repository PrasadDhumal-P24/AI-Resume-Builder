import { useApp } from '../../context/ResumeContext'
import { Code, Sparkles } from 'lucide-react'

function Skills({ onNext, onPrev }) {
  const { resumeData, updateResumeData } = useApp()
  const skills = resumeData.skills

  const handleChange = (e) => {
    updateResumeData('skills', {
      ...skills,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__section">

        <div className="form__section-title">
          <Code size={24} color="var(--primary)" />
          Skills
        </div>
        <p className="form__section-subtitle">
          Showcase all your technical and professional skills
        </p>

        <div className="form__tip">
          <Sparkles size={16} />
          <span>
            <strong>AI Tip:</strong> List comma-separated skills — 
            "React, JavaScript, CSS" and AI will format them into 
            a clean, recruiter-friendly skills section!
          </span>
        </div>

        <div className="form__grid">

          <div className="form__field form__grid--full">
            <label>Technical Skills <span>*</span></label>
            <textarea
              className="form__input"
              name="technical"
              placeholder="Ex: HTML, CSS, JavaScript, React.js, Node.js, Python, SQL, MongoDB"
              value={skills.technical}
              onChange={handleChange}
              rows={3}
              required
            />
            <span className="form__hint">
              💡 Programming languages, frameworks, and libraries
            </span>
          </div>

          <div className="form__field form__grid--full">
            <label>Tools & Technologies</label>
            <textarea
              className="form__input"
              name="tools"
              placeholder="Ex: Git, GitHub, VS Code, Figma, Postman, Firebase, AWS, Docker"
              value={skills.tools}
              onChange={handleChange}
              rows={3}
            />
            <span className="form__hint">
              💡 Developer tools, platforms, and software
            </span>
          </div>

          <div className="form__field">
            <label>Soft Skills</label>
            <textarea
              className="form__input"
              name="soft"
              placeholder="Ex: Team Leadership, Problem Solving, Effective Communication, Time Management"
              value={skills.soft}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form__field">
            <label>Languages Known</label>
            <textarea
              className="form__input"
              name="languages"
              placeholder="Ex: English (Fluent), Hindi (Native), Marathi (Native)"
              value={skills.languages}
              onChange={handleChange}
              rows={3}
            />
          </div>

        </div>
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
          Save & Continue →
        </button>
      </div>
    </form>
  )
}

export default Skills