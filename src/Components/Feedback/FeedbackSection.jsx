// import { useState, useEffect } from 'react'
// import { Star, Send } from 'lucide-react'
// import './FeedbackSection.css'

// function FeedbackSection() {
//   const [feedbacks, setFeedbacks] = useState([])
//   const [form, setForm] = useState({ name: '', message: '', rating: 5 })
//   const [submitted, setSubmitted] = useState(false)

//   // Load feedbacks from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem('resumeai_feedbacks')
//     if (saved) setFeedbacks(JSON.parse(saved))
//     else {
//       // Default feedbacks
//       const defaults = [
//         {
//           id: 1,
//           name: 'Rahul S.',
//           message: 'Amazing tool! Got my resume ready in 10 minutes. Highly recommended!',
//           rating: 5
//         },
//         {
//           id: 2,
//           name: 'Priya M.',
//           message: 'The AI enhancement feature is incredible. My resume looks so professional now!',
//           rating: 5
//         },
//         {
//           id: 3,
//           name: 'Amit K.',
//           message: 'Super easy to use. Downloaded my PDF and sent it directly to companies!',
//           rating: 4
//         }
//       ]
//       setFeedbacks(defaults)
//       localStorage.setItem('resumeai_feedbacks', JSON.stringify(defaults))
//     }
//   }, [])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!form.name || !form.message) return

//     const newFeedback = {
//       id: Date.now(),
//       name: form.name,
//       message: form.message,
//       rating: form.rating
//     }

//     const updated = [newFeedback, ...feedbacks]
//     setFeedbacks(updated)
//     localStorage.setItem('resumeai_feedbacks', JSON.stringify(updated))
//     setForm({ name: '', message: '', rating: 5 })
//     setSubmitted(true)
//     setTimeout(() => setSubmitted(false), 3000)
//   }

//   return (
//     <div className="feedback__container">

//       {/* Feedback Cards */}
//       <div className="feedback__grid">
//         {feedbacks.slice(0, 6).map(fb => (
//           <div key={fb.id} className="feedback__card">
//             <div className="feedback__stars">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={14}
//                   fill={i < fb.rating ? '#F59E0B' : 'none'}
//                   color={i < fb.rating ? '#F59E0B' : '#D1D5DB'}
//                 />
//               ))}
//             </div>
//             <p className="feedback__message">"{fb.message}"</p>
//             <div className="feedback__author">— {fb.name}</div>
//           </div>
//         ))}
//       </div>

//       {/* Submit Form */}
//       <div className="feedback__form-wrap">
//         <h3>Share Your Experience 💬</h3>
//         <p>Used ResumeAI? Let others know!</p>

//         {submitted && (
//           <div className="feedback__success">
//             ✅ Thank you for your feedback!
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="feedback__form">
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={form.name}
//             onChange={e => setForm({...form, name: e.target.value})}
//             className="feedback__input"
//             required
//           />

//           <textarea
//             placeholder="Share your experience..."
//             value={form.message}
//             onChange={e => setForm({...form, message: e.target.value})}
//             className="feedback__input feedback__textarea"
//             rows={3}
//             required
//           />

//           {/* Star Rating */}
//           <div className="feedback__rating">
//             <span>Rating:</span>
//             {[1, 2, 3, 4, 5].map(star => (
//               <Star
//                 key={star}
//                 size={24}
//                 fill={star <= form.rating ? '#F59E0B' : 'none'}
//                 color={star <= form.rating ? '#F59E0B' : '#D1D5DB'}
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setForm({...form, rating: star})}
//               />
//             ))}
//           </div>

//           <button type="submit" className="feedback__submit">
//             <Send size={16} />
//             Submit Feedback
//           </button>
//         </form>
//       </div>

//     </div>
//   )
// }

// export default FeedbackSection
import { useState, useEffect } from 'react'
import { Star, Send } from 'lucide-react'
import './FeedbackSection.css'

function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([])
  const [form, setForm] = useState({ name: '', message: '', rating: 5 })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('resumeai_feedbacks')
    if (saved) {
      setFeedbacks(JSON.parse(saved))
    } else {
      const defaults = [
        {
          id: 1,
          name: 'Rahul S.',
          message: 'Amazing tool! Got my resume ready in 10 minutes!',
          rating: 5
        },
        {
          id: 2,
          name: 'Priya M.',
          message: 'The AI enhancement is incredible. Looks so professional!',
          rating: 5
        },
        {
          id: 3,
          name: 'Amit K.',
          message: 'Super easy to use. Downloaded PDF and sent directly!',
          rating: 4
        }
      ]
      setFeedbacks(defaults)
      localStorage.setItem('resumeai_feedbacks', JSON.stringify(defaults))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return

    const newFeedback = {
      id: Date.now(),
      name: form.name,
      message: form.message,
      rating: form.rating
    }

    const updated = [newFeedback, ...feedbacks]
    setFeedbacks(updated)
    localStorage.setItem('resumeai_feedbacks', JSON.stringify(updated))
    setForm({ name: '', message: '', rating: 5 })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="feedback__container">

      {/* Feedback Cards */}
      <div className="feedback__grid">
        {feedbacks.slice(0, 6).map(fb => (
          <div key={fb.id} className="feedback__card">
            <div className="feedback__stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < fb.rating ? '#F59E0B' : 'none'}
                  color={i < fb.rating ? '#F59E0B' : '#D1D5DB'}
                />
              ))}
            </div>
            <p className="feedback__message">"{fb.message}"</p>
            <div className="feedback__author">— {fb.name}</div>
          </div>
        ))}
      </div>

      {/* Submit Form */}
      <div className="feedback__form-wrap">
        <h3>Share Your Experience 💬</h3>
        <p>Used ResumeAI? Let others know!</p>

        {submitted && (
          <div className="feedback__success">
            ✅ Thank you for your feedback!
          </div>
        )}

        <form onSubmit={handleSubmit} className="feedback__form">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            className="feedback__input"
            required
          />
          <textarea
            placeholder="Share your experience with ResumeAI..."
            value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            className="feedback__input feedback__textarea"
            rows={3}
            required
          />
          <div className="feedback__rating">
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={24}
                fill={star <= form.rating ? '#F59E0B' : 'none'}
                color={star <= form.rating ? '#F59E0B' : '#D1D5DB'}
                style={{ cursor: 'pointer' }}
                onClick={() => setForm({...form, rating: star})}
              />
            ))}
          </div>
          <button type="submit" className="feedback__submit">
            <Send size={16} />
            Submit Feedback
          </button>
        </form>
      </div>

    </div>
  )
}

export default FeedbackSection