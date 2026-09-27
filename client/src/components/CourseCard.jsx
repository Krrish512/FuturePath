import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, Clock, Eye, ExternalLink, Bookmark, Scale, Building2, MapPin, GraduationCap } from 'lucide-react';

export default function CourseCard({ 
  course, 
  onToggleBookmark, 
  isSaved,
  onToggleCompare,
  isCompared,
  institutions = []
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedInstForDetail, setSelectedInstForDetail] = useState(null);

  const isIntegrated = (course.course_level || '').includes('Integrated') || (course.name || '').includes('Integrated');
  const isMedical = (course.field_of_study || '').toLowerCase().includes('biological') || 
                    (course.field_of_study || '').toLowerCase().includes('medical') || 
                    (course.name || '').toLowerCase().includes('biotechnology') ||
                    (course.programmeType || '').toLowerCase() === 'medical';

  // Find institutions offering this specific course
  const matchedInstitutions = institutions.filter((inst) => {
    if (!inst) return false;
    const courseId = course._id;
    const courseCode = course.course_id;
    const courseName = (course.course_name || course.name || '').trim().toLowerCase();
    const uniName = (course.university_name || '').trim().toLowerCase();

    // 1. Direct course reference in coursesOffered
    if (Array.isArray(inst.coursesOffered)) {
      const hasDirect = inst.coursesOffered.some((c) => {
        if (!c) return false;
        if (typeof c === 'string') return c === courseId;
        return c._id === courseId || (courseCode && c.course_id === courseCode);
      });
      if (hasDirect) return true;

      const hasName = inst.coursesOffered.some((c) => {
        if (!c) return false;
        const cName = typeof c === 'string' ? c : (c.course_name || c.name || '');
        return cName.toLowerCase() === courseName;
      });
      if (hasName) return true;
    }

    // 2. University name affiliation match
    if (uniName) {
      const instAffil = (inst.affiliation || '').toLowerCase();
      const instName = (inst.name || '').toLowerCase();
      if (uniName.includes('veer narmad') && (instAffil.includes('vnsgu') || instName.includes('veer narmad'))) return true;
      if (uniName.includes('gujarat university') && (instAffil.includes('gujarat university') || instName.includes('gujarat university'))) return true;
      if (uniName.includes('sardar patel') && (instAffil.includes('spu') || instName.includes('sardar patel'))) return true;
      if (uniName.includes('sarvajanik') && (instAffil.includes('sarvajanik') || instName.includes('sarvajanik'))) return true;
      if (uniName.includes('svnit') && (instAffil.includes('svnit') || instName.includes('svnit') || instName.includes('sardar vallabhbhai'))) return true;
    }

    return false;
  });

  return (
    <>
      <div 
        className="course-card-compact" 
        style={{
          background: 'var(--fp-surface, #FFFFFF)',
          border: isIntegrated ? '1.5px solid #C7D2FE' : '1px solid var(--fp-border, #E5E7EB)',
          borderRadius: '12px',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isIntegrated ? '0 4px 12px rgba(79, 70, 229, 0.06)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.2s ease',
          height: '100%',
          position: 'relative'
        }}
      >
        {/* Top Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: '600', 
              color: 'var(--fp-primary, #4F46E5)', 
              background: 'var(--fp-tint, #EEF2FF)', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '6px'
            }}>
              {course.university_name || course.stream || 'Gujarat University'}
            </span>

            {isIntegrated ? (
              <span style={{
                fontSize: '0.725rem',
                fontWeight: '700',
                color: '#4338CA',
                background: '#E0E7FF',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px'
              }}>
                5 Years • UG + PG
              </span>
            ) : (
              <span style={{
                fontSize: '0.725rem',
                fontWeight: '600',
                color: isMedical ? '#047857' : '#4B5563',
                background: isMedical ? '#ECFDF5' : '#F3F4F6',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px'
              }}>
                {course.course_level || 'Undergraduate'}
              </span>
            )}
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
            border: `1px solid ${course.verification_status === 'VERIFIED' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
            flexShrink: 0
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
            marginBottom: '0.35rem', 
            lineHeight: '1.35',
            minHeight: '2.7rem'
          }}
        >
          {course.course_name || course.name}
        </h3>

        {/* Field of Study & Specs */}
        <div style={{ fontSize: '0.78rem', color: 'var(--fp-secondary, #6B7280)', marginBottom: '0.65rem' }}>
          {course.field_of_study || course.stream || 'General Studies'} • {course.stream || 'All Streams'}
        </div>

        {/* Duration */}
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
              padding: '0.45rem 0.6rem',
              fontSize: '0.825rem',
              fontWeight: '600',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <Eye size={13} /> View Programme
          </button>

          {onToggleCompare && (
            <button
              onClick={() => onToggleCompare(course)}
              title={isCompared ? 'Remove comparison' : 'Compare programme'}
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
              title={isSaved ? 'Remove from shortlist' : 'Save programme'}
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

      {/* Full Programme Detail Modal */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
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
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.75rem 2rem',
              boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.2)',
              border: '1px solid #E5E7EB'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', color: '#4F46E5', fontWeight: '700', background: '#EEF2FF', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                    {course.university_name || 'Gujarat University'}
                  </span>
                  {isIntegrated && (
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4338CA', background: '#E0E7FF', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                      5 Years • UG + PG
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  {course.course_name || course.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                  Level: {course.course_level || 'Undergraduate'} • Field: {course.field_of_study || 'General'}
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.35rem', color: '#6B7280', cursor: 'pointer', padding: '0.25rem' }}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            {/* Quick Specs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #EEF2F6' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Duration</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>{course.duration}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Verification Status</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#059669' }}>
                  ✓ {course.verification_status || 'VERIFIED'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Required Qualification</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                  {course.qualification || '12th Standard'} ({course.stream || 'General'})
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Source & Accreditation</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                  {course.official_source_url ? (
                    <a 
                      href={course.official_source_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#4F46E5', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      University Syllabus <ExternalLink size={12} />
                    </a>
                  ) : (
                    'Verified State Curriculum'
                  )}
                </div>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827', marginBottom: '0.35rem' }}>
                Eligibility Criteria & Admission Rules
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: '1.5', margin: 0 }}>
                {course.eligibility}
              </p>
            </div>

            {/* Overview */}
            {course.description && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827', marginBottom: '0.35rem' }}>
                  Programme Overview
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: '1.5', margin: 0 }}>
                  {course.description}
                </p>
              </div>
            )}

            {/* Subjects & Curriculum if available */}
            {course.subjects && course.subjects.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827', marginBottom: '0.4rem' }}>
                  Core Curriculum & Key Subjects
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {course.subjects.map((sub, sIdx) => (
                    <span key={sIdx} style={{ background: '#F3F4F6', color: '#374151', fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                      📚 {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Career Opportunities */}
            {course.careerOptions && course.careerOptions.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827', marginBottom: '0.4rem' }}>
                  Career Pathways & Job Roles
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {course.careerOptions.map((car, cIdx) => (
                    <span key={cIdx} style={{ background: '#ECFDF5', color: '#047857', fontSize: '0.78rem', fontWeight: '600', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                      💼 {car}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* WHERE CAN I STUDY THIS? (Requirement 13) */}
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                <Building2 size={17} color="#4F46E5" />
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                  Where can I study this?
                </h4>
              </div>

              {matchedInstitutions.length === 0 ? (
                <div style={{ background: '#F9FAFB', border: '1px dashed #D1D5DB', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0 }}>
                    No verified institution mapping is currently available for this programme.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {matchedInstitutions.map((inst) => {
                    const cityName = typeof inst.city === 'object' ? inst.city?.name : (inst.city || 'Gujarat');
                    return (
                      <div 
                        key={inst._id}
                        style={{
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          padding: '0.75rem 0.95rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.75rem',
                          background: '#FFFFFF'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#111827' }}>
                            {inst.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#6B7280', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.15rem' }}>
                            <span>📍 {cityName}, {inst.state || 'Gujarat'}</span>
                            <span>• {inst.type || 'University'}</span>
                          </div>
                        </div>

                        {inst.website && (
                          <a
                            href={inst.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                          >
                            Website <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {onToggleBookmark && (
                  <button
                    onClick={() => onToggleBookmark(course, 'course')}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
                  >
                    <Bookmark size={14} fill={isSaved ? '#D97706' : 'none'} />
                    {isSaved ? 'Shortlisted' : 'Shortlist'}
                  </button>
                )}

                {onToggleCompare && (
                  <button
                    onClick={() => onToggleCompare(course)}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
                  >
                    <Scale size={14} />
                    {isCompared ? 'Compared' : 'Compare'}
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="btn btn-primary"
                style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
