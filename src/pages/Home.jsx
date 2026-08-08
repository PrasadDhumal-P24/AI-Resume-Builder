import {
  FileText, Zap, Download, Star,
  CheckCircle, Sparkles, ArrowRight,
  Brain, Palette, Shield
} from 'lucide-react'
import './Home.css'
import { Link } from 'react-router-dom'
import FeedbackSection from '../Components/Feedback/FeedbackSection'

function Home() {
  return (
    <div className="home">
      {/* ===== HERO SECTION ===== */}
      <section className="hero">

        {/* Background blobs */}
        <div className="hero__blob hero__blob--1"></div>
        <div className="hero__blob hero__blob--2"></div>

        <div className="hero__content">
          {/* Badge */}
          <div className="hero__badge">
            <Sparkles size={14} />
            <span>AI-Powered Resume Builder</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero__title">
            Create Your Dream
            <span className="hero__title--gradient"> Resume </span>
            in Minutes
          </h1>

          {/* Subtext */}
          <p className="hero__subtitle">
            Let AI transform your experience into a professional,
            ATS-friendly resume that gets you noticed by top recruiters.
          </p>

          {/* CTA Buttons */}
          <div className="hero__buttons">
            <Link to="/signup" className="hero__btn hero__btn--primary">
              Build My Resume Free
              <ArrowRight size={18} />
            </Link>
            <button className="hero__btn hero__btn--secondary">
              See Example
            </button>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            <div className="hero__stat">
              <strong>10K+</strong>
              <span>Resumes Created</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <strong>95%</strong>
              <span>Success Rate</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <strong>Free</strong>
              <span>No Credit Card</span>
            </div>
          </div>
        </div>

        {/* Resume Mockup - Pure CSS */}
        <div className="hero__mockup">
          <div className="mockup__card">

            {/* Mockup Header */}
            <div className="mockup__header">
              <div className="mockup__avatar">YD</div>
              <div className="mockup__info">
                <div className="mockup__name">Youn Dongju</div>
                <div className="mockup__role">Full Stack Developer</div>
              </div>
              <div className="mockup__ai-badge">
                <Brain size={12} />
                AI Enhanced
              </div>
            </div>

            {/* Mockup Lines */}
            <div className="mockup__section">
              <div className="mockup__label">Experience</div>
              <div className="mockup__line mockup__line--full"></div>
              <div className="mockup__line mockup__line--medium"></div>
              <div className="mockup__line mockup__line--small"></div>
            </div>

            <div className="mockup__section">
              <div className="mockup__label">Skills</div>
              <div className="mockup__tags">
                <span className="mockup__tag">React</span>
                <span className="mockup__tag">Node.js</span>
                <span className="mockup__tag">Python</span>
                <span className="mockup__tag">AWS</span>
              </div>
            </div>

            <div className="mockup__section">
              <div className="mockup__label">Education</div>
              <div className="mockup__line mockup__line--full"></div>
              <div className="mockup__line mockup__line--medium"></div>
            </div>

            {/* Score Badge */}
            <div className="mockup__score">
              <CheckCircle size={14} color="#10B981" />
              <span>ATS Score: 98%</span>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="floating__card floating__card--1">
            <Zap size={16} color="#6C63FF" />
            <span>AI Writing...</span>
          </div>
          <div className="floating__card floating__card--2">
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <span>Recruiter Loved it!</span>
          </div>
        </div>

      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features">
        <div className="features__header">
          <h2 className="features__title">Why Choose <span>ResumeAI?</span></h2>
          <p className="features__subtitle">
            Everything you need to land your dream job
          </p>
        </div>

        <div className="features__grid">
          <div className="feature__card">
            <div className="feature__icon feature__icon--purple">
              <Brain size={28} />
            </div>
            <h3>AI-Powered Writing</h3>
            <p>Our AI transforms your raw experience into powerful,
              professional bullet points that impress recruiters.</p>
          </div>

          <div className="feature__card feature__card--highlighted">
            <div className="feature__icon feature__icon--white">
              <Shield size={28} />
            </div>
            <h3>ATS Friendly</h3>
            <p>Every resume is optimized to pass Applicant Tracking
              Systems used by 99% of Fortune 500 companies.</p>
            <div className="feature__badge">Most Popular</div>
          </div>

          <div className="feature__card">
            <div className="feature__icon feature__icon--purple">
              <Palette size={28} />
            </div>
            <h3>Beautiful Templates</h3>
            <p>Choose from professionally designed templates that
              make your resume stand out from the crowd.</p>
          </div>

          <div className="feature__card">
            <div className="feature__icon feature__icon--purple">
              <Download size={28} />
            </div>
            <h3>Instant PDF Download</h3>
            <p>Download your perfect resume as a PDF instantly,
              ready to send to any employer worldwide.</p>
          </div>

          <div className="feature__card">
            <div className="feature__icon feature__icon--purple">
              <Zap size={28} />
            </div>
            <h3>Build in Minutes</h3>
            <p>No more hours of formatting. Fill in your details
              and let AI do the heavy lifting for you.</p>
          </div>

          <div className="feature__card">
            <div className="feature__icon feature__icon--purple">
              <Star size={28} />
            </div>
            <h3>100% Free</h3>
            <p>Create, edit, and download your resume completely
              free. No hidden charges, ever.</p>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how">
        <div className="features__header">
          <h2 className="features__title">How It <span>Works?</span></h2>
          <p className="features__subtitle">3 simple steps to your perfect resume</p>
        </div>

        <div className="how__steps">
          <div className="how__step">
            <div className="how__number">01</div>
            <div className="how__icon"><FileText size={32} /></div>
            <h3>Fill Your Details</h3>
            <p>Enter your education, experience, skills and projects in our simple form</p>
          </div>
          <div className="how__arrow">→</div>
          <div className="how__step">
            <div className="how__number">02</div>
            <div className="how__icon"><Brain size={32} /></div>
            <h3>AI Enhances It</h3>
            <p>Our AI rewrites and polishes your content to sound professional</p>
          </div>
          <div className="how__arrow">→</div>
          <div className="how__step">
            <div className="how__number">03</div>
            <div className="how__icon"><Download size={32} /></div>
            <h3>Download PDF</h3>
            <p>Preview your beautiful resume and download it instantly as PDF</p>
          </div>
        </div>
      </section>
      {/* ===== FEEDBACK ===== */}
      <section className="feedback">
        <div className="features__header">
          <h2 className="features__title">
            What Users Say <span>About ResumeAI?</span>
          </h2>
          <p className="features__subtitle">
            Real feedback from real users
          </p>
        </div>
        <FeedbackSection />
      </section>

    </div>
  )
}

export default Home