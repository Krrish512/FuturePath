import React, { useState } from 'react';

import { Map, ArrowRight, Bookmark, CheckCircle2, ListOrdered, Calendar } from 'lucide-react';

export default function PathwayCard({ pathway, onToggleBookmark, isSaved }) {
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  const steps = pathway.steps || [];
  const previewSteps = steps.slice(0, 3);
  const remainingCount = steps.length - 3;

  return (
    <>
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
        {/* Badges & Save */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'var(--fp-primary, #4F46E5)',
              background: 'var(--fp-tint, #EEF2FF)',
              padding: '0.2rem 0.55rem',
              borderRadius: '6px'
            }}>
              {pathway.qualification?.name ? `${pathway.qualification.name} Pass` : 'Roadmap'}
            </span>
            {pathway.stream?.name && (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#059669',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px'
              }}>
                {pathway.stream.name} Stream
              </span>
            )}
          </div>

          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(pathway, 'pathway')}
              title={isSaved ? 'Remove from shortlist' : 'Save roadmap'}
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
                gap: '0.25rem'
              }}
            >
              <Bookmark size={13} fill={isSaved ? '#D97706' : 'none'} />
            </button>
          )}
        </div>

        {/* Title */}
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
          {pathway.title}
        </h3>

        {/* Short Description */}
        <p 
          className="clamp-3"
          style={{ 
            fontSize: '0.825rem', 
            color: 'var(--fp-secondary, #6B7280)', 
            marginBottom: '0.85rem', 
            lineHeight: '1.45',
            minHeight: '3.4rem'
          }}
        >
          {pathway.description || 'Comprehensive career transition steps.'}
        </p>

        {/* 3-Step Preview */}
        <div style={{ marginTop: 'auto', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.85rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: '#4F46E5', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
            Progression Preview:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {previewSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.78rem' }}>
                <span style={{
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#EEF2FF',
                  color: '#4F46E5',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1px'
                }}>
                  {idx + 1}
                </span>
                <span style={{ color: '#374151', lineHeight: '1.3' }}>
                  {step.length > 55 ? step.slice(0, 55) + '...' : step}
                </span>
              </div>
            ))}
            {remainingCount > 0 && (
              <div style={{ fontSize: '0.725rem', color: '#6B7280', paddingLeft: '1.4rem' }}>
                + {remainingCount} more milestones
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowFullTimeline(true)}
          className="btn btn-outline-primary"
          style={{
            width: '100%',
            padding: '0.45rem',
            fontSize: '0.825rem',
            fontWeight: '600',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem'
          }}
        >
          View Full Roadmap <ArrowRight size={13} />
        </button>
      </div>

      {/* Full Roadmap Modal (Vertical Timeline) */}
      {showFullTimeline && (
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
          onClick={() => setShowFullTimeline(false)}
        >
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '1.75rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#4F46E5', fontWeight: '600', background: '#EEF2FF', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                  {pathway.qualification?.name} • {pathway.stream?.name} Stream
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#111827', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  {pathway.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>{pathway.description}</p>
              </div>
              <button 
                onClick={() => setShowFullTimeline(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.25rem', color: '#6B7280', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Vertical Timeline */}
            <div style={{ position: 'relative', paddingLeft: '1.75rem', margin: '1.5rem 0' }}>
              <div style={{ position: 'absolute', left: '10px', top: '10px', bottom: '10px', width: '2px', background: '#E5E7EB' }} />
              {steps.map((step, idx) => (
                <div key={idx} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-1.75rem',
                    top: '2px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#4F46E5',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 3px #EEF2FF'
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4F46E5', marginBottom: '0.2rem' }}>
                      Milestone {idx + 1}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#1F2937', lineHeight: '1.4' }}>
                      {step}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
              <button
                onClick={() => setShowFullTimeline(false)}
                className="btn btn-secondary"
                style={{ padding: '0.4rem 1.25rem', borderRadius: '8px', fontSize: '0.85rem' }}
              >
                Close Roadmap
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
