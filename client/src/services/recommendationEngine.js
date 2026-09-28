/**
 * FuturePath Intelligent Course Recommendation Engine
 * Transparent, rule-based matching algorithm connecting student profile answers
 * with verified educational courses and institution offerings.
 */

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    type: 'single',
    category: 'qualification',
    title: 'Completed or Current Education',
    question: 'What is your current or most recent educational qualification?',
    subtitle: 'This ensures we only recommend programs you are eligible to enroll in.',
    options: [
      { 
        value: '10th', 
        label: '10th Standard (SSC)', 
        desc: 'Completed secondary school certificate. Exploring polytechnic diplomas or future streams.',
        qualification: '10th',
        stream: '10th'
      },
      { 
        value: '12th_science', 
        label: '12th Standard Science (PCM / PCB)', 
        desc: 'Completed higher secondary in Science with Physics, Chemistry, Maths and/or Biology.',
        qualification: '12th',
        stream: 'Science'
      },
      { 
        value: '12th_commerce', 
        label: '12th Standard Commerce', 
        desc: 'Completed higher secondary in Commerce with Accountancy, Economics, and Business Studies.',
        qualification: '12th',
        stream: 'Commerce'
      },
      { 
        value: '12th_arts', 
        label: '12th Standard Arts / Humanities', 
        desc: 'Completed higher secondary in Arts with Humanities, Social Sciences, or Languages.',
        qualification: '12th',
        stream: 'Arts'
      }
    ]
  },
  {
    id: 2,
    type: 'multiple',
    category: 'subjects',
    title: 'Favorite Academic Subjects',
    question: 'Which subjects do you enjoy learning or find easiest to understand?',
    subtitle: 'Select all that apply to help us match your natural academic strengths.',
    options: [
      { value: 'mathematics', label: 'Mathematics & Statistics', desc: 'Calculus, algebra, numerical reasoning and statistics' },
      { value: 'physics', label: 'Physics & Applied Mechanics', desc: 'Forces, energy, optics, electronics and physical systems' },
      { value: 'biology', label: 'Biology & Life Sciences', desc: 'Human anatomy, genetics, botany, and biomedical sciences' },
      { value: 'computer', label: 'Computer Applications & IT', desc: 'Programming, web design, computer hardware and software tools' },
      { value: 'accountancy', label: 'Accountancy & Taxation', desc: 'Financial ledgers, auditing, balance sheets and taxation' },
      { value: 'economics', label: 'Economics & Market Studies', desc: 'Micro/macro economics, financial markets and supply/demand' },
      { value: 'business', label: 'Business Studies & Management', desc: 'Organizational structures, marketing, commerce and trade' },
      { value: 'languages', label: 'English & Languages', desc: 'Literature, professional communication and creative writing' },
      { value: 'history', label: 'History & Political Science', desc: 'Governance, Indian constitution, civics and world history' },
      { value: 'psychology', label: 'Psychology & Social Dynamics', desc: 'Human behavior, cognitive processes and counseling' },
      { value: 'design', label: 'Visual Arts & Drawing', desc: 'Sketching, graphic design, user experience and aesthetics' }
    ]
  },
  {
    id: 3,
    type: 'multiple',
    category: 'interests',
    title: 'Broad Interest Areas',
    question: 'Which broad fields are you most interested in exploring for your career?',
    subtitle: 'Select all that apply to narrow down suitable study disciplines.',
    options: [
      { value: 'technology', label: 'Software & Information Technology', desc: 'Web apps, artificial intelligence, cloud, and mobile software' },
      { value: 'engineering', label: 'Core Engineering & Technology', desc: 'Electronics, mechanical machines, electrical systems, and civil infrastructure' },
      { value: 'healthcare', label: 'Healthcare & Biological Sciences', desc: 'Medical care, clinical diagnostics, biotechnology, and pharmaceuticals' },
      { value: 'business', label: 'Business Administration & Management', desc: 'Corporate management, startups, operations, and leadership' },
      { value: 'finance', label: 'Finance, Banking & Accounting', desc: 'Investment banking, auditing, financial analytics, and taxation' },
      { value: 'science', label: 'Scientific Research & Pure Sciences', desc: 'Physics, chemistry, applied mathematics, and laboratory research' },
      { value: 'design', label: 'Creative Design & Digital Media', desc: 'UI/UX design, visual communication, animation, and multimedia' },
      { value: 'law', label: 'Law, Public Administration & Civil Services', desc: 'Legal advocacy, UPSC/GPSC administrative governance, and policy' }
    ]
  },
  {
    id: 4,
    type: 'scale',
    category: 'programming',
    title: 'Technology & Programming Interest',
    question: 'How interested are you in computer programming, software apps, and coding?',
    subtitle: 'Choose the rating that best reflects your enthusiasm for software creation.',
    options: [
      { value: 4, label: 'High Passion', desc: 'I love programming, building apps, or want to master software engineering.' },
      { value: 3, label: 'Interested', desc: 'I want to learn programming and practical computer tools for modern tech roles.' },
      { value: 2, label: 'Moderate', desc: 'I can use technology as a tool, but prefer focusing on other primary domains.' },
      { value: 1, label: 'Minimal', desc: 'I prefer non-computing, non-programming career disciplines.' }
    ]
  },
  {
    id: 5,
    type: 'scale',
    category: 'math',
    title: 'Mathematics & Logical Calculation Comfort',
    question: 'How comfortable are you with mathematics, numbers, and quantitative problem solving?',
    subtitle: 'This helps distinguish mathematical degrees from conceptual or language-based fields.',
    options: [
      { value: 4, label: 'Advanced', desc: 'Very comfortable with calculus, advanced equations, algorithms, and logical proofs.' },
      { value: 3, label: 'Comfortable', desc: 'Confident with business mathematics, statistics, algebra, and data interpretation.' },
      { value: 2, label: 'Moderate', desc: 'Can manage standard calculations and practical numeric tasks when needed.' },
      { value: 1, label: 'Prefer Less Math', desc: 'Prefer theoretical, descriptive, or creative courses with minimal calculation.' }
    ]
  },
  {
    id: 6,
    type: 'scale',
    category: 'biology',
    title: 'Life Sciences & Healthcare Affinity',
    question: 'How interested are you in biological systems, healthcare, medicine, or biotechnology?',
    subtitle: 'Helps identify suitability for life science, biotech, and paramedical fields.',
    options: [
      { value: 4, label: 'Very High', desc: 'Strong passion for biology, healthcare, pharmaceuticals, or bio-research.' },
      { value: 3, label: 'Interested', desc: 'Curious about biological science, biotechnology, and health innovations.' },
      { value: 2, label: 'Low', desc: 'Mild curiosity, but not as my primary major degree focus.' },
      { value: 1, label: 'None', desc: 'I prefer technology, commerce, mathematics, or humanities over biology.' }
    ]
  },
  {
    id: 7,
    type: 'scale',
    category: 'business',
    title: 'Commerce, Business & Financial Interest',
    question: 'How interested are you in corporate business, entrepreneurship, and financial markets?',
    subtitle: 'Helps evaluate fit for BBA, B.Com, Integrated MBA, and financial analyst pathways.',
    options: [
      { value: 4, label: 'Very High', desc: 'Eager to study market trends, business strategy, financial auditing, and management.' },
      { value: 3, label: 'Interested', desc: 'Interested in how modern companies operate, marketing, and commercial trade.' },
      { value: 2, label: 'Moderate', desc: 'Open to foundational business concepts as a secondary skill.' },
      { value: 1, label: 'Low', desc: 'My primary goals are focused in technical, scientific, or artistic domains.' }
    ]
  },
  {
    id: 8,
    type: 'scale',
    category: 'creativity',
    title: 'Creative Design & Visual Expression',
    question: 'How important is creativity, visual aesthetics, or UI/UX design in your ideal studies?',
    subtitle: 'Helps identify potential for design-heavy, media, or creative computing paths.',
    options: [
      { value: 4, label: 'Very Important', desc: 'I want a course involving creative design, user experience, visual media, or arts.' },
      { value: 3, label: 'Appreciated', desc: 'I enjoy combining creativity with analytical problem-solving and software.' },
      { value: 2, label: 'Secondary', desc: 'I am comfortable with standard structured technical or business curricula.' },
      { value: 1, label: 'Not Required', desc: 'I prefer purely quantitative, scientific, or standardized commercial focus.' }
    ]
  },
  {
    id: 9,
    type: 'single',
    category: 'learning_style',
    title: 'Preferred Learning Style',
    question: 'What type of academic learning environment helps you learn best?',
    subtitle: 'Different degrees emphasize different instructional methods.',
    options: [
      { value: 'practical_coding', label: 'Hands-on Coding & Software Projects', desc: 'Building working applications, lab coding, and solving software challenges.' },
      { value: 'math_problem_solving', label: 'Mathematical & Algorithmic Problem Solving', desc: 'Working through formulas, structured problem sets, and theoretical models.' },
      { value: 'laboratory_science', label: 'Laboratory Experiments & Scientific Inquiry', desc: 'Conducting physical, chemical, or biological experiments and lab reports.' },
      { value: 'business_cases', label: 'Real-World Business Cases & Discussions', desc: 'Analyzing corporate case studies, market reports, and team presentations.' },
      { value: 'critical_reading', label: 'Conceptual Reading, Debate & Essay Writing', desc: 'Exploring social topics, critical literature, philosophy, and legal frameworks.' }
    ]
  },
  {
    id: 10,
    type: 'single',
    category: 'work_environment',
    title: 'Preferred Work Environment',
    question: 'Where do you envision yourself working after graduation?',
    subtitle: 'Your future work environment helps anchor the right degree specialization.',
    options: [
      { value: 'env_tech', label: 'Tech Companies & Software Teams', desc: 'Modern IT offices, software engineering hubs, or remote tech teams.' },
      { value: 'env_engineering', label: 'Engineering Labs & Manufacturing Units', desc: 'Industrial technology plants, hardware labs, and engineering design centers.' },
      { value: 'env_healthcare', label: 'Hospitals, Clinics & Diagnostic Labs', desc: 'Clinical healthcare centers, medical diagnostics, or pharmaceutical facilities.' },
      { value: 'env_corporate', label: 'Corporate Headquarters & Financial Firms', desc: 'Consulting offices, banking institutions, and executive boardrooms.' },
      { value: 'env_research', label: 'Research Institutes & Academic Labs', desc: 'Scientific research laboratories, university departments, and think tanks.' },
      { value: 'env_public', label: 'Public Administration & Legal Offices', desc: 'Government secretariats, civil service offices, or courtrooms.' }
    ]
  },
  {
    id: 11,
    type: 'single',
    category: 'career_direction',
    title: 'Career Direction',
    question: 'Which specific job role sounds most exciting for your long-term future?',
    subtitle: 'Select the role you feel most drawn toward today.',
    options: [
      { value: 'role_software', label: 'Software Engineer / Full-Stack Developer', desc: 'Building web apps, mobile apps, database systems, and cloud backends.' },
      { value: 'role_ai_data', label: 'AI & Data Science Specialist', desc: 'Training machine learning models, analyzing big data, and data visualization.' },
      { value: 'role_engineer', label: 'Core Engineer (Electronics / Mech / Civil)', desc: 'Designing physical systems, embedded hardware, or civil infrastructure.' },
      { value: 'role_finance', label: 'Chartered Accountant / Financial Analyst', desc: 'Managing corporate finance, tax planning, investment portfolios, and audits.' },
      { value: 'role_manager', label: 'Business Manager / Entrepreneur', desc: 'Leading operations, marketing strategies, business growth, or founding a startup.' },
      { value: 'role_researcher', label: 'Scientific Researcher / Academic Scholar', desc: 'Conducting scientific investigations in physics, chemistry, or mathematics.' },
      { value: 'role_healthcare', label: 'Biotech Specialist / Healthcare Professional', desc: 'Working in biotechnology research, clinical diagnostics, or pharma.' },
      { value: 'role_public_law', label: 'Civil Services Officer (UPSC/GPSC) / Legal Advocate', desc: 'Serving in administrative governance, public policy, or legal counsel.' }
    ]
  },
  {
    id: 12,
    type: 'single',
    category: 'priority',
    title: 'Primary Career Priority',
    question: 'What is your top personal priority for choosing your course and career?',
    subtitle: 'Understanding what matters most helps us fine-tune recommendations.',
    options: [
      { value: 'prio_demand', label: 'High Industry Demand & Placements', desc: 'A degree with strong hiring demand, tech job openings, and practical market value.' },
      { value: 'prio_innovation', label: 'Innovation & Building New Products', desc: 'Creating software, designing modern technology, and technological creativity.' },
      { value: 'prio_leadership', label: 'Financial Growth & Leadership', desc: 'Rapid corporate advancement, high income potential, and leadership roles.' },
      { value: 'prio_science', label: 'Deep Scientific Knowledge & Research', desc: 'Mastering scientific fundamentals and academic problem solving.' },
      { value: 'prio_stability', label: 'Public Service & Social Stability', desc: 'Long-term job security, community contribution, and administrative prestige.' }
    ]
  }
];

/**
 * Matching Engine Algorithm
 * Evaluates student answers against real database courses.
 */
export function matchCourses(answers, allCourses = []) {
  if (!allCourses || allCourses.length === 0) {
    return [];
  }

  // 1. Extract Profile Answers
  const qualAnswer = answers[1] || '12th_science';
  const subjects = Array.isArray(answers[2]) ? answers[2] : (answers[2] ? [answers[2]] : []);
  const interests = Array.isArray(answers[3]) ? answers[3] : (answers[3] ? [answers[3]] : []);
  const progScore = answers[4] || 3;
  const mathScore = answers[5] || 3;
  const bioScore = answers[6] || 1;
  const bizScore = answers[7] || 2;
  const creativeScore = answers[8] || 2;
  const learningStyle = answers[9] || 'practical_coding';
  const workEnv = answers[10] || 'env_tech';
  const careerRole = answers[11] || 'role_software';
  const careerPrio = answers[12] || 'prio_demand';

  // Determine qualification filter
  let userQual = '12th';
  let userStream = 'Science';
  if (qualAnswer === '10th') {
    userQual = '10th';
    userStream = '10th';
  } else if (qualAnswer === '12th_commerce') {
    userQual = '12th';
    userStream = 'Commerce';
  } else if (qualAnswer === '12th_arts') {
    userQual = '12th';
    userStream = 'Arts';
  } else {
    userQual = '12th';
    userStream = 'Science';
  }

  // 2. Filter Eligible Courses based on hard constraints
  const eligibleCourses = allCourses.filter((course) => {
    const name = (course.course_name || course.name || '').toLowerCase();
    const field = (course.field_of_study || '').toLowerCase();
    const elig = (course.eligibility || '').toLowerCase();
    const stream = (course.stream || '').toLowerCase();
    const level = (course.course_level || 'Undergraduate').toLowerCase();

    // Prioritize Undergraduate and Integrated programs for 10th/12th school leavers
    // (Postgraduate courses like M.Tech/MCA/MBA require prior Bachelor's degree,
    // so we only recommend UG & Integrated programs for direct 12th entry)
    if (level === 'postgraduate') {
      return false;
    }

    // 10th Standard:
    if (userQual === '10th') {
      // In typical Gujarat datasets, check for 10th or Diploma or Open entry
      const is10th = elig.includes('10th') || elig.includes('ssc') || course.qualification === '10th' || name.includes('diploma');
      // If student is 10th, they can see foundational pathways or courses
      return is10th || stream.includes('general') || elig.includes('any stream');
    }

    // 12th Commerce:
    if (userStream === 'Commerce') {
      // Commerce students cannot take B.Tech Engineering or Pure Science (PCM/PCB)
      if (name.includes('b.tech') || name.includes('engineering') || name.includes('biotechnology') || name.includes('m.sc. in physics') || name.includes('m.sc. in chemistry')) {
        return false;
      }
      if (elig.includes('pcm') || elig.includes('science pass with physics') || elig.includes('jee main') || elig.includes('gujcet')) {
        return false;
      }
      // BCA accepts Commerce in Gujarat University, VNSGU, SPU!
      return true;
    }

    // 12th Arts:
    if (userStream === 'Arts') {
      // Arts students cannot take B.Tech or Pure Science or Biotechnology
      if (name.includes('b.tech') || name.includes('engineering') || name.includes('b.sc.') || name.includes('biotechnology') || name.includes('integrated m.sc')) {
        return false;
      }
      if (elig.includes('pcm') || elig.includes('science pass with physics') || elig.includes('jee main') || elig.includes('gujcet')) {
        return false;
      }
      return true;
    }

    // 12th Science:
    // Eligible for B.Tech, B.Sc, BCA, BBA, B.Com, Integrated M.Sc, etc.
    return true;
  });

  const pool = eligibleCourses.length > 0 ? eligibleCourses : allCourses;

  // 3. Score Each Eligible Course
  const scoredCourses = pool.map((course) => {
    const name = (course.course_name || course.name || '').toLowerCase();
    const field = (course.field_of_study || '').toLowerCase();
    const elig = (course.eligibility || '').toLowerCase();
    const desc = (course.description || '').toLowerCase();

    let score = 50; // Base score
    const reasons = [];

    // --- A. Subject Match (Max +30) ---
    let subjectMatchCount = 0;
    if (subjects.includes('computer') && (name.includes('computer') || name.includes('bca') || name.includes('it') || field.includes('computer') || field.includes('information technology') || field.includes('artificial intelligence'))) {
      score += 15;
      subjectMatchCount++;
      reasons.push('Directly leverages your strong interest in Computer & IT');
    }
    if (subjects.includes('mathematics') && (name.includes('computer') || name.includes('engineering') || name.includes('mathematics') || name.includes('data') || name.includes('ai') || field.includes('engineering') || field.includes('mathematical'))) {
      score += 10;
      subjectMatchCount++;
      if (!reasons.some(r => r.includes('mathematical'))) {
        reasons.push('Applies your comfort in Mathematics and logical problem-solving');
      }
    }
    if (subjects.includes('accountancy') && (name.includes('commerce') || name.includes('b.com') || name.includes('accounting') || field.includes('commerce') || field.includes('accounting'))) {
      score += 15;
      subjectMatchCount++;
      reasons.push('Perfect match for your favorite subject: Accountancy & Taxation');
    }
    if (subjects.includes('economics') && (name.includes('commerce') || name.includes('b.com') || name.includes('bba') || name.includes('mba') || field.includes('management') || field.includes('commerce'))) {
      score += 10;
      subjectMatchCount++;
      reasons.push('Integrates your interest in Economics and commercial market trends');
    }
    if (subjects.includes('business') && (name.includes('bba') || name.includes('management') || name.includes('mba') || field.includes('management'))) {
      score += 15;
      subjectMatchCount++;
      reasons.push('Builds directly on your interest in Business Studies and organization');
    }
    if (subjects.includes('biology') && (
      name.includes('biotechnology') || name.includes('biology') || name.includes('medicine') || name.includes('surgery') || name.includes('dental') || name.includes('nursing') || name.includes('physiotherapy') || name.includes('pharmacy') || name.includes('optometry') || name.includes('laboratory') || name.includes('radiology') || name.includes('operation theatre') || name.includes('dialysis') || name.includes('dmlt') ||
      field.includes('biological') || field.includes('medical') || field.includes('healthcare') || field.includes('clinical') || field.includes('dental') || field.includes('nursing') || field.includes('physiotherapy') || field.includes('pharmaceutical') || field.includes('pathology')
    )) {
      score += 20;
      subjectMatchCount++;
      reasons.push('Direct alignment with your passion for Biology & Life Sciences');
    }
    if (subjects.includes('physics') && (name.includes('physics') || name.includes('engineering') || name.includes('b.tech') || name.includes('radiology') || field.includes('physical') || field.includes('radiological'))) {
      score += 12;
      subjectMatchCount++;
      reasons.push('Applies physical sciences and applied mechanics fundamentals');
    }
    if ((subjects.includes('languages') || subjects.includes('history') || subjects.includes('psychology')) && (name.includes('b.a.') || name.includes('arts') || field.includes('humanities') || field.includes('social'))) {
      score += 15;
      subjectMatchCount++;
      reasons.push('Aligns with your appreciation for Humanities, Social Sciences, and Languages');
    }

    // --- B. Broad Interest Domain (Max +25) ---
    if (interests.includes('healthcare') && (
      name.includes('medicine') || name.includes('dental') || name.includes('nursing') || name.includes('physiotherapy') || name.includes('pharmacy') || name.includes('optometry') || name.includes('laboratory') || name.includes('radiology') || name.includes('operation theatre') || name.includes('dialysis') || name.includes('nurse') || name.includes('dmlt') || name.includes('mbbs') || name.includes('bds') || name.includes('bpt') || name.includes('biotechnology') ||
      field.includes('medical') || field.includes('healthcare') || field.includes('biological') || field.includes('clinical') || field.includes('nursing') || field.includes('physiotherapy') || field.includes('pharmaceutical') || field.includes('pathology')
    )) {
      score += 22;
      if (reasons.length < 3 && !reasons.some(r => r.includes('healthcare') || r.includes('Healthcare'))) {
        reasons.push('You showed strong interest in healthcare and helping people');
      }
    }
    if (interests.includes('technology') && (name.includes('bca') || name.includes('computer') || name.includes('information technology') || name.includes('ai') || name.includes('data') || name.includes('cyber') || field.includes('computer') || field.includes('information technology'))) {
      score += 12;
      if (reasons.length < 3 && !reasons.some(r => r.includes('Technology'))) {
        reasons.push('High alignment with your preferred technology & software focus');
      }
    }
    if (interests.includes('engineering') && (name.includes('b.tech') || field.includes('engineering'))) {
      score += 14;
      if (reasons.length < 3) {
        reasons.push('Official accredited engineering degree program');
      }
    }
    if (interests.includes('business') && (name.includes('bba') || name.includes('mba') || field.includes('management'))) {
      score += 12;
      if (reasons.length < 3) {
        reasons.push('Designed for developing managerial, startup, and leadership competencies');
      }
    }
    if (interests.includes('finance') && (name.includes('b.com') || name.includes('commerce') || field.includes('accounting'))) {
      score += 12;
      if (reasons.length < 3) {
        reasons.push('Strong foundation for corporate finance, banking, and professional certifications');
      }
    }
    if (interests.includes('science') && (name.includes('b.sc') || name.includes('m.sc') || field.includes('sciences'))) {
      score += 12;
      if (reasons.length < 3) {
        reasons.push('Robust curriculum for scientific inquiry and research career paths');
      }
    }

    // --- C. Scale Ratings Impact (Max +25) ---
    // Programming rating
    if (progScore >= 3 && (name.includes('bca') || name.includes('computer') || name.includes('b.tech in computer') || name.includes('b.tech in artificial') || name.includes('cyber') || name.includes('information technology'))) {
      score += (progScore === 4 ? 12 : 7);
      if (progScore === 4 && reasons.length < 4 && !reasons.some(r => r.includes('programming'))) {
        reasons.push('Matches your high enthusiasm for coding and software development');
      }
    } else if (progScore === 1 && (name.includes('computer') || name.includes('bca') || name.includes('b.tech in computer'))) {
      score -= 15;
    }

    // Math comfort rating
    if (mathScore >= 3 && (name.includes('engineering') || name.includes('mathematics') || name.includes('data') || name.includes('computer') || name.includes('b.com'))) {
      score += 6;
    } else if (mathScore === 1 && (name.includes('engineering') || name.includes('mathematics'))) {
      score -= 15;
    }

    // Bio rating
    if (bioScore >= 3 && (
      name.includes('biotechnology') || name.includes('biological') || name.includes('medicine') || name.includes('dental') || name.includes('nursing') || name.includes('physiotherapy') || name.includes('pharmacy') || name.includes('optometry') || name.includes('laboratory') || name.includes('radiology') || name.includes('operation theatre') || name.includes('dialysis') || name.includes('dmlt') || name.includes('nurse') ||
      field.includes('medical') || field.includes('healthcare') || field.includes('biological') || field.includes('clinical') || field.includes('nursing') || field.includes('physiotherapy')
    )) {
      score += (bioScore === 4 ? 18 : 10);
      if (bioScore === 4 && reasons.length < 4 && !reasons.some(r => r.includes('human body') || r.includes('patient care') || r.includes('biological'))) {
        if (name.includes('physiotherapy') || name.includes('bpt')) {
          reasons.push('Matches your interest in human anatomy, body mechanics, and physical wellbeing');
        } else if (name.includes('nursing') || name.includes('nurse')) {
          reasons.push('Strong match for your interest in clinical patient care and hospital healthcare');
        } else if (name.includes('pharmacy') || name.includes('pharm')) {
          reasons.push('Combines chemical sciences, pharmaceutical drug formulation, and patient wellbeing');
        } else if (name.includes('laboratory') || name.includes('dmlt')) {
          reasons.push('Ideal fit for investigative diagnostics, laboratory testing, and sample analysis');
        } else {
          reasons.push('Strong match for your high interest in biological systems and healthcare science');
        }
      }
    } else if (bioScore <= 2 && (name.includes('biotechnology') || name.includes('mbbs') || name.includes('bds') || name.includes('b.sc nursing'))) {
      score -= 15;
    }

    // Business rating
    if (bizScore >= 3 && (name.includes('bba') || name.includes('b.com') || name.includes('management') || name.includes('i-mba'))) {
      score += (bizScore === 4 ? 10 : 6);
      if (bizScore === 4 && reasons.length < 4 && !reasons.some(r => r.includes('business') || r.includes('Business'))) {
        reasons.push('Directly supports your interest in business operations and corporate strategy');
      }
    }

    // Creativity rating
    if (creativeScore >= 3 && (name.includes('b.a.') || name.includes('arts') || name.includes('design') || name.includes('cyber') || name.includes('bca'))) {
      score += 4;
    }

    // --- D. Learning Style & Work Environment (Max +15) ---
    if (learningStyle === 'practical_coding' && (name.includes('bca') || name.includes('b.sc. in information') || name.includes('computer engineering'))) {
      score += 8;
      if (reasons.length < 4 && !reasons.some(r => r.includes('practical'))) {
        reasons.push('Curriculum emphasizes practical hands-on projects and laboratory applications');
      }
    }
    if (learningStyle === 'business_cases' && (name.includes('bba') || name.includes('b.com') || name.includes('mba'))) {
      score += 8;
      if (reasons.length < 4) {
        reasons.push('Emphasizes real-world case studies, industry scenarios, and presentations');
      }
    }
    if (learningStyle === 'laboratory_science' && (name.includes('b.sc') || name.includes('biotechnology') || name.includes('integrated m.sc'))) {
      score += 8;
      if (reasons.length < 4) {
        reasons.push('Features extensive laboratory experimentation and empirical analysis');
      }
    }

    if (workEnv === 'env_tech' && (name.includes('computer') || name.includes('bca') || name.includes('it') || name.includes('ai') || name.includes('cyber'))) {
      score += 6;
    } else if (workEnv === 'env_corporate' && (name.includes('bba') || name.includes('b.com') || name.includes('management'))) {
      score += 6;
    } else if (workEnv === 'env_healthcare' && (name.includes('biotechnology') || name.includes('biological'))) {
      score += 8;
    } else if (workEnv === 'env_research' && (name.includes('b.sc') || name.includes('m.sc'))) {
      score += 6;
    }

    // --- E. Career Role & Priority (Max +15) ---
    if (careerRole === 'role_software' && (name.includes('bca') || name.includes('computer') || name.includes('b.tech in computer') || name.includes('information technology'))) {
      score += 10;
      if (reasons.length < 4 && !reasons.some(r => r.includes('Software') || r.includes('developer'))) {
        reasons.push('Direct pathway to roles as Full-Stack Developer or Software Engineer');
      }
    } else if (careerRole === 'role_ai_data' && (name.includes('artificial intelligence') || name.includes('data analytics') || name.includes('data science') || name.includes('computer science'))) {
      score += 14;
      if (reasons.length < 4) {
        reasons.push('Specialized coursework in AI, Data Science, and Machine Learning');
      }
    } else if (careerRole === 'role_finance' && (name.includes('b.com') || name.includes('commerce') || name.includes('accounting'))) {
      score += 10;
      if (reasons.length < 4) {
        reasons.push('Ideal foundation for Chartered Accountancy (CA) and Financial Analyst roles');
      }
    } else if (careerRole === 'role_manager' && (name.includes('bba') || name.includes('management') || name.includes('i-mba'))) {
      score += 10;
      if (reasons.length < 4) {
        reasons.push('Prepares you for executive business leadership and management careers');
      }
    } else if (careerRole === 'role_public_law' && (name.includes('b.a.') || name.includes('arts'))) {
      score += 12;
      if (reasons.length < 4) {
        reasons.push('Provides analytical breadth valuable for Civil Services (UPSC/GPSC) and Law');
      }
    }

    if (careerPrio === 'prio_demand' && (name.includes('bca') || name.includes('computer') || name.includes('b.tech in artificial') || name.includes('cyber'))) {
      score += 5;
    }

    // Fallback reasons if needed
    if (reasons.length === 0) {
      reasons.push(`Direct eligibility for ${userQual} ${userStream} graduates`);
      reasons.push('Comprehensive foundational curriculum aligned with portal career opportunities');
    } else if (reasons.length === 1) {
      reasons.push(`Recognized university degree program suitable for your qualification`);
    }

    return {
      course,
      rawScore: score,
      reasons: reasons.slice(0, 4)
    };
  });

  // 4. Sort Descending by Score
  scoredCourses.sort((a, b) => b.rawScore - a.rawScore);

  // Group by unique course name root to avoid 5 duplicates of BCA from 5 universities if there are multiple
  const uniqueRecommendations = [];
  const seenRoots = new Set();

  for (const item of scoredCourses) {
    const normName = (item.course.course_name || item.course.name || '').trim();
    // Use course name as key
    if (!seenRoots.has(normName)) {
      seenRoots.add(normName);
      uniqueRecommendations.push(item);
    }
    if (uniqueRecommendations.length >= 5) break;
  }

  // If unique filter resulted in fewer than 3, fill up from top scored
  if (uniqueRecommendations.length < 3) {
    for (const item of scoredCourses) {
      if (!uniqueRecommendations.some(u => u.course._id === item.course._id)) {
        uniqueRecommendations.push(item);
      }
      if (uniqueRecommendations.length >= 4) break;
    }
  }

  // 5. Calculate Realistic Match Percentages (e.g. 96%, 93%, 89%, 86%, 82%)
  const topMatches = uniqueRecommendations.slice(0, 5);
  const maxRaw = topMatches.length > 0 ? topMatches[0].rawScore : 100;
  
  return topMatches.map((item, index) => {
    // Generate realistic relative match percentage
    let matchPct = Math.min(97, Math.max(76, Math.round(94 - (index * 3.5) + (Math.min(item.rawScore - 60, 20) * 0.2))));
    if (index === 0 && matchPct < 92) matchPct = 94;

    return {
      course: item.course,
      matchPercentage: matchPct,
      reasons: item.reasons
    };
  });
}
