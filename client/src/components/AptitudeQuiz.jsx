import React, { useState } from 'react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What subjects or daily activities do you find most interesting?",
    options: [
      { text: "Solving logic puzzles, mathematics, and playing with computers / gadgets", track: "tech", icon: "💻" },
      { text: "Understanding the human body, biology, medicines, and healthcare", track: "medical", icon: "🧬" },
      { text: "Managing money, tracking business news, stocks, and economics", track: "commerce", icon: "📊" },
      { text: "Creative writing, debate, social history, languages, and visual design", track: "arts", icon: "🎨" }
    ]
  },
  {
    id: 2,
    question: "Which work environment aligns best with your dream career?",
    options: [
      { text: "Fast-paced tech companies, IT hubs, or remote software engineering teams", track: "tech", icon: "⚡" },
      { text: "Hospitals, medical diagnostic clinics, or pharmaceutical laboratories", track: "medical", icon: "🏥" },
      { text: "Corporate headquarters, banking firms, financial auditing agencies", track: "commerce", icon: "🏢" },
      { text: "Government administrative offices, law courts, media agencies, or design studios", track: "arts", icon: "⚖️" }
    ]
  },
  {
    id: 3,
    question: "What primary skill would you like to master in your college years?",
    options: [
      { text: "Coding, software development, web applications, and database design", track: "tech", icon: "🛠️" },
      { text: "Clinical medical diagnosis, patient care, and surgical techniques", track: "medical", icon: "🩺" },
      { text: "Financial accounting, corporate taxation, marketing, and business strategy", track: "commerce", icon: "📈" },
      { text: "Critical thinking, legal advocacy, public speaking, or graphic UI/UX design", track: "arts", icon: "✍️" }
    ]
  },
  {
    id: 4,
    question: "How do you prefer to approach challenging problems?",
    options: [
      { text: "Breaking the problem down into logical steps and writing algorithmic code", track: "tech", icon: "🧩" },
      { text: "Analyzing biological symptoms and applying scientific medical principles", track: "medical", icon: "🔬" },
      { text: "Calculating financial costs, ROI, and optimizing business operations", track: "commerce", icon: "🧮" },
      { text: "Understanding human behavior, storytelling, and designing intuitive solutions", track: "arts", icon: "💡" }
    ]
  },
  {
    id: 5,
    question: "What is your ultimate aspirational career milestone?",
    options: [
      { text: "Becoming a Lead Full-Stack Developer, Software Architect, or Tech Founder", track: "tech", icon: "🚀" },
      { text: "Practicing as a certified Medical Doctor, Specialist, or Clinical Researcher", track: "medical", icon: "👨‍⚕️" },
      { text: "Qualifying as a Chartered Accountant (CA), CFO, or Successful Entrepreneur", track: "commerce", icon: "💼" },
      { text: "Clearing Civil Services (UPSC/GPSC), practicing Law, or Creative Director", track: "arts", icon: "🏛️" }
    ]
  }
];

const TRACK_RESULTS = {
  tech: {
    title: "Computer Science, IT & Software Engineering",
    badge: "badge-primary",
    icon: "💻",
    description: "You have a strong logical mind, affinity for technology, and passion for problem-solving. You are well-suited for high-growth tech careers in software development, web engineering, and AI.",
    recommendedStream: "Science",
    recommendedQual: "12th",
    recommendedDegrees: ["BCA (Bachelor of Computer Applications)", "B.Tech Computer Science & Engineering", "Diploma in Computer Engineering"],
    targetCareers: ["Full-Stack Web Developer", "Data Scientist", "Software Engineer", "Cloud Architect"]
  },
  medical: {
    title: "Medical, Healthcare & Biological Sciences",
    badge: "badge-emerald",
    icon: "🧬",
    description: "You have deep empathy, a scientific mindset, and strong curiosity regarding biology and health sciences. You are ideal for clinical healthcare, medical research, and paramedical fields.",
    recommendedStream: "Science",
    recommendedQual: "12th",
    recommendedDegrees: ["MBBS (Medicine & Surgery)", "BDS (Dental)", "B.Pharm (Pharmacy)", "Paramedical Diplomas"],
    targetCareers: ["Medical Doctor", "Physician", "Clinical Researcher", "Surgeon"]
  },
  commerce: {
    title: "Commerce, Business & Financial Leadership",
    badge: "badge-amber",
    icon: "📊",
    description: "You excel at commercial analysis, business acumen, market economics, and financial systems. You are primed for elite roles in corporate finance, auditing, and business management.",
    recommendedStream: "Commerce",
    recommendedQual: "12th",
    recommendedDegrees: ["Chartered Accountancy (CA)", "B.Com (Bachelor of Commerce)", "BBA (Business Administration)"],
    targetCareers: ["Chartered Accountant (CA)", "Financial Analyst", "Business Development Manager", "Tax Consultant"]
  },
  arts: {
    title: "Humanities, Law, Public Service & Design",
    badge: "badge-cyan",
    icon: "🎨",
    description: "You possess sharp analytical communication, social awareness, creativity, and interest in public administration, judicial advocacy, or media design.",
    recommendedStream: "Arts",
    recommendedQual: "12th",
    recommendedDegrees: ["BA (Bachelor of Arts)", "Integrated BA-LLB (Law)", "UI/UX & Visual Design Certification"],
    targetCareers: ["Civil Services Officer (UPSC/GPSC)", "Legal Advocate", "UI/UX Designer", "Content & Media Strategist"]
  }
};

export default function AptitudeQuiz({ onExplorePath }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelectOption = (track) => {
    const nextAnswers = { ...answers, [currentStep]: track };
    setAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(nextAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const scores = { tech: 0, medical: 0, commerce: 0, arts: 0 };
    Object.values(finalAnswers).forEach((t) => {
      if (scores[t] !== undefined) scores[t]++;
    });

    let topTrack = 'tech';
    let maxScore = -1;
    Object.entries(scores).forEach(([t, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topTrack = t;
      }
    });

    const matchPercentage = Math.round((maxScore / QUIZ_QUESTIONS.length) * 100);
    setResult({
      ...TRACK_RESULTS[topTrack],
      trackKey: topTrack,
      matchPercentage
    });
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Aptitude Assessment</span>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Interactive Career & Stream <span className="gradient-text">Decision Quiz</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Answer 5 quick personality and interest questions to discover your best-fit educational stream, degree programs, and career path.
        </p>
      </div>

      {!result ? (
        <div className="glass-card fade-in" style={{ maxWidth: '720px', margin: '0 auto', padding: '2.5rem' }}>
          {/* Progress Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                background: 'var(--grad-primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.75rem', lineHeight: '1.4', color: '#ffffff' }}>
            {QUIZ_QUESTIONS[currentStep].question}
          </h3>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectOption(opt.track)}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.06)',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  {opt.icon}
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '500' }}>
                  {opt.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="glass-card fade-in" style={{ maxWidth: '780px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            {result.icon}
          </div>

          <span className={`badge ${result.badge}`} style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
            🎯 {result.matchPercentage}% Alignment Match
          </span>

          <h3 style={{ fontSize: '1.85rem', marginBottom: '0.75rem', color: '#ffffff' }}>
            {result.title}
          </h3>

          <p style={{ color: 'var(--text-muted)', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
            {result.description}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            textAlign: 'left',
            marginBottom: '2.5rem'
          }}>
            {/* Recommended Degrees */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                Recommended Degrees:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                {result.recommendedDegrees.map((deg, i) => (
                  <li key={i}>• {deg}</li>
                ))}
              </ul>
            </div>

            {/* Target Careers */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                Future Career Opportunities:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                {result.targetCareers.map((car, i) => (
                  <li key={i}>• {car}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onExplorePath(result.recommendedQual, result.recommendedStream)}
              className="btn btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
            >
              🚀 Explore {result.recommendedStream} Guidance Path →
            </button>
            <button
              onClick={handleRestart}
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.5rem', fontSize: '1rem' }}
            >
              🔄 Retake Quiz
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
