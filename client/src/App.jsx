import { useState, useEffect } from 'react';
import { api } from './services/api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GuidanceWizard from './components/GuidanceWizard';
import PathwayCard from './components/PathwayCard';
import CourseCard from './components/CourseCard';
import CareerCard from './components/CareerCard';
import InstitutionCard from './components/InstitutionCard';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [summary, setSummary] = useState(null);
  const [selectedQual, setSelectedQual] = useState('12th');
  const [selectedStream, setSelectedStream] = useState('Science');

  // Dedicated full lists for tab views
  const [allPathways, setAllPathways] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allCareers, setAllCareers] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [loadingView, setLoadingView] = useState(false);

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

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
              <p style={{ color: 'var(--text-muted)' }}>
                Step-by-step career progression paths mapped from 10th and 12th standards.
              </p>
            </div>
            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>Loading roadmaps...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {allPathways.map((p) => <PathwayCard key={p._id} pathway={p} />)}
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
              <p style={{ color: 'var(--text-muted)' }}>
                Explore degree durations, entry eligibility, and core academic subjects.
              </p>
            </div>
            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>Loading courses...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {allCourses.map((c) => <CourseCard key={c._id} course={c} />)}
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
              <p style={{ color: 'var(--text-muted)' }}>
                Industry skill requirements, salary projections, and linked academic degrees.
              </p>
            </div>
            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>Loading careers...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {allCareers.map((car) => <CareerCard key={car._id} career={car} />)}
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
              <p style={{ color: 'var(--text-muted)' }}>
                Top accredited educational institutions across Gujarat offering these programs.
              </p>
            </div>
            {loadingView ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>Loading colleges...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {allColleges.map((inst) => <InstitutionCard key={inst._id} institution={inst} />)}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
