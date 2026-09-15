import React from 'react';

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
      minHeight: 'calc(100vh - 72px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        animation: 'fadeIn 0.5s ease forwards',
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
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)',
            fontWeight: 'bold',
            color: '#fff',
          }}>
            {user.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
            {user.name}
          </h2>
          <span className={`badge ${user.role === 'admin' ? 'badge-amber' : 'badge-emerald'}`}>
            {user.role === 'admin' ? '🛡️ Administrator' : '🎓 Student'}
          </span>
        </div>

        {/* Profile Card */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email */}
            <div>
              <div style={fieldLabelStyle}>📧 Email</div>
              <div style={fieldValueStyle}>{user.email}</div>
            </div>

            {/* Qualification */}
            <div>
              <div style={fieldLabelStyle}>🎓 Qualification</div>
              <div style={fieldValueStyle}>{user.qualification || 'Not specified'}</div>
            </div>

            {/* Role */}
            <div>
              <div style={fieldLabelStyle}>🔑 Role</div>
              <div style={fieldValueStyle}>{user.role === 'admin' ? 'Administrator' : 'Student'}</div>
            </div>

            {/* Member since */}
            <div>
              <div style={fieldLabelStyle}>📅 Member Since</div>
              <div style={fieldValueStyle}>{joinDate}</div>
            </div>

            {/* Interests */}
            {user.interests && user.interests.length > 0 && (
              <div>
                <div style={fieldLabelStyle}>💡 Interests</div>
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
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            gap: '0.75rem',
          }}>
            <button
              onClick={onGoExplore}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.75rem' }}
            >
              🧭 Explore Courses
            </button>
            <button
              onClick={onLogout}
              className="btn btn-secondary"
              style={{
                padding: '0.75rem 1.25rem',
                color: '#fb7185',
                borderColor: 'rgba(244, 63, 94, 0.3)',
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const fieldLabelStyle = {
  fontSize: '0.75rem',
  fontWeight: '600',
  color: 'var(--text-sub)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '0.2rem',
};

const fieldValueStyle = {
  fontSize: '1rem',
  color: 'var(--text-main)',
  fontWeight: '500',
};
