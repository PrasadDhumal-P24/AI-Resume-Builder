import { useState } from 'react'
import { useApp } from '../../context/ResumeContext'
import { usePDF } from 'react-to-pdf'
import { Download, Upload } from 'lucide-react'
import './ResumePreview.css'

function ResumePreview() {
  const { resumeData } = useApp()
  const { personalInfo, education, experience, skills, projects } = resumeData
  const [photo, setPhoto] = useState(null)

  const { toPDF, targetRef } = usePDF({
    filename: `${personalInfo.fullName || 'resume'}_resume.pdf`,
    page: {
      margin: 5,
      format: 'A4',
      orientation: 'portrait'
    }
  })

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setPhoto(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="resume__wrapper">

      {/* Download Bar */}
      <div className="resume__download-bar">
        <div className="resume__download-info">
          <span>✅ Your resume is ready!</span>
          <p>Upload photo and download as PDF</p>
        </div>
        <div className="resume__download-actions">
          <label className="resume__photo-btn">
            <Upload size={16} />
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </label>
          <button className="resume__download-btn" onClick={toPDF}>
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Mobile Scroll Hint */}
      <div className="resume__scroll-hint">
        ← Scroll horizontally to see full resume →
      </div>

      {/* Scrollable Preview Container */}
      <div className="resume__scroll-container">
        {/* Resume Paper - A4 Fixed Width */}
        <div ref={targetRef} className="resume__paper">

          {/* HEADER */}
          <div className="resume__header-box">
            <div className="resume__header-left">
              <h1 className="resume__name">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {education[0]?.degree && (
                <p className="resume__degree-tag">
                  {education[0].degree}
                  {education[0].field && ` in ${education[0].field}`}
                </p>
              )}
            </div>
            <div className="resume__photo-box">
              {photo ? (
                <img src={photo} alt="Profile" className="resume__photo-img" />
              ) : (
                <div className="resume__photo-empty">Photo</div>
              )}
            </div>
          </div>

          {/* Contact Row */}
          <div className="resume__contact-row">
            {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>💼 LinkedIn</span>}
            {personalInfo.github && <span>🔗 GitHub</span>}
          </div>

          <div className="resume__thick-line"></div>

          {/* CAREER OBJECTIVE */}
          {personalInfo.summary && (
            <div className="resume__full-section">
              <div className="resume__sec-title">CAREER OBJECTIVE</div>
              <div className="resume__thin-line"></div>
              <p className="resume__objective-text">{personalInfo.summary}</p>
            </div>
          )}

          {/* TWO COLUMNS */}
          <div className="resume__two-col">

            {/* LEFT COLUMN */}
            <div className="resume__col-left">

              {/* Programming Languages */}
              {skills.programmingLangs && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">PROGRAMMING LANGUAGES</div>
                  <div className="resume__thin-line"></div>
                  <div className="resume__lang-grid">
                    {skills.programmingLangs.split(',').map((lang, i) => {
                      const l = lang.trim().toLowerCase()
                      const emoji =
                        l.includes('c++') ? '⊕' :
                          l.includes('java') && !l.includes('script') ? '☕' :
                            l.includes('python') ? '🐍' :
                              l.includes('html') ? '🌐' :
                                l.includes('css') ? '🎨' :
                                  l.includes('javascript') || l.includes('js') ? '⚡' : '◉'
                      return (
                        <div key={i} className="resume__lang-item">
                          <span>{emoji}</span>
                          <span>{lang.trim()}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Technical Skills */}
              {skills.technical && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">TECHNICAL SKILLS</div>
                  <div className="resume__thin-line"></div>
                  <ul className="resume__bullet-list">
                    {skills.technical.split(',').map((s, i) => (
                      <li key={i}>◉ {s.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tools */}
              {skills.tools && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">TOOLS & TECHNOLOGIES</div>
                  <div className="resume__thin-line"></div>
                  <ul className="resume__bullet-list">
                    {skills.tools.split(',').map((s, i) => (
                      <li key={i}>✦ {s.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education */}
              {education.some(e => e.institution) && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">ACADEMIC QUALIFICATIONS</div>
                  <div className="resume__thin-line"></div>
                  <table className="resume__edu-table">
                    <thead>
                      <tr>
                        <th>Degree</th>
                        <th>Institution</th>
                        <th>Year</th>
                        <th>%/CGPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {education.map(edu => (
                        edu.institution && (
                          <tr key={edu.id}>
                            <td>{edu.degree?.includes('(')
                              ? edu.degree.split('(')[0].trim()
                              : edu.degree}
                            </td>
                            <td>{edu.institution}</td>
                            <td>{edu.endYear || edu.startYear}</td>
                            <td>{edu.cgpa || '-'}</td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Experience */}
              {experience.some(e => e.company) && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">INTERNSHIP / EXPERIENCE</div>
                  <div className="resume__thin-line"></div>
                  {experience.map(exp => (
                    exp.company && (
                      <div key={exp.id} className="resume__exp-block">
                        <div className="resume__exp-role">{exp.role}</div>
                        <div className="resume__exp-co">
                          {exp.company}
                          {exp.type && ` | ${exp.type}`}
                          {exp.location && ` | ${exp.location}`}
                        </div>
                        <div className="resume__exp-dates">
                          {exp.startDate} — {exp.isCurrently ? 'Present' : exp.endDate}
                        </div>
                        {exp.description && (
                          <ul className="resume__bullet-list">
                            {exp.description.split('\n')
                              .filter(l => l.trim())
                              .map((line, i) => (
                                <li key={i}>{line.replace(/^[•\-]\s*/, '')}</li>
                              ))}
                          </ul>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Strengths */}
              {skills.soft && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">STRENGTHS</div>
                  <div className="resume__thin-line"></div>
                  <ul className="resume__bullet-list">
                    {skills.soft.split(',').map((s, i) => (
                      <li key={i}>✦ {s.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {skills.languages && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">LANGUAGES KNOWN</div>
                  <div className="resume__thin-line"></div>
                  <ul className="resume__bullet-list">
                    {skills.languages.split(',').map((l, i) => (
                      <li key={i}>✦ {l.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hobbies */}
              {skills.hobbies && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">HOBBIES & INTERESTS</div>
                  <div className="resume__thin-line"></div>
                  <ul className="resume__bullet-list">
                    {skills.hobbies.split(',').map((h, i) => {
                      const hobby = h.trim().toLowerCase()
                      const emoji =
                        hobby.includes('chess') ? '♟️' :
                          hobby.includes('travel') ? '✈️' :
                            hobby.includes('music') ? '🎵' :
                              hobby.includes('cricket') ? '🏏' :
                                hobby.includes('read') ? '📚' :
                                  hobby.includes('cod') ? '💻' :
                                    hobby.includes('photo') ? '📷' :
                                      hobby.includes('game') ? '🎮' : '⭐'
                      return <li key={i}>{emoji} {h.trim()}</li>
                    })}
                  </ul>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN */}
            <div className="resume__col-right">

              {/* Projects */}
              {projects.some(p => p.name) && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">PROJECTS</div>
                  <div className="resume__thin-line"></div>
                  {projects.map((proj, idx) => (
                    proj.name && (
                      <div key={proj.id} className="resume__proj-block">
                        <div className="resume__proj-name">
                          {idx + 1}. {proj.name}
                        </div>
                        {proj.techStack && (
                          <div className="resume__proj-stack">
                            Tech: {proj.techStack}
                          </div>
                        )}
                        {proj.github && (
                          <div className="resume__proj-link">
                            GitHub: {proj.github}
                          </div>
                        )}
                        {proj.liveUrl && (
                          <div className="resume__proj-link">
                            Live: {proj.liveUrl}
                          </div>
                        )}
                        {proj.description && (
                          <p className="resume__proj-desc">{proj.description}</p>
                        )}
                        {proj.highlights && (
                          <ul className="resume__bullet-list">
                            {proj.highlights.split('\n')
                              .filter(l => l.trim())
                              .map((line, i) => (
                                <li key={i}>{line.replace(/^[•\-]\s*/, '')}</li>
                              ))}
                          </ul>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Certificates */}
              {skills.certificates && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">CERTIFICATES & COURSES</div>
                  <div className="resume__thin-line"></div>
                  <ul className="resume__bullet-list">
                    {skills.certificates.split(',').map((c, i) => (
                      <li key={i}>✦ {c.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {education.some(e => e.achievements) && (
                <div className="resume__col-section">
                  <div className="resume__sec-title">ACHIEVEMENTS</div>
                  <div className="resume__thin-line"></div>
                  <ul className="resume__bullet-list">
                    {education
                      .filter(e => e.achievements)
                      .map(e => (
                        <li key={e.id}>✦ {e.achievements}</li>
                      ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

          {/* DECLARATION */}
          <div className="resume__thick-line"></div>
          <div className="resume__declare">
            <p>
              I hereby declare that the information provided above is
              true and correct to the best of my knowledge and belief.
            </p>
            <div className="resume__sign-area">
              <div className="resume__sign-line"></div>
              <p className="resume__sign-name">
                {personalInfo.fullName || 'Name'}
              </p>
              <p className="resume__sign-label">(Signature)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumePreview