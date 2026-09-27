import { useState, useEffect } from 'react';
import { api } from './services/api';
import { useBookmarks } from './hooks/useBookmarks';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GuidanceWizard from './components/GuidanceWizard';
import AptitudeQuiz from './components/AptitudeQuiz';
import PathwayCard from './components/PathwayCard';
import CourseCard from './components/CourseCard';
import CareerCard from './components/CareerCard';
import InstitutionCard from './components/InstitutionCard';
import BookmarksView from './components/BookmarksView';
import FAQView from './components/FAQView';
import CompareFloatingBar from './components/CompareFloatingBar';
import CompareModal from './components/CompareModal';
import AuthView from './components/AuthView';
import ProfileView from './components/ProfileView';
import AdminDashboard from './components/AdminDashboard';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import PrivacyPolicyView from './components/PrivacyPolicyView';
import TermsOfUseView from './components/TermsOfUseView';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [authInitialMode, setAuthMode] = useState('login');
  const [summary, setSummary] = useState(null);
  const [selectedQual, setSelectedQual] = useState('12th');
  const [selectedStream, setSelectedStream] = useState('Science');

  // Authentication
  const { user, isLoggedIn, isAdmin, login, register, logout, loading: authLoading } = useAuth();

  // Bookmarking custom hook
  const { bookmarks, toggleBookmark, isBookmarked, clearBookmarks, bookmarkCount } = useBookmarks();

  // Course comparison state
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Dedicated full lists for tab views
  const [allPathways, setAllPathways] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allCareers, setAllCareers] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [universitiesList, setUniversitiesList] = useState([]);
  const [loadingView, setLoadingView] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');

  // Course specific filters
  const [selectedCourseUniFilter, setSelectedCourseUniFilter] = useState('All');
  const [selectedCourseLevelFilter, setSelectedCourseLevelFilter] = useState('All');

  // College specific city & type filters
  const [selectedCityFilter, setSelectedCityFilter] = useState('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');

  // Load summary statistics and dynamic universities on mount
  useEffect(() => {
    api.getSummary()
      .then((res) => {
        if (res.success) setSummary(res.summary);
      })
      .catch((err) => console.error('Error fetching summary:', err));

    api.getUniversities()
      .then((res) => {
        if (res.success) setUniversitiesList(res.data || []);
      })
      .catch((err) => console.error('Error fetching universities:', err));
  }, []);

  // Fetch full data when navigating to specific dedicated tabs
  useEffect(() => {
    setCatalogSearch('');
    if (activeTab === 'pathways') {
      setLoadingView(true);
      api.getPathways()
        .then((res) => setAllPathways(res.data || []))
        .finally(() => setLoadingView(false));
    } else if (activeTab === 'courses') {
      setLoadingView(true);
      api.getCourses()
        .then((res) => setAllCourses(res.data || []))
        .finally(() => setLoadingView(false));
    } else if (activeTab === 'careers') {
      setLoadingView(true);
      api.getCareers()
        .then((res) => setAllCareers(res.data || []))
        .finally(() => setLoadingView(false));
    } else if (activeTab === 'colleges') {
      setLoadingView(true);
      api.getInstitutions()
        .then((res) => setAllColleges(res.data || []))
        .finally(() => setLoadingView(false));
    }
  }, [activeTab]);

  const handleHeroCategorySelect = (qual, str) => {
    setSelectedQual(qual);
    setSelectedStream(str);
    setActiveTab('explore');
    const wizardEl = document.getElementById('guidance-wizard');
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuizExplore = (qual, str) => {
    setSelectedQual(qual);
    setSelectedStream(str);
    setActiveTab('explore');
    setTimeout(() => {
      const wizardEl = document.getElementById('guidance-wizard');
      if (wizardEl) {
        wizardEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFooterNavigate = (action) => {
    if (action === 'home') {
      setActiveTab('explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'guidance-wizard') {
      setActiveTab('explore');
      setTimeout(() => {
        const el = document.getElementById('guidance-wizard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (action === 'pathways') {
      setActiveTab('pathways');
    } else if (action === 'courses') {
      setActiveTab('courses');
    } else if (action === 'careers') {
      setActiveTab('careers');
    } else if (action === 'colleges') {
      setActiveTab('colleges');
    } else if (action === 'faq') {
      setActiveTab('faq');
    } else if (action === 'quiz') {
      setActiveTab('quiz');
    } else if (action === 'bookmarks') {
      setActiveTab('bookmarks');
    } else if (action === 'compare') {
      setActiveTab('courses');
      if (compareList.length > 0) {
        setIsCompareOpen(true);
      }
    } else if (action === 'login') {
      if (isLoggedIn) {
        setActiveTab('profile');
      } else {
        setAuthMode('login');
        setActiveTab('auth');
      }
    } else if (action === 'register') {
      if (isLoggedIn) {
        setActiveTab('profile');
      } else {
        setAuthMode('register');
        setActiveTab('auth');
      }
    } else if (action === 'pathway-10th') {
      setSelectedQual('10th');
      setSelectedStream('All');
      setActiveTab('explore');
      setTimeout(() => {
        const el = document.getElementById('guidance-wizard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (action === 'pathway-12th-science') {
      setSelectedQual('12th');
      setSelectedStream('Science');
      setActiveTab('explore');
      setTimeout(() => {
        const el = document.getElementById('guidance-wizard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (action === 'pathway-12th-commerce') {
      setSelectedQual('12th');
      setSelectedStream('Commerce');
      setActiveTab('explore');
      setTimeout(() => {
        const el = document.getElementById('guidance-wizard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (action === 'pathway-12th-arts') {
      setSelectedQual('12th');
      setSelectedStream('Arts');
      setActiveTab('explore');
      setTimeout(() => {
        const el = document.getElementById('guidance-wizard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (action === 'pathway-bca-it') {
      setSelectedQual('12th');
      setSelectedStream('All');
      setActiveTab('explore');
      setTimeout(() => {
        const el = document.getElementById('guidance-wizard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (action === 'about') {
      setActiveTab('about');
    } else if (action === 'contact') {
      setActiveTab('contact');
    } else if (action === 'privacy') {
      setActiveTab('privacy');
    } else if (action === 'terms') {
      setActiveTab('terms');
    } else if (action === 'admin-login') {
      if (isLoggedIn && isAdmin) {
        setActiveTab('admin');
      } else {
        setAuthMode('login');
        setActiveTab('auth');
      }
    } else {
      setActiveTab(action);
    }
  };

  // Compare handlers
  const handleToggleCompare = (course) => {
    setCompareList((prev) => {
      const exists = prev.some((c) => c._id === course._id);
      if (exists) {
        return prev.filter((c) => c._id !== course._id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 courses simultaneously.");
          return prev;
        }
        return [...prev, course];
      }
    });
  };

  const isCourseCompared = (courseId) => {
    return compareList.some((c) => c._id === courseId);
  };

  const handleRemoveCompare = (courseId) => {
    setCompareList((prev) => prev.filter((c) => c._id !== courseId));
  };

  // Helper search filter
  const filterCatalog = (items, fields) => {
    if (!catalogSearch.trim()) return items;
    const term = catalogSearch.toLowerCase();
    return items.filter((item) => {
      return fields.some((field) => {
        const val = item[field];
        if (typeof val === 'string') return val.toLowerCase().includes(term);
        if (Array.isArray(val)) return val.some((v) => typeof v === 'string' && v.toLowerCase().includes(term));
        return false;
      });
    });
  };

  // Courses filtered list
  const filteredCourses = filterCatalog(allCourses, ['name', 'course_name', 'description', 'subjects', 'eligibility', 'university_name', 'field_of_study']).filter((c) => {
    const uniMatch = selectedCourseUniFilter === 'All' || (c.university_name && c.university_name.includes(selectedCourseUniFilter));
    const levelMatch = selectedCourseLevelFilter === 'All' || c.course_level === selectedCourseLevelFilter;
    return uniMatch && levelMatch;
  });

  // College filtered list
  const filteredColleges = filterCatalog(allColleges, ['name', 'address', 'affiliation']).filter((inst) => {
    const cityMatch = selectedCityFilter === 'All' || (typeof inst.city === 'object' ? inst.city?.name === selectedCityFilter : inst.city === selectedCityFilter);
    const typeMatch = selectedTypeFilter === 'All' || inst.type === selectedTypeFilter;
    return cityMatch && typeMatch;
  });

  // Handle login with proper role-based post-login navigation
  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    if (res.success) {
      if (res.user?.role === 'admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('explore');
      }
    }
    return res;
  };

  // Handle register with post-registration navigation to explore
  const handleRegister = async (data) => {
    const res = await register(data);
    if (res.success) {
      setActiveTab('explore');
    }
    return res;
  };

  // Safety navigation guards to prevent blank or unauthorized views
  useEffect(() => {
    if (isLoggedIn && activeTab === 'auth') {
      setActiveTab(isAdmin ? 'admin' : 'explore');
    }
  }, [isLoggedIn, activeTab, isAdmin]);

  useEffect(() => {
    if (activeTab === 'admin' && (!isLoggedIn || !isAdmin)) {
      setActiveTab('explore');
    }
  }, [activeTab, isLoggedIn, isAdmin]);

  useEffect(() => {
    if (activeTab === 'profile' && !isLoggedIn) {
      setActiveTab('auth');
    }
  }, [activeTab, isLoggedIn]);

  // Handle logout: clear auth and return to explore
  const handleLogout = () => {
    logout();
    setActiveTab('explore');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        bookmarkCount={bookmarkCount}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        userName={user?.name}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Explore View (Hero + Interactive Wizard) */}
        {activeTab === 'explore' && (
          <>
            <Hero 
              summary={summary} 
              onSelectCategory={handleHeroCategorySelect} 
            />
            <GuidanceWizard 
              initialQual={selectedQual} 
              initialStream={selectedStream}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onToggleCompare={handleToggleCompare}
              isCompared={isCourseCompared}
            />
          </>
        )}

        {/* Interactive Career Aptitude Quiz View */}
        {activeTab === 'quiz' && (
          <AptitudeQuiz 
            onExplorePath={handleQuizExplore} 
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            onToggleCompare={handleToggleCompare}
            isCompared={isCourseCompared}
          />
        )}

        {/* Dedicated Roadmaps View */}
        {activeTab === 'pathways' && (
          <section className="container" style={{ padding: '2.5rem 1.25rem 3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Full Catalog</span>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--fp-text, #111827)', marginBottom: '0.5rem' }}>
                Educational <span className="gradient-text">Roadmaps & Pathways</span>
              </h2>
              <p style={{ color: 'var(--fp-secondary, #6B7280)', marginBottom: '1.25rem', maxWidth: '600px', margin: '0 auto 1.25rem' }}>
                Step-by-step career progression milestones mapped from 10th and 12th standards.
              </p>

              {/* Search Bar */}
              <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="🔍 Search roadmaps (e.g. Engineering, Medical, BCA, CA)..."
                  className="fp-input"
                  style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-full)' }}
                />
              </div>
            </div>

            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--fp-secondary, #6B7280)' }}>Loading roadmaps...</div>
            ) : (
              <div className="fp-grid-cards">
                {filterCatalog(allPathways, ['title', 'description', 'steps']).map((p) => (
                  <PathwayCard 
                    key={p._id} 
                    pathway={p} 
                    onToggleBookmark={toggleBookmark}
                    isSaved={isBookmarked(p._id, 'pathway')}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Dedicated Courses View */}
        {activeTab === 'courses' && (
          <section className="container-xl px-3 px-sm-4" style={{ padding: '2.5rem 1.25rem 3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Accredited Degrees</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--fp-text, #111827)', marginBottom: '0.5rem' }}>
                Explore Verified <span className="gradient-text">University Programmes</span>
              </h2>
              <p style={{ color: 'var(--fp-secondary, #6B7280)', maxWidth: '680px', margin: '0 auto 1.25rem' }}>
                Official undergraduate, postgraduate, and integrated programs from Gujarat University, VNSGU, SPU, Sarvajanik University, and SVNIT Surat.
              </p>

              {/* University & Level Filter Pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onClick={() => setSelectedCourseUniFilter('All')}
                    style={{
                      padding: '0.35rem 0.85rem',
                      fontSize: '0.8rem',
                      fontWeight: selectedCourseUniFilter === 'All' ? '700' : '500',
                      borderRadius: 'var(--radius-full)',
                      background: selectedCourseUniFilter === 'All' ? 'var(--fp-primary)' : 'var(--fp-surface)',
                      color: selectedCourseUniFilter === 'All' ? '#FFFFFF' : 'var(--fp-text-secondary)',
                      border: '1px solid var(--fp-border)',
                      cursor: 'pointer'
                    }}
                  >
                    All Universities ({allCourses.length})
                  </button>
                  {universitiesList.map((u) => {
                    const isSel = selectedCourseUniFilter === u.university_name || selectedCourseUniFilter === u.abbreviation;
                    return (
                      <button
                        key={u._id}
                        onClick={() => setSelectedCourseUniFilter(u.university_name)}
                        style={{
                          padding: '0.35rem 0.85rem',
                          fontSize: '0.8rem',
                          fontWeight: isSel ? '700' : '500',
                          borderRadius: 'var(--radius-full)',
                          background: isSel ? 'var(--fp-primary)' : 'var(--fp-surface)',
                          color: isSel ? '#FFFFFF' : 'var(--fp-text-secondary)',
                          border: isSel ? '1px solid var(--fp-primary)' : '1px solid var(--fp-border)',
                          cursor: 'pointer'
                        }}
                      >
                        🏛️ {u.abbreviation || u.university_name}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['All', 'Undergraduate', 'Postgraduate', 'Integrated (UG+PG)'].map((lvl) => {
                    const isSel = selectedCourseLevelFilter === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setSelectedCourseLevelFilter(lvl)}
                        style={{
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: isSel ? '700' : '500',
                          borderRadius: 'var(--radius-full)',
                          background: isSel ? '#EEF2FF' : 'transparent',
                          color: isSel ? '#4F46E5' : '#6B7280',
                          border: isSel ? '1px solid #4F46E5' : '1px solid #E5E7EB',
                          cursor: 'pointer'
                        }}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Bar */}
              <div style={{ maxWidth: '520px', margin: '0 auto' }}>
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="🔍 Search degrees, duration, eligibility (e.g. BCA, AI, B.Tech, MCA)..."
                  className="fp-input"
                  style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-full)' }}
                />
              </div>
            </div>

            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--fp-secondary, #6B7280)' }}>Loading courses...</div>
            ) : (
              <div className="fp-grid-cards">
                {filteredCourses.map((c) => (
                  <CourseCard 
                    key={c._id} 
                    course={c} 
                    onToggleBookmark={toggleBookmark}
                    isSaved={isBookmarked(c._id, 'course')}
                    onToggleCompare={handleToggleCompare}
                    isCompared={isCourseCompared(c._id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Dedicated Careers View */}
        {activeTab === 'careers' && (
          <section className="container" style={{ padding: '2.5rem 1.25rem 3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>Career Opportunities</span>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--fp-text, #111827)', marginBottom: '0.5rem' }}>
                Industry Career <span className="gradient-text">Profiles</span>
              </h2>
              <p style={{ color: 'var(--fp-secondary, #6B7280)', marginBottom: '1.25rem', maxWidth: '600px', margin: '0 auto 1.25rem' }}>
                Industry skill requirements, salary projections, and linked academic degrees.
              </p>

              {/* Search Bar */}
              <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="🔍 Search careers by role or skills (e.g. Developer, Python, Analyst)..."
                  className="fp-input"
                  style={{ width: '100%', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-full)' }}
                />
              </div>
            </div>

            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--fp-secondary, #6B7280)' }}>Loading careers...</div>
            ) : (
              <div className="fp-grid-cards">
                {filterCatalog(allCareers, ['title', 'description', 'skills', 'requiredSkills']).map((car) => (
                  <CareerCard 
                    key={car._id} 
                    career={car} 
                    onToggleBookmark={toggleBookmark}
                    isSaved={isBookmarked(car._id, 'career')}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Dedicated Gujarat Institutions View */}
        {activeTab === 'colleges' && (
          <section className="container-xl px-3 px-sm-4" style={{ padding: '2.5rem 1.25rem 3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge badge-indigo mb-2" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                📍 Gujarat Institutions Directory
              </span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--fp-text)' }}>
                Explore Gujarat <span className="gradient-text">Institutions</span>
              </h2>
              <p style={{ color: 'var(--fp-text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto 1.25rem', lineHeight: '1.6' }}>
                Accredited colleges, universities, and institutes across Gujarat.
              </p>

              {/* City & Type Filter Pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                {/* City Pills */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[
                    { id: 'All', label: 'All Gujarat' },
                    { id: 'Ahmedabad', label: 'Ahmedabad' },
                    { id: 'Surat', label: 'Surat' },
                    { id: 'Vadodara', label: 'Vadodara' },
                    { id: 'Anand / Vallabh Vidyanagar', label: 'Anand / V.V.Nagar' },
                    { id: 'Rajkot', label: 'Rajkot' }
                  ].map((city) => {
                    const isSelected = selectedCityFilter === city.id;
                    return (
                      <button
                        key={city.id}
                        type="button"
                        onClick={() => setSelectedCityFilter(city.id)}
                        style={{
                          padding: '0.4rem 0.95rem',
                          fontSize: '0.825rem',
                          fontWeight: isSelected ? '700' : '500',
                          borderRadius: 'var(--radius-full)',
                          background: isSelected ? 'var(--fp-primary)' : 'var(--fp-surface)',
                          color: isSelected ? '#FFFFFF' : 'var(--fp-text-secondary)',
                          border: isSelected ? '1px solid var(--fp-primary)' : '1px solid var(--fp-border)',
                          transition: 'all 0.15s ease',
                          cursor: 'pointer'
                        }}
                      >
                        📍 {city.label}
                      </button>
                    );
                  })}
                </div>

                {/* Type Pills */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[
                    { id: 'All', label: 'All Types' },
                    { id: 'University', label: 'University' },
                    { id: 'Institute', label: 'Institute' },
                    { id: 'College', label: 'College' },
                    { id: 'Polytechnic', label: 'Polytechnic' }
                  ].map((type) => {
                    const isSelected = selectedTypeFilter === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedTypeFilter(type.id)}
                        style={{
                          padding: '0.35rem 0.85rem',
                          fontSize: '0.8rem',
                          fontWeight: isSelected ? '700' : '500',
                          borderRadius: 'var(--radius-full)',
                          background: isSelected ? 'var(--fp-primary-soft)' : 'var(--fp-surface)',
                          color: isSelected ? 'var(--fp-primary)' : 'var(--fp-text-secondary)',
                          border: isSelected ? '1px solid var(--fp-primary)' : '1px solid var(--fp-border)',
                          transition: 'all 0.15s ease',
                          cursor: 'pointer'
                        }}
                      >
                        🏛️ {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Bar */}
              <div style={{ maxWidth: '520px', margin: '0 auto' }}>
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="🔍 Search Gujarat institutions by name or affiliation..."
                  className="fp-input"
                  style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem', borderRadius: 'var(--radius-full)' }}
                />
              </div>
            </div>

            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>Loading institutions...</div>
            ) : (
              <div className="fp-grid-cards">
                {filteredColleges.map((inst) => (
                  <InstitutionCard 
                    key={inst._id} 
                    institution={inst} 
                    onToggleBookmark={toggleBookmark}
                    isSaved={isBookmarked(inst._id, 'institution')}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Shortlist / Bookmarks View */}
        {activeTab === 'bookmarks' && (
          <BookmarksView 
            bookmarks={bookmarks} 
            onToggleBookmark={toggleBookmark}
            onClearAll={clearBookmarks}
          />
        )}

        {/* About FuturePath View */}
        {activeTab === 'about' && (
          <AboutView 
            onExplore={() => setActiveTab('explore')}
            onTakeQuiz={() => setActiveTab('quiz')}
          />
        )}

        {/* Student Contact & Support View */}
        {activeTab === 'contact' && (
          <ContactView 
            onGoToFAQ={() => setActiveTab('faq')}
            onExplore={() => setActiveTab('explore')}
          />
        )}

        {/* Privacy Policy View */}
        {activeTab === 'privacy' && (
          <PrivacyPolicyView 
            onGoToContact={() => setActiveTab('contact')}
          />
        )}

        {/* Terms of Use View */}
        {activeTab === 'terms' && (
          <TermsOfUseView 
            onGoToContact={() => setActiveTab('contact')}
            onExplore={() => setActiveTab('explore')}
          />
        )}

        {/* Guidance FAQ & Help Center View */}
        {activeTab === 'faq' && (
          <FAQView 
            onExploreGuidance={() => setActiveTab('explore')}
            onTakeQuiz={() => setActiveTab('quiz')}
          />
        )}

        {/* Authentication View */}
        {activeTab === 'auth' && !isLoggedIn && (
          <AuthView 
            onLogin={handleLogin}
            onRegister={handleRegister}
            loading={authLoading}
            initialMode={authInitialMode}
          />
        )}

        {/* Profile View */}
        {activeTab === 'profile' && isLoggedIn && (
          <ProfileView 
            user={user}
            onLogout={handleLogout}
            onGoExplore={() => setActiveTab('explore')}
          />
        )}

        {/* Admin Dashboard */}
        {activeTab === 'admin' && isLoggedIn && isAdmin && (
          <AdminDashboard onLogout={handleLogout} />
        )}

        {/* Fallback View if invalid/unhandled tab */}
        {![
          'explore', 'quiz', 'pathways', 'courses', 'careers', 'colleges', 
          'bookmarks', 'about', 'contact', 'privacy', 'terms', 'faq', 
          'auth', 'profile', 'admin'
        ].includes(activeTab) && (
          <>
            <Hero 
              summary={summary} 
              onSelectCategory={handleHeroCategorySelect} 
            />
            <GuidanceWizard 
              initialQual={selectedQual} 
              initialStream={selectedStream}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onToggleCompare={handleToggleCompare}
              isCompared={isCourseCompared}
            />
          </>
        )}
      </main>

      {/* Floating Compare Bar */}
      <CompareFloatingBar
        compareList={compareList}
        onOpenCompare={() => setIsCompareOpen(true)}
        onClearCompare={() => setCompareList([])}
        onRemoveCourse={handleRemoveCompare}
      />

      {/* Comparison Modal */}
      <CompareModal
        courses={compareList}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemoveCourse={handleRemoveCompare}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarkCount}
      />

      {/* Footer */}
      <Footer onNavigate={handleFooterNavigate} />
    </div>
  );
}

export default App;
