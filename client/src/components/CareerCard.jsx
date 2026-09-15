import React from 'react';

export default function CareerCard({ career, onToggleBookmark, isSaved }) {
  return (
    <div className="glass-card fade-in" style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Salary Badge & Bookmark */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
          {career.title}
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {career.salaryRange && (
            <span className="badge badge-amber" style={{ whiteSpace: 'nowrap' }}>
              💰 {career.salaryRange}
            </span>
          )}
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(career, 'career')}
              title={isSaved ? 'Remove from shortlist' : 'Save career'}
              style={{
                background: isSaved ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: isSaved ? '#fbbf24' : 'var(--text-muted)',
                border: isSaved ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.35rem 0.65rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{isSaved ? '⭐' : '☆'}</span>
              <span style={{ fontSize: '0.75rem' }}>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
        {career.description}
      </p>

      {/* Required Skills Chips */}
      {career.requiredSkills && career.requiredSkills.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
            In-Demand Skills:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {career.requiredSkills.map((skill, idx) => (
              <span key={idx} style={{
                background: 'rgba(6, 182, 212, 0.1)',
                color: '#38bdf8',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                fontSize: '0.75rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Job Roles */}
      {career.jobRoles && career.jobRoles.length > 0 && (
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-sub)', marginBottom: '0.35rem' }}>
            Key Job Roles:
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            {career.jobRoles.join(' • ')}
          </div>
        </div>
      )}
    </div>
  );
}
