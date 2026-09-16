import React, { useState } from 'react';
import { LogIn, UserPlus, Eye, EyeOff, Mail, Lock, User, GraduationCap, AlertTriangle, Info } from 'lucide-react';

export default function AuthView({ onLogin, onRegister, loading }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    qualification: '12th',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      const result = await onLogin(formData.email, formData.password);
      if (!result.success) setError(result.message);
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      const result = await onRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        qualification: formData.qualification,
      });
      if (!result.success) setError(result.message);
    }
  };

  return (
    <section style={{
      minHeight: 'calc(100vh - 72px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: 'var(--fp-bg)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        animation: 'fadeIn 0.4s ease forwards',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '14px',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 6px 20px rgba(79, 70, 229, 0.25)',
            color: '#ffffff',
          }}>
            {mode === 'login' ? <LogIn size={26} /> : <UserPlus size={26} />}
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--fp-text)' }}>
            {mode === 'login' ? (
              <>Welcome <span className="gradient-text">Back</span></>
            ) : (
              <>Create Your <span className="gradient-text">Account</span></>
            )}
          </h2>
          <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.9rem' }}>
            {mode === 'login'
              ? 'Sign in to access your saved preferences and bookmarks'
              : 'Join FuturePath to get personalized career guidance'}
          </p>
        </div>

        {/* Form Card */}
        <div className="fp-card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit}>
            {/* Name (register only) */}
            {mode === 'register' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>
                  <User size={13} style={{ marginRight: '4px' }} /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="fp-input"
                />
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>
                <Mail size={13} style={{ marginRight: '4px' }} /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="fp-input"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>
                <Lock size={13} style={{ marginRight: '4px' }} /> Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={mode === 'register' ? 'Min. 6 characters' : 'Enter your password'}
                  className="fp-input"
                  style={{ paddingRight: '42px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--fp-text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Qualification (register only) */}
            {mode === 'register' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>
                  <GraduationCap size={13} style={{ marginRight: '4px' }} /> Current Qualification
                </label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="fp-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="10th">10th Standard</option>
                  <option value="12th">12th Standard</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--fp-danger-soft)',
                border: '1px solid #FECACA',
                color: '#B91C1C',
                fontSize: '0.85rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <AlertTriangle size={15} /> {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                'Please wait...'
              ) : mode === 'login' ? (
                <><LogIn size={17} /> Sign In</>
              ) : (
                <><UserPlus size={17} /> Create Account</>
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <div style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--fp-border)',
          }}>
            <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.85rem' }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--fp-primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  textDecoration: 'underline',
                }}
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--fp-primary-soft)',
            border: '1px solid #C7D2FE',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
          }}>
            <Info size={15} style={{ color: 'var(--fp-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--fp-primary)', fontWeight: '700', marginBottom: '0.2rem' }}>
                Demo Credentials
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--fp-text-secondary)' }}>
                Admin: admin@futurepath.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.78rem',
  fontWeight: '600',
  color: 'var(--fp-text-secondary)',
  marginBottom: '0.4rem',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};
