import React from 'react';

export default function InstitutionCard({ institution }) {
  return (
    <div className="glass-card fade-in" style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span className="badge badge-primary">
          🏛️ {institution.type}
        </span>
        {institution.city && (
          <span className="badge badge-cyan">
            📍 {institution.city.name}, {institution.city.state}
          </span>
        )}
      </div>

      {/* Institution Name */}
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: '#ffffff' }}>
        {institution.name}
      </h3>

      {/* Affiliation */}
      {institution.affiliation && (
        <div style={{ fontSize: '0.825rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
          Affiliation: {institution.affiliation}
        </div>
      )}

      {/* Address */}
      {institution.address && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
          {institution.address}
        </p>
      )}

      {/* Courses Offered */}
      {institution.coursesOffered && institution.coursesOffered.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-sub)', marginBottom: '0.4rem' }}>
            Programs Offered:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {institution.coursesOffered.map((course, idx) => (
              <span key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-main)',
                fontSize: '0.75rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                {course.name || course}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Website Action Button */}
      {institution.website && (
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
          <a
            href={institution.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
          >
            Visit Official Website ↗
          </a>
        </div>
      )}
    </div>
  );
}
