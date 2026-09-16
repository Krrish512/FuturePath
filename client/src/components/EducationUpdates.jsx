import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  Bell, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  Globe, 
  Building2, 
  Award, 
  FileText, 
  Search,
  AlertCircle
} from 'lucide-react';

export default function EducationUpdates() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const fetchUpdates = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const res = isRefresh 
        ? await api.refreshEducationUpdates() 
        : await api.getEducationUpdates();
      
      const payload = isRefresh ? res.data : res;
      setData(payload);
    } catch (err) {
      console.error('Error loading updates:', err);
      setError('Unable to reach the education updates service. Please check your network connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const portals = data?.officialPortals || [];
  const liveUpdates = data?.updates || [];

  const categories = ['All', 'Admissions', 'Examinations', 'Scholarships', 'Higher Education', 'Accreditation', 'Digital Services'];

  const filteredPortals = portals.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authority.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="container-xl px-3 px-sm-4 py-4 py-lg-5" style={{ minHeight: '80vh' }}>
      
      {/* Header Banner */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-indigo" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Bell size={14} /> Official Portals & Updates
          </span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--fp-text)' }}>
          Verified Education <span className="gradient-text">Channels & Notices</span>
        </h1>
        <p style={{ color: 'var(--fp-text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
          Direct access to authentic Gujarat state & national admission boards, examination authorities, scholarship portals, and real-time open government education datasets.
        </p>
      </div>

      {/* Status & Live Cache Indicator Card */}
      <div className="card p-3 p-md-4 mb-4" style={{ background: '#F8FAFC', borderColor: 'var(--fp-border)' }}>
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
          
          <div className="d-flex align-items-center gap-3">
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: data?.configured ? 'var(--fp-success-soft)' : 'var(--fp-primary-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: data?.configured ? 'var(--fp-success)' : 'var(--fp-primary)',
              flexShrink: 0
            }}>
              {data?.configured ? <CheckCircle2 size={22} /> : <ShieldCheck size={22} />}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--fp-text)' }}>
                  Data Feed Status: {data?.configured ? 'Live API Connected (data.gov.in)' : 'Verified Official Government Channels'}
                </span>
                <span className="badge" style={{
                  background: data?.configured ? 'var(--fp-success-soft)' : 'var(--fp-primary-soft)',
                  color: data?.configured ? 'var(--fp-success)' : 'var(--fp-primary)',
                  fontSize: '0.7rem',
                  fontWeight: '700'
                }}>
                  {data?.configured ? 'Active Sync' : 'Direct Verified Portals'}
                </span>
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--fp-text-muted)', marginTop: '0.2rem' }}>
                {data?.configured 
                  ? `Last synced: ${data?.cachedAt ? new Date(data.cachedAt).toLocaleTimeString() : 'Just now'} • Source: Open Data Government Platform`
                  : 'Displaying authentic 1-click verified Gujarat State and Central Government education portals.'}
              </div>
            </div>
          </div>

          {/* Refresh Action */}
          <button
            onClick={() => fetchUpdates(true)}
            disabled={loading || refreshing}
            className="btn btn-secondary d-flex align-items-center gap-2 text-nowrap"
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.95rem' }}
          >
            <RefreshCw size={15} className={refreshing ? 'spin-icon' : ''} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh Sources'}</span>
          </button>

        </div>

        {!data?.configured && (
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--fp-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--fp-text-muted)' }}>
            <Info size={15} style={{ color: 'var(--fp-primary)', flexShrink: 0 }} />
            <span>
              <strong>Developer Note:</strong> To enable real-time dynamic datasets directly from data.gov.in, provide a free API key in <code>server/.env</code> under <code>DATA_GOV_IN_API_KEY</code>.
            </span>
          </div>
        )}
      </div>

      {/* Search & Category Filter Pills */}
      <div className="mb-4">
        <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center mb-3">
          
          {/* Category Filter Pills */}
          <div className="d-flex flex-wrap gap-1 gap-sm-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.825rem',
                    fontWeight: active ? '700' : '500',
                    borderRadius: 'var(--radius-full)',
                    background: active ? 'var(--fp-primary)' : 'var(--fp-surface)',
                    color: active ? '#ffffff' : 'var(--fp-text-secondary)',
                    border: active ? '1px solid var(--fp-primary)' : '1px solid var(--fp-border)',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ minWidth: '260px', width: '100%', maxWidth: '340px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fp-text-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portal or board..."
              className="fp-input"
              style={{ paddingLeft: '2.35rem', fontSize: '0.85rem', height: '38px' }}
            />
          </div>

        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--fp-text-muted)' }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '2.5rem', height: '2.5rem', marginBottom: '1rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <div style={{ fontWeight: '600' }}>Fetching verified official channels...</div>
        </div>
      ) : error ? (
        <div className="card p-4 text-center" style={{ borderColor: 'var(--fp-danger-soft)', background: '#FEF2F2', maxWidth: '600px', margin: '2rem auto' }}>
          <AlertCircle size={36} color="var(--fp-danger)" style={{ margin: '0 auto 0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--fp-danger)', marginBottom: '0.5rem' }}>Unable to Load Updates</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', marginBottom: '1.25rem' }}>{error}</p>
          <button onClick={() => fetchUpdates()} className="btn btn-primary" style={{ margin: '0 auto' }}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Live Records Section (if any from data.gov.in) */}
          {liveUpdates.length > 0 && (
            <div className="mb-5">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Sparkles size={18} color="var(--fp-primary)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--fp-text)' }}>
                  Live Datasets from Open Data India
                </h2>
              </div>
              <div className="row g-3">
                {liveUpdates.map((item) => (
                  <div key={item.id} className="col-12 col-md-6">
                    <div className="card h-100 p-3" style={{ borderLeft: '4px solid var(--fp-primary)' }}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="badge badge-indigo">{item.category}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--fp-text-muted)' }}>{item.date}</span>
                      </div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.4rem' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '0.825rem', color: 'var(--fp-text-secondary)', marginBottom: '0.75rem', flexGrow: 1 }}>
                        {item.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center pt-2" style={{ borderTop: '1px solid var(--fp-border)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--fp-text-muted)' }}>Source: {item.source}</span>
                        <a 
                          href={item.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="d-flex align-items-center gap-1 text-decoration-none"
                          style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--fp-primary)' }}
                        >
                          <span>Open Dataset</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Portals Directory */}
          <div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <Globe size={18} color="var(--fp-primary)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--fp-text)' }}>
                  Verified Government Portals ({filteredPortals.length})
                </h2>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--fp-text-muted)' }}>
                Direct, uncompromised student access
              </span>
            </div>

            {filteredPortals.length === 0 ? (
              <div className="card p-5 text-center" style={{ background: '#F8FAFC' }}>
                <Info size={32} color="var(--fp-text-muted)" style={{ margin: '0 auto 0.75rem' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.35rem' }}>No Portals Found</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', marginBottom: '1rem' }}>
                  No verified portal matches your selected category or search query.
                </p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="btn btn-secondary" 
                  style={{ margin: '0 auto', fontSize: '0.85rem' }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="row g-3">
                {filteredPortals.map((portal) => (
                  <div key={portal.id} className="col-12 col-md-6 col-lg-4">
                    <div 
                      className="card h-100 p-3 d-flex flex-column"
                      style={{
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        position: 'relative'
                      }}
                    >
                      {/* Top Badges */}
                      <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                        <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                          {portal.category}
                        </span>
                        <span className="badge" style={{
                          background: 'var(--fp-success-soft)',
                          color: 'var(--fp-success)',
                          fontSize: '0.68rem',
                          fontWeight: '700'
                        }}>
                          {portal.badge}
                        </span>
                      </div>

                      {/* Portal Title */}
                      <h3 style={{ fontSize: '0.975rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.4rem', lineHeight: '1.35' }}>
                        {portal.title}
                      </h3>

                      {/* Authority */}
                      <div style={{ fontSize: '0.75rem', color: 'var(--fp-primary)', fontWeight: '600', marginBottom: '0.6rem' }}>
                        🏛️ {portal.authority}
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: '0.825rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5', marginBottom: '1.25rem', flexGrow: 1 }}>
                        {portal.description}
                      </p>

                      {/* Action Button */}
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          fontSize: '0.825rem',
                          padding: '0.45rem 0.85rem',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}
                      >
                        <span>Visit Official Portal</span>
                        <ExternalLink size={14} />
                      </a>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Notice Guidance Box */}
          <div className="mt-5 p-4 card" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F0FDF4 100%)', borderColor: '#C7D2FE' }}>
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--fp-text)', marginBottom: '0.35rem' }}>
                  Need Academic Guidance Based on These Portals?
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', marginBottom: 0 }}>
                  Take our 2-minute Career Aptitude Quiz or explore interactive roadmaps to match your 10th/12th results with top Gujarat colleges.
                </p>
              </div>
              <div className="d-flex gap-2 flex-shrink-0">
                <a 
                  href="#guidance-wizard" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = 'explore';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary" 
                  style={{ fontSize: '0.85rem' }}
                >
                  Explore Roadmaps
                </a>
              </div>
            </div>
          </div>

        </>
      )}

    </section>
  );
}
