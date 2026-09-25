import React, { useState } from 'react';
import { 
  Compass, 
  Map, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  HelpCircle, 
  Bookmark, 
  Sparkles, 
  User, 
  LogIn, 
  ShieldCheck, 
  Menu, 
  X,
  Info
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  bookmarkCount = 0, 
  isLoggedIn = false, 
  isAdmin = false, 
  userName = '' 
}) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navLinks = [
    { id: 'explore', label: 'Guidance', icon: Compass },
    { id: 'pathways', label: 'Roadmaps', icon: Map },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'colleges', label: 'Colleges', icon: GraduationCap },
    { id: 'about', label: 'About', icon: Info },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileDrawerOpen(false);
  };

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1030,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--fp-border)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)'
      }}>
        <div className="container-xl px-3 px-sm-4">
          <div className="d-flex align-items-center justify-content-between" style={{ height: '70px' }}>
            
            {/* MOBILE ONLY: Left Hamburger Button */}
            <div className="d-lg-none d-flex align-items-center">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                aria-label="Open Navigation Menu"
                className="btn btn-secondary p-2 d-flex align-items-center justify-content-center"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--fp-border)'
                }}
              >
                <Menu size={22} color="var(--fp-text)" />
              </button>
            </div>

            {/* Logo */}
            <div 
              onClick={() => handleNavClick('explore')}
              className="d-flex align-items-center gap-2 text-decoration-none cursor-pointer"
              style={{ cursor: 'pointer' }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 3px 10px rgba(79, 70, 229, 0.3)'
              }}>
                <GraduationCap size={22} />
              </div>
              <div style={{ 
                fontSize: '1.3rem', 
                fontWeight: '800', 
                letterSpacing: '-0.03em', 
                lineHeight: '1.2',
                color: 'var(--fp-text)'
              }}>
                Future<span style={{ color: 'var(--fp-primary)' }}>Path</span>
              </div>
            </div>

            {/* DESKTOP NAVIGATION (lg and up) */}
            <nav className="d-none d-lg-flex align-items-center gap-1">
              {navLinks.map((tab) => {
                const isActive = activeTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavClick(tab.id)}
                    style={{
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? '700' : '500',
                      color: isActive ? 'var(--fp-primary)' : 'var(--fp-text-secondary)',
                      background: isActive ? 'var(--fp-primary-soft)' : 'transparent',
                      border: '1px solid transparent',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <IconComponent size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              {/* Shortlist Button */}
              <button
                onClick={() => handleNavClick('bookmarks')}
                style={{
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === 'bookmarks' ? '700' : '600',
                  color: activeTab === 'bookmarks' ? '#ffffff' : '#B45309',
                  background: activeTab === 'bookmarks' ? 'var(--fp-accent)' : 'var(--fp-accent-soft)',
                  border: activeTab === 'bookmarks' ? '1px solid var(--fp-accent)' : '1px solid #FDE68A',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginLeft: '0.3rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <Bookmark size={15} />
                <span>Shortlist</span>
                {bookmarkCount > 0 && (
                  <span style={{
                    background: activeTab === 'bookmarks' ? '#ffffff' : 'var(--fp-accent)',
                    color: activeTab === 'bookmarks' ? 'var(--fp-accent)' : '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {bookmarkCount}
                  </span>
                )}
              </button>

              {/* Admin Button (if admin) */}
              {isLoggedIn && isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  style={{
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === 'admin' ? '700' : '600',
                    color: activeTab === 'admin' ? '#ffffff' : 'var(--fp-primary)',
                    background: activeTab === 'admin' ? 'var(--fp-primary)' : 'var(--fp-primary-soft)',
                    border: '1px solid var(--fp-primary-soft)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    marginLeft: '0.2rem'
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Admin</span>
                </button>
              )}

              {/* Auth / Profile button */}
              <button
                onClick={() => handleNavClick(isLoggedIn ? 'profile' : 'auth')}
                className={isLoggedIn ? 'btn btn-secondary' : 'btn btn-primary'}
                style={{
                  padding: '0.45rem 0.95rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  marginLeft: '0.3rem'
                }}
              >
                {isLoggedIn ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--fp-primary-soft)',
                      color: 'var(--fp-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: '800'
                    }}>
                      {userName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span>{userName?.split(' ')[0] || 'Profile'}</span>
                  </>
                ) : (
                  <>
                    <LogIn size={15} />
                    <span>Login</span>
                  </>
                )}
              </button>
            </nav>

            {/* MOBILE ONLY: Right Quick Shortlist Action */}
            <div className="d-lg-none d-flex align-items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('bookmarks')}
                className="btn btn-secondary p-2 d-flex align-items-center justify-content-center position-relative"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeTab === 'bookmarks' ? 'var(--fp-accent-soft)' : 'var(--fp-surface)',
                  borderColor: activeTab === 'bookmarks' ? 'var(--fp-accent)' : 'var(--fp-border)',
                  color: activeTab === 'bookmarks' ? '#B45309' : 'var(--fp-text)'
                }}
                aria-label="View Shortlist"
              >
                <Bookmark size={20} />
                {bookmarkCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: 'var(--fp-accent)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #ffffff'
                  }}>
                    {bookmarkCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE OFFCANVAS / NAVIGATION DRAWER */}
      {mobileDrawerOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1050,
            background: 'rgba(17, 24, 39, 0.4)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '320px',
              background: 'var(--fp-surface)',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1060,
              animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom" style={{ borderColor: 'var(--fp-border)' }}>
              <div className="d-flex align-items-center gap-2">
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'var(--grad-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}>
                  <GraduationCap size={20} />
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--fp-text)' }}>
                  Future<span style={{ color: 'var(--fp-primary)' }}>Path</span>
                </div>
              </div>
              <button 
                onClick={() => setMobileDrawerOpen(false)}
                className="btn btn-secondary p-2 d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)' }}
                aria-label="Close Navigation"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer User Status */}
            {isLoggedIn ? (
              <div className="p-3 border-bottom bg-light d-flex align-items-center gap-3">
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--fp-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1rem'
                }}>
                  {userName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="overflow-hidden">
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--fp-text)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {userName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fp-text-secondary)' }}>
                    {isAdmin ? 'Administrator' : 'Student Account'}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Drawer Navigation Links */}
            <div className="p-3 d-flex flex-column gap-1 overflow-y-auto flex-grow-1">
              <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--fp-text-muted)', marginBottom: '0.4rem', paddingLeft: '0.5rem' }}>
                Main Navigation
              </div>

              {navLinks.map((tab) => {
                const isActive = activeTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavClick(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--fp-primary-soft)' : 'transparent',
                      color: isActive ? 'var(--fp-primary)' : 'var(--fp-text)',
                      fontWeight: isActive ? '700' : '500',
                      fontSize: '0.95rem',
                      textAlign: 'left',
                      border: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <IconComponent size={19} color={isActive ? 'var(--fp-primary)' : 'var(--fp-text-secondary)'} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--fp-text-muted)', margin: '1rem 0 0.4rem', paddingLeft: '0.5rem' }}>
                Interactive Tools
              </div>

              {/* Career Quiz Link in Mobile Menu */}
              <button
                onClick={() => handleNavClick('quiz')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: activeTab === 'quiz' ? 'var(--fp-primary-soft)' : 'transparent',
                  color: activeTab === 'quiz' ? 'var(--fp-primary)' : 'var(--fp-text)',
                  fontWeight: activeTab === 'quiz' ? '700' : '500',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  border: 'none'
                }}
              >
                <Sparkles size={19} color={activeTab === 'quiz' ? 'var(--fp-primary)' : 'var(--fp-accent)'} />
                <span>Career Quiz</span>
              </button>

              {/* Shortlist Link */}
              <button
                onClick={() => handleNavClick('bookmarks')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: activeTab === 'bookmarks' ? 'var(--fp-accent-soft)' : 'transparent',
                  color: activeTab === 'bookmarks' ? '#B45309' : 'var(--fp-text)',
                  fontWeight: activeTab === 'bookmarks' ? '700' : '500',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  border: 'none'
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <Bookmark size={19} color={activeTab === 'bookmarks' ? 'var(--fp-accent)' : '#B45309'} />
                  <span>My Shortlist</span>
                </div>
                {bookmarkCount > 0 && (
                  <span style={{
                    background: 'var(--fp-accent)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {bookmarkCount}
                  </span>
                )}
              </button>

              {/* Admin Panel (if admin) */}
              {isLoggedIn && isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: activeTab === 'admin' ? 'var(--fp-primary-soft)' : 'transparent',
                    color: activeTab === 'admin' ? 'var(--fp-primary)' : 'var(--fp-text)',
                    fontWeight: activeTab === 'admin' ? '700' : '500',
                    fontSize: '0.95rem',
                    textAlign: 'left',
                    border: 'none'
                  }}
                >
                  <ShieldCheck size={19} color="var(--fp-primary)" />
                  <span>Admin Panel</span>
                </button>
              )}
            </div>

            {/* Drawer Footer / Account Action */}
            <div className="p-3 border-top" style={{ borderColor: 'var(--fp-border)' }}>
              {isLoggedIn ? (
                <button
                  onClick={() => handleNavClick('profile')}
                  className="btn btn-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                  style={{ fontSize: '0.9rem' }}
                >
                  <User size={17} />
                  <span>My Account Profile</span>
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    onClick={() => handleNavClick('auth')}
                    className="btn btn-primary flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2"
                    style={{ fontSize: '0.9rem' }}
                  >
                    <LogIn size={17} />
                    <span>Login / Register</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
