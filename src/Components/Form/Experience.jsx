import { useApp } from '../../context/ResumeContext'
import { Briefcase, Plus, Sparkles } from 'lucide-react'

function Experience({ onNext, onPrev }) {
  const { resumeData, updateResumeData } = useApp()
  const experiences = resumeData.experience

  const handleChange = (id, e) => {
    const updated = experiences.map(exp =>
      exp.id === id ? { ...exp, [e.target.name]: e.target.value } : exp
    )
    updateResumeData('experience', updated)
  }

  const addExperience = () => {
    updateResumeData('experience', [...experiences, {
      id: Date.now(),
      company: '', role: '', startDate: '',
      endDate: '', isCurrently: false,
      description: '', location: '', type: ''
    }])
  }

  const removeExperience = (id) => {
    updateResumeData('experience',
      experiences.filter(exp => exp.id !== id)
    )
  }

  const toggleCurrently = (id) => {
    updateResumeData('experience',
      experiences.map(exp =>
        exp.id === id
          ? { ...exp, isCurrently: !exp.isCurrently }
          : exp
      )
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
          <Briefcase size={24} color="var(--primary)" />
          Work Experience
        </div>
        <p className="form__section-subtitle">
          Internships, full-time roles, freelance — add everything!
        </p>

        <div className="form__tip">
          <Sparkles size={16} />
          <span>
            <strong>AI Tip:</strong> Describe your work simply —
            AI will enhance it into powerful professional bullet points!
          </span>
        </div>

        {experiences.length === 0 && (
          <div className="exp__empty">
            <Briefcase size={40} color="var(--text-light)" />
            <p>No experience added yet</p>
            <span>
              No experience? No problem —
              a strong projects section works just as well!
            </span>
          </div>
        )}

        {experiences.map((exp, index) => (
          <div key={exp.id} className="edu__card">
            <div className="edu__card-header">
              <span className="edu__card-title">
                💼 Experience {index + 1}
              </span>
              <button
                type="button"
                className="edu__remove-btn"
                onClick={() => removeExperience(exp.id)}
              >
                Remove
              </button>
            </div>

            <div className="form__grid">

              <div className="form__field">
                <label>Company Name <span>*</span></label>
                <input
                  className="form__input"
                  type="text"
                  name="company"
                  placeholder="Ex: Google, TCS, Startup Name"
                  value={exp.company}
                  onChange={(e) => handleChange(exp.id, e)}
                  required
                />
              </div>

              <div className="form__field">
                <label>Job Title / Role <span>*</span></label>
                <input
                  className="form__input"
                  type="text"
                  name="role"
                  placeholder="Ex: Frontend Developer Intern"
                  value={exp.role}
                  onChange={(e) => handleChange(exp.id, e)}
                  required
                />
              </div>

              <div className="form__field">
                <label>Location</label>
                <input
                  className="form__input"
                  type="text"
                  name="location"
                  placeholder="Mumbai / Remote"
                  value={exp.location}
                  onChange={(e) => handleChange(exp.id, e)}
                />
              </div>

              <div className="form__field">
                <label>Employment Type</label>
                <select
                  className="form__input"
                  name="type"
                  value={exp.type}
                  onChange={(e) => handleChange(exp.id, e)}
                >
                  <option value="">Select Type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className="form__field">
                <label>Start Date <span>*</span></label>
                <input
                  className="form__input"
                  type="month"
                  name="startDate"
                  value={exp.startDate}
                  onChange={(e) => handleChange(exp.id, e)}
                  required
                />
              </div>

              <div className="form__field">
                <label>End Date</label>
                <input
                  className="form__input"
                  type="month"
                  name="endDate"
                  value={exp.endDate}
                  onChange={(e) => handleChange(exp.id, e)}
                  disabled={exp.isCurrently}
                />
                <label className="exp__checkbox">
                  <input
                    type="checkbox"
                    checked={exp.isCurrently}
                    onChange={() => toggleCurrently(exp.id)}
                  />
                  Currently working here
                </label>
              </div>

              <div className="form__field form__grid--full">
                <label>Responsibilities & Achievements <span>*</span></label>
                <textarea
                  className="form__input"
                  name="description"
                  placeholder="Describe what you did here..."
                  value={exp.description}
                  onChange={(e) => handleChange(exp.id, e)}
                  rows={4}
                  required
                />
              </div>

            </div>
          </div>
        ))}

        <button
          type="button"
          className="form__add-btn"
          onClick={addExperience}
        >
          <Plus size={18} />
          {experiences.length === 0
            ? '+ Add Work Experience'
            : '+ Add Another Experience'}
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
          Save & Continue →
        </button>
      </div>
    </form>
  )
}

export default Experience