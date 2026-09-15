import { useState, useEffect } from 'react';
import { api } from './services/api';
import { useBookmarks } from './hooks/useBookmarks';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GuidanceWizard from './components/GuidanceWizard';
import PathwayCard from './components/PathwayCard';
import CourseCard from './components/CourseCard';
import CareerCard from './components/CareerCard';
import InstitutionCard from './components/InstitutionCard';
import BookmarksView from './components/BookmarksView';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [summary, setSummary] = useState(null);
  const [selectedQual, setSelectedQual] = useState('12th');
  const [selectedStream, setSelectedStream] = useState('Science');

  // Bookmarking custom hook
  const { bookmarks, toggleBookmark, isBookmarked, clearBookmarks, bookmarkCount } = useBookmarks();

  // Dedicated full lists for tab views
  const [allPathways, setAllPathways] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allCareers, setAllCareers] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [loadingView, setLoadingView] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');

  // Load summary statistics on mount
  useEffect(() => {
    api.getSummary()
      .then((res) => {
        if (res.success) setSummary(res.summary);
      })
      .catch((err) => console.error('Error fetching summary:', err));
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        bookmarkCount={bookmarkCount}
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
            />
          </>
        )}

        {/* Dedicated Roadmaps View */}
        {activeTab === 'pathways' && (
          <section className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Full Catalog</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                All Educational <span className="gradient-text">Roadmaps & Pathways</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Step-by-step career progression paths mapped from 10th and 12th standards.
              </p>

              {/* Search Bar */}
              <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="🔍 Search roadmaps (e.g. Engineering, Medical, CA)..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>Loading roadmaps...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
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
          <section className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Degree & Diploma</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Undergraduate & Diploma <span className="gradient-text">Programs</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Explore degree durations, entry eligibility, and core academic subjects.
              </p>

              {/* Search Bar */}
              <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="🔍 Search courses (e.g. BCA, B.Tech, B.Com, Diploma)..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>Loading courses...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {filterCatalog(allCourses, ['name', 'description', 'subjects', 'eligibility']).map((c) => (
                  <CourseCard 
                    key={c._id} 
                    course={c} 
                    onToggleBookmark={toggleBookmark}
                    isSaved={isBookmarked(c._id, 'course')}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Dedicated Careers View */}
        {activeTab === 'careers' && (
          <section className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>Career Opportunities</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Future <span className="gradient-text">Career Trajectories</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Industry skill requirements, salary projections, and linked academic degrees.
              </p>

              {/* Search Bar */}
              <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="🔍 Search careers by role or skills (e.g. Developer, Python, Doctor)..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>Loading careers...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {filterCatalog(allCareers, ['title', 'description', 'requiredSkills', 'jobRoles']).map((car) => (
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

        {/* Dedicated Colleges View */}
        {activeTab === 'colleges' && (
          <section className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>Higher Education</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Colleges, Universities & <span className="gradient-text">Polytechnics</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Top accredited educational institutions across Gujarat offering these programs.
              </p>

              {/* Search Bar */}
              <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="🔍 Search colleges by city or affiliation (e.g. Ahmedabad, GTU, MSU)..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>Loading colleges...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {filterCatalog(allColleges, ['name', 'address', 'affiliation']).map((inst) => (
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
