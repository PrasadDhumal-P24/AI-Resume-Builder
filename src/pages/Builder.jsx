// import { useState } from 'react'
// import {
//   User, GraduationCap, Briefcase,
//   Code, FolderOpen, Eye
// } from 'lucide-react'
// import PersonalInfo from '../Components/Form/PersonalInfo'
// import Education from '../Components/Form/Education'
// import Experience from '../Components/Form/Experience'
// import Skills from '../Components/Form/Skills'
// import Projects from '../Components/Form/Projects'
// import ResumePreview from '../Components/Preview/ResumePreview'
// import './Builder.css'
// import AIEnhancer from '../Components/Preview/AIEnhancer'


// const STEPS = [
//   { id: 1, label: 'Personal', icon: User },
//   { id: 2, label: 'Education', icon: GraduationCap },
//   { id: 3, label: 'Experience', icon: Briefcase },
//   { id: 4, label: 'Skills', icon: Code },
//   { id: 5, label: 'Projects', icon: FolderOpen },
//   { id: 6, label: 'Preview', icon: Eye },
// ]

// function Builder() {
//   const [currentStep, setCurrentStep] = useState(1)

//   const goNext = () => {
//     if (currentStep < STEPS.length) setCurrentStep(currentStep + 1)
//   }

//   const goPrev = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1)
//   }

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1: return <PersonalInfo onNext={goNext} />
//       case 2: return <Education onNext={goNext} onPrev={goPrev} />
//       case 3: return <Experience onNext={goNext} onPrev={goPrev} />
//       case 4: return <Skills onNext={goNext} onPrev={goPrev} />
//       case 5: return <Projects onNext={goNext} onPrev={goPrev} />
//       case 6: return (
//         <div>
//           <div className="preview__header">
//             <div>
//               <h2>🎉 Your Resume is Ready!</h2>
//               <p>Use AI to enhance your content, then download as PDF!</p>
//             </div>
//             <button
//               className="form__btn form__btn--prev"
//               onClick={goPrev}
//             >
//               ← Edit Details
//             </button>
//           </div>

//           {/* AI Enhancer */}
//           <AIEnhancer />

//           {/* Resume Preview */}
//           <div className="preview__paper">
//             <ResumePreview />
//           </div>
//         </div>
//       )
//       default: return null
//     }
//   }

//   return (
//     <div className="builder">
//       <div className="builder__progress">
//         <div className="builder__steps">
//           {STEPS.map((step) => {
//             const Icon = step.icon
//             const isCompleted = currentStep > step.id
//             const isActive = currentStep === step.id
//             return (
//               <div key={step.id} className="builder__step-wrap">
//                 <div className={`builder__step
//                   ${isActive ? 'builder__step--active' : ''}
//                   ${isCompleted ? 'builder__step--done' : ''}`}
//                 >
//                   <Icon size={18} />
//                 </div>
//                 <span className={`builder__step-label
//                   ${isActive ? 'builder__step-label--active' : ''}`}
//                 >
//                   {step.label}
//                 </span>
//                 {step.id < STEPS.length && (
//                   <div className={`builder__line
//                     ${isCompleted ? 'builder__line--done' : ''}`}
//                   />
//                 )}
//               </div>
//             )
//           })}
//         </div>
//         <div className="builder__progress-bar">
//           <div
//             className="builder__progress-fill"
//             style={{
//               width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`
//             }}
//           />
//         </div>
//         <p className="builder__progress-text">
//           Step {currentStep} of {STEPS.length}
//           {' — '}{STEPS[currentStep - 1].label}
//         </p>
//       </div>

//       <div className="builder__content">
//         {renderStep()}
//       </div>
//     </div>
//   )
// }

// export default Builder



import { useState, useEffect } from 'react'
import {
  User, GraduationCap, Briefcase,
  Code, FolderOpen, Eye
} from 'lucide-react'
import PersonalInfo from '../Components/Form/PersonalInfo'
import Education from '../Components/Form/Education'
import Experience from '../Components/Form/Experience'
import Skills from '../Components/Form/Skills'
import Projects from '../Components/Form/Projects'
import ResumePreview from '../Components/Preview/ResumePreview'
import AIEnhancer from '../Components/Preview/AIEnhancer'
import './Builder.css'

const STEPS = [
  { id: 1, label: 'Personal', icon: User },
  { id: 2, label: 'Education', icon: GraduationCap },
  { id: 3, label: 'Experience', icon: Briefcase },
  { id: 4, label: 'Skills', icon: Code },
  { id: 5, label: 'Projects', icon: FolderOpen },
  { id: 6, label: 'Preview', icon: Eye },
]

function Builder() {
  // localStorage save!
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('resumeai_step')
    return saved ? parseInt(saved) : 1
  })

  const goNext = () => {
    const next = Math.min(currentStep + 1, STEPS.length)
    setCurrentStep(next)
    localStorage.setItem('resumeai_step', next)
  }

  const goPrev = () => {
    const prev = Math.max(currentStep - 1, 1)
    setCurrentStep(prev)
    localStorage.setItem('resumeai_step', prev)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfo onNext={goNext} />
      case 2: return <Education onNext={goNext} onPrev={goPrev} />
      case 3: return <Experience onNext={goNext} onPrev={goPrev} />
      case 4: return <Skills onNext={goNext} onPrev={goPrev} />
      case 5: return <Projects onNext={goNext} onPrev={goPrev} />
      case 6: return (
        <div>
          <div className="preview__header">
            <div>
              <h2>🎉 Your Resume is Ready!</h2>
              <p>Use AI to enhance your content, then download as PDF!</p>
            </div>
            <button
              className="form__btn form__btn--prev"
              onClick={goPrev}
            >
              ← Edit Details
            </button>
          </div>
          <AIEnhancer />
          <ResumePreview />
        </div>
      )
      default: return null
    }
  }

  return (
    <div className="builder">
      <div className="builder__progress">
        <div className="builder__steps">
          {STEPS.map((step) => {
            const Icon = step.icon
            const isCompleted = currentStep > step.id
            const isActive = currentStep === step.id
            return (
              <div key={step.id} className="builder__step-wrap">
                <div className={`builder__step
                  ${isActive ? 'builder__step--active' : ''}
                  ${isCompleted ? 'builder__step--done' : ''}`}
                >
                  <Icon size={18} />
                </div>
                <span className={`builder__step-label
                  ${isActive ? 'builder__step-label--active' : ''}`}
                >
                  {step.label}
                </span>
                {step.id < STEPS.length && (
                  <div className={`builder__line
                    ${isCompleted ? 'builder__line--done' : ''}`}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="builder__progress-bar">
          <div
            className="builder__progress-fill"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
        <p className="builder__progress-text">
          Step {currentStep} of {STEPS.length} — {STEPS[currentStep - 1].label}
        </p>
      </div>
      <div className="builder__content">
        {renderStep()}
      </div>
    </div>
  )
}

export default Builder