import { useRef } from 'react'
import { useApp } from '../../context/ResumeContext'
import { Mail, Phone, MapPin, GitBranch, Globe, ExternalLink, Download } from 'lucide-react'
import { usePDF } from 'react-to-pdf'
import './ResumePreview.css'

function ResumePreview() {
  const { resumeData } = useApp()
  const { personalInfo, education, experience, skills, projects } = resumeData
  const { toPDF, targetRef } = usePDF({
    filename: `${personalInfo.fullName || 'resume'}_resume.pdf`,
    page: { margin: 10 }
  })

  return (
    <div className="resume__wrapper">

      {/* Download Button */}
      <div className="resume__download-bar">
        <div className="resume__download-info">
          <span>✅ Your resume is ready!</span>
          <p>Click download to save as PDF</p>
        </div>
        <button className="resume__download-btn" onClick={toPDF}>
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* Resume Paper */}
      <div ref={targetRef} className="resume" id="resume-preview">

        {/* HEADER */}
        <div className="resume__header">
          <h1 className="resume__name">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="resume__contacts">
            {personalInfo.email && (
              <span className="resume__contact">
                <Mail size={11} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="resume__contact">
                <Phone size={11} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="resume__contact">
                <MapPin size={11} /> {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="resume__contact">
                🔗 LinkedIn
              </span>
            )}
            {personalInfo.github && (
              <span className="resume__contact">
                <GitBranch size={11} /> GitHub
              </span>
            )}
            {personalInfo.portfolio && (
              <span className="resume__contact">
                <Globe size={11} /> Portfolio
              </span>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        {personalInfo.summary && (
          <div className="resume__section">
            <h2 className="resume__section-title">Professional Summary</h2>
            <div className="resume__divider"></div>
            <p className="resume__summary">{personalInfo.summary}</p>
          </div>
        )}

        {/* EDUCATION */}
        {education.some(e => e.institution) && (
          <div className="resume__section">
            <h2 className="resume__section-title">Education</h2>
            <div className="resume__divider"></div>
            {education.map(edu => (
              edu.institution && (
                <div key={edu.id} className="resume__item">
                  <div className="resume__item-header">
                    <div>
                      <div className="resume__item-title">
                        {edu.institution}
                      </div>
                      <div className="resume__item-subtitle">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </div>
                    </div>
                    <div className="resume__item-right">
                      {edu.startYear && (
                        <span className="resume__date">
                          {edu.startYear} — {edu.endYear || 'Present'}
                        </span>
                      )}
                      {edu.cgpa && (
                        <span className="resume__badge">{edu.cgpa}</span>
                      )}
                    </div>
                  </div>
                  {edu.achievements && (
                    <p className="resume__desc">{edu.achievements}</p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.some(e => e.company) && (
          <div className="resume__section">
            <h2 className="resume__section-title">Work Experience</h2>
            <div className="resume__divider"></div>
            {experience.map(exp => (
              exp.company && (
                <div key={exp.id} className="resume__item">
                  <div className="resume__item-header">
                    <div>
                      <div className="resume__item-title">{exp.role}</div>
                      <div className="resume__item-subtitle">
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                        {exp.type && ` • ${exp.type}`}
                      </div>
                    </div>
                    <div className="resume__item-right">
                      {exp.startDate && (
                        <span className="resume__date">
                          {exp.startDate} — {exp.isCurrently ? 'Present' : exp.endDate}
                        </span>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <ul className="resume__bullets">
                      {exp.description.split('\n')
                        .filter(line => line.trim())
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

        {/* PROJECTS */}
        {projects.some(p => p.name) && (
          <div className="resume__section">
            <h2 className="resume__section-title">Projects</h2>
            <div className="resume__divider"></div>
            {projects.map(proj => (
              proj.name && (
                <div key={proj.id} className="resume__item">
                  <div className="resume__item-header">
                    <div>
                      <div className="resume__item-title">
                        {proj.name}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="resume__link">
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                      {proj.techStack && (
                        <div className="resume__tech">{proj.techStack}</div>
                      )}
                    </div>
                    {proj.github && (
                      <a href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="resume__ext-link">
                        GitHub
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="resume__desc">{proj.description}</p>
                  )}
                  {proj.highlights && (
                    <ul className="resume__bullets">
                      {proj.highlights.split('\n')
                        .filter(line => line.trim())
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

        {/* SKILLS */}
        {skills.technical && (
          <div className="resume__section">
            <h2 className="resume__section-title">Skills</h2>
            <div className="resume__divider"></div>
            <div className="resume__skills">
              {skills.technical && (
                <div className="resume__skill-row">
                  <span className="resume__skill-label">Technical:</span>
                  <span className="resume__skill-value">{skills.technical}</span>
                </div>
              )}
              {skills.tools && (
                <div className="resume__skill-row">
                  <span className="resume__skill-label">Tools:</span>
                  <span className="resume__skill-value">{skills.tools}</span>
                </div>
              )}
              {skills.soft && (
                <div className="resume__skill-row">
                  <span className="resume__skill-label">Soft Skills:</span>
                  <span className="resume__skill-value">{skills.soft}</span>
                </div>
              )}
              {skills.languages && (
                <div className="resume__skill-row">
                  <span className="resume__skill-label">Languages:</span>
                  <span className="resume__skill-value">{skills.languages}</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ResumePreview