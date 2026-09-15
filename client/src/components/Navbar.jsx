import React from 'react';

export default function Navbar({ activeTab, setActiveTab, bookmarkCount = 0, isLoggedIn = false, isAdmin = false, userName = '' }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('explore')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
          }}>
            🎓
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
              Future<span className="gradient-text">Path</span>
            </span>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Education & Career Portal
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { id: 'explore', label: 'Explore', icon: '🧭' },
            { id: 'quiz', label: 'Quiz', icon: '🎯' },
            { id: 'pathways', label: 'Roadmaps', icon: '🗺️' },
            { id: 'courses', label: 'Courses', icon: '📚' },
            { id: 'careers', label: 'Careers', icon: '💼' },
            { id: 'colleges', label: 'Colleges', icon: '🏛️' },
            { id: 'faq', label: 'FAQ', icon: '❓' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}

          {/* Shortlist / Bookmark Tab */}
          <button
            onClick={() => setActiveTab('bookmarks')}
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: activeTab === 'bookmarks' ? '700' : '600',
              color: activeTab === 'bookmarks' ? '#ffffff' : '#fbbf24',
              background: activeTab === 'bookmarks' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.1)',
              border: activeTab === 'bookmarks' ? '1px solid #fbbf24' : '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-sm)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginLeft: '0.2rem'
            }}
          >
            <span>⭐ Shortlist</span>
            {bookmarkCount > 0 && (
              <span style={{
                background: '#f59e0b',
                color: '#000000',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '0.1rem 0.45rem',
                borderRadius: 'var(--radius-full)'
              }}>
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Admin Tab - only for admin users */}
          {isLoggedIn && isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              style={{
                padding: '0.45rem 0.75rem',
                fontSize: '0.825rem',
                fontWeight: activeTab === 'admin' ? '700' : '600',
                color: activeTab === 'admin' ? '#ffffff' : '#f59e0b',
                background: activeTab === 'admin' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                border: activeTab === 'admin' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>🛡️</span>
              <span>Admin</span>
            </button>
          )}

          {/* Auth / Profile button */}
          <button
            onClick={() => setActiveTab(isLoggedIn ? 'profile' : 'auth')}
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: (activeTab === 'auth' || activeTab === 'profile') ? '700' : '600',
              color: isLoggedIn ? '#34d399' : '#818cf8',
              background: (activeTab === 'auth' || activeTab === 'profile')
                ? (isLoggedIn ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.15)')
                : (isLoggedIn ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.08)'),
              border: (activeTab === 'auth' || activeTab === 'profile')
                ? (isLoggedIn ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(99, 102, 241, 0.3)')
                : '1px solid transparent',
              borderRadius: 'var(--radius-sm)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginLeft: '0.2rem',
            }}
          >
            {isLoggedIn ? (
              <>
                <span style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  color: '#34d399',
                }}>
                  {userName?.charAt(0).toUpperCase() || '?'}
                </span>
                <span>{userName?.split(' ')[0] || 'Profile'}</span>
              </>
            ) : (
              <>
                <span>🔐</span>
                <span>Login</span>
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
