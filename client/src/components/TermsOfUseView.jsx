import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  ExternalLink, 
  ShieldCheck, 
  UserCheck,
  BookOpen
} from 'lucide-react';

export default function TermsOfUseView({ onGoToContact, onExplore }) {
  return (
    <div style={{ paddingBottom: '2.5rem' }}>
      
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)',
        borderBottom: '1px solid var(--fp-border)',
        padding: '3.5rem 1.5rem 3rem'
        
      }}>
        <div className="container-xl" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="badge badge-indigo mb-2" style={{ padding: '0.4rem 0.95rem', fontSize: '0.8rem' }}>
            📜 Terms & Guidelines
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--fp-text)' }}>
            FuturePath <span className="gradient-text">Terms of Use</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', maxWidth: '640px', margin: '0 auto' }}>
            Please read these terms before exploring educational roadmaps and college guidance on FuturePath.
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--fp-text-muted)', marginTop: '0.75rem' }}>
            Effective Date: January 2026 • Educational Use Guidelines
          </div>
        </div>
      </section>

      <div className="container-xl px-3 px-sm-4 pt-5" style={{ maxWidth: '960px' }}>
        
        {/* Important Notice Alert Card */}
        <div className="card p-4 mb-4" style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}>
          <div className="d-flex align-items-start gap-3">
            <AlertTriangle size={24} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#92400E', marginBottom: '0.35rem' }}>
                Important Educational Disclaimer
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#B45309', lineHeight: '1.5', margin: 0 }}>
                FuturePath is an advisory platform built to help students discover and compare educational roadmaps. While we strive to maintain accurate data, admission criteria, fee structures, and seat allocations are determined solely by universities and official statutory admission authorities (e.g. ACPC Gujarat, GSEB). Always verify official notices prior to admission decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="d-flex flex-column gap-4">
          
          {/* Section 1: Purpose */}
          <div className="card p-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <BookOpen size={20} color="var(--fp-primary)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fp-text)', margin: 0 }}>
                1. Educational Guidance Purpose
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: 0 }}>
              FuturePath is designed exclusively as an educational guidance and career decision-support platform for students completing 10th Standard (SSC) and 12th Standard (HSC), as well as higher education aspirants. The content, pathway matrices, career projections, and aptitude assessments are meant to facilitate informed decision-making.
            </p>
          </div>

          {/* Section 2: Verification */}
          <div className="card p-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Scale size={20} color="var(--fp-primary)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fp-text)', margin: 0 }}>
                2. Verification with Official Authorities
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: '0.5rem' }}>
              Students and parents are advised to:
            </p>
            <ul style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', paddingLeft: '1.25rem', marginBottom: 0 }}>
              <li>Cross-verify specific college affiliation, accreditation status (NAAC/NBA), and fee structures directly with the respective institution.</li>
              <li>Refer to official counselling authorities (e.g. ACPC Gujarat, JOSAA, NEET Counselling) for current year cutoffs and registration deadlines.</li>
              <li>Consult official board circulars for updated syllabus and examination guidelines.</li>
            </ul>
          </div>

          {/* Section 3: Account Responsibility */}
          <div className="card p-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <UserCheck size={20} color="var(--fp-primary)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fp-text)', margin: 0 }}>
                3. User Account & Security Responsibility
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: 0 }}>
              If you register an account on FuturePath, you are responsible for maintaining the security of your login credentials. You agree to provide accurate information during registration and notify us immediately if you suspect unauthorized access to your student profile.
            </p>
          </div>

          {/* Section 4: Acceptable Use */}
          <div className="card p-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <ShieldCheck size={20} color="var(--fp-primary)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fp-text)', margin: 0 }}>
                4. Acceptable Platform Use
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: 0 }}>
              You agree to use FuturePath solely for lawful, academic, and non-commercial personal purposes. Any attempt to disrupt system operations, scrape content maliciously, or reverse-engineer administrative systems is strictly prohibited.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-4 p-4 card text-center" style={{ background: '#F8FAFC' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.35rem' }}>
            Need Clarification on Our Terms?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', maxWidth: '500px', margin: '0 auto 1rem' }}>
            Our team is available to assist you with any questions regarding our terms or academic policies.
          </p>
          <div className="d-flex justify-content-center gap-2">
            <button 
              onClick={onGoToContact} 
              className="btn btn-primary btn-sm"
              style={{ padding: '0.45rem 1rem' }}
            >
              Contact Support Desk
            </button>
            <button 
              onClick={onExplore} 
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem 1rem' }}
            >
              Explore Roadmaps
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
