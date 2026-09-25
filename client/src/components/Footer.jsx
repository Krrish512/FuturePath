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
    <footer className="fp-footer">
      <div className="container-xl px-3 px-sm-4">
        
        {/* Main Footer Grid */}
        <div className="fp-footer-grid">
          
          {/* Brand & Description Column */}
          <div className="fp-footer-brand-col">
            <div 
              onClick={() => handleLink('home')}
              className="fp-footer-brand"
              role="button"
              tabIndex={0}
            >
              <div className="fp-footer-logo-icon">
                <GraduationCap size={18} />
              </div>
              <div>
                <div className="fp-footer-logo-title">
                  Future<span>Path</span>
                </div>
                <div className="fp-footer-logo-sub">
                  Your Guide to a Brighter Tomorrow
                </div>
              </div>
            </div>

            <p className="fp-footer-desc">
              Explore education and career options after 10th and 12th with clear, verified guidance.
            </p>

            {/* Social Links (Desktop & Tablet) */}
            <div className="fp-footer-socials d-none d-md-flex">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-btn"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/>
                </svg>
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-btn"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="social-btn"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-btn"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns Wrapper */}
          <div className="fp-footer-nav-cols">
            
            {/* Column 1: EXPLORE */}
            <div className="fp-footer-col">
              <h4 className="fp-footer-heading">Explore</h4>
              <ul className="fp-footer-links">
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
            <div className="fp-footer-col">
              <h4 className="fp-footer-heading">Student</h4>
              <ul className="fp-footer-links">
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
            <div className="fp-footer-col">
              <h4 className="fp-footer-heading">Guidance Pathways</h4>
              <ul className="fp-footer-links">
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
            <div className="fp-footer-col">
              <h4 className="fp-footer-heading">Help</h4>
              <ul className="fp-footer-links">
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
              </ul>
            </div>

          </div>

        </div>

        {/* Social Links on Mobile */}
        <div className="d-flex d-md-none justify-content-center align-items-center gap-2 my-2 pt-1">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="social-btn"
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/>
            </svg>
          </a>

          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="social-btn"
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="social-btn"
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-btn"
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
        </div>

        {/* Bottom Copyright Row */}
        <div className="fp-footer-bottom">
          <p className="fp-footer-copyright">
            © 2026 FuturePath. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
