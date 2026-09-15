import React from 'react';

export default function CourseCard({ course }) {
  return (
    <div className="glass-card fade-in" style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span className="badge badge-emerald">
          ⏳ {course.duration}
        </span>
        <span className="badge badge-primary">
          {course.stream} Stream
        </span>
      </div>

      {/* Course Title */}
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#ffffff' }}>
        {course.name}
      </h3>

      {/* Description */}
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
        {course.description}
      </p>

      {/* Eligibility */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-sm)',
        borderLeft: '3px solid var(--accent-emerald)',
        marginBottom: '1.25rem',
        fontSize: '0.825rem'
      }}>
        <div style={{ fontWeight: '700', color: 'var(--accent-emerald)', marginBottom: '0.2rem' }}>Eligibility:</div>
        <div style={{ color: 'var(--text-main)' }}>{course.eligibility}</div>
      </div>

      {/* Subjects */}
      {course.subjects && course.subjects.length > 0 && (
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-sub)', marginBottom: '0.5rem' }}>
            Core Subjects:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {course.subjects.map((sub, idx) => (
              <span key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                {sub}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
