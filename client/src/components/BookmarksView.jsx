import React from 'react';
import PathwayCard from './PathwayCard';
import CourseCard from './CourseCard';
import CareerCard from './CareerCard';
import InstitutionCard from './InstitutionCard';

export default function BookmarksView({ bookmarks, onToggleBookmark, onClearAll }) {
  const pathways = bookmarks.filter((b) => b.type === 'pathway');
  const courses = bookmarks.filter((b) => b.type === 'course');
  const careers = bookmarks.filter((b) => b.type === 'career');
  const colleges = bookmarks.filter((b) => b.type === 'institution');

  return (
    <section className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>Personal Shortlist</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            My Saved <span className="gradient-text">Paths & Goals</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Your bookmarked educational roadmaps, degrees, career options, and colleges.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={onClearAll}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}
          >
            🗑️ Clear Shortlist
          </button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Your Shortlist is Empty</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Browse through Roadmaps, Degrees, Careers, and Colleges, and click the "⭐ Save" button to save your targets here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* Saved Pathways */}
          {pathways.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🗺️</span> Saved Roadmaps ({pathways.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {pathways.map((p) => (
                  <PathwayCard
                    key={p._id}
                    pathway={p}
                    onToggleBookmark={onToggleBookmark}
                    isSaved={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Saved Courses */}
          {courses.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📚</span> Saved Degree Programs ({courses.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {courses.map((c) => (
                  <CourseCard
                    key={c._id}
                    course={c}
                    onToggleBookmark={onToggleBookmark}
                    isSaved={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Saved Careers */}
          {careers.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>💼</span> Saved Career Options ({careers.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {careers.map((car) => (
                  <CareerCard
                    key={car._id}
                    career={car}
                    onToggleBookmark={onToggleBookmark}
                    isSaved={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Saved Colleges */}
          {colleges.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🏛️</span> Saved Colleges & Universities ({colleges.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {colleges.map((inst) => (
                  <InstitutionCard
                    key={inst._id}
                    institution={inst}
                    onToggleBookmark={onToggleBookmark}
                    isSaved={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
