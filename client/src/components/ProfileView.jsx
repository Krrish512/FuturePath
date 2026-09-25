
import React from 'react';
import { Mail, GraduationCap, Shield, Calendar, Sparkles, Compass, LogOut } from 'lucide-react';

export default function ProfileView({ user, onLogout, onGoExplore }) {
  if (!user) return null;

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <section style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem 4rem',
      background: 'var(--fp-bg)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        animation: 'fadeIn 0.4s ease forwards',
      }}>
        {/* Profile Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 24px rgba(79, 70, 229, 0.25)',
            fontWeight: 'bold',
            color: '#fff',
          }}>
            {user.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.35rem', color: 'var(--fp-text)' }}>
            {user.name}
          </h2>
          <span className={`badge ${user.role === 'admin' ? 'badge-amber' : 'badge-emerald'}`}>
            {user.role === 'admin' ? (
              <><Shield size={12} /> Administrator</>
            ) : (
              <><GraduationCap size={12} /> Student</>
            )}
          </span>
        </div>

        {/* Profile Card */}
        <div className="fp-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email */}
            <div>
              <div style={fieldLabelStyle}>
                <Mail size={13} /> Email
              </div>
              <div style={fieldValueStyle}>{user.email}</div>
            </div>

            {/* Qualification */}
            <div>
              <div style={fieldLabelStyle}>
                <GraduationCap size={13} /> Qualification
              </div>
              <div style={fieldValueStyle}>{user.qualification || 'Not specified'}</div>
            </div>

            {/* Role */}
            <div>
              <div style={fieldLabelStyle}>
                <Shield size={13} /> Role
              </div>
              <div style={fieldValueStyle}>{user.role === 'admin' ? 'Administrator' : 'Student'}</div>
            </div>

            {/* Member since */}
            <div>
              <div style={fieldLabelStyle}>
                <Calendar size={13} /> Member Since
              </div>
              <div style={fieldValueStyle}>{joinDate}</div>
            </div>

            {/* Interests */}
            {user.interests && user.interests.length > 0 && (
              <div>
                <div style={fieldLabelStyle}>
                  <Sparkles size={13} /> Interests
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                  {user.interests.map((interest, i) => (
                    <span key={i} className="badge badge-primary">{interest}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--fp-border)',
            display: 'flex',
            gap: '0.75rem',
          }}>
            <button
              onClick={onGoExplore}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.75rem' }}
            >
              <Compass size={16} /> Explore Courses
            </button>
            <button
              onClick={onLogout}
              className="btn btn-secondary"
              style={{
                padding: '0.75rem 1.25rem',
                color: '#B91C1C',
                borderColor: '#FECACA',
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const fieldLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
  fontSize: '0.75rem',
  fontWeight: '600',
  color: 'var(--fp-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: '0.2rem',
};

const fieldValueStyle = {
  fontSize: '1rem',
  color: 'var(--fp-text)',
  fontWeight: '500',
};
