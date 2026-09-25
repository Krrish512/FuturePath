import React from 'react';
import { Briefcase, TrendingUp, Bookmark, Sparkles, AlertCircle } from 'lucide-react';

export default function CareerCard({ career, onToggleBookmark, isSaved }) {
  const skills = career.skills || career.requiredSkills || [];
  const courses = career.courses || [];

  return (
    <div 
      style={{
        background: 'var(--fp-surface, #FFFFFF)',
        border: '1px solid var(--fp-border, #E5E7EB)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.2s ease',
        height: '100%'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.65rem' }}>
        <h3 
          className="clamp-2"
          style={{ 
            fontSize: '1.1rem', 
            fontWeight: '700', 
            color: 'var(--fp-text, #111827)', 
            margin: 0,
            lineHeight: '1.35',
            minHeight: '2.8rem'
          }}
        >
          {career.title}
        </h3>

        {onToggleBookmark && (
          <button
            onClick={() => onToggleBookmark(career, 'career')}
            title={isSaved ? 'Remove from shortlist' : 'Save career'}
            style={{
              background: isSaved ? '#FEF3C7' : '#F3F4F6',
              color: isSaved ? '#D97706' : '#6B7280',
              border: 'none',
              padding: '0.35rem 0.6rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              flexShrink: 0
            }}
          >
            <Bookmark size={13} fill={isSaved ? '#D97706' : 'none'} />
          </button>
        )}
      </div>

      {/* Salary Badge */}
      {career.salaryRange && (
        <div style={{ marginBottom: '0.65rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: 'rgba(245, 158, 11, 0.1)',
            color: '#D97706',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '0.2rem 0.6rem',
            borderRadius: '6px'
          }}>
            <TrendingUp size={12} /> {career.salaryRange}
          </span>
        </div>
      )}

      {/* Description */}
      <p 
        className="clamp-3"
        style={{ 
          fontSize: '0.85rem', 
          color: 'var(--fp-secondary, #6B7280)', 
          marginBottom: '0.85rem', 
          lineHeight: '1.45',
          minHeight: '3.6rem'
        }}
      >
        {career.description}
      </p>

      {/* In Demand Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: '#4F46E5', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
            In-Demand Skills:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {skills.map((skill, idx) => (
              <span key={idx} style={{
                background: '#EEF2FF',
                color: '#4F46E5',
                fontSize: '0.75rem',
                fontWeight: '500',
                padding: '0.15rem 0.55rem',
                borderRadius: '6px'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Courses */}
      {courses.length > 0 && (
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.3rem' }}>
            Qualifying Degree Options:
          </div>
          <div style={{ fontSize: '0.8rem', color: '#374151' }}>
            {courses.map(c => typeof c === 'object' ? c.name : c).slice(0, 3).join(' • ')}
          </div>
        </div>
      )}

      {/* Salary Disclaimer */}
      <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <AlertCircle size={10} /> *Salary projections reflect typical industry averages in Gujarat / India.
      </div>
    </div>
  );
}
