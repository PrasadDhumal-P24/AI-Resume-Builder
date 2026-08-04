import { useApp } from '../../context/ResumeContext'
import { GraduationCap, Plus, Sparkles } from 'lucide-react'

function Education({ onNext, onPrev }) {
  const { resumeData, updateResumeData } = useApp()
  const educations = resumeData.education

  const handleChange = (id, e) => {
    const updated = educations.map(edu =>
      edu.id === id ? { ...edu, [e.target.name]: e.target.value } : edu
    )
    updateResumeData('education', updated)
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      institution: '', degree: '',
      field: '', startYear: '',
      endYear: '', cgpa: '',
      achievements: ''
    }
    updateResumeData('education', [...educations, newEdu])
  }

  const removeEducation = (id) => {
    if (educations.length === 1) return
    updateResumeData('education',
      educations.filter(edu => edu.id !== id)
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
          <GraduationCap size={24} color="var(--primary)" />
          Education
        </div>
        <p className="form__section-subtitle">
          Add your educational background and achievements
        </p>

        <div className="form__tip">
          <Sparkles size={16} />
          <span>
            <strong>AI Tip:</strong> Mention specific achievements 
            like "Secured 1st rank in department" — AI will rewrite 
            them into impactful resume bullet points!
          </span>
        </div>

        {educations.map((edu, index) => (
          <div key={edu.id} className="edu__card">
            <div className="edu__card-header">
              <span className="edu__card-title">
                🎓 Education {index + 1}
              </span>
              {educations.length > 1 && (
                <button
                  type="button"
                  className="edu__remove-btn"
                  onClick={() => removeEducation(edu.id)}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="form__grid">

              <div className="form__field form__grid--full">
                <label>College / University <span>*</span></label>
                <input
                  className="form__input"
                  type="text"
                  name="institution"
                  placeholder="Ex: Mumbai University"
                  value={edu.institution}
                  onChange={(e) => handleChange(edu.id, e)}
                  required
                />
              </div>

              <div className="form__field">
                <label>Degree <span>*</span></label>
                <select
                  className="form__input"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, e)}
                  required
                >
                  <option value="">Select Degree</option>
                  <option>Bachelor of Engineering (B.E.)</option>
                  <option>Bachelor of Technology (B.Tech)</option>
                  <option>Bachelor of Science (B.Sc)</option>
                  <option>Bachelor of Commerce (B.Com)</option>
                  <option>Bachelor of Arts (B.A.)</option>
                  <option>Master of Technology (M.Tech)</option>
                  <option>Master of Science (M.Sc)</option>
                  <option>MBA</option>
                  <option>Diploma</option>
                  <option>HSC (12th)</option>
                  <option>SSC (10th)</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form__field">
                <label>Field of Study <span>*</span></label>
                <input
                  className="form__input"
                  type="text"
                  name="field"
                  placeholder="Ex: Computer Engineering"
                  value={edu.field}
                  onChange={(e) => handleChange(edu.id, e)}
                  required
                />
              </div>

              <div className="form__field">
                <label>Start Year <span>*</span></label>
                <input
                  className="form__input"
                  type="number"
                  name="startYear"
                  placeholder="2021"
                  min="1990" max="2030"
                  value={edu.startYear}
                  onChange={(e) => handleChange(edu.id, e)}
                  required
                />
              </div>

              <div className="form__field">
                <label>End Year (or Expected)</label>
                <input
                  className="form__input"
                  type="number"
                  name="endYear"
                  placeholder="2025"
                  min="1990" max="2030"
                  value={edu.endYear}
                  onChange={(e) => handleChange(edu.id, e)}
                />
              </div>

              <div className="form__field form__grid--full">
                <label>CGPA / Percentage</label>
                <input
                  className="form__input"
                  type="text"
                  name="cgpa"
                  placeholder="Ex: 8.5 / 10 or 85%"
                  value={edu.cgpa}
                  onChange={(e) => handleChange(edu.id, e)}
                />
              </div>

              <div className="form__field form__grid--full">
                <label>Achievements & Activities</label>
                <textarea
                  className="form__input"
                  name="achievements"
                  placeholder="Ex: Class Representative, Won departmental coding competition, Achieved 1st rank in semester..."
                  value={edu.achievements}
                  onChange={(e) => handleChange(edu.id, e)}
                  rows={3}
                />
              </div>

            </div>
          </div>
        ))}

        <button
          type="button"
          className="form__add-btn"
          onClick={addEducation}
        >
          <Plus size={18} />
          Add Another Education
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

export default Education