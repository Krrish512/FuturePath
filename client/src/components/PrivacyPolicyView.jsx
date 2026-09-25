import React from 'react';
import {
  ShieldCheck,
  Lock,
  Bookmark,
  Eye,
  UserCheck, 
  Globe, 
  CheckCircle2, 
  Info,
  Mail
} from 'lucide-react';

export default function PrivacyPolicyView({ onGoToContact }) {
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
            🔒 Privacy & Data Protection
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--fp-text)' }}>
            FuturePath <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', maxWidth: '640px', margin: '0 auto' }}>
            We believe in complete transparency. Learn how your student account information and educational preferences are protected on FuturePath.
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--fp-text-muted)', marginTop: '0.75rem' }}>
            Last Updated: January 2026 • Student-First Standard
          </div>
        </div>
      </section>

      <div className="container-xl px-3 px-sm-4 pt-5" style={{ maxWidth: '960px' }}>
        
        {/* Quick Highlights Summary */}
        <div className="card p-4 mb-4" style={{ background: '#F8FAFC', borderColor: 'var(--fp-border)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--fp-text)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="var(--fp-primary)" />
            <span>Our Privacy Commitment to Students</span>
          </h3>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-start gap-2" style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--fp-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Zero Data Selling:</strong> We never sell, rent, or monetize student personal information.</span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-start gap-2" style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--fp-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Secure Authentication:</strong> Industry-standard bcrypt password encryption & JWT sessions.</span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-start gap-2" style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--fp-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Full User Control:</strong> Easily view, update, clear your shortlist, or delete account.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="d-flex flex-column gap-4">
          
          {/* Section 1: Account Information */}
          <div className="card p-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <UserCheck size={20} color="var(--fp-primary)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fp-text)', margin: 0 }}>
                1. Account Information We Collect
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: '0.5rem' }}>
              When you register a student account on FuturePath, we collect only essential information required to personalize your guidance journey:
            </p>
            <ul style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', paddingLeft: '1.25rem', marginBottom: 0 }}>
              <li><strong>Basic Profile:</strong> Your name and email address for account identification and authentication.</li>
              <li><strong>Current Qualification:</strong> Information you specify (e.g. 10th SSC or 12th HSC stream) to filter suitable academic roadmaps.</li>
              <li><strong>Authentication Credentials:</strong> Securely hashed passwords that cannot be decrypted or read in plain text by anyone.</li>
            </ul>
          </div>

          {/* Section 2: Shortlist & Preferences */}
          <div className="card p-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Bookmark size={20} color="#D97706" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fp-text)', margin: 0 }}>
                2. Saved Shortlists and Bookmarks
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: '0.5rem' }}>
              FuturePath enables you to bookmark courses, pathways, colleges, and career profiles for quick reference:
            </p>
            <ul style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', paddingLeft: '1.25rem', marginBottom: 0 }}>
              <li><strong>Client-Side Storage:</strong> Bookmarks are stored safely in your browser's LocalStorage for instant access across visits.</li>
              <li><strong>Easy Reset:</strong> You can clear your shortlist anytime with a single click using the "Clear All" button on your bookmarks page.</li>
            </ul>
          </div>

          {/* Section 3: Security & Storage */}
          <div className="card p-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Lock size={20} color="var(--fp-primary)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fp-text)', margin: 0 }}>
                3. Security & Password Protection
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: 0 }}>
              We implement industry-standard cryptographic techniques to safeguard your account. Passwords undergo irreversible salt-hashing via bcrypt before storage in MongoDB. Authentication is managed through encrypted JSON Web Tokens (JWT), ensuring that your sessions remain confidential and isolated.
            </p>
          </div>

          {/* Section 4: How We Use Information */}
          <div className="card p-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Eye size={20} color="var(--fp-primary)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fp-text)', margin: 0 }}>
                4. How Your Information is Used
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: '0.5rem' }}>
              Your data is utilized exclusively for educational guidance functionalities:
            </p>
            <ul style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', paddingLeft: '1.25rem', marginBottom: 0 }}>
              <li>To recommend relevant degree, diploma, and certificate courses suited to your stream.</li>
              <li>To calculate match scores and career suggestions in the Aptitude Quiz.</li>
              <li>To enable college comparisons and maintain your saved shortlists.</li>
            </ul>
          </div>

          {/* Section 5: External Sources */}
          <div className="card p-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Globe size={20} color="var(--fp-primary)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--fp-text)', margin: 0 }}>
                5. External Sources & Government Data
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', marginBottom: 0 }}>
              FuturePath provides verified links and data feeds from official platforms such as data.gov.in, ACPC Gujarat, and the National Scholarship Portal. We do not pass your personal user data to any external portal when you follow these informational links.
            </p>
          </div>

        </div>

        {/* Contact Banner for Privacy */}
        <div className="mt-4 p-4 card text-center" style={{ background: '#F8FAFC' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.35rem' }}>
            Questions About Your Data?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', maxWidth: '500px', margin: '0 auto 1rem' }}>
            If you have any questions regarding data privacy or want to request profile assistance, please get in touch with our support desk.
          </p>
          <div>
            <button 
              onClick={onGoToContact} 
              className="btn btn-primary btn-sm"
              style={{ padding: '0.45rem 1rem' }}
            >
              Contact Support Desk
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
