import React from 'react';

export default function Hero({ summary, onSelectCategory }) {
  return (
    <section style={{
      padding: '4rem 0 3rem',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div className="container">
        {/* Top Tag */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="badge badge-primary">
            ✨ Academic & Career Decision Engine
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
          lineHeight: 1.15,
          marginBottom: '1.25rem',
          maxWidth: '900px',
          margin: '0 auto 1.25rem'
        }}>
          Find Your Perfect Stream, Degree & Career <span className="gradient-text">After 10th & 12th</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          Uncertain what to do next? Explore verified step-by-step educational roadmaps, eligibility, course curriculums, salary insights, and top colleges in Gujarat.
        </p>

        {/* Quick Action Selector Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          maxWidth: '850px',
          margin: '0 auto 3.5rem'
        }}>
          {/* 10th Option */}
          <div 
            onClick={() => onSelectCategory('10th', 'General')}
            className="glass-card"
            style={{
              padding: '1.75rem',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              borderLeft: '4px solid var(--accent-cyan)'
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              background: 'rgba(6, 182, 212, 0.1)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)'
            }}>
              🎒
            </div>
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '0.35rem' }}>Secondary School</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>I Passed 10th</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Polytechnic Diplomas, ITI, D2D Engineering & 11th Streams
              </p>
            </div>
          </div>

          {/* 12th Option */}
          <div 
            onClick={() => onSelectCategory('12th', 'Science')}
            className="glass-card"
            style={{
              padding: '1.75rem',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              borderLeft: '4px solid var(--primary)'
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)'
            }}>
              🎓
            </div>
            <div>
              <div className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>Higher Secondary</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>I Passed 12th</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Science (PCM/PCB), Commerce, Arts & Universal Degrees (BCA/BBA)
              </p>
            </div>
          </div>
        </div>

        {/* Live Counters */}
        {summary && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)' }}>
                {summary.totalPathways}+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Roadmaps
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                {summary.totalCourses}+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Degree Programs
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                {summary.totalCareers}+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Career Trajectories
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-amber)' }}>
                {summary.totalInstitutions}+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Colleges & Unis
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
