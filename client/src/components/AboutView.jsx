import React from 'react';
import { 
  GraduationCap, 
  Target, 
  Compass, 
  BookOpen, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  Code2, 
  Layers, 
  Database, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Award,
  Users
} from 'lucide-react';

export default function AboutView({ onExplore, onTakeQuiz }) {
  return (
    <div style={{ minHeight: '80vh', paddingBottom: '4rem' }}>
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)',
        borderBottom: '1px solid var(--fp-border)',
        padding: '4rem 1.5rem 3.5rem'
      }}>
        <div className="container-xl" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span className="badge badge-indigo mb-3" style={{ padding: '0.4rem 0.95rem', fontSize: '0.8rem' }}>
            🎓 About FuturePath Portal
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.2', marginBottom: '1rem', color: 'var(--fp-text)' }}>
            Empowering Students to Make <br className="d-none d-sm-inline" />
            <span className="gradient-text">Informed Education Decisions</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto 2rem' }}>
            FuturePath is an end-to-end academic roadmap and career guidance platform built specifically for 10th and 12th standard students across Gujarat and India to navigate post-secondary education with clarity.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button 
              onClick={onExplore}
              className="btn btn-primary d-flex align-items-center gap-2"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.95rem' }}
            >
              <Compass size={18} />
              <span>Explore Roadmaps</span>
            </button>
            <button 
              onClick={onTakeQuiz}
              className="btn btn-secondary d-flex align-items-center gap-2"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.95rem' }}
            >
              <Sparkles size={18} />
              <span>Take Aptitude Quiz</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container-xl px-3 px-sm-4 pt-5" style={{ maxWidth: '1080px' }}>
        
        {/* Mission & Vision Cards */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-6">
            <div className="card h-100 p-4" style={{ borderLeft: '4px solid var(--fp-primary)' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'var(--fp-primary-soft)',
                color: 'var(--fp-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Target size={22} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--fp-text)', marginBottom: '0.5rem' }}>
                Our Mission
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: 0 }}>
                To bridge the critical guidance gap that millions of high school students face after 10th (SSC) and 12th (HSC) by offering structured, verified, and transparent educational pathways, course details, eligibility criteria, and college affiliations.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card h-100 p-4" style={{ borderLeft: '4px solid #059669' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'var(--fp-success-soft)',
                color: 'var(--fp-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Sparkles size={22} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--fp-text)', marginBottom: '0.5rem' }}>
                Our Core Philosophy
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: 0 }}>
                Every student has distinct talents and interests. Rather than forcing generic choices, FuturePath empowers personalized exploration through interactive stream selectors, career aptitude quizzes, course comparisons, and direct links to authentic government portals.
              </p>
            </div>
          </div>
        </div>

        {/* How FuturePath Works: 3-Step Framework */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <span className="badge badge-indigo mb-2">Methodology</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--fp-text)' }}>
              How FuturePath Guides You
            </h2>
            <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem' }}>
              A structured 3-step decision framework designed for students and parents.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card h-100 p-4 text-center">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--fp-primary-soft)',
                  color: 'var(--fp-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  margin: '0 auto 1rem'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.5rem' }}>
                  Select Qualification
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5' }}>
                  Pick your current qualification (10th SSC or 12th HSC) and stream (Science, Commerce, Arts, or Vocational) to filter relevant paths.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 p-4 text-center">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#FEF3C7',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  margin: '0 auto 1rem'
                }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.5rem' }}>
                  Explore Roadmaps & Courses
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5' }}>
                  Inspect curated academic roadmaps, compare courses side-by-side on duration, eligibility, fees, and career prospects.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 p-4 text-center">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--fp-success-soft)',
                  color: 'var(--fp-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  margin: '0 auto 1rem'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.5rem' }}>
                  Colleges & Action Plan
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5' }}>
                  Discover affiliated colleges in Ahmedabad, Vadodara, and Surat, shortlist your preferences, and access admission portals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <span className="badge badge-indigo mb-2">Platform Capabilities</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--fp-text)' }}>
              Comprehensive Feature Set
            </h2>
          </div>

          <div className="row g-3">
            {[
              { icon: Compass, title: 'Guidance Wizard', desc: 'Step-by-step interactive stream & qualification filter engine with real-time aggregated recommendations.' },
              { icon: BookOpen, title: 'Course Comparison Matrix', desc: 'Side-by-side multi-course comparison comparing duration, fee range, eligibility, and salary outlook.' },
              { icon: Sparkles, title: 'Career Aptitude Quiz', desc: '8-question interactive assessment that maps student interests to optimal career tracks and streams.' },
              { icon: Building2, title: 'College Directory', desc: 'Verified institutions across Gujarat with city filters, accreditation details, and official website links.' },
              { icon: Briefcase, title: 'Career Profiles', desc: 'Detailed career outlooks including required skills, job roles, salary bands, and top recruiters.' },
              { icon: ShieldCheck, title: 'Role-Based Authentication', desc: 'Secure JWT authentication with student bookmarks persistence and full administrative CRUD dashboard.' }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 p-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'var(--fp-primary-soft)',
                        color: 'var(--fp-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={18} />
                      </div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: 0 }}>
                        {feat.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5', marginBottom: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic Context & Tech Stack Architecture */}
        <div className="card p-4 p-md-5 mb-5" style={{ background: '#F8FAFC', borderColor: 'var(--fp-border)' }}>
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="badge badge-indigo mb-2">Academic Project Details</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--fp-text)', marginBottom: '0.75rem' }}>
                BCA Semester 5 — Advanced Web Designing (AWD)
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                This portal was developed as an end-to-end full-stack capstone for the BCA curriculum, demonstrating modern web standards, responsive design, RESTful API architecture, database modeling, and state management.
              </p>
              
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.85rem', color: 'var(--fp-text)' }}>
                  <CheckCircle2 size={16} color="var(--fp-success)" />
                  <span><strong>Full MERN Stack:</strong> MongoDB, Express.js 5, React 19, Node.js</span>
                </div>
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.85rem', color: 'var(--fp-text)' }}>
                  <CheckCircle2 size={16} color="var(--fp-success)" />
                  <span><strong>Clean Architecture:</strong> Controllers, Models, Routes, Services, Middlewares</span>
                </div>
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.85rem', color: 'var(--fp-success)' }}>
                  <CheckCircle2 size={16} color="var(--fp-success)" />
                  <span><strong>Security:</strong> JWT tokens, bcryptjs hashing, RBAC, input sanitization</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="card p-4" style={{ background: '#FFFFFF', borderColor: 'var(--fp-border)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code2 size={18} color="var(--fp-primary)" />
                  <span>Architecture Stack Breakdown</span>
                </h4>
                
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center pb-2" style={{ borderBottom: '1px solid var(--fp-border)', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--fp-text-secondary)' }}>Frontend</span>
                    <span style={{ fontWeight: '700', color: 'var(--fp-text)' }}>React 19 + Vite + CSS System</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pb-2" style={{ borderBottom: '1px solid var(--fp-border)', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--fp-text-secondary)' }}>Backend Server</span>
                    <span style={{ fontWeight: '700', color: 'var(--fp-text)' }}>Node.js + Express 5.x REST API</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pb-2" style={{ borderBottom: '1px solid var(--fp-border)', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--fp-text-secondary)' }}>Database</span>
                    <span style={{ fontWeight: '700', color: 'var(--fp-text)' }}>MongoDB + Mongoose 8.x ODM</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pb-2" style={{ borderBottom: '1px solid var(--fp-border)', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--fp-text-secondary)' }}>Iconography & UI</span>
                    <span style={{ fontWeight: '700', color: 'var(--fp-text)' }}>Lucide React + Custom FP Tokens</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--fp-text-secondary)' }}>External Sources</span>
                    <span style={{ fontWeight: '700', color: 'var(--fp-text)' }}>data.gov.in + Official Portals</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="card p-4 p-md-5 text-center" style={{
          background: 'var(--grad-primary)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)'
        }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.75rem' }}>
            Ready to Discover Your Academic Future?
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
            Start exploring tailored guidance pathways right now or consult our detailed FAQ center.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={onExplore}
              className="btn btn-secondary"
              style={{
                background: '#ffffff',
                color: 'var(--fp-primary)',
                fontWeight: '700',
                padding: '0.6rem 1.4rem'
              }}
            >
              Launch Guidance Wizard
            </button>
            <button
              onClick={onTakeQuiz}
              className="btn"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontWeight: '600',
                padding: '0.6rem 1.4rem'
              }}
            >
              Start Aptitude Quiz
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
