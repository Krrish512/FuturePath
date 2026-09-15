import React from 'react';

export default function CompareModal({ courses = [], isOpen, onClose, onRemoveCourse }) {
  if (!isOpen || courses.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-card fade-in" style={{
        width: '100%',
        maxWidth: '1050px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>Side-by-Side Analysis</span>
            <h2 style={{ fontSize: '1.6rem', color: '#ffffff' }}>
              Degree & Diploma <span className="gradient-text">Comparison Matrix</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-main)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            ✕
          </button>
        </div>

        {/* Comparison Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0',
            textAlign: 'left'
          }}>
            <thead>
              <tr>
                <th style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-sub)',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border-light)',
                  minWidth: '160px',
                  borderRadius: 'var(--radius-sm) 0 0 0'
                }}>
                  Comparison Factor
                </th>
                {courses.map((course) => (
                  <th key={course._id} style={{
                    padding: '1rem',
                    background: 'rgba(99, 102, 241, 0.1)',
                    borderBottom: '1px solid var(--border-light)',
                    minWidth: '260px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: '700' }}>
                        {course.name}
                      </span>
                      {onRemoveCourse && (
                        <button
                          onClick={() => onRemoveCourse(course._id)}
                          title="Remove from comparison"
                          style={{
                            background: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Duration */}
              <tr>
                <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                  ⏳ Program Duration
                </td>
                {courses.map((c) => (
                  <td key={c._id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', fontSize: '0.9rem', color: '#ffffff' }}>
                    <span className="badge badge-emerald">{c.duration}</span>
                  </td>
                ))}
              </tr>

              {/* Target Stream */}
              <tr>
                <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                  🎯 Qualifying Stream
                </td>
                {courses.map((c) => (
                  <td key={c._id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <span className="badge badge-primary">{c.stream} Stream ({c.qualification})</span>
                  </td>
                ))}
              </tr>

              {/* Eligibility */}
              <tr>
                <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                  📋 Eligibility Criteria
                </td>
                {courses.map((c) => (
                  <td key={c._id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                    {c.eligibility}
                  </td>
                ))}
              </tr>

              {/* Core Curriculum Subjects */}
              <tr>
                <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                  📚 Core Subjects
                </td>
                {courses.map((c) => (
                  <td key={c._id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {c.subjects && c.subjects.map((sub, i) => (
                        <span key={i} style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-muted)',
                          fontSize: '0.75rem'
                        }}>
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Target Career Roles */}
              <tr>
                <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  💼 Career Opportunities
                </td>
                {courses.map((c) => (
                  <td key={c._id} style={{ padding: '1rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {c.careerOptions && c.careerOptions.map((opt, i) => (
                        <span key={i} style={{
                          background: 'rgba(6, 182, 212, 0.1)',
                          color: '#38bdf8',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem'
                        }}>
                          {opt}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
