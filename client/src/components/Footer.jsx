import React from 'react';
import { 
  GraduationCap, 
  Map, 
  BookOpen, 
  Briefcase, 
  HelpCircle, 
  Sparkles, 
  Bell, 
  Info, 
  ExternalLink,
  Heart,
  ShieldCheck
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  const handleLink = (tabId) => {
    if (onNavigate) {
      onNavigate(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--fp-border)',
      background: '#F8FAFC',
      padding: '3.5rem 0 2rem',
      marginTop: 'auto',
      color: 'var(--fp-text)'
    }}>
      <div className="container-xl px-3 px-sm-4">
        <div className="row g-4 mb-4">
          
          {/* Brand Column */}
          <div className="col-12 col-lg-4">
            <div 
              onClick={() => handleLink('explore')}
              className="d-flex align-items-center gap-2 mb-3 cursor-pointer"
              style={{ cursor: 'pointer' }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '9px',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
              }}>
                <GraduationCap size={20} />
              </div>
              <div>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--fp-text)' }}>
                  Future<span style={{ color: 'var(--fp-primary)' }}>Path</span>
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              An academic and career guidance platform built for BCA Semester 5 Advanced Web Designing (AWD) to empower 10th and 12th students with clear educational roadmaps, comparisons, and verified government portals.
            </p>

            <div className="d-flex align-items-center gap-2">
              <span className="badge" style={{ background: 'var(--fp-primary-soft)', color: 'var(--fp-primary)', fontSize: '0.725rem', fontWeight: '700' }}>
                BCA Semester 5 Capstone
              </span>
              <span className="badge" style={{ background: 'var(--fp-success-soft)', color: 'var(--fp-success)', fontSize: '0.725rem', fontWeight: '700' }}>
                AWD Project Ready
              </span>
            </div>
          </div>

          {/* Guidance & Tools Column */}
          <div className="col-6 col-md-4 col-lg-2">
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', color: 'var(--fp-text)' }}>
              Guidance
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button 
                  onClick={() => handleLink('explore')}
                  className="btn-link-footer"
                >
                  Guidance Explorer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('pathways')}
                  className="btn-link-footer"
                >
                  Academic Roadmaps
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('courses')}
                  className="btn-link-footer"
                >
                  Degrees & Diplomas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('careers')}
                  className="btn-link-footer"
                >
                  Career Profiles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('colleges')}
                  className="btn-link-footer"
                >
                  Gujarat Colleges
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools Column */}
          <div className="col-6 col-md-4 col-lg-3">
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', color: 'var(--fp-text)' }}>
              Tools & Resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button 
                  onClick={() => handleLink('quiz')}
                  className="btn-link-footer"
                >
                  Career Aptitude Quiz
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('updates')}
                  className="btn-link-footer"
                >
                  Official Portals & Notices
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('about')}
                  className="btn-link-footer"
                >
                  About FuturePath
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('faq')}
                  className="btn-link-footer"
                >
                  Student FAQ & Help
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('bookmarks')}
                  className="btn-link-footer"
                >
                  My Saved Shortlist
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Architecture Column */}
          <div className="col-12 col-md-4 col-lg-3">
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', color: 'var(--fp-text)' }}>
              Stack & Compliance
            </h4>
            <div style={{ fontSize: '0.825rem', color: 'var(--fp-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="d-flex align-items-center gap-2">
                <span style={{ color: 'var(--fp-primary)', fontWeight: '700' }}>⚡ Frontend:</span>
                <span>React 19 + Vite</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span style={{ color: 'var(--fp-primary)', fontWeight: '700' }}>⚙️ Backend:</span>
                <span>Node.js + Express 5</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span style={{ color: 'var(--fp-primary)', fontWeight: '700' }}>🗄️ Database:</span>
                <span>MongoDB + Mongoose</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span style={{ color: 'var(--fp-primary)', fontWeight: '700' }}>🔒 Security:</span>
                <span>JWT Auth + Bcrypt</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span style={{ color: 'var(--fp-primary)', fontWeight: '700' }}>🌐 Live Data:</span>
                <span>data.gov.in Integration</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--fp-border)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.825rem',
          color: 'var(--fp-text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} FuturePath – Student Education & Career Guidance Portal. All rights reserved.
          </div>
          <div className="d-flex align-items-center gap-3">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Crafted with <Heart size={14} color="var(--fp-danger)" fill="var(--fp-danger)" /> for BCA Sem 5 AWD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
