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
             Academic & Career Decision Engine
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
          fontWeight: '700',
          lineHeight: 1.2,
          marginBottom: '1rem',
          maxWidth: '850px',
          margin: '0 auto 1rem',
          letterSpacing: '-0.025em'
        }}>
          Find Your Perfect Stream, Degree & Career <span className="gradient-text">After 10th & 12th</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          maxWidth: '660px',
          margin: '0 auto 2rem',
          lineHeight: 1.6
        }}>
          Uncertain what to do next? Explore verified step-by-step educational roadmaps, eligibility, course curriculums, salary insights, and top colleges in Gujarat.
        </p>

        {/* Quick Action Selector Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '820px',
          margin: '0 auto 2.5rem'
        }}>
          {/* After 10th Card */}
          <div 
            onClick={() => onSelectCategory('10th', 'General')}
            className="glass-card"
            style={{
              padding: '1.75rem 1.5rem',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderLeft: '4px solid var(--accent-cyan)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--fp-surface, #FFFFFF)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              fontSize: '1.75rem',
              background: 'rgba(6, 182, 212, 0.12)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.15rem'
            }}>
              🎒
            </div>
            <h3 style={{
              fontSize: '1.35rem',
              fontWeight: '700',
              color: 'var(--fp-text, #111827)',
              marginBottom: '0.45rem',
              lineHeight: '1.3'
            }}>
              After 10th
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--fp-text-secondary, #6B7280)',
              margin: 0,
              lineHeight: '1.5',
              flex: 1
            }}>
              Explore school, diploma, ITI and vocational pathways.
            </p>
          </div>

          {/* After 12th Card */}
          <div 
            onClick={() => onSelectCategory('12th', 'Science')}
            className="glass-card"
            style={{
              padding: '1.75rem 1.5rem',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderLeft: '4px solid var(--fp-primary, #4F46E5)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--fp-surface, #FFFFFF)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              fontSize: '1.75rem',
              background: 'rgba(79, 70, 229, 0.12)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.15rem'
            }}>
              🎓
            </div>
            <h3 style={{
              fontSize: '1.35rem',
              fontWeight: '700',
              color: 'var(--fp-text, #111827)',
              marginBottom: '0.45rem',
              lineHeight: '1.3'
            }}>
              After 12th
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--fp-text-secondary, #6B7280)',
              margin: 0,
              lineHeight: '1.5',
              flex: 1
            }}>
              Explore degrees, integrated programmes, medical pathways and careers.
            </p>
          </div>
        </div>

        {/* Live Counters */}
        {summary && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            padding: '1.25rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                {summary.totalPathways}+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Education Paths
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                {summary.totalCourses}+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Degree Programs
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                {summary.totalCareers}+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Career Paths
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-amber)' }}>
                {summary.totalInstitutions}+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Institutions
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
