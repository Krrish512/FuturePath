import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Users,
  GraduationCap,
  Shield,
  BookOpen, 
  Building2, 
  Briefcase, 
  Map, 
  FileText, 
  Waves, 
  MapPin, 
  Clock, 
  RefreshCw, 
  Trash2, 
  BarChart3, 
  UserCog 
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
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
        loadDashboardData();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <section className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1.1rem', color: 'var(--fp-text-secondary)' }}>Loading admin dashboard...</div>
      </section>
    );
  }

  return (
    <section className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
          <Shield size={12} /> Admin Panel
        </span>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--fp-text)' }}>
          Dashboard <span className="gradient-text">Overview</span>
        </h2>
        <p style={{ color: 'var(--fp-text-secondary)' }}>
          Manage users and monitor platform content at a glance.
        </p>
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'users', label: 'Users', icon: UserCog },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              style={{
                padding: '0.5rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: activeSection === tab.id ? '700' : '500',
                borderRadius: 'var(--radius-sm)',
                background: activeSection === tab.id ? 'var(--fp-primary-soft)' : 'var(--fp-surface)',
                color: activeSection === tab.id ? 'var(--fp-primary)' : 'var(--fp-text-secondary)',
                border: activeSection === tab.id ? '1px solid #C7D2FE' : '1px solid var(--fp-border)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <IconComponent size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* OVERVIEW SECTION */}
      {activeSection === 'overview' && stats && (
        <div style={{ animation: 'fadeIn 0.3s ease forwards' }}>
          {/* User Stats Row */}
          <h3 style={{ fontSize: '1rem', color: 'var(--fp-text-secondary)', marginBottom: '1rem', fontWeight: '600' }}>
            User Statistics
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            <StatCard label="Total Users" value={stats.users.total} icon={Users} color="var(--fp-primary)" bgColor="var(--fp-primary-soft)" />
            <StatCard label="Students" value={stats.users.students} icon={GraduationCap} color="#047857" bgColor="var(--fp-success-soft)" />
            <StatCard label="Admins" value={stats.users.admins} icon={Shield} color="#B45309" bgColor="var(--fp-accent-soft)" />
          </div>

          {/* Content Stats Row */}
          <h3 style={{ fontSize: '1rem', color: 'var(--fp-text-secondary)', marginBottom: '1rem', fontWeight: '600' }}>
            Content Statistics
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            <StatCard label="Courses" value={stats.content.courses} icon={BookOpen} color="#0369A1" bgColor="var(--fp-cyan-soft)" />
            <StatCard label="Institutions" value={stats.content.institutions} icon={Building2} color="#6D28D9" bgColor="var(--fp-purple-soft)" />
            <StatCard label="Careers" value={stats.content.careers} icon={Briefcase} color="#B91C1C" bgColor="var(--fp-danger-soft)" />
            <StatCard label="Pathways" value={stats.content.pathways} icon={Map} color="#B45309" bgColor="var(--fp-accent-soft)" />
            <StatCard label="Qualifications" value={stats.content.qualifications} icon={FileText} color="var(--fp-primary)" bgColor="var(--fp-primary-soft)" />
            <StatCard label="Streams" value={stats.content.streams} icon={Waves} color="#047857" bgColor="var(--fp-success-soft)" />
            <StatCard label="Cities" value={stats.content.cities} icon={MapPin} color="#B91C1C" bgColor="var(--fp-danger-soft)" />
          </div>

          {/* Recent Users */}
          <h3 style={{ fontSize: '1rem', color: 'var(--fp-text-secondary)', marginBottom: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={15} /> Recent Registrations
          </h3>
          <div className="fp-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--fp-border)' }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid var(--fp-border-subtle)' }}>
                    <td style={tdStyle}>{u.name}</td>
                    <td style={{ ...tdStyle, color: 'var(--fp-text-secondary)', fontSize: '0.8rem' }}>{u.email}</td>
                    <td style={tdStyle}>
                      <span className={`badge ${u.role === 'admin' ? 'badge-amber' : 'badge-emerald'}`}
                        style={{ fontSize: '0.65rem' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: 'var(--fp-text-muted)', fontSize: '0.8rem' }}>
                      {new Date(u.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
                {recentUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ ...tdStyle, textAlign: 'center', color: 'var(--fp-text-muted)' }}>
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
        <div style={{ animation: 'fadeIn 0.3s ease forwards' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--fp-text-secondary)', fontWeight: '600' }}>
              All Registered Users ({users.length})
            </h3>
            <button
              onClick={loadDashboardData}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            >
              <RefreshCw size={14} /> Refresh
            </button>
          </div>

          <div className="fp-card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '650px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--fp-border)' }}>
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
                    <tr key={u._id} style={{ borderBottom: '1px solid var(--fp-border-subtle)' }}>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: u.role === 'admin' ? 'var(--fp-accent-soft)' : 'var(--fp-success-soft)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            color: u.role === 'admin' ? '#B45309' : '#047857',
                            flexShrink: 0,
                          }}>
                            {u.name?.charAt(0).toUpperCase()}
                          </div>
                          <span style={{ fontWeight: '500' }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ ...tdStyle, color: 'var(--fp-text-secondary)', fontSize: '0.8rem' }}>{u.email}</td>
                      <td style={tdStyle}>
                        <span className={`badge ${u.role === 'admin' ? 'badge-amber' : 'badge-emerald'}`}
                          style={{ fontSize: '0.65rem' }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ ...tdStyle, color: 'var(--fp-text-secondary)' }}>{u.qualification || '—'}</td>
                      <td style={{ ...tdStyle, color: 'var(--fp-text-muted)', fontSize: '0.8rem' }}>
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
                                  background: 'var(--fp-danger-soft)',
                                  color: '#B91C1C',
                                  border: '1px solid #FECACA',
                                  fontWeight: '600',
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
                                  background: 'var(--fp-surface)',
                                  color: 'var(--fp-text-secondary)',
                                  border: '1px solid var(--fp-border)',
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
                                background: 'var(--fp-surface)',
                                color: '#B91C1C',
                                border: '1px solid #FECACA',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                              }}
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          )
                        ) : (
                          <span style={{ fontSize: '0.7rem', color: 'var(--fp-text-muted)', fontStyle: 'italic' }}>Protected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value, icon: IconComponent, color, bgColor }) {
  return (
    <div className="fp-card" style={{
      padding: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    }}>
      <div style={{
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: color,
      }}>
        <IconComponent size={20} />
      </div>
      <div>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: 'var(--fp-text)',
          lineHeight: 1.1,
        }}>
          {value}
        </div>
        <div style={{
          fontSize: '0.73rem',
          color: 'var(--fp-text-muted)',
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
  color: 'var(--fp-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  background: 'var(--fp-border-subtle)',
};

const tdStyle = {
  padding: '0.65rem 1rem',
  fontSize: '0.85rem',
  color: 'var(--fp-text)',
};
