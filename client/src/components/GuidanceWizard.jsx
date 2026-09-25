import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import PathwayCard from './PathwayCard';
import CourseCard from './CourseCard';
import CareerCard from './CareerCard';
import InstitutionCard from './InstitutionCard';

export default function GuidanceWizard({ 
  initialQual = '12th', 
  initialStream = 'Science',
  onToggleBookmark,
  isBookmarked
}) {
  const [qualification, setQualification] = useState(initialQual);
  const [stream, setStream] = useState(initialStream);
  const [guidanceData, setGuidanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('pathways'); // 'pathways' | 'courses' | 'careers' | 'institutions'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGuidance(qualification, stream);
  }, [qualification, stream]);

  const fetchGuidance = async (qual, str) => {
    setLoading(true);
    try {
      const res = await api.getGuidance(qual, str);
      if (res.success) {
        setGuidanceData(res.data);
      }
    } catch (err) {
      console.error('Failed to load guidance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQualChange = (newQual) => {
    setQualification(newQual);
    if (newQual === '10th') {
      setStream('General');
    } else {
      setStream('Science');
    }
  };

  // Filter items by search keyword
  const filterBySearch = (items = [], fields = []) => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter((item) => {
      return fields.some((field) => {
        const val = item[field];
        if (typeof val === 'string') return val.toLowerCase().includes(term);
        if (Array.isArray(val)) return val.some((v) => typeof v === 'string' && v.toLowerCase().includes(term));
        return false;
      });
    });
  };

  const filteredPathways = filterBySearch(guidanceData?.pathways, ['title', 'description', 'steps']);
  const filteredCourses = filterBySearch(guidanceData?.courses, ['name', 'description', 'subjects', 'eligibility']);
  const filteredCareers = filterBySearch(guidanceData?.careers, ['title', 'description', 'requiredSkills', 'jobRoles']);
  const filteredInstitutions = filterBySearch(guidanceData?.institutions, ['name', 'address', 'affiliation']);

  return (
    <section id="guidance-wizard" style={{ padding: '2rem 0 5rem' }}>
      <div className="container">
        {/* Wizard Filter Controls */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Interactive Guidance <span className="gradient-text">Decision Explorer</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Select your qualification and academic stream to get personalized roadmaps, degrees, careers & colleges.
            </p>
          </div>

          {/* Selector 1: Qualification */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-sub)', marginBottom: '0.75rem', textAlign: 'center' }}>
              Step 1: Select Your Completed Education
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { id: '10th', label: '10th Standard (SSC)', icon: '🎒' },
                { id: '12th', label: '12th Standard (HSC)', icon: '🎓' }
              ].map((item) => {
                const isSelected = qualification === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleQualChange(item.id)}
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      padding: '0.85rem 1.75rem',
                      fontSize: '1rem',
                      minWidth: '220px'
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector 2: Stream (if 12th) */}
          {qualification === '12th' && (
            <div className="fade-in" style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-sub)', marginBottom: '0.75rem', textAlign: 'center' }}>
                Step 2: Choose Your Stream
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'Science', label: 'Science (PCM/PCB)', icon: '🔬' },
                  { id: 'Commerce', label: 'Commerce', icon: '📈' },
                  { id: 'Arts', label: 'Arts & Humanities', icon: '🎨' },
                  { id: 'All', label: 'All Streams (Universal)', icon: '🌐' }
                ].map((s) => {
                  const isSelected = stream === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStream(s.id)}
                      style={{
                        padding: '0.6rem 1.25rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: isSelected ? '#ffffff' : 'var(--text-muted)',
                        background: isSelected ? 'var(--grad-primary)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '1px solid transparent' : '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 4px 14px rgba(99, 102, 241, 0.35)' : 'none'
                      }}
                    >
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Live Search Filter Input */}
          <div style={{ maxWidth: '540px', margin: '1rem auto 0', position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Live keyword search (e.g. Developer, Medical, GTU, DBMS)..."
              style={{
                width: '100%',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Section Navigation Tabs */}
        {guidanceData && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'pathways', label: 'Step-by-Step Roadmaps', count: filteredPathways?.length, icon: '🗺️' },
              { id: 'courses', label: 'Degree Programs', count: filteredCourses?.length, icon: '📚' },
              { id: 'careers', label: 'Career Trajectories', count: filteredCareers?.length, icon: '💼' },
              { id: 'institutions', label: 'Top Colleges', count: filteredInstitutions?.length, icon: '🏛️' }
            ].map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    background: isActive ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span>{section.icon}</span>
                  <span>{section.label}</span>
                  <span style={{
                    background: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    padding: '0.1rem 0.5rem',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {section.count || 0}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(99, 102, 241, 0.2)',
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: 'var(--text-muted)' }}>Retrieving personalized guidance recommendations...</p>
          </div>
        )}

        {/* Content Display */}
        {!loading && guidanceData && (
          <div>
            {/* Section 1: Pathways */}
            {activeSection === 'pathways' && (
              <div className="fp-grid-cards">
                {filteredPathways && filteredPathways.length > 0 ? (
                  filteredPathways.map((pathway) => (
                    <PathwayCard 
                      key={pathway._id} 
                      pathway={pathway} 
                      onToggleBookmark={onToggleBookmark}
                      isSaved={isBookmarked && isBookmarked(pathway._id, 'pathway')}
                    />
                  ))
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                    <p style={{ color: 'var(--text-muted)' }}>No roadmaps found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}

            {/* Section 2: Courses */}
            {activeSection === 'courses' && (
              <div className="fp-grid-cards">
                {filteredCourses && filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <CourseCard 
                      key={course._id} 
                      course={course} 
                      onToggleBookmark={onToggleBookmark}
                      isSaved={isBookmarked && isBookmarked(course._id, 'course')}
                    />
                  ))
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                    <p style={{ color: 'var(--text-muted)' }}>No courses found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}

            {/* Section 3: Careers */}
            {activeSection === 'careers' && (
              <div className="fp-grid-cards">
                {filteredCareers && filteredCareers.length > 0 ? (
                  filteredCareers.map((career) => (
                    <CareerCard 
                      key={career._id} 
                      career={career} 
                      onToggleBookmark={onToggleBookmark}
                      isSaved={isBookmarked && isBookmarked(career._id, 'career')}
                    />
                  ))
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                    <p style={{ color: 'var(--text-muted)' }}>No career trajectories found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}

            {/* Section 4: Institutions */}
            {activeSection === 'institutions' && (
              <div className="fp-grid-cards">
                {filteredInstitutions && filteredInstitutions.length > 0 ? (
                  filteredInstitutions.map((inst) => (
                    <InstitutionCard 
                      key={inst._id} 
                      institution={inst} 
                      onToggleBookmark={onToggleBookmark}
                      isSaved={isBookmarked && isBookmarked(inst._id, 'institution')}
                    />
                  ))
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                    <p style={{ color: 'var(--text-muted)' }}>No institutions found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
