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
          Skills & More
        </div>
        <p className="form__section-subtitle">
          Showcase all your skills, hobbies and certifications
        </p>

        <div className="form__tip">
          <Sparkles size={16} />
          <span>
            <strong>AI Tip:</strong> List comma-separated values —
            AI will format them professionally!
          </span>
        </div>

        <div className="form__grid">

          {/* Programming Languages - NEW */}
          <div className="form__field form__grid--full">
            <label>Programming Languages</label>
            <textarea
              className="form__input"
              name="programmingLangs"
              placeholder="Ex: C, C++, Java, Python, JavaScript"
              value={skills.programmingLangs || ''}
              onChange={handleChange}
              rows={2}
            />
            <span className="form__hint">
              💡 Core programming languages you know
            </span>
          </div>

          <div className="form__field form__grid--full">
            <label>Technical Skills <span>*</span></label>
            <textarea
              className="form__input"
              name="technical"
              placeholder="Ex: DSA, DBMS, OS, Computer Networks, OOP"
              value={skills.technical}
              onChange={handleChange}
              rows={2}
              required
            />
            <span className="form__hint">
              💡 Core CS subjects and concepts
            </span>
          </div>

          <div className="form__field form__grid--full">
            <label>Tools & Technologies</label>
            <textarea
              className="form__input"
              name="tools"
              placeholder="Ex: Git, GitHub, VS Code, Figma, Postman, Firebase"
              value={skills.tools}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <div className="form__field">
            <label>Soft Skills / Strengths</label>
            <textarea
              className="form__input"
              name="soft"
              placeholder="Ex: Leadership, Problem Solving, Communication"
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

          <div className="form__field">
            <label>Hobbies & Interests</label>
            <textarea
              className="form__input"
              name="hobbies"
              placeholder="Ex: Reading, Coding, Cricket, Photography, Travelling"
              value={skills.hobbies || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form__field">
            <label>Certificates & Courses</label>
            <textarea
              className="form__input"
              name="certificates"
              placeholder="Ex: React JS - Udemy (2024), Python Bootcamp - Coursera (2023)"
              value={skills.certificates || ''}
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