import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const handleLink = (action) => {
    if (onNavigate) {
      onNavigate(action);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      borderTop: '1px solid #E5E7EB',
      background: '#FAFAFA',
      padding: '4rem 0 2rem',
      marginTop: 'auto',
      color: '#111827'
    }}>
      <div className="container-xl px-3 px-sm-4">
        
        {/* Main Footer Row */}
        <div className="row g-4 mb-4 pb-3">
          
          {/* Brand & Info Column */}
          <div className="col-12 col-lg-4 pe-lg-4">
            <div 
              onClick={() => handleLink('home')}
              className="d-flex align-items-center gap-2 mb-2"
              style={{ cursor: 'pointer', display: 'inline-flex' }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)',
                flexShrink: 0
              }}>
                <GraduationCap size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#111827', lineHeight: '1.1' }}>
                  Future<span style={{ color: '#4F46E5' }}>Path</span>
                </div>
                <div style={{ fontSize: '0.725rem', color: '#6B7280', fontWeight: '500' }}>
                  Your Guide to a Brighter Tomorrow
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '0.875rem',
              color: '#6B7280',
              lineHeight: '1.6',
              marginTop: '0.85rem',
              marginBottom: '1.25rem',
              maxWidth: '380px'
            }}>
              FuturePath helps students explore education and career options after 10th and 12th with clear guidance, verified information, and a simpler way to plan their future.
            </p>

            {/* Social Links */}
            <div className="d-flex align-items-center gap-2">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-btn"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-btn"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="social-btn"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-btn"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: EXPLORE */}
          <div className="col-6 col-sm-6 col-lg-2">
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.1rem',
              color: '#111827'
            }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button onClick={() => handleLink('home')} className="footer-nav-link">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('guidance-wizard')} className="footer-nav-link">
                  Guidance Explorer
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('pathways')} className="footer-nav-link">
                  Roadmaps
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('courses')} className="footer-nav-link">
                  Courses
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('careers')} className="footer-nav-link">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('colleges')} className="footer-nav-link">
                  Colleges
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('faq')} className="footer-nav-link">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: STUDENT */}
          <div className="col-6 col-sm-6 col-lg-2">
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.1rem',
              color: '#111827'
            }}>
              Student
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button onClick={() => handleLink('bookmarks')} className="footer-nav-link">
                  My Shortlist
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('compare')} className="footer-nav-link">
                  Compare Courses
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('login')} className="footer-nav-link">
                  Login
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('register')} className="footer-nav-link">
                  Register
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: GUIDANCE PATHWAYS */}
          <div className="col-6 col-sm-6 col-lg-2">
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.1rem',
              color: '#111827'
            }}>
              Guidance Pathways
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button onClick={() => handleLink('pathway-10th')} className="footer-nav-link">
                  After 10th
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('pathway-12th-science')} className="footer-nav-link">
                  After 12th Science
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('pathway-12th-commerce')} className="footer-nav-link">
                  After 12th Commerce
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('pathway-12th-arts')} className="footer-nav-link">
                  After 12th Arts
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('pathway-bca-it')} className="footer-nav-link">
                  BCA & IT
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: HELP */}
          <div className="col-6 col-sm-6 col-lg-2">
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.1rem',
              color: '#111827'
            }}>
              Help
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button onClick={() => handleLink('about')} className="footer-nav-link">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('contact')} className="footer-nav-link">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('privacy')} className="footer-nav-link">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('terms')} className="footer-nav-link">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('admin-login')} className="footer-nav-link">
                  Admin Login
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Tagline Bar */}
        <div style={{
          borderTop: '1px solid #E5E7EB',
          paddingTop: '1.5rem',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#6B7280'
        }}>
          <div>
            © 2026 FuturePath. All rights reserved.
          </div>
          <div>
            <span style={{
              fontStyle: 'italic',
              fontFamily: 'cursive, Georgia, serif',
              color: '#4F46E5',
              fontSize: '1rem',
              letterSpacing: '0.02em',
              fontWeight: '600'
            }}>
              Explore Today. Build Tomorrow.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
