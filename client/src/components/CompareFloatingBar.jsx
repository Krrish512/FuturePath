import React from 'react';

export default function CompareFloatingBar({ compareList = [], onOpenCompare, onClearCompare, onRemoveCourse }) {
  if (compareList.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 90,
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(99, 102, 241, 0.4)',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.3)',
      borderRadius: 'var(--radius-full)',
      padding: '0.6rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      maxWidth: '90vw'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>⚖️</span>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff', whiteSpace: 'nowrap' }}>
          Comparing ({compareList.length}/3):
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', maxWidth: '380px' }}>
        {compareList.map((course) => (
          <div key={course._id} style={{
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '0.2rem 0.65rem',
            fontSize: '0.75rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            whiteSpace: 'nowrap'
          }}>
            <span>{course.name.split('(')[0].trim()}</span>
            <button
              onClick={() => onRemoveCourse(course._id)}
              style={{
                background: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onOpenCompare}
        className="btn btn-primary"
        style={{
          padding: '0.45rem 1rem',
          fontSize: '0.85rem',
          borderRadius: 'var(--radius-full)',
          whiteSpace: 'nowrap'
        }}
      >
        Compare Matrix →
      </button>

      <button
        onClick={onClearCompare}
        title="Clear comparison list"
        style={{
          background: 'none',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          cursor: 'pointer',
          padding: '0.2rem'
        }}
      >
        ✕
      </button>
    </div>
  );
}
