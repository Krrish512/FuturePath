import React from 'react';
import { 
  GraduationCap, 
  Target, 
  Compass, 
  BookOpen, 
  Building2, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Award,
  Users,
  Layers,
  HeartHandshake
} from 'lucide-react';

export default function AboutView({ onExplore, onTakeQuiz }) {
  return (
    <div style={{ paddingBottom: '2.5rem' }}>
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)',
        borderBottom: '1px solid var(--fp-border)',
        padding: '4rem 1.5rem 3.5rem'
      }}>
        <div className="container-xl" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="badge badge-indigo mb-3" style={{ padding: '0.4rem 0.95rem', fontSize: '0.8rem' }}>
            🎓 About FuturePath
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.2', marginBottom: '1rem', color: '#111827' }}>
            Guiding Students Towards <br className="d-none d-sm-inline" />
            <span className="gradient-text">Brighter Educational Futures</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#6B7280', lineHeight: '1.6', maxWidth: '680px', margin: '0 auto 2rem' }}>
            FuturePath is an educational guidance platform designed to help 10th and 12th standard students explore academic options, discover Gujarat institutions, compare degrees, and plan rewarding careers with clarity.
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
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.95rem', background: '#FFFFFF', color: '#111827', borderColor: '#E5E7EB' }}
            >
              <Sparkles size={18} />
              <span>Take Career Quiz</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container-xl px-3 px-sm-4 pt-5" style={{ maxWidth: '1000px' }}>
        
        {/* Why FuturePath & Core Mission */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-6">
            <div className="card h-100 p-4" style={{ borderLeft: '4px solid #4F46E5', background: '#FFFFFF' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: '#EEF2FF',
                color: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Target size={22} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                Why FuturePath?
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: '1.6', marginBottom: 0 }}>
                Choosing an academic path after 10th SSC or 12th HSC is one of the most important decisions a student makes. FuturePath simplifies this journey by bringing together verified educational roadmaps, eligibility criteria, admission details, and career trajectories in one easy-to-use guide.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card h-100 p-4" style={{ borderLeft: '4px solid #10B981', background: '#FFFFFF' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <HeartHandshake size={22} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                Student-First Guidance
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: '1.6', marginBottom: 0 }}>
                Every student has distinct strengths and interests. FuturePath empowers students to explore diverse streams — Science, Commerce, Arts, Polytechnic Diplomas, and IT careers — so they can make confident, well-informed decisions without pressure or confusion.
              </p>
            </div>
          </div>
        </div>

        {/* How Students Explore Options: 3-Step Journey */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <span className="badge badge-indigo mb-2">Student Journey</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>
              How You Can Explore Your Options
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
              A simple, structured approach to discovering your ideal educational trajectory.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card h-100 p-4 text-center" style={{ background: '#FFFFFF' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#EEF2FF',
                  color: '#4F46E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  margin: '0 auto 1rem'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                  Select Qualification & Stream
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                  Choose your current level — 10th Standard or 12th Science, Commerce, or Arts — to filter tailored roadmaps and eligible programs.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 p-4 text-center" style={{ background: '#FFFFFF' }}>
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
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                  Compare Degrees & Diplomas
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                  Review program duration, eligibility criteria, subjects, and compare multiple courses side-by-side using the comparison tool.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 p-4 text-center" style={{ background: '#FFFFFF' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  margin: '0 auto 1rem'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                  Find Gujarat Institutions
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                  Discover accredited schools, colleges, universities, and polytechnics across Ahmedabad, Surat, Vadodara, Rajkot, and Gandhinagar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features for Students */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <span className="badge badge-indigo mb-2">Features & Tools</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>
              Everything You Need in One Place
            </h2>
          </div>

          <div className="row g-3">
            {[
              { 
                icon: Compass, 
                title: 'Guidance Explorer', 
                desc: 'Step-by-step stream filtering and recommendations tailored to your exact 10th or 12th marks and interests.' 
              },
              { 
                icon: Layers, 
                title: 'Academic Roadmaps', 
                desc: 'Clear, multi-step pathways showing how to progress from school to diploma, degree, and professional certifications.' 
              },
              { 
                icon: BookOpen, 
                title: 'Course Comparison', 
                desc: 'Compare up to 3 courses simultaneously on duration, entry requirements, subjects, and future career outcomes.' 
              },
              { 
                icon: Building2, 
                title: 'Gujarat Institutions', 
                desc: 'Curated directory of universities, colleges, and polytechnics across major Gujarat cities with contact details and courses.' 
              },
              { 
                icon: Briefcase, 
                title: 'Career Trajectories', 
                desc: 'Realistic career profiles with required industry skills, job roles, salary bands, and connected academic degrees.' 
              },
              { 
                icon: Sparkles, 
                title: 'Career Aptitude Quiz', 
                desc: 'A quick, friendly interactive assessment that analyzes your interests and suggests the best matching educational streams.' 
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 p-3" style={{ background: '#FFFFFF' }}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: '#EEF2FF',
                        color: '#4F46E5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={18} />
                      </div>
                      <h4 style={{ fontSize: '0.975rem', fontWeight: '700', color: '#111827', marginBottom: 0 }}>
                        {feat.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.825rem', color: '#6B7280', lineHeight: '1.5', marginBottom: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="card p-4 p-md-5 text-center" style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg)'
        }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}>
            Ready to Plan Your Educational Future?
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
            Explore tailored guidance pathways or test your stream suitability with our career aptitude quiz.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={onExplore}
              className="btn btn-secondary"
              style={{
                background: '#FFFFFF',
                color: '#4F46E5',
                fontWeight: '700',
                padding: '0.6rem 1.4rem'
              }}
            >
              Start Guidance Explorer
            </button>
            <button
              onClick={onTakeQuiz}
              className="btn"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontWeight: '600',
                padding: '0.6rem 1.4rem'
              }}
            >
              Take Career Quiz
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
