import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Sparkles, 
  Compass, 
  GraduationCap 
} from 'lucide-react';

const FAQ_DATA = [
  {
    id: 1,
    category: '10th',
    categoryLabel: 'After 10th Standard',
    question: 'What are my best options after passing 10th standard (SSC)?',
    answer: 'After 10th, you have three primary paths: (1) Higher Secondary (11th & 12th) in Science, Commerce, or Arts; (2) 3-Year Polytechnic Engineering Diploma (Computer, Mechanical, Civil, Electrical); (3) 1-2 Year ITI Vocational Skill Certifications. Polytechnic Diplomas also offer direct lateral entry into the 2nd year of Degree Engineering (D2D).'
  },
  {
    id: 2,
    category: '10th',
    categoryLabel: 'After 10th Standard',
    question: 'How does the Diploma-to-Degree (D2D) engineering admission work in Gujarat?',
    answer: 'Students who complete a 3-Year Polytechnic Diploma approved by AICTE/GTU with qualifying merit marks are eligible for direct admission into the 3rd semester (2nd year) of 4-Year B.E. / B.Tech degree programs through ACPDC/ACPC Gujarat counselling, without appearing for 12th board exams or JEE.'
  },
  {
    id: 3,
    category: 'science',
    categoryLabel: '12th Science (PCM / PCB)',
    question: 'What is the difference between 12th Science PCM and PCB groups?',
    answer: 'PCM (Physics, Chemistry, Mathematics) is tailored for Engineering (B.Tech/B.E.), Architecture (B.Arch), Pure Sciences (B.Sc), Aviation, and Defense (NDA). PCB (Physics, Chemistry, Biology) prepares students for Medical (MBBS, BDS), Ayurvedic (BAMS), Homeopathy (BHMS), Pharmacy (B.Pharm), and Physiotherapy.'
  },
  {
    id: 4,
    category: 'science',
    categoryLabel: '12th Science (PCM / PCB)',
    question: 'Which entrance exams are required for Engineering and Medical admissions?',
    answer: 'For Engineering in Gujarat: GUJCET (State merit) and JEE Main / JEE Advanced (National institutes like NITs/IITs). For Medical (MBBS/BDS/AYUSH): NEET-UG (National Eligibility cum Entrance Test) is mandatory across India.'
  },
  {
    id: 5,
    category: 'it',
    categoryLabel: 'IT & Software Careers',
    question: 'Can I pursue BCA (Bachelor of Computer Applications) if I studied Commerce or Arts in 12th?',
    answer: 'Yes! Most universities in Gujarat (including Gujarat University, GTU, MSU, and VNSGU) allow 12th pass students from ANY stream (Science, Commerce, or Arts) to enroll in BCA, provided they have studied English and either Mathematics, Statistics, or Computer as a subject in 12th standard.'
  },
  {
    id: 6,
    category: 'it',
    categoryLabel: 'IT & Software Careers',
    question: 'What is the difference between BCA and B.Tech in Computer Science?',
    answer: 'BCA (3 Years) focuses primarily on application software, database management, and web/mobile development with faster entry into industry jobs. B.Tech CSE (4 Years) is an engineering degree requiring 12th Science (PCM) that covers deep computer hardware architecture, operating system kernels, theoretical algorithms, and compiler design alongside software.'
  },
  {
    id: 7,
    category: 'commerce',
    categoryLabel: '12th Commerce & Finance',
    question: 'What is the difference between B.Com, BBA, and Chartered Accountancy (CA)?',
    answer: 'B.Com focuses deeply on accounting, corporate law, taxation, and auditing. BBA is a management-oriented degree developing leadership, marketing, HR, and business operations. CA is a premier professional certification awarded by the Institute of Chartered Accountants of India (ICAI) involving Foundation, Intermediate, Articleship, and Final examinations.'
  },
  {
    id: 8,
    category: 'arts',
    categoryLabel: '12th Arts & Humanities',
    question: 'What career opportunities exist after 12th Arts?',
    answer: 'Arts graduates have diverse high-impact trajectories including Civil Services (UPSC IAS/IPS, GPSC), Corporate and Criminal Law (5-Year Integrated BA-LLB), Journalism & Mass Media, UI/UX & Product Design, Public Relations, Psychology, and Academic Teaching & Research.'
  }
];

export default function FAQView({ onExploreGuidance, onTakeQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(1);

  const categories = [
    { id: 'All', label: 'All Questions' },
    { id: '10th', label: 'After 10th' },
    { id: 'science', label: '12th Science' },
    { id: 'commerce', label: '12th Commerce' },
    { id: 'arts', label: '12th Arts' },
    { id: 'it', label: 'IT & BCA' }
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
    <section className="container-xl px-3 px-sm-4 py-4 py-lg-4" style={{ paddingBottom: '3rem' }}>
      
      {/* FAQ Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-indigo" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <HelpCircle size={14} /> Guidance Help Center
          </span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.75rem', color: '#111827' }}>
          Frequently Asked <span className="gradient-text">Student Questions</span>
        </h1>
        <p style={{ color: '#6B7280', fontSize: '1rem', lineHeight: '1.6', maxWidth: '680px', margin: '0 auto' }}>
          Get immediate, verified answers to common dilemmas regarding stream selection, entrance exams, degree eligibility, and lateral entry.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div style={{ maxWidth: '940px', margin: '0 auto 2.5rem' }}>
        
        {/* Search Input Box */}
        <div className="faq-search-wrapper">
          <Search 
            size={18} 
            color="#6B7280" 
            style={{ 
              position: 'absolute', 
              left: '14px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }} 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. BCA without maths, D2D, NEET, CA)..."
            aria-label="Search frequently asked questions"
            className="faq-search-input"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`faq-category-btn ${isSelected ? 'active' : 'inactive'}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Accordion FAQ List */}
      <div style={{ maxWidth: '940px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item ${isExpanded ? 'active' : ''}`}
              >
                {/* Accessible Question Accordion Button */}
                <button
                  type="button"
                  id={`faq-header-${faq.id}`}
                  aria-expanded={isExpanded}
                  aria-controls={`faq-body-${faq.id}`}
                  onClick={() => toggleAccordion(faq.id)}
                  className="faq-question-btn"
                >
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <span 
                      className="badge" 
                      style={{ 
                        background: isExpanded ? 'var(--fp-primary-soft)' : '#F1F5F9',
                        color: isExpanded ? '#4F46E5' : '#475569',
                        fontSize: '0.725rem',
                        fontWeight: '700',
                        padding: '0.3rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        flexShrink: 0
                      }}
                    >
                      {faq.categoryLabel}
                    </span>
                    <h2 className="faq-question-text">
                      {faq.question}
                    </h2>
                  </div>
                  <ChevronDown
                    size={20}
                    color={isExpanded ? '#4F46E5' : '#6B7280'}
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0
                    }}
                  />
                </button>

                {/* Answer Content Panel */}
                {isExpanded && (
                  <div
                    id={`faq-body-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-header-${faq.id}`}
                    className="faq-answer-body"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="card p-5 text-center" style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}>
            <HelpCircle size={36} color="#9CA3AF" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '0.35rem' }}>
              No FAQ Answers Match Your Search
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.25rem' }}>
              We couldn't find any questions matching "{searchQuery}". Try searching for another topic like <em>polytechnic</em>, <em>neet</em>, or <em>commerce</em>.
            </p>
            <button 
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn btn-secondary"
              style={{ margin: '0 auto', fontSize: '0.85rem' }}
            >
              Clear Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA Card */}
      <div 
        className="card p-4 p-md-5 mt-5" 
        style={{
          maxWidth: '940px',
          margin: '3rem auto 0',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #EEF2FF 0%, #F0FDF4 100%)',
          borderColor: '#C7D2FE',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
          Still Unsure Which Stream or Degree Fits You?
        </h2>
        <p style={{ color: '#6B7280', fontSize: '0.925rem', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
          Take our interactive 5-question career aptitude assessment or jump straight into the full guidance roadmap explorer.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          {onTakeQuiz && (
            <button
              type="button"
              onClick={onTakeQuiz}
              className="btn btn-primary d-inline-flex align-items-center gap-2"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.4rem' }}
            >
              <Sparkles size={16} />
              <span>Take Career Quiz</span>
            </button>
          )}
          {onExploreGuidance && (
            <button
              type="button"
              onClick={onExploreGuidance}
              className="btn btn-secondary d-inline-flex align-items-center gap-2"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.4rem', background: '#FFFFFF', color: '#111827', borderColor: '#E5E7EB' }}
            >
              <Compass size={16} />
              <span>Open Guidance Explorer</span>
            </button>
          )}
        </div>
      </div>

    </section>
  );
}
