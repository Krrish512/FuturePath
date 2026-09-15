import React, { useState } from 'react';

const FAQ_DATA = [
  {
    id: 1,
    category: '10th',
    categoryLabel: ' After 10th Standard',
    question: 'What are my best options after passing 10th standard (SSC)?',
    answer: 'After 10th, you have three primary paths: (1) Higher Secondary (11th & 12th) in Science, Commerce, or Arts; (2) 3-Year Polytechnic Engineering Diploma (Computer, Mechanical, Civil, Electrical); (3) 1-2 Year ITI Vocational Skill Certifications. Polytechnic Diplomas also offer direct lateral entry into the 2nd year of Degree Engineering (D2D).'
  },
  {
    id: 2,
    category: '10th',
    categoryLabel: ' After 10th Standard',
    question: 'How does the Diploma-to-Degree (D2D) engineering admission work in Gujarat?',
    answer: 'Students who complete a 3-Year Polytechnic Diploma approved by AICTE/GTU with qualifying merit marks are eligible for direct admission into the 3rd semester (2nd year) of 4-Year B.E. / B.Tech degree programs through ACPDC/ACPC Gujarat counselling, without appearing for 12th board exams or JEE.'
  },
  {
    id: 3,
    category: 'science',
    categoryLabel: ' 12th Science (PCM / PCB)',
    question: 'What is the difference between 12th Science PCM and PCB groups?',
    answer: 'PCM (Physics, Chemistry, Mathematics) is tailored for Engineering (B.Tech/B.E.), Architecture (B.Arch), Pure Sciences (B.Sc), Aviation, and Defense (NDA). PCB (Physics, Chemistry, Biology) prepares students for Medical (MBBS, BDS), Ayurvedic (BAMS), Homeopathy (BHMS), Pharmacy (B.Pharm), and Physiotherapy.'
  },
  {
    id: 4,
    category: 'science',
    categoryLabel: ' 12th Science (PCM / PCB)',
    question: 'Which entrance exams are required for Engineering and Medical admissions?',
    answer: 'For Engineering in Gujarat: GUJCET (State merit) and JEE Main / JEE Advanced (National institutes like NITs/IITs). For Medical (MBBS/BDS/AYUSH): NEET-UG (National Eligibility cum Entrance Test) is mandatory across India.'
  },
  {
    id: 5,
    category: 'it',
    categoryLabel: ' IT & Software Careers',
    question: 'Can I pursue BCA (Bachelor of Computer Applications) if I studied Commerce or Arts in 12th?',
    answer: 'Yes! Most universities in Gujarat (including Gujarat University, GTU, MSU, and VNSGU) allow 12th pass students from ANY stream (Science, Commerce, or Arts) to enroll in BCA, provided they have studied English and either Mathematics, Statistics, or Computer as a subject in 12th standard.'
  },
  {
    id: 6,
    category: 'it',
    categoryLabel: ' IT & Software Careers',
    question: 'What is the difference between BCA and B.Tech in Computer Science?',
    answer: 'BCA (3 Years) focuses primarily on application software, database management, and web/mobile development with faster entry into industry jobs. B.Tech CSE (4 Years) is an engineering degree requiring 12th Science (PCM) that covers deep computer hardware architecture, operating system kernels, theoretical algorithms, and compiler design alongside software.'
  },
  {
    id: 7,
    category: 'commerce',
    categoryLabel: ' 12th Commerce & Finance',
    question: 'What is the difference between B.Com, BBA, and Chartered Accountancy (CA)?',
    answer: 'B.Com focuses deeply on accounting, corporate law, taxation, and auditing. BBA is a management-oriented degree developing leadership, marketing, HR, and business operations. CA is a premier professional certification awarded by the Institute of Chartered Accountants of India (ICAI) involving Foundation, Intermediate, Articleship, and Final examinations.'
  },
  {
    id: 8,
    category: 'arts',
    categoryLabel: ' 12th Arts & Humanities',
    question: 'What career opportunities exist after 12th Arts?',
    answer: 'Arts graduates have diverse high-impact trajectories including Civil Services (UPSC IAS/IPS, GPSC), Corporate and Criminal Law (5-Year Integrated BA-LLB), Journalism & Mass Media, UI/UX & Product Design, Public Relations, Psychology, and Academic Teaching & Research.'
  }
];

export default function FAQView({ onExploreGuidance, onTakeQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(1);

  const categories = [
    { id: 'All', label: ' All Questions' },
    { id: '10th', label: ' After 10th' },
    { id: 'science', label: ' 12th Science' },
    { id: 'commerce', label: ' 12th Commerce' },
    { id: 'arts', label: ' 12th Arts' },
    { id: 'it', label: ' IT & BCA' }
  ];

  const filteredFAQs = FAQ_DATA.filter((item) => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const searchMatch = !searchQuery.trim() || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Guidance Help Center</span>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Frequently Asked <span className="gradient-text">Student Questions</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 1.5rem' }}>
          Get immediate answers to common dilemmas regarding stream selection, entrance exams, degree eligibility, and lateral entry.
        </p>

        {/* Search Input */}
        <div style={{ maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search questions (e.g. BCA without maths, D2D, NEET, CA)..."
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

        {/* Category Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  borderRadius: 'var(--radius-full)',
                  background: isSelected ? 'var(--grad-primary)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  border: isSelected ? '1px solid transparent' : '1px solid var(--border-light)',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card fade-in"
                style={{
                  overflow: 'hidden',
                  borderColor: isExpanded ? 'rgba(99, 102, 241, 0.4)' : 'var(--border-light)'
                }}
              >
                {/* Question Header */}
                <div
                  onClick={() => toggleAccordion(faq.id)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    background: isExpanded ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: '700' }}>
                      {faq.categoryLabel.split(' ')[0]}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: '600' }}>
                      {faq.question}
                    </h3>
                  </div>
                  <span style={{
                    fontSize: '1.25rem',
                    color: isExpanded ? 'var(--primary)' : 'var(--text-muted)',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease'
                  }}>
                    ▼
                  </span>
                </div>

                {/* Answer Content */}
                {isExpanded && (
                  <div style={{
                    padding: '1.25rem 1.5rem',
                    borderTop: '1px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    fontSize: '0.925rem',
                    lineHeight: '1.6',
                    background: 'rgba(255, 255, 255, 0.01)'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>No FAQ answers match your search term.</p>
          </div>
        )}
      </div>

      {/* Bottom CTA Card */}
      <div className="glass-card" style={{
        maxWidth: '850px',
        margin: '3rem auto 0',
        padding: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#ffffff' }}>
          Still Unsure Which Stream or Degree Fits You?
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', maxWidth: '540px', margin: '0 auto 1.25rem' }}>
          Take our interactive 5-question career aptitude assessment or jump straight into the full guidance roadmap explorer.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {onTakeQuiz && (
            <button
              onClick={onTakeQuiz}
              className="btn btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.5rem' }}
            >
              Take Career Quiz
            </button>
          )}
          {onExploreGuidance && (
            <button
              onClick={onExploreGuidance}
              className="btn btn-secondary"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.5rem' }}
            >
               Open Guidance Explorer
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
