import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import PathwayCard from './PathwayCard';
import CourseCard from './CourseCard';
import CareerCard from './CareerCard';
import InstitutionCard from './InstitutionCard';
import { 
  Compass, 
  BookOpen, 
  Layers, 
  Stethoscope, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Search, 
  CheckCircle2, 
  Sparkles,
  Info,
  ArrowRight
} from 'lucide-react';

export default function GuidanceWizard({ 
  initialQual = '12th', 
  initialStream = 'Science',
  onToggleBookmark,
  isBookmarked,
  onToggleCompare,
  isCompared
}) {
  const [qualification, setQualification] = useState(initialQual);
  const [stream, setStream] = useState(initialStream);
  const [guidanceData, setGuidanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allInstitutionsList, setAllInstitutionsList] = useState([]);
  const [allMasterCourses, setAllMasterCourses] = useState([]);

  // Active section tab:
  // For 10th: '10th_paths' | '10th_healthcare' | '10th_diploma' | '10th_iti' | 'careers' | 'institutions'
  // For 12th: 'ug_degrees' | 'integrated' | 'medical' | 'postgraduate' | 'pathways' | 'careers' | 'institutions'
  const [activeSection, setActiveSection] = useState('ug_degrees');
  const [medicalSubFilter, setMedicalSubFilter] = useState('undergraduate'); // 'undergraduate' | 'postgraduate' | 'diploma' | 'all'

  // Load institutions and all master courses list for course mapping
  useEffect(() => {
    api.getInstitutions()
      .then((res) => {
        if (res.success) setAllInstitutionsList(res.data || []);
      })
      .catch((err) => console.error('Error loading institutions in wizard:', err));

    api.getCourses()
      .then((res) => {
        if (res.success) setAllMasterCourses(res.data || []);
      })
      .catch((err) => console.error('Error loading master courses in wizard:', err));
  }, []);

  // Update stream & section default when qualification changes
  const handleQualChange = (newQual) => {
    setQualification(newQual);
    if (newQual === '10th') {
      setStream('General');
      setActiveSection('10th_paths');
    } else {
      setStream('Science');
      setActiveSection('ug_degrees');
    }
  };

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

  // Helper filter by search term
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

  // Base raw collections from guidanceData and allMasterCourses
  const rawPathways = guidanceData?.pathways || [];
  const rawCourses = guidanceData?.courses || [];
  const rawCareers = guidanceData?.careers || [];
  const rawInstitutions = guidanceData?.institutions || [];

  // Filtered collections
  const filteredPathways = filterBySearch(rawPathways, ['title', 'description', 'steps']);
  const filteredCourses = filterBySearch(rawCourses, ['name', 'course_name', 'shortName', 'description', 'subjects', 'eligibility', 'field_of_study', 'university_name', 'category']);
  const filteredMasterCourses = filterBySearch(allMasterCourses.length > 0 ? allMasterCourses : rawCourses, ['name', 'course_name', 'shortName', 'description', 'subjects', 'eligibility', 'field_of_study', 'university_name', 'category']);
  const filteredCareers = filterBySearch(rawCareers, ['title', 'description', 'requiredSkills', 'jobRoles', 'skills']);
  const filteredInstitutions = filterBySearch(rawInstitutions.length > 0 ? rawInstitutions : allInstitutionsList, ['name', 'address', 'affiliation', 'type']);

  // Segmenting 10th Pathways
  const diplomaPathways10th = filteredPathways.filter((p) => {
    const t = (p.title + ' ' + p.description).toLowerCase();
    return t.includes('diploma') || t.includes('polytechnic') || t.includes('d2d');
  });

  const itiPathways10th = filteredPathways.filter((p) => {
    const t = (p.title + ' ' + p.description).toLowerCase();
    return t.includes('iti') || t.includes('vocational') || t.includes('trade') || t.includes('skill');
  });

  // Helper to identify medical / healthcare courses
  const isMedicalCourse = (c) => {
    const cat = (c.category || '').toLowerCase();
    const f = (c.field_of_study || '').toLowerCase();
    const n = (c.name || c.course_name || '').toLowerCase();
    const s = (c.shortName || '').toLowerCase();
    return cat.includes('medical') || cat.includes('healthcare') ||
           f.includes('medical') || f.includes('dental') || f.includes('nursing') || f.includes('physiotherapy') || f.includes('pharmaceutical') || f.includes('biological') || f.includes('radiological') || f.includes('surgical') || f.includes('vision') || f.includes('renal') || f.includes('pathology') ||
           n.includes('mbbs') || n.includes('bds') || n.includes('bhms') || n.includes('bums') || n.includes('bnys') || n.includes('bvsc') || n.includes('nursing') || n.includes('physiotherapy') || n.includes('pharmacy') || n.includes('optometry') || n.includes('laboratory') || n.includes('radiology') || n.includes('operation theatre') || n.includes('doctor of medicine') || n.includes('master of surgery') || n.includes('master of dental') || n.includes('dmlt') || n.includes('dialysis') ||
           s === 'mbbs' || s === 'bds' || s === 'bhms' || s === 'bums' || s === 'bnys' || s === 'bpt' || s === 'b.pharm' || s === 'dmlt' || s === 'md' || s === 'ms' || s === 'mds';
  };

  // 10th Healthcare Diplomas (5 distinct courses)
  const healthcareDiplomaCourses10th = filteredMasterCourses.filter((c) => {
    const is10 = c.qualification === '10th' || c.level === 'after10' || (c.course_level || '').toLowerCase().includes('diploma');
    return is10 && isMedicalCourse(c);
  });

  // Segmenting 12th Courses
  const ugDegrees = filteredCourses.filter((c) => {
    const lvl = c.course_level || 'Undergraduate';
    const isInt = lvl.includes('Integrated') || (c.name || '').includes('Integrated') || c.duration === '5 Years';
    const isMed = isMedicalCourse(c);
    return lvl === 'Undergraduate' && !isInt && !isMed;
  });

  const integratedCourses = filteredCourses.filter((c) => {
    const lvl = c.course_level || '';
    return lvl.includes('Integrated') || (c.name || '').includes('Integrated') || c.duration === '5 Years';
  });

  // 12th Medical Undergraduate Courses (13 distinct courses)
  const medUndergraduateCourses = filteredMasterCourses.filter((c) => {
    const lvl = (c.course_level || '').toLowerCase();
    const isUG = lvl === 'undergraduate' || c.level === 'undergraduate';
    return isUG && isMedicalCourse(c);
  });

  // Medical Postgraduate Courses (3 distinct courses)
  const medPostgraduateCourses = filteredMasterCourses.filter((c) => {
    const lvl = (c.course_level || '').toLowerCase();
    const isPG = lvl === 'postgraduate' || c.level === 'postgraduate';
    return isPG && isMedicalCourse(c);
  });

  // All Medical Courses Combined
  const allMedicalCourses = filteredMasterCourses.filter((c) => isMedicalCourse(c));

  // General PG Courses
  const pgCourses = filteredCourses.filter((c) => {
    return (c.course_level || '') === 'Postgraduate' && !isMedicalCourse(c);
  });

  return (
    <section id="guidance-wizard" style={{ padding: '2rem 0 5rem' }}>
      <div className="container">
        {/* Wizard Filter Controls Header */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.4rem', padding: '0.3rem 0.8rem' }}>
              <Compass size={14} /> FuturePath Education Explorer
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--fp-text)' }}>
              Interactive Academic & Career <span className="gradient-text">Decision Explorer</span>
            </h2>
            <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem', maxWidth: '680px', margin: '0 auto' }}>
              {qualification === '10th' 
                ? 'Choose a pathway after completing Class 10. Explore Higher Secondary (11th & 12th), Polytechnic Engineering Diplomas, ITI Skill Trades, and direct vocational options.'
                : 'Select your 12th stream to explore undergraduate degrees, 5-year continuous integrated UG+PG programmes, medical pathways, and industry careers.'}
            </p>
          </div>

          {/* Selector 1: Qualification */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--fp-primary)', marginBottom: '0.75rem', textAlign: 'center' }}>
              Step 1: Select Completed Education Level
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { id: '10th', label: 'After 10th (Secondary)', sub: 'Diplomas, ITI & 11th-12th Streams', icon: '🎒' },
                { id: '12th', label: 'After 12th (Higher Secondary)', sub: 'Degrees, Integrated & Medical Pathways', icon: '🎓' }
              ].map((item) => {
                const isSelected = qualification === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleQualChange(item.id)}
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      padding: '0.85rem 1.75rem',
                      minWidth: '240px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.2rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', fontWeight: '700' }}>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', opacity: isSelected ? 0.9 : 0.7, fontWeight: '400' }}>
                      {item.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector 2: Stream (Only when 12th is selected) */}
          {qualification === '12th' && (
            <div className="fade-in" style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--fp-primary)', marginBottom: '0.75rem', textAlign: 'center' }}>
                Step 2: Choose Your 12th Standard Stream
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
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
                        padding: '0.55rem 1.15rem',
                        fontSize: '0.875rem',
                        fontWeight: isSelected ? '700' : '500',
                        borderRadius: 'var(--radius-full)',
                        background: isSelected ? 'var(--fp-primary)' : 'var(--fp-surface)',
                        color: isSelected ? '#FFFFFF' : 'var(--fp-text-secondary)',
                        border: isSelected ? '1px solid var(--fp-primary)' : '1px solid var(--fp-border)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.15s ease'
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
              placeholder="🔍 Search programs, roadmaps, degrees or colleges..."
              className="fp-input"
              style={{
                width: '100%',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem'
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
                  color: 'var(--fp-text-secondary)',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ==========================================================================
           DYNAMIC TABS NAVIGATION (Tailored by Qualification)
           ========================================================================== */}
        {guidanceData && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {qualification === '10th' ? (
              /* TABS FOR AFTER 10TH */
              [
                { id: '10th_paths', label: 'Education Paths', count: filteredPathways.length, icon: '🗺️' },
                { id: '10th_healthcare', label: 'Healthcare Diplomas', count: healthcareDiplomaCourses10th.length, icon: '🧬' },
                { id: '10th_diploma', label: 'Diploma & Polytechnic', count: diplomaPathways10th.length, icon: '⚙️' },
                { id: '10th_iti', label: 'ITI & Vocational', count: itiPathways10th.length, icon: '🛠️' },
                { id: 'careers', label: 'Career Paths', count: filteredCareers.length, icon: '💼' },
                { id: 'institutions', label: 'Institutions', count: filteredInstitutions.length, icon: '🏛️' }
              ].map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    style={{
                      padding: '0.65rem 1.25rem',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? '700' : '500',
                      color: isActive ? '#FFFFFF' : 'var(--fp-text-secondary)',
                      background: isActive ? 'var(--fp-primary)' : 'var(--fp-surface)',
                      border: isActive ? '1px solid var(--fp-primary)' : '1px solid var(--fp-border)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{section.icon}</span>
                    <span>{section.label}</span>
                    <span style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : '#F3F4F6',
                      color: isActive ? '#FFFFFF' : 'var(--fp-text-secondary)',
                      fontSize: '0.725rem',
                      fontWeight: '700',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '999px'
                    }}>
                      {section.count}
                    </span>
                  </button>
                );
              })
            ) : (
              /* TABS FOR AFTER 12TH */
              [
                { id: 'ug_degrees', label: 'Undergraduate Degrees', count: ugDegrees.length, icon: '🎓' },
                { id: 'integrated', label: 'Integrated UG + PG', count: integratedCourses.length, icon: '⚡' },
                { id: 'medical', label: 'Medical & Healthcare', count: allMedicalCourses.length, icon: '🧬' },
                { id: 'postgraduate', label: 'Postgraduate', count: pgCourses.length, icon: '📚' },
                { id: 'pathways', label: 'Education Paths', count: filteredPathways.length, icon: '🗺️' },
                { id: 'careers', label: 'Career Paths', count: filteredCareers.length, icon: '💼' },
                { id: 'institutions', label: 'Institutions', count: filteredInstitutions.length, icon: '🏛️' }
              ].map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    style={{
                      padding: '0.65rem 1.15rem',
                      fontSize: '0.86rem',
                      fontWeight: isActive ? '700' : '500',
                      color: isActive ? '#FFFFFF' : 'var(--fp-text-secondary)',
                      background: isActive ? 'var(--fp-primary)' : 'var(--fp-surface)',
                      border: isActive ? '1px solid var(--fp-primary)' : '1px solid var(--fp-border)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{section.icon}</span>
                    <span>{section.label}</span>
                    <span style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : '#F3F4F6',
                      color: isActive ? '#FFFFFF' : 'var(--fp-text-secondary)',
                      fontSize: '0.725rem',
                      fontWeight: '700',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '999px'
                    }}>
                      {section.count}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="spin-icon" style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--fp-primary)' }}>⚙️</div>
            <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.9rem' }}>Retrieving verified guidance recommendations...</p>
          </div>
        )}

        {/* ==========================================================================
           TAB CONTENT PANELS WITH DYNAMIC CLEAN EMPTY STATES
           ========================================================================== */}
        {!loading && guidanceData && (
          <div>
            {/* 10TH SECTION: ALL EDUCATION PATHS */}
            {qualification === '10th' && activeSection === '10th_paths' && (
              <div>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Info size={18} color="var(--fp-primary)" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', margin: 0 }}>
                    <strong style={{ color: 'var(--fp-text)' }}>Post-10th Pathways: </strong>
                    After Class 10, students can continue to 11th & 12th Higher Secondary (Science/Commerce/Arts), enroll in a 3-Year Polytechnic Engineering Diploma (with Direct-to-Degree D2D entry into 2nd year B.Tech), enroll in Healthcare Technical Diplomas, or enter ITI skill trades.
                  </p>
                </div>

                {filteredPathways.length > 0 ? (
                  <div className="fp-grid-cards">
                    {filteredPathways.map((pathway) => (
                      <PathwayCard 
                        key={pathway._id} 
                        pathway={pathway} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(pathway._id, 'pathway')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem' }}>No roadmaps found matching your search criteria.</p>
                  </div>
                )}
              </div>
            )}

            {/* 10TH SECTION: HEALTHCARE DIPLOMA & CERTIFICATES AFTER 10TH */}
            {qualification === '10th' && activeSection === '10th_healthcare' && (
              <div>
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700', color: '#065F46', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                    <Stethoscope size={17} /> Healthcare Diploma & Certificate Pathways (After Class 10)
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#047857', margin: '0 0 0.5rem', lineHeight: '1.5' }}>
                    These are healthcare-support and technical pathways that may be available after Class 10. Admission, duration and eligibility vary by institute and state.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.78rem', color: '#065F46', fontWeight: '600' }}>
                    <span>⏱️ Typical duration: 1–2 years (or 3–6 months for short-term certificates)</span>
                    <span>📋 Admission: Based on institute/state rules, merit or direct application (No NEET required)</span>
                  </div>
                </div>

                {healthcareDiplomaCourses10th.length > 0 ? (
                  <div className="fp-grid-cards">
                    {healthcareDiplomaCourses10th.map((course) => (
                      <CourseCard 
                        key={course._id} 
                        course={course} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(course._id, 'course')}
                        onToggleCompare={onToggleCompare}
                        isCompared={isCompared && isCompared(course._id)}
                        institutions={allInstitutionsList}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem' }}>No healthcare diplomas found matching this search keyword.</p>
                  </div>
                )}
              </div>
            )}

            {/* 10TH SECTION: DIPLOMA & POLYTECHNIC */}
            {qualification === '10th' && activeSection === '10th_diploma' && (
              <div>
                <div style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: '700', color: '#312E81', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    ⚙️ Polytechnic Engineering Diplomas (3 Years) & D2D Lateral Entry
                  </div>
                  <p style={{ fontSize: '0.825rem', color: '#4338CA', margin: 0, lineHeight: '1.4' }}>
                    Admission in Gujarat is conducted through ACPDC based on Class 10 Board marks. Upon graduation with a strong CGPA, students are eligible for direct 2nd-year admission into B.E. / B.Tech degree programs via the D2D (Diploma to Degree) quota.
                  </p>
                </div>

                {diplomaPathways10th.length > 0 ? (
                  <div className="fp-grid-cards">
                    {diplomaPathways10th.map((pathway) => (
                      <PathwayCard 
                        key={pathway._id} 
                        pathway={pathway} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(pathway._id, 'pathway')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem' }}>No specific diploma roadmaps found for this search filter.</p>
                  </div>
                )}
              </div>
            )}

            {/* 10TH SECTION: ITI & VOCATIONAL */}
            {qualification === '10th' && activeSection === '10th_iti' && (
              <div>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: '700', color: 'var(--fp-text)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    🛠️ ITI & Vocational Skill Certifications (1 to 2 Years)
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--fp-text-secondary)', margin: 0, lineHeight: '1.4' }}>
                    Industrial Training Institutes (ITIs) offer practical, hands-on trade training in Electrician, Fitter, Computer Operator and Programming Assistant (COPA), and Mechanical trades providing direct industry employment.
                  </p>
                </div>

                {itiPathways10th.length > 0 ? (
                  <div className="fp-grid-cards">
                    {itiPathways10th.map((pathway) => (
                      <PathwayCard 
                        key={pathway._id} 
                        pathway={pathway} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(pathway._id, 'pathway')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem' }}>No ITI pathways currently listed for this keyword.</p>
                  </div>
                )}
              </div>
            )}

            {/* 12TH SECTION: UNDERGRADUATE DEGREES */}
            {qualification === '12th' && activeSection === 'ug_degrees' && (
              <div>
                {ugDegrees.length > 0 ? (
                  <div className="fp-grid-cards">
                    {ugDegrees.map((course) => (
                      <CourseCard 
                        key={course._id} 
                        course={course} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(course._id, 'course')}
                        onToggleCompare={onToggleCompare}
                        isCompared={isCompared && isCompared(course._id)}
                        institutions={allInstitutionsList}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      No undergraduate degree programmes available for the selected stream ({stream}).
                    </p>
                    <button onClick={() => setStream('All')} className="btn btn-outline-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
                      Explore All Streams
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 12TH SECTION: INTEGRATED UG + PG */}
            {qualification === '12th' && activeSection === 'integrated' && (
              <div>
                <div style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', color: '#312E81', fontSize: '0.925rem', marginBottom: '0.25rem' }}>
                    <Sparkles size={16} color="#4F46E5" /> Continuous 5-Year Integrated Degree Programs (UG + PG)
                  </div>
                  <p style={{ fontSize: '0.825rem', color: '#4338CA', margin: 0, lineHeight: '1.4' }}>
                    Integrated programmes combine both Bachelor's and Master's qualifications into a seamless single 5-year curriculum directly after Class 12, offering advanced specialization without separate master's entrance tests.
                  </p>
                </div>

                {integratedCourses.length > 0 ? (
                  <div className="fp-grid-cards">
                    {integratedCourses.map((course) => (
                      <CourseCard 
                        key={course._id} 
                        course={course} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(course._id, 'course')}
                        onToggleCompare={onToggleCompare}
                        isCompared={isCompared && isCompared(course._id)}
                        institutions={allInstitutionsList}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      No 5-year integrated programmes found matching this filter.
                    </p>
                    <button onClick={() => setStream('All')} className="btn btn-outline-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
                      View All Integrated Programs
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 12TH SECTION: MEDICAL & HEALTHCARE */}
            {qualification === '12th' && activeSection === 'medical' && (
              <div>
                {/* Category Sub-Filter Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'undergraduate', label: 'Undergraduate', count: medUndergraduateCourses.length, icon: '🩺' },
                    { id: 'postgraduate', label: 'Postgraduate', count: medPostgraduateCourses.length, icon: '🔬' },
                    { id: 'diploma', label: 'Diploma & Certificate After 10th', count: healthcareDiplomaCourses10th.length, icon: '🏥' },
                    { id: 'all', label: 'All Medical & Healthcare', count: allMedicalCourses.length, icon: '🌐' }
                  ].map((subTab) => {
                    const isSel = medicalSubFilter === subTab.id;
                    return (
                      <button
                        key={subTab.id}
                        type="button"
                        onClick={() => setMedicalSubFilter(subTab.id)}
                        style={{
                          padding: '0.45rem 0.95rem',
                          fontSize: '0.825rem',
                          fontWeight: isSel ? '700' : '500',
                          borderRadius: 'var(--radius-full)',
                          background: isSel ? 'var(--fp-primary)' : '#FFFFFF',
                          color: isSel ? '#FFFFFF' : 'var(--fp-text-secondary)',
                          border: isSel ? '1px solid var(--fp-primary)' : '1px solid var(--fp-border)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          transition: 'all 0.15s ease',
                          boxShadow: isSel ? '0 2px 6px rgba(79, 70, 229, 0.2)' : 'none'
                        }}
                      >
                        <span>{subTab.icon}</span>
                        <span>{subTab.label}</span>
                        <span style={{
                          background: isSel ? 'rgba(255, 255, 255, 0.25)' : '#F3F4F6',
                          color: isSel ? '#FFFFFF' : 'var(--fp-text-secondary)',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          padding: '0.05rem 0.4rem',
                          borderRadius: '999px'
                        }}>
                          {subTab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-Filter Specific Pathway Explanations */}
                {medicalSubFilter === 'undergraduate' && (
                  <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: '700', color: '#065F46', fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Stethoscope size={16} /> Medical & Healthcare Undergraduate Degrees (After 12th Science)
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#047857', margin: '0 0 0.4rem', lineHeight: '1.5' }}>
                      Accredited Bachelor's programmes across Clinical Medicine (MBBS), Dental Surgery (BDS), AYUSH systems (BHMS, BUMS, BNYS), Veterinary Medicine (BVSc & AH), Nursing, Physiotherapy (BPT), Pharmacy (B.Pharm), and Allied Health Sciences (B.Sc MLT, Radiology, OTT).
                    </p>
                    <div style={{ fontSize: '0.78rem', color: '#065F46' }}>
                      <strong>Eligibility note: </strong>Requires 12th Standard Science (PCB / PCM depending on programme). Admission through NEET-UG, GUJCET, or State Paramedical Admission Committees.
                    </div>
                  </div>
                )}

                {medicalSubFilter === 'postgraduate' && (
                  <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: '700', color: '#5B21B6', fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      📚 Medical & Healthcare Postgraduate Specialization Pathway
                    </div>
                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid #EDE9FE',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      margin: '0.5rem 0 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.825rem',
                      fontWeight: '600',
                      color: '#4C1D95',
                      flexWrap: 'wrap'
                    }}>
                      <span>12th Science (PCB)</span>
                      <span>→</span>
                      <span>Medical Undergraduate (MBBS / BDS / relevant UG)</span>
                      <span>→</span>
                      <span style={{ color: '#6D28D9', textDecoration: 'underline' }}>Medical Postgraduate (MD / MS / MDS)</span>
                      <span>→</span>
                      <span>Specialized Healthcare Role / Consultant</span>
                    </div>
                    <p style={{ fontSize: '0.825rem', color: '#6D28D9', margin: 0, lineHeight: '1.5' }}>
                      Postgraduate medical degrees are advanced master's clinical specializations pursued after qualifying an undergraduate medical degree (MBBS/BDS) and clearing NEET-PG / INI-CET / NEET-MDS. They are not direct entries immediately after Class 12.
                    </p>
                  </div>
                )}

                {medicalSubFilter === 'diploma' && (
                  <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: '700', color: '#92400E', fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      🏥 Healthcare Diploma & Certificate Programmes (After Class 10)
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#B45309', margin: '0 0 0.4rem', lineHeight: '1.5' }}>
                      These are healthcare-support and technical pathways that may be available after Class 10. Admission, duration and eligibility vary by institute and state.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.78rem', color: '#92400E', fontWeight: '600' }}>
                      <span>⏱️ Typical duration: 1–2 years (or 3–6 months for short-term certificates)</span>
                      <span>📋 Admission: Institute / State merit or direct application (No NEET required)</span>
                    </div>
                  </div>
                )}

                {/* Grid of Medical Courses based on active subfilter */}
                {(() => {
                  let displayList = medUndergraduateCourses;
                  if (medicalSubFilter === 'postgraduate') displayList = medPostgraduateCourses;
                  else if (medicalSubFilter === 'diploma') displayList = healthcareDiplomaCourses10th;
                  else if (medicalSubFilter === 'all') displayList = allMedicalCourses;

                  return displayList.length > 0 ? (
                    <div className="fp-grid-cards">
                      {displayList.map((course) => (
                        <CourseCard 
                          key={course._id} 
                          course={course} 
                          onToggleBookmark={onToggleBookmark}
                          isSaved={isBookmarked && isBookmarked(course._id, 'course')}
                          onToggleCompare={onToggleCompare}
                          isCompared={isCompared && isCompared(course._id)}
                          institutions={allInstitutionsList}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                      <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                        No medical / healthcare courses found matching this search keyword.
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 12TH SECTION: POSTGRADUATE PROGRAMS */}
            {qualification === '12th' && activeSection === 'postgraduate' && (
              <div>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: '700', color: 'var(--fp-text)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    📚 Advanced Master's & Postgraduate Programs
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--fp-text-secondary)', margin: 0, lineHeight: '1.4' }}>
                    Explore 2-year postgraduate degrees (MCA, M.Sc IT, M.Sc CS, MBA, M.Com, M.Tech) to understand the full higher education trajectory available after your bachelor's degree.
                  </p>
                </div>

                {pgCourses.length > 0 ? (
                  <div className="fp-grid-cards">
                    {pgCourses.map((course) => (
                      <CourseCard 
                        key={course._id} 
                        course={course} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(course._id, 'course')}
                        onToggleCompare={onToggleCompare}
                        isCompared={isCompared && isCompared(course._id)}
                        institutions={allInstitutionsList}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem' }}>No postgraduate programmes matching this search.</p>
                  </div>
                )}
              </div>
            )}

            {/* 12TH SECTION: EDUCATION PATHS (ROADMAPS) */}
            {qualification === '12th' && activeSection === 'pathways' && (
              <div>
                {filteredPathways.length > 0 ? (
                  <div className="fp-grid-cards">
                    {filteredPathways.map((pathway) => (
                      <PathwayCard 
                        key={pathway._id} 
                        pathway={pathway} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(pathway._id, 'pathway')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem' }}>No roadmaps found for this search filter.</p>
                  </div>
                )}
              </div>
            )}

            {/* UNIVERSAL SECTION: CAREER PATHS */}
            {activeSection === 'careers' && (
              <div>
                {filteredCareers.length > 0 ? (
                  <div className="fp-grid-cards">
                    {filteredCareers.map((career) => (
                      <CareerCard 
                        key={career._id} 
                        career={career} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(career._id, 'career')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem' }}>No career paths found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}

            {/* UNIVERSAL SECTION: INSTITUTIONS */}
            {activeSection === 'institutions' && (
              <div>
                {filteredInstitutions.length > 0 ? (
                  <div className="fp-grid-cards">
                    {filteredInstitutions.map((inst) => (
                      <InstitutionCard 
                        key={inst._id} 
                        institution={inst} 
                        onToggleBookmark={onToggleBookmark}
                        isSaved={isBookmarked && isBookmarked(inst._id, 'institution')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.95rem' }}>No institutions found matching your criteria.</p>
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
