import { useApp } from '../../context/ResumeContext'
import { User, Sparkles } from 'lucide-react'

function PersonalInfo({ onNext }) {
  const { resumeData, updateResumeData } = useApp()
  const data = resumeData.personalInfo

  const handleChange = (e) => {
    updateResumeData('personalInfo', {
      ...data,
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
          <User size={24} color="var(--primary)" />
          Personal Information
        </div>
        <p className="form__section-subtitle">
          Your basic details that appear at the top of your resume
        </p>

        <div className="form__tip">
          <Sparkles size={16} />
          <span>
            <strong>AI Tip:</strong> In your summary, mention your 
            top 2-3 skills and career goal — our AI will transform 
            it into a powerful professional statement!
          </span>
        </div>

        <div className="form__grid">

          <div className="form__field">
            <label>Full Name <span>*</span></label>
            <input
              className="form__input"
              type="text"
              name="fullName"
              placeholder="Ex: Rahul Sharma"
              value={data.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__field">
            <label>Email Address <span>*</span></label>
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="rahul@gmail.com"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__field">
            <label>Phone Number <span>*</span></label>
            <input
              className="form__input"
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={data.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__field">
            <label>Location <span>*</span></label>
            <input
              className="form__input"
              type="text"
              name="location"
              placeholder="Mumbai, Maharashtra"
              value={data.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__field">
            <label>LinkedIn URL</label>
            <input
              className="form__input"
              type="url"
              name="linkedin"
              placeholder="linkedin.com/in/rahulsharma"
              value={data.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="form__field">
            <label>GitHub URL</label>
            <input
              className="form__input"
              type="url"
              name="github"
              placeholder="github.com/rahulsharma"
              value={data.github}
              onChange={handleChange}
            />
          </div>

          <div className="form__field form__grid--full">
            <label>Portfolio Website</label>
            <input
              className="form__input"
              type="url"
              name="portfolio"
              placeholder="rahulsharma.dev"
              value={data.portfolio}
              onChange={handleChange}
            />
          </div>

          <div className="form__field form__grid--full">
            <label>Professional Summary <span>*</span></label>
            <textarea
              className="form__input"
              name="summary"
              placeholder="Ex: Passionate React developer with hands-on experience building web applications. Skilled in JavaScript, React, and Node.js. Seeking opportunities to contribute to innovative teams..."
              value={data.summary}
              onChange={handleChange}
              rows={4}
              required
              maxLength={500}
            />
            <span className="form__char-count">
              {data.summary.length}/500
            </span>
          </div>

        </div>
      </div>

      <div className="form__navigation">
        <div></div>
        <button type="submit" className="form__btn form__btn--next">
          Save & Continue →
        </button>
      </div>
    </form>
  )
}

export default PersonalInfo