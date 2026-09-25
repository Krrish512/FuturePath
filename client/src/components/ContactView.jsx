import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  GraduationCap, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function ContactView({ onGoToFAQ, onExplore }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    qualification: '12th Science',
    category: 'Course Advice',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

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
            💬 Student Support & Contact
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '700', letterSpacing: '-0.025em', marginBottom: '0.75rem', color: 'var(--fp-text)' }}>
            We're Here to Help Your <span className="gradient-text">Academic Journey</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--fp-text-secondary)', lineHeight: '1.6', maxWidth: '640px', margin: '0 auto' }}>
            Have questions about educational streams, degree options, college admissions, or need guidance on choosing the right roadmap? Reach out to our student guidance desk.
          </p>
        </div>
      </section>

      <div className="container-xl px-3 px-sm-4 pt-5" style={{ maxWidth: '1080px' }}>
        <div className="row g-4">
          
          {/* Left Column: Contact Cards & Info */}
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-column gap-3">
              
              {/* Guidance Support Card */}
              <div className="card p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--fp-primary-soft)',
                    color: 'var(--fp-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.15rem' }}>
                      Student Helpdesk Email
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--fp-primary)', fontWeight: '600' }}>
                      support@futurepath.edu.in
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  Send us your specific educational queries or questions about college eligibility. We respond to all student emails within 24 hours.
                </p>
              </div>

              {/* Working Hours */}
              <div className="card p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--fp-success-soft)',
                    color: 'var(--fp-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.15rem' }}>
                      Guidance Desk Hours
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', fontWeight: '600' }}>
                      Monday – Saturday: 9:00 AM – 6:00 PM IST
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  Active during official Gujarat admission cycles and academic counselling periods.
                </p>
              </div>

              {/* FAQ Quick Link Banner */}
              <div className="card p-4" style={{ background: '#F8FAFC', borderColor: 'var(--fp-border)' }}>
                <div className="d-flex align-items-start gap-3">
                  <HelpCircle size={24} color="var(--fp-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.35rem' }}>
                      Looking for Quick Answers?
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--fp-text-secondary)', lineHeight: '1.5', marginBottom: '0.85rem' }}>
                      Check out our Student FAQ section for immediate guidance on streams, entrance exams, and college comparisons.
                    </p>
                    <button
                      onClick={onGoToFAQ}
                      className="btn btn-secondary btn-sm d-inline-flex align-items-center gap-1"
                      style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                    >
                      <span>Visit FAQ Center</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="col-12 col-lg-7">
            <div className="card p-4 p-md-5">
              
              {submitted ? (
                <div className="text-center py-4">
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--fp-success-soft)',
                    color: 'var(--fp-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--fp-text)', marginBottom: '0.5rem' }}>
                    Message Sent Successfully!
                  </h2>
                  <p style={{ fontSize: '0.925rem', color: 'var(--fp-text-secondary)', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
                    Thank you, <strong>{formData.name}</strong>. Our student guidance team has received your enquiry and will reply to <strong>{formData.email}</strong> shortly.
                  </p>
                  <div className="d-flex justify-content-center gap-2">
                    <button 
                      onClick={() => setSubmitted(false)} 
                      className="btn btn-secondary"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Send Another Message
                    </button>
                    <button 
                      onClick={onExplore} 
                      className="btn btn-primary"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Explore Roadmaps
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <MessageSquare size={20} color="var(--fp-primary)" />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--fp-text)', margin: 0 }}>
                      Send an Academic Enquiry
                    </h2>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--fp-text-secondary)', marginBottom: '1.5rem' }}>
                    Fill out the form below and our counsellors will assist you with stream choices or admission guidance.
                  </p>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--fp-text)', marginBottom: '0.35rem', display: 'block' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                        className="fp-input"
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--fp-text)', marginBottom: '0.35rem', display: 'block' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@example.com"
                        required
                        className="fp-input"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--fp-text)', marginBottom: '0.35rem', display: 'block' }}>
                        Current Qualification
                      </label>
                      <select
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="fp-input"
                      >
                        <option value="10th Standard">10th Standard (SSC)</option>
                        <option value="12th Science">12th Science (HSC)</option>
                        <option value="12th Commerce">12th Commerce (HSC)</option>
                        <option value="12th Arts">12th Arts (HSC)</option>
                        <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                        <option value="Graduate / Other">Graduate / Other</option>
                      </select>
                    </div>

                    <div className="col-12 col-sm-6">
                      <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--fp-text)', marginBottom: '0.35rem', display: 'block' }}>
                        Enquiry Topic
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="fp-input"
                      >
                        <option value="Course Advice">Course & Degree Advice</option>
                        <option value="College Admissions">College Admissions & Cutoffs</option>
                        <option value="Career Roadmaps">Career Roadmap Guidance</option>
                        <option value="Aptitude Quiz">Quiz & Recommendations Help</option>
                        <option value="General Feedback">General Feedback & Suggestions</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--fp-text)', marginBottom: '0.35rem', display: 'block' }}>
                      Your Message or Question *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your background, career goals, or any confusion regarding stream or course selection..."
                      rows={5}
                      required
                      className="fp-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary d-inline-flex align-items-center gap-2"
                    style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
                  >
                    <Send size={16} />
                    <span>Send Guidance Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
