import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview'); // 'overview' | 'users'
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.getAdminStats(),
        api.getAdminUsers(),
      ]);

      if (statsRes.success) {
        setStats(statsRes.stats);
        setRecentUsers(statsRes.recentUsers || []);
      }
      if (usersRes.success) {
        setUsers(usersRes.data || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await api.deleteUser(userId);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        setDeleteConfirm(null);
        loadDashboardData(); // Refresh stats
      }
    } catch (err) {
      alert(err.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <section className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>⏳ Loading admin dashboard...</div>
      </section>
    );
  }

  return (
    <section className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>🛡️ Admin Panel</span>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Dashboard <span className="gradient-text">Overview</span>
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Manage users and monitor platform content at a glance.
        </p>
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[
          { id: 'overview', label: '📊 Overview', icon: '📊' },
          { id: 'users', label: '👥 Users', icon: '👥' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.5rem 1.2rem',
              fontSize: '0.85rem',
              fontWeight: activeSection === tab.id ? '700' : '500',
              borderRadius: 'var(--radius-sm)',
              background: activeSection === tab.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              color: activeSection === tab.id ? '#fff' : 'var(--text-muted)',
              border: activeSection === tab.id ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--border-light)',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW SECTION */}
      {activeSection === 'overview' && stats && (
        <div style={{ animation: 'fadeIn 0.4s ease forwards' }}>
          {/* User Stats Row */}
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            👥 User Statistics
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            <StatCard label="Total Users" value={stats.users.total} icon="👤" color="#6366f1" />
            <StatCard label="Students" value={stats.users.students} icon="🎓" color="#10b981" />
            <StatCard label="Admins" value={stats.users.admins} icon="🛡️" color="#f59e0b" />
          </div>

          {/* Content Stats Row */}
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            📦 Content Statistics
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            <StatCard label="Courses" value={stats.content.courses} icon="📚" color="#06b6d4" />
            <StatCard label="Institutions" value={stats.content.institutions} icon="🏛️" color="#8b5cf6" />
            <StatCard label="Careers" value={stats.content.careers} icon="💼" color="#ec4899" />
            <StatCard label="Pathways" value={stats.content.pathways} icon="🗺️" color="#f59e0b" />
            <StatCard label="Qualifications" value={stats.content.qualifications} icon="📝" color="#6366f1" />
            <StatCard label="Streams" value={stats.content.streams} icon="🌊" color="#10b981" />
            <StatCard label="Cities" value={stats.content.cities} icon="📍" color="#ef4444" />
          </div>

          {/* Recent Users */}
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            🕐 Recent Registrations
          </h3>
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={tdStyle}>{u.name}</td>
                    <td style={tdStyle}>{u.email}</td>
                    <td style={tdStyle}>
                      <span className={`badge ${u.role === 'admin' ? 'badge-amber' : 'badge-emerald'}`}
                        style={{ fontSize: '0.65rem' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: 'var(--text-sub)' }}>
                      {new Date(u.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
                {recentUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ ...tdStyle, textAlign: 'center', color: 'var(--text-sub)' }}>
                      No users yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* USERS MANAGEMENT SECTION */}
      {activeSection === 'users' && (
        <div style={{ animation: 'fadeIn 0.4s ease forwards' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              All Registered Users ({users.length})
            </h3>
            <button
              onClick={loadDashboardData}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            >
              🔄 Refresh
            </button>
          </div>

          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Qualification</th>
                  <th style={thStyle}>Joined</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: u.role === 'admin' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          color: u.role === 'admin' ? '#fbbf24' : '#34d399',
                        }}>
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        {u.name}
                      </div>
                    </td>
                    <td style={{ ...tdStyle, color: 'var(--text-sub)', fontSize: '0.8rem' }}>{u.email}</td>
                    <td style={tdStyle}>
                      <span className={`badge ${u.role === 'admin' ? 'badge-amber' : 'badge-emerald'}`}
                        style={{ fontSize: '0.65rem' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>{u.qualification || '—'}</td>
                    <td style={{ ...tdStyle, color: 'var(--text-sub)', fontSize: '0.8rem' }}>
                      {new Date(u.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td style={tdStyle}>
                      {u.role !== 'admin' ? (
                        deleteConfirm === u._id ? (
                          <div style={{ display: 'flex', gap: '0.3rem' }}>
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.7rem',
                                borderRadius: '4px',
                                background: 'rgba(244, 63, 94, 0.2)',
                                color: '#fb7185',
                                border: '1px solid rgba(244, 63, 94, 0.3)',
                              }}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.7rem',
                                borderRadius: '4px',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-muted)',
                                border: '1px solid var(--border-light)',
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(u._id)}
                            style={{
                              padding: '0.25rem 0.6rem',
                              fontSize: '0.7rem',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.04)',
                              color: '#fb7185',
                              border: '1px solid rgba(244, 63, 94, 0.2)',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        )
                      ) : (
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Protected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="glass-card" style={{
      padding: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    }}>
      <div style={{
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        background: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: 'var(--text-main)',
          lineHeight: 1.1,
        }}>
          {value}
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-sub)',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '0.75rem 1rem',
  fontSize: '0.7rem',
  fontWeight: '600',
  color: 'var(--text-sub)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  background: 'rgba(255, 255, 255, 0.02)',
};

const tdStyle = {
  padding: '0.65rem 1rem',
  fontSize: '0.85rem',
  color: 'var(--text-main)',
};
