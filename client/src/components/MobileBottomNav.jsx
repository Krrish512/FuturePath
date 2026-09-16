import React from 'react';
import { Home, Compass, Sparkles, Bookmark } from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab, bookmarkCount = 0 }) {
  const navItems = [
    { id: 'explore', label: 'Home', icon: Home },
    { id: 'courses', label: 'Explore', icon: Compass },
    { id: 'quiz', label: 'Quiz', icon: Sparkles },
    { id: 'bookmarks', label: 'Shortlist', icon: Bookmark, badge: bookmarkCount },
  ];

  return (
    <nav 
      className="mobile-bottom-nav"
      aria-label="Mobile Navigation Bar"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const IconComponent = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={`mobile-bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            <div className="nav-icon-wrapper" style={{ position: 'relative' }}>
              <IconComponent size={20} />
              {item.badge > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-6px',
                    background: 'var(--fp-accent)',
                    color: '#ffffff',
                    fontSize: '0.6rem',
                    fontWeight: '800',
                    minWidth: '16px',
                    height: '16px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                    border: '2px solid var(--fp-surface)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
