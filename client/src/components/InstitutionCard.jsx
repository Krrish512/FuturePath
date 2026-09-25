import React from 'react';
import { Building2, MapPin, ExternalLink, Bookmark, Phone } from 'lucide-react';

export default function InstitutionCard({ institution, onToggleBookmark, isSaved }) {
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
      {/* Header Badges & Save */}
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
            🏛️ {institution.type}
          </span>
          {institution.city && (
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#059669',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '0.2rem 0.55rem',
              borderRadius: '6px'
            }}>
              📍 {typeof institution.city === 'object' ? institution.city.name : institution.city}
            </span>
          )}
        </div>

        {onToggleBookmark && (
          <button
            onClick={() => onToggleBookmark(institution, 'institution')}
            title={isSaved ? 'Remove from shortlist' : 'Save college'}
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

      {/* Name */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--fp-text, #111827)', marginBottom: '0.35rem', lineHeight: '1.4' }}>
        {institution.name}
      </h3>

      {/* Affiliation */}
      {institution.affiliation && (
        <div style={{ fontSize: '0.8rem', color: '#4F46E5', fontWeight: '500', marginBottom: '0.65rem' }}>
          Affiliation: {institution.affiliation}
        </div>
      )}

      {/* Address */}
      {institution.address && (
        <p style={{ fontSize: '0.825rem', color: 'var(--fp-secondary, #6B7280)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
          {institution.address}
        </p>
      )}

      {/* Contact */}
      {institution.contactNumber && (
        <div style={{ fontSize: '0.78rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.75rem' }}>
          <Phone size={12} color="#4F46E5" /> {institution.contactNumber}
        </div>
      )}

      {/* Programs Offered */}
      {institution.coursesOffered && institution.coursesOffered.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.35rem' }}>
            Accredited Programmes:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {institution.coursesOffered.map((c, idx) => (
              <span key={idx} style={{
                background: '#F3F4F6',
                color: '#374151',
                fontSize: '0.725rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '6px'
              }}>
                {typeof c === 'object' ? c.name : c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Website */}
      {institution.website && (
        <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
          <a
            href={institution.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary"
            style={{
              width: '100%',
              fontSize: '0.825rem',
              padding: '0.45rem',
              borderRadius: '8px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              textDecoration: 'none'
            }}
          >
            Visit Official Website <ExternalLink size={13} />
          </a>
        </div>
      )}
    </div>
  );
}
