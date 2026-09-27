import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { QUIZ_QUESTIONS, matchCourses } from '../services/recommendationEngine';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Eye, 
  Bookmark, 
  Scale, 
  Building2, 
  ExternalLink, 
  MapPin, 
  GraduationCap, 
  Clock, 
  Compass,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Phone,
  BookOpen
} from 'lucide-react';

export default function AptitudeQuiz({ 
  onExplorePath,
  onToggleBookmark,
  isBookmarked,
  onToggleCompare,
  isCompared
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiSelection, setMultiSelection] = useState([]);
  
  // Data states
  const [allCourses, setAllCourses] = useState([]);
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Result & Modals
  const [recommendations, setRecommendations] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState(null);
  const [selectedInstitutionForDetail, setSelectedInstitutionForDetail] = useState(null);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState(null);

  // 1. Fetch courses & institutions on component mount
  useEffect(() => {
    loadDatabase();
  }, []);

  const loadDatabase = async () => {
    setLoadingData(true);
    setFetchError(null);
    try {
      const [coursesRes, instRes] = await Promise.all([
        api.getCourses(),
        api.getInstitutions()
      ]);

      if (coursesRes.success) {
        setAllCourses(coursesRes.data || []);
      }
      if (instRes.success) {
        setAllInstitutions(instRes.data || []);
      }
    } catch (err) {
      console.error('Failed to load courses for recommendation quiz:', err);
      setFetchError('We couldn\'t load course recommendations right now.');
    } finally {
      setLoadingData(false);
    }
  };

  // 2. Synchronize current question multiSelection when step changes
  useEffect(() => {
    const currentQ = QUIZ_QUESTIONS[currentStep];
    if (currentQ && currentQ.type === 'multiple') {
      const existing = answers[currentQ.id];
      setMultiSelection(Array.isArray(existing) ? existing : []);
    } else {
      setMultiSelection([]);
    }
  }, [currentStep, answers]);

  // Clean up auto-advance timers on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
    };
  }, [autoAdvanceTimer]);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  // Calculate answered count based on valid recorded answers
  const answeredCount = Object.keys(answers).length;
  // Progress formula: answeredQuestions / totalQuestions * 100
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 1000) / 10;

  // Single-select & Scale option selection with smooth auto-advance
  const handleSingleSelect = (questionId, value) => {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);

    const nextAnswers = { ...answers, [questionId]: value };
    setAnswers(nextAnswers);

    const timer = setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        finishQuiz(nextAnswers);
      }
    }, 280);

    setAutoAdvanceTimer(timer);
  };

  // Multiple-select toggle
  const handleToggleMulti = (value) => {
    setMultiSelection((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Confirm Multiple-select and continue
  const handleConfirmMulti = () => {
    if (multiSelection.length === 0) return;

    const nextAnswers = { ...answers, [currentQuestion.id]: multiSelection };
    setAnswers(nextAnswers);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishQuiz(nextAnswers);
    }
  };

  // Back / Previous handler
  const handlePrevious = () => {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Finalize Quiz & Run Course Recommendation Matching Engine
  const finishQuiz = (finalAnswers) => {
    setIsCalculating(true);
    setTimeout(() => {
      const results = matchCourses(finalAnswers, allCourses);
      setRecommendations(results);
      setIsCalculating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 350);
  };

  // Restart / Retake Quiz
  const handleRestart = () => {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
    setCurrentStep(0);
    setAnswers({});
    setMultiSelection([]);
    setRecommendations(null);
    setSelectedCourseForDetail(null);
    setSelectedInstitutionForDetail(null);
  };

  // Find institutions that offer a specific course
  const getInstitutionsForCourse = (course) => {
    if (!course || !allInstitutions || allInstitutions.length === 0) return [];
    
    const courseId = course._id;
    const courseCode = course.course_id;
    const courseName = (course.course_name || course.name || '').trim().toLowerCase();
    const uniName = (course.university_name || '').trim().toLowerCase();

    return allInstitutions.filter((inst) => {
      // 1. Direct course reference in coursesOffered
      if (Array.isArray(inst.coursesOffered)) {
        const hasDirectCourse = inst.coursesOffered.some((c) => {
          if (!c) return false;
          if (typeof c === 'string') return c === courseId;
          return c._id === courseId || (courseCode && c.course_id === courseCode);
        });
        if (hasDirectCourse) return true;

        // Name match in coursesOffered
        const hasNameMatch = inst.coursesOffered.some((c) => {
          if (!c) return false;
          const cName = typeof c === 'string' ? c : (c.course_name || c.name || '');
          return cName.toLowerCase() === courseName;
        });
        if (hasNameMatch) return true;
      }

      // 2. University affiliation match
      if (uniName) {
        const instAffil = (inst.affiliation || '').toLowerCase();
        const instName = (inst.name || '').toLowerCase();
        if (uniName.includes('veer narmad') && (instAffil.includes('vnsgu') || instName.includes('veer narmad'))) return true;
        if (uniName.includes('gujarat university') && (instAffil.includes('gujarat university') || instName.includes('gujarat university'))) return true;
        if (uniName.includes('sardar patel') && (instAffil.includes('spu') || instName.includes('sardar patel'))) return true;
        if (uniName.includes('sarvajanik') && (instAffil.includes('sarvajanik') || instName.includes('sarvajanik'))) return true;
        if (uniName.includes('svnit') && (instAffil.includes('svnit') || instName.includes('svnit') || instName.includes('sardar vallabhbhai'))) return true;
      }

      return false;
    });
  };

  // Loading state during initial API fetch
  if (loadingData) {
    return (
      <section className="container" style={{ padding: '3.5rem 1.25rem 5rem', textAlign: 'center' }}>
        <div className="quiz-wrapper">
          <div className="quiz-card" style={{ padding: '3.5rem 2rem' }}>
            <div className="spin-icon" style={{ display: 'inline-block', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--fp-primary)' }}>
              ⚙️
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--fp-text)' }}>
              Loading Course Recommendation Engine...
            </h3>
            <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.9rem' }}>
              Fetching verified university courses and Gujarat institution data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error state during initial API fetch
  if (fetchError) {
    return (
      <section className="container" style={{ padding: '3.5rem 1.25rem 5rem', textAlign: 'center' }}>
        <div className="quiz-wrapper">
          <div className="quiz-card" style={{ padding: '3rem 2rem' }}>
            <div style={{ color: 'var(--fp-danger)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <AlertCircle size={44} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--fp-text)' }}>
              {fetchError}
            </h3>
            <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '460px', margin: '0 auto 1.5rem' }}>
              We could not connect to the course catalog server. Please check your connection and try again.
            </p>
            <button onClick={loadDatabase} className="btn btn-primary" style={{ padding: '0.7rem 1.75rem' }}>
              <RotateCcw size={16} /> Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Calculating recommendations state
  if (isCalculating) {
    return (
      <section className="container" style={{ padding: '3.5rem 1.25rem 5rem', textAlign: 'center' }}>
        <div className="quiz-wrapper">
          <div className="quiz-card" style={{ padding: '3.5rem 2rem' }}>
            <div className="spin-icon" style={{ display: 'inline-block', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--fp-primary)' }}>
              ✨
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--fp-text)' }}>
              Matching Your Profile with University Degrees...
            </h3>
            <p style={{ color: 'var(--fp-text-secondary)', fontSize: '0.9rem' }}>
              Evaluating eligibility criteria, subject strengths, and career compatibility across official Gujarat university programs.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      {/* Quiz Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.5rem', padding: '0.35rem 0.85rem' }}>
          <Compass size={14} /> FIND YOUR PATH
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.025em', marginBottom: '0.4rem', color: 'var(--fp-text)' }}>
          Personalized Course <span className="gradient-text">Decision Quiz</span>
        </h1>
        <p style={{ color: 'var(--fp-text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: '0.95rem' }}>
          Answer questions about your completed education, favorite subjects, and career interests to receive verified university course recommendations.
        </p>
      </div>

      {/* ACTIVE QUIZ QUESTION VIEW */}
      {!recommendations ? (
        <div className="quiz-wrapper fade-in">
          <div className="quiz-card">
            {/* Progress Bar & Header Meta */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: '600', color: 'var(--fp-text-secondary)', marginBottom: '0.6rem' }}>
                <span>
                  Question {currentStep + 1} of {totalQuestions}
                </span>
                <span style={{ color: 'var(--fp-primary)', fontWeight: '700' }}>
                  {progressPercentage}% Completed
                </span>
              </div>
              <div className="quiz-progress-track">
                <div 
                  className="quiz-progress-fill" 
                  style={{ width: `${progressPercentage}%` }} 
                />
              </div>
            </div>

            {/* Question Title & Subtitle */}
            <div style={{ marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--fp-primary)', display: 'block', marginBottom: '0.35rem' }}>
                {currentQuestion.title}
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--fp-text)', lineHeight: '1.35', marginBottom: '0.35rem' }}>
                {currentQuestion.question}
              </h2>
              {currentQuestion.subtitle && (
                <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', margin: 0 }}>
                  {currentQuestion.subtitle}
                </p>
              )}
            </div>

            {/* Render Question Options based on Type */}
            {currentQuestion.type === 'single' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSingleSelect(currentQuestion.id, option.value)}
                      className={`quiz-option-item ${isSelected ? 'selected' : ''}`}
                      aria-pressed={isSelected}
                    >
                      <div className="quiz-check-circle">
                        {isSelected && <CheckCircle2 size={16} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="quiz-option-title">{option.label}</div>
                        {option.desc && <div className="quiz-option-desc">{option.desc}</div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'multiple' && (
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {currentQuestion.options.map((option) => {
                    const isSelected = multiSelection.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleToggleMulti(option.value)}
                        className={`quiz-option-item ${isSelected ? 'selected' : ''}`}
                        aria-pressed={isSelected}
                      >
                        <div className="quiz-check-circle">
                          {isSelected && <CheckCircle2 size={16} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="quiz-option-title">{option.label}</div>
                          {option.desc && <div className="quiz-option-desc">{option.desc}</div>}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleConfirmMulti}
                    disabled={multiSelection.length === 0}
                    className="btn btn-primary"
                    style={{
                      padding: '0.75rem 1.75rem',
                      fontSize: '0.95rem',
                      opacity: multiSelection.length === 0 ? 0.5 : 1,
                      cursor: multiSelection.length === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {currentQuestion.type === 'scale' && (
              <div style={{ marginBottom: '1.75rem' }}>
                <div className="quiz-scale-grid">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSingleSelect(currentQuestion.id, option.value)}
                        className={`quiz-scale-card ${isSelected ? 'selected' : ''}`}
                        aria-pressed={isSelected}
                      >
                        <div className="quiz-scale-number">{option.value}</div>
                        <div className="quiz-scale-label">{option.label}</div>
                        <div className="quiz-scale-desc">{option.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Footer (Previous Button) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--fp-border)' }}>
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn btn-secondary"
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <ArrowLeft size={15} /> Previous Question
                </button>
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'var(--fp-text-muted)' }}>
                  Question 1 of {totalQuestions}
                </span>
              )}

              <button
                type="button"
                onClick={handleRestart}
                className="btn btn-link-footer"
                style={{ fontSize: '0.8rem', color: 'var(--fp-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ==========================================================================
           RECOMMENDATION RESULTS SCREEN
           ========================================================================== */
        <div className="fade-in" style={{ maxWidth: '980px', margin: '0 auto' }}>
          {/* Results Header */}
          <div className="glass-card" style={{ padding: '2rem 2.25rem', marginBottom: '2rem', textAlign: 'center' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.75rem', fontSize: '0.825rem', padding: '0.35rem 0.95rem' }}>
              <Sparkles size={14} /> Course Recommendations Ready
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--fp-text)', marginBottom: '0.5rem' }}>
              Your FuturePath Results
            </h2>
            <p style={{ color: 'var(--fp-text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto 1.5rem', lineHeight: '1.5' }}>
              Based on your answers, these courses match your interests and preferences.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onExplorePath && onExplorePath(answers[1] === '10th' ? '10th' : '12th', answers[1] === '12th_commerce' ? 'Commerce' : answers[1] === '12th_arts' ? 'Arts' : 'Science')}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
              >
                Explore Full Roadmap Guidance →
              </button>
              <button
                onClick={handleRestart}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
              >
                <RotateCcw size={15} /> Retake Quiz
              </button>
            </div>
          </div>

          {/* Result Cards List */}
          {recommendations.length === 0 ? (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
              <HelpCircle size={40} color="var(--fp-text-muted)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                We couldn't find an exact match from the available course data.
              </h3>
              <p style={{ color: 'var(--fp-text-secondary)', marginBottom: '1.5rem' }}>
                Try adjusting your qualification or explore the complete university course catalog.
              </p>
              <button 
                onClick={() => onExplorePath && onExplorePath('12th', 'Science')}
                className="btn btn-primary"
              >
                Explore All Courses
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {recommendations.map((item, idx) => {
                const { course, matchPercentage, reasons } = item;
                const isSaved = isBookmarked ? isBookmarked(course._id, 'course') : false;
                const isComp = isCompared ? isCompared(course._id) : false;

                return (
                  <div key={course._id || idx} className="quiz-result-item">
                    {/* Top Row: Match Badge, University & Actions */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span className="match-badge">
                          🎯 {matchPercentage}% Match
                        </span>
                        <span style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--fp-primary)', background: 'var(--fp-primary-soft)', padding: '0.25rem 0.65rem', borderRadius: '6px' }}>
                          {course.university_name || 'Gujarat University'}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--fp-text-secondary)', fontWeight: '500' }}>
                          {course.course_level || 'Undergraduate'} • {course.duration}
                        </span>
                      </div>

                      {/* Action icons */}
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {onToggleCompare && (
                          <button
                            onClick={() => onToggleCompare(course)}
                            title={isComp ? 'Remove from comparison' : 'Compare course'}
                            style={{
                              background: isComp ? 'var(--fp-primary)' : '#F3F4F6',
                              color: isComp ? '#FFFFFF' : 'var(--fp-text-secondary)',
                              border: 'none',
                              padding: '0.4rem 0.65rem',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}
                          >
                            <Scale size={13} /> {isComp ? 'Compared' : 'Compare'}
                          </button>
                        )}

                        {onToggleBookmark && (
                          <button
                            onClick={() => onToggleBookmark(course, 'course')}
                            title={isSaved ? 'Remove from shortlist' : 'Shortlist course'}
                            style={{
                              background: isSaved ? '#FEF3C7' : '#F3F4F6',
                              color: isSaved ? '#D97706' : 'var(--fp-text-secondary)',
                              border: 'none',
                              padding: '0.4rem 0.65rem',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}
                          >
                            <Bookmark size={13} fill={isSaved ? '#D97706' : 'none'} /> {isSaved ? 'Shortlisted' : 'Shortlist'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Course Title & Short Summary */}
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.35rem' }}>
                        {course.course_name || course.name}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5', margin: 0 }}>
                        {course.description || `${course.course_name || course.name} provides specialized education in ${course.field_of_study || 'the discipline'} with recognized university accreditation.`}
                      </p>
                    </div>

                    {/* Eligibility Snippet */}
                    <div style={{ background: '#F9FAFB', borderLeft: '3px solid var(--fp-primary)', padding: '0.5rem 0.85rem', borderRadius: '4px', fontSize: '0.825rem' }}>
                      <strong style={{ color: 'var(--fp-text)' }}>Eligibility: </strong>
                      <span style={{ color: 'var(--fp-text-secondary)' }}>{course.eligibility || '12th Standard or Equivalent'}</span>
                    </div>

                    {/* Why this matches you */}
                    {reasons && reasons.length > 0 && (
                      <div className="match-reason-box">
                        <div className="match-reason-title">Why this matches you:</div>
                        {reasons.map((reason, rIdx) => (
                          <div key={rIdx} className="match-reason-item">
                            <span style={{ color: '#059669', fontWeight: '700' }}>✓</span>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Card Action: View Course */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem', borderTop: '1px solid #F3F4F6' }}>
                      <button
                        onClick={() => setSelectedCourseForDetail(course)}
                        className="btn btn-outline-primary"
                        style={{
                          padding: '0.5rem 1.25rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <Eye size={15} /> View Course Details & Colleges →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Result Disclaimer */}
          <div style={{
            background: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            textAlign: 'center',
            fontSize: '0.825rem',
            color: 'var(--fp-text-secondary)',
            lineHeight: '1.5',
            marginBottom: '2rem'
          }}>
            <span style={{ fontWeight: '600', color: 'var(--fp-text)' }}>Guidance Disclaimer: </span>
            FuturePath recommendations are based on your answers and the course information available in the portal. They are intended for exploration and guidance, not as a guaranteed career prediction.
          </div>
        </div>
      )}

      {/* ==========================================================================
         DEDICATED COURSE DETAILS MODAL WITH "WHERE CAN I STUDY THIS?" MAPPING
         ========================================================================== */}
      {selectedCourseForDetail && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050,
            padding: '1rem'
          }}
          onClick={() => setSelectedCourseForDetail(null)}
        >
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.2)',
              border: '1px solid #E5E7EB'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--fp-primary)', fontWeight: '700', background: 'var(--fp-primary-soft)', padding: '0.25rem 0.65rem', borderRadius: '6px' }}>
                  {selectedCourseForDetail.university_name || 'Accredited University'}
                </span>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--fp-text)', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  {selectedCourseForDetail.course_name || selectedCourseForDetail.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)' }}>
                  Level: {selectedCourseForDetail.course_level || 'Undergraduate'} • Field: {selectedCourseForDetail.field_of_study || 'General'}
                </div>
              </div>
              <button 
                onClick={() => setSelectedCourseForDetail(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.35rem', color: '#6B7280', cursor: 'pointer', padding: '0.25rem' }}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            {/* Quick Specs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #EEF2F6' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--fp-text-secondary)' }}>Duration</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--fp-text)' }}>{selectedCourseForDetail.duration}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--fp-text-secondary)' }}>Verification Status</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#059669' }}>
                  ✓ {selectedCourseForDetail.verification_status || 'VERIFIED'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--fp-text-secondary)' }}>Qualification Eligibility</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--fp-text)' }}>
                  {selectedCourseForDetail.qualification || '12th Standard'} ({selectedCourseForDetail.stream || 'General'})
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--fp-text-secondary)' }}>Official Source</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  {selectedCourseForDetail.official_source_url ? (
                    <a 
                      href={selectedCourseForDetail.official_source_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--fp-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      University Portal <ExternalLink size={12} />
                    </a>
                  ) : (
                    'State Portal'
                  )}
                </div>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.35rem' }}>
                Eligibility Criteria
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5', margin: 0 }}>
                {selectedCourseForDetail.eligibility}
              </p>
            </div>

            {/* Course Overview */}
            {selectedCourseForDetail.description && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.35rem' }}>
                  Course Overview
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  {selectedCourseForDetail.description}
                </p>
              </div>
            )}

            {/* Subjects / Key Topics */}
            {selectedCourseForDetail.subjects && selectedCourseForDetail.subjects.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.4rem' }}>
                  Core Subjects & Curriculum Areas
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {selectedCourseForDetail.subjects.map((sub, sIdx) => (
                    <span key={sIdx} style={{ background: '#F3F4F6', color: '#374151', fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                      📚 {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Career Opportunities */}
            {selectedCourseForDetail.careerOptions && selectedCourseForDetail.careerOptions.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.4rem' }}>
                  Target Career Opportunities
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {selectedCourseForDetail.careerOptions.map((car, cIdx) => (
                    <span key={cIdx} style={{ background: '#ECFDF5', color: '#047857', fontSize: '0.78rem', fontWeight: '600', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                      💼 {car}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================================================
               "WHERE CAN I STUDY THIS?" INSTITUTION MAPPING SECTION (Requirement 10)
               ========================================================================== */}
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
                <Building2 size={18} color="var(--fp-primary)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--fp-text)', margin: 0 }}>
                  Where can I study this?
                </h4>
              </div>

              {(() => {
                const matchedInstitutions = getInstitutionsForCourse(selectedCourseForDetail);

                if (matchedInstitutions.length === 0) {
                  return (
                    <div style={{ background: '#F9FAFB', border: '1px dashed #D1D5DB', borderRadius: '8px', padding: '1.25rem', textAlign: 'center' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', margin: 0 }}>
                        No institution mapping is currently available for this course in the portal database.
                      </p>
                    </div>
                  );
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {matchedInstitutions.map((inst) => {
                      const cityName = typeof inst.city === 'object' ? inst.city?.name : (inst.city || 'Gujarat');
                      return (
                        <div 
                          key={inst._id}
                          style={{
                            border: '1px solid #E5E7EB',
                            borderRadius: '10px',
                            padding: '0.85rem 1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: '#FFFFFF'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.925rem', color: 'var(--fp-text)' }}>
                              {inst.name}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--fp-text-secondary)', display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.15rem' }}>
                              <span>📍 {cityName}, {inst.state || 'Gujarat'}</span>
                              <span>• {inst.type || 'University'}</span>
                              {inst.affiliation && <span>• {inst.affiliation}</span>}
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedInstitutionForDetail(inst)}
                            className="btn btn-secondary"
                            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap' }}
                          >
                            View Institution
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Modal Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {onToggleBookmark && (
                  <button
                    onClick={() => onToggleBookmark(selectedCourseForDetail, 'course')}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 0.85rem', fontSize: '0.825rem' }}
                  >
                    <Bookmark size={14} fill={isBookmarked && isBookmarked(selectedCourseForDetail._id, 'course') ? '#D97706' : 'none'} />
                    {isBookmarked && isBookmarked(selectedCourseForDetail._id, 'course') ? 'Shortlisted' : 'Shortlist'}
                  </button>
                )}

                {onToggleCompare && (
                  <button
                    onClick={() => onToggleCompare(selectedCourseForDetail)}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 0.85rem', fontSize: '0.825rem' }}
                  >
                    <Scale size={14} />
                    {isCompared && isCompared(selectedCourseForDetail._id) ? 'Compared' : 'Compare'}
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedCourseForDetail(null)}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
         DEDICATED INSTITUTION DETAIL MODAL (Requirement 11)
         ========================================================================== */}
      {selectedInstitutionForDetail && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1060,
            padding: '1rem'
          }}
          onClick={() => setSelectedInstitutionForDetail(null)}
        >
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.75rem',
              boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.2)',
              border: '1px solid #E5E7EB'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--fp-primary)', fontWeight: '700', background: 'var(--fp-primary-soft)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                  🏛️ {selectedInstitutionForDetail.type || 'Institution'}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--fp-text)', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  {selectedInstitutionForDetail.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedInstitutionForDetail(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#6B7280', cursor: 'pointer' }}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem', background: '#F8FAFC', padding: '1rem', borderRadius: '10px' }}>
              {selectedInstitutionForDetail.affiliation && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fp-text-secondary)' }}>Affiliation</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--fp-text)' }}>{selectedInstitutionForDetail.affiliation}</div>
                </div>
              )}
              {selectedInstitutionForDetail.address && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fp-text-secondary)' }}>Campus Address</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--fp-text)' }}>{selectedInstitutionForDetail.address}</div>
                </div>
              )}
              {selectedInstitutionForDetail.contactNumber && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fp-text-secondary)' }}>Contact Phone</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--fp-text)' }}>{selectedInstitutionForDetail.contactNumber}</div>
                </div>
              )}
            </div>

            {/* Courses Offered Here */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Courses Offered Here
              </h4>
              {selectedInstitutionForDetail.coursesOffered && selectedInstitutionForDetail.coursesOffered.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {selectedInstitutionForDetail.coursesOffered.map((c, cIdx) => (
                    <div 
                      key={cIdx} 
                      style={{
                        background: '#F3F4F6',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: '#1F2937',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span>🎓 {typeof c === 'object' ? (c.course_name || c.name) : c}</span>
                      {typeof c === 'object' && c.duration && (
                        <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '400' }}>{c.duration}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', margin: 0 }}>
                  Course list available on official university website.
                </p>
              )}
            </div>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
              {selectedInstitutionForDetail.website ? (
                <a
                  href={selectedInstitutionForDetail.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  Official Website <ExternalLink size={13} />
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => setSelectedInstitutionForDetail(null)}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                Back to Course
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
