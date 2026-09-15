import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-light)',
      background: 'var(--bg-secondary)',
      padding: '3.5rem 0 2rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                🎓
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                Future<span className="gradient-text">Path</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              A dedicated academic and career guidance platform built for BCA Semester 5 Advanced Web Designing (AWD) to empower 10th and 12th students with clear educational roadmaps.
            </p>
          </div>

          {/* Quick Guidance Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#ffffff' }}>Guidance Pathways</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li>• After 10th Polytechnic & Diploma</li>
              <li>• After 12th Science (Engineering & Medical)</li>
              <li>• After 12th Commerce (B.Com, BBA & CA)</li>
              <li>• After 12th Arts (BA, Law & Civil Services)</li>
              <li>• BCA & IT Software Development</li>
            </ul>
          </div>

          {/* Tech Stack for AWD */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#ffffff' }}>Architecture & Stack</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li>⚡ Frontend: React + Vite + Vanilla CSS</li>
              <li>⚙️ Backend: Node.js + Express 5 REST API</li>
              <li>🗄️ Database: MongoDB + Mongoose ODM</li>
              <li>🧭 Engine: Rule-Based Guidance Aggregator</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-sub)'
        }}>
          © {new Date().getFullYear()} FuturePath Portal. BCA Semester 5 Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
