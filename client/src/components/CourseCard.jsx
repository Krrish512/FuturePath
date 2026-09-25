import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, Clock, Eye, ExternalLink, Bookmark, Scale } from 'lucide-react';

export default function CourseCard({ 
  course, 
  onToggleBookmark, 
  isSaved,
  onToggleCompare,
  isCompared 
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        className="course-card-compact" 
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
        {/* University & Level Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: '600', 
              color: 'var(--fp-primary, #4F46E5)', 
              background: 'var(--fp-tint, #EEF2FF)', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '6px',
              display: 'inline-block',
              marginBottom: '0.25rem'
            }}>
              {course.university_name || course.stream || 'Gujarat University'}
            </span>
            <div style={{ fontSize: '0.75rem', color: 'var(--fp-secondary, #6B7280)' }}>
              {course.course_level || 'Undergraduate'} • {course.field_of_study || course.stream || 'General'}
            </div>
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.7rem',
            fontWeight: '600',
            padding: '0.15rem 0.5rem',
            borderRadius: '999px',
            background: course.verification_status === 'VERIFIED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            color: course.verification_status === 'VERIFIED' ? '#059669' : '#D97706',
            border: `1px solid ${course.verification_status === 'VERIFIED' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
          }}>
            <CheckCircle2 size={11} /> {course.verification_status || 'VERIFIED'}
          </span>
        </div>

        {/* Course Title */}
        <h3 
          className="clamp-2"
          style={{ 
            fontSize: '1.05rem', 
            fontWeight: '700', 
            color: 'var(--fp-text, #111827)', 
            marginBottom: '0.4rem', 
            lineHeight: '1.35',
            minHeight: '2.7rem'
          }}
        >
          {course.course_name || course.name}
        </h3>

        {/* Duration & Basic Specs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--fp-secondary, #6B7280)', marginBottom: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={13} color="#4F46E5" /> {course.duration}
          </span>
          {course.course_id && (
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
              ID: {course.course_id}
            </span>
          )}
        </div>

        {/* Eligibility box */}
        <div style={{
          background: '#F9FAFB',
          border: '1px solid #F3F4F6',
          borderLeft: '3px solid var(--fp-primary, #4F46E5)',
          borderRadius: '6px',
          padding: '0.5rem 0.75rem',
          fontSize: '0.8rem',
          marginBottom: '0.85rem',
          lineHeight: '1.4'
        }}>
          <strong style={{ color: 'var(--fp-text, #111827)' }}>Eligibility: </strong>
          <span className="clamp-2" style={{ color: 'var(--fp-secondary, #6B7280)' }}>
            {course.eligibility || '12th Standard or Equivalent'}
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.4rem', paddingTop: '0.5rem' }}>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-outline-primary"
            style={{
              flex: 1,
              padding: '0.4rem 0.6rem',
              fontSize: '0.8rem',
              fontWeight: '600',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem'
            }}
          >
            <Eye size={13} /> View
          </button>

          {onToggleCompare && (
            <button
              onClick={() => onToggleCompare(course)}
              title={isCompared ? 'Remove comparison' : 'Compare course'}
              style={{
                background: isCompared ? 'var(--fp-primary, #4F46E5)' : '#F3F4F6',
                color: isCompared ? '#FFFFFF' : 'var(--fp-secondary, #6B7280)',
                border: 'none',
                padding: '0.4rem 0.65rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Scale size={13} />
            </button>
          )}

          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(course, 'course')}
              title={isSaved ? 'Remove from shortlist' : 'Save course'}
              style={{
                background: isSaved ? '#FEF3C7' : '#F3F4F6',
                color: isSaved ? '#D97706' : 'var(--fp-secondary, #6B7280)',
                border: 'none',
                padding: '0.4rem 0.65rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Bookmark size={13} fill={isSaved ? '#D97706' : 'none'} />
            </button>
          )}
        </div>
      </div>

      {/* Course Detail Modal */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050,
            padding: '1rem'
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.75rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#4F46E5', fontWeight: '600', background: '#EEF2FF', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                  {course.university_name || 'Gujarat University'}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#111827', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  {course.course_name || course.name}
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.25rem', color: '#6B7280', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', background: '#F9FAFB', padding: '1rem', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Level & Field</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>{course.course_level || 'Undergraduate'} ({course.field_of_study || 'General'})</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Duration</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>{course.duration}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Verification</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#059669' }}>{course.verification_status || 'VERIFIED'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Last Verified</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>{course.last_verified || '2026-09-25'}</div>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827', marginBottom: '0.4rem' }}>Eligibility Criteria</h4>
              <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: '1.5' }}>{course.eligibility}</p>
            </div>

            {course.description && (
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827', marginBottom: '0.4rem' }}>Overview</h4>
                <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: '1.5' }}>{course.description}</p>
              </div>
            )}

            {course.official_source_url && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a 
                  href={course.official_source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#4F46E5', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none' }}
                >
                  <ExternalLink size={14} /> Official University Source
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderRadius: '8px' }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
