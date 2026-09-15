import React from 'react';

export default function PathwayCard({ pathway, onToggleBookmark, isSaved }) {
  return (
    <div className="glass-card fade-in" style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Badges Header & Bookmark Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="badge badge-primary">
            🗺️ {pathway.qualification?.name || 'Roadmap'}
          </span>
          {pathway.stream?.name && (
            <span className="badge badge-cyan">
              {pathway.stream.name}
            </span>
          )}
        </div>

        {onToggleBookmark && (
          <button
            onClick={() => onToggleBookmark(pathway, 'pathway')}
            title={isSaved ? 'Remove from shortlist' : 'Save roadmap'}
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

      {/* Title & Description */}
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>
        {pathway.title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 0 }}>
        {pathway.description}
      </p>

      {/* Step-by-Step Milestones Timeline */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-cyan)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
          Step-by-Step Progression:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {pathway.steps && pathway.steps.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{
                minWidth: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.2)',
                color: 'var(--primary)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: '700',
                marginTop: '1px'
              }}>
                {idx + 1}
              </div>
              <div style={{ color: 'var(--text-main)', lineHeight: '1.4' }}>
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
