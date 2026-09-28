const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Course = require('../models/Course');
const Pathway = require('../models/Pathway');
const Qualification = require('../models/Qualification');
const Stream = require('../models/Stream');

const medicalCourses = [
  // ==========================================
  // 1. MEDICAL UNDERGRADUATE COURSES (After 12th)
  // ==========================================
  {
    course_id: "MED-UG-MBBS",
    name: "Bachelor of Medicine, Bachelor of Surgery",
    course_name: "Bachelor of Medicine, Bachelor of Surgery",
    shortName: "MBBS",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Medical Science & Clinical Medicine",
    qualification: "12th",
    stream: "Science",
    duration: "5.5 Years (including 1-Year Compulsory Rotatory Internship)",
    description: "Primary professional medical undergraduate degree qualifying holders as registered medical practitioners / physicians. Covers pre-clinical, para-clinical, and clinical medical training.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology/Biotechnology and English. Admission is through NEET-UG national entrance examination.",
    programmeType: "degree",
    entranceExam: "NEET-UG",
    verification_status: "VERIFIED",
    careerOptions: ["General Physician", "Medical Officer", "Clinical Researcher", "Healthcare Administrator", "Residency / Post-Graduate Trainee"],
    subjects: ["Human Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "Microbiology", "Forensic Medicine", "Community Medicine", "General Medicine", "General Surgery", "Obstetrics & Gynaecology", "Paediatrics"],
    interestTags: ["healthcare", "biology", "patient_care", "clinical_medicine", "human_body"],
    subjectTags: ["biology", "chemistry", "physics"],
    skillTags: ["clinical_diagnosis", "patient_care", "medical_ethics", "emergency_care"],
    workStyleTags: ["hospital", "clinic", "investigative", "high_responsibility"]
  },
  {
    course_id: "MED-UG-BDS",
    name: "Bachelor of Dental Surgery",
    course_name: "Bachelor of Dental Surgery",
    shortName: "BDS",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Dental Science & Oral Healthcare",
    qualification: "12th",
    stream: "Science",
    duration: "5 Years (4 Years Academic + 1-Year Paid Rotatory Internship)",
    description: "Professional undergraduate programme training dental surgeons in diagnosis, prevention, and treatment of oral diseases, dental surgery, and oral health rehabilitation.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology and English. Admission is through NEET-UG examination.",
    programmeType: "degree",
    entranceExam: "NEET-UG",
    verification_status: "VERIFIED",
    careerOptions: ["Dental Surgeon", "Oral Health Specialist", "Public Health Dentist", "Dental Consultant", "MDS Dental Researcher"],
    subjects: ["Dental Anatomy & Histology", "General Pathology", "General Pharmacology", "Oral Pathology & Microbiology", "Prosthodontics", "Oral & Maxillofacial Surgery", "Orthodontics", "Periodontology", "Conservative Dentistry"],
    interestTags: ["healthcare", "dentistry", "biology", "oral_care", "patient_care"],
    subjectTags: ["biology", "chemistry"],
    skillTags: ["dental_surgery", "precision_dexterity", "patient_care", "radiology"],
    workStyleTags: ["dental_clinic", "hospital", "patient_interaction"]
  },
  {
    course_id: "MED-UG-BHMS",
    name: "Bachelor of Homoeopathic Medicine and Surgery",
    course_name: "Bachelor of Homoeopathic Medicine and Surgery",
    shortName: "BHMS",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Homoeopathic Medicine & Holistic Care",
    qualification: "12th",
    stream: "Science",
    duration: "5.5 Years (4.5 Years Academic + 1-Year Internship)",
    description: "Undergraduate medical degree in Homoeopathic medical systems covering traditional homoeopathic philosophy alongside modern anatomical, physiological, and clinical diagnostics.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology and English. Admission is through NEET-UG / State AYUSH quota.",
    programmeType: "degree",
    entranceExam: "NEET-UG (AYUSH)",
    verification_status: "VERIFIED",
    careerOptions: ["Homoeopathic Physician", "AYUSH Medical Officer", "Clinical Consultant", "Wellness Advisor", "Homoeopathy Researcher"],
    subjects: ["Organon of Medicine", "Homoeopathic Pharmacy", "Materia Medica", "Anatomy", "Physiology", "Pathology", "Surgery & Homoeopathic Therapeutics", "Repertory"],
    interestTags: ["healthcare", "ayush", "homoeopathy", "holistic_healing", "biology"],
    subjectTags: ["biology", "chemistry"],
    skillTags: ["case_taking", "homoeopathic_prescribing", "clinical_diagnosis", "holistic_care"],
    workStyleTags: ["clinic", "ayush_hospital", "consultation"]
  },
  {
    course_id: "MED-UG-BUMS",
    name: "Bachelor of Unani Medicine and Surgery",
    course_name: "Bachelor of Unani Medicine and Surgery",
    shortName: "BUMS",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Unani Medicine & Traditional Healthcare",
    qualification: "12th",
    stream: "Science",
    duration: "5.5 Years (including 1-Year Internship)",
    description: "Undergraduate professional programme in Unani healthcare systems encompassing natural therapeutics, holistic disease prevention, regimental therapies, and modern clinical science.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology and proficiency in Urdu/Arabic/Persian as per council guidelines. Admission via NEET-UG (AYUSH).",
    programmeType: "degree",
    entranceExam: "NEET-UG (AYUSH)",
    verification_status: "VERIFIED",
    careerOptions: ["Unani Physician", "Hakim / Traditional Consultant", "AYUSH Health Officer", "Pharma Formulation Specialist"],
    subjects: ["Kulliyat (Basic Principles)", "Tashreeh-ul-Badan (Anatomy)", "Munafe-ul-Aza (Physiology)", "Ilmul Saidla (Pharmacy)", "Tibbe Qanooni (Forensic)", "Ilaj-bit-Tadbeer (Regimental Therapy)"],
    interestTags: ["healthcare", "unani", "ayush", "traditional_medicine"],
    subjectTags: ["biology", "chemistry"],
    skillTags: ["unani_diagnostics", "regimental_therapy", "clinical_care"],
    workStyleTags: ["clinic", "ayush_center"]
  },
  {
    course_id: "MED-UG-BNYS",
    name: "Bachelor of Naturopathy and Yogic Sciences",
    course_name: "Bachelor of Naturopathy and Yogic Sciences",
    shortName: "BNYS",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Naturopathy & Yogic Healthcare",
    qualification: "12th",
    stream: "Science",
    duration: "5.5 Years (4.5 Years Academic + 1-Year Internship)",
    description: "Integrative undergraduate clinical degree focusing on drugless healing, nutritional medicine, acupuncture, hydrotherapy, lifestyle interventions, and therapeutic yoga.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology. Admission based on state merit / entrance criteria.",
    programmeType: "degree",
    entranceExam: "State Merit / NEET where applicable",
    verification_status: "VERIFIED",
    careerOptions: ["Naturopathy Physician", "Yoga Therapist", "Lifestyle & Wellness Consultant", "Rehabilitation Specialist", "Spa & Health Resort Director"],
    subjects: ["Anatomy & Physiology", "Philosophy of Naturopathy", "Yoga Therapy & Asanas", "Hydrotherapy & Mud Therapy", "Nutrition & Dietetics", "Acupuncture & Acupressure", "Diagnostic Methods"],
    interestTags: ["healthcare", "yoga", "naturopathy", "wellness", "lifestyle_medicine"],
    subjectTags: ["biology"],
    skillTags: ["naturopathic_counseling", "yoga_therapy", "dietetics", "preventive_medicine"],
    workStyleTags: ["wellness_center", "integrative_hospital", "rehab_clinic"]
  },
  {
    course_id: "MED-UG-BVSC",
    name: "Bachelor of Veterinary Science & Animal Husbandry",
    course_name: "Bachelor of Veterinary Science & Animal Husbandry",
    shortName: "BVSc & AH",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Veterinary Medicine & Animal Health",
    qualification: "12th",
    stream: "Science",
    duration: "5.5 Years (including 1-Year Rotatory Internship)",
    description: "Professional degree governing animal healthcare, livestock management, animal surgery, veterinary pathology, zoonotic disease prevention, and veterinary public health.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology and English with minimum qualifying marks. Admission through NEET-UG / VCI / State Veterinary entrance.",
    programmeType: "degree",
    entranceExam: "NEET-UG / State Veterinary Admission",
    verification_status: "VERIFIED",
    careerOptions: ["Veterinary Doctor / Surgeon", "Animal Husbandry Officer", "Zoo / Wildlife Veterinarian", "Livestock Farm Consultant", "Veterinary Pharmacologist"],
    subjects: ["Veterinary Anatomy", "Veterinary Physiology & Biochemistry", "Livestock Production Management", "Veterinary Microbiology", "Veterinary Pathology", "Veterinary Pharmacology & Toxicology", "Veterinary Surgery & Radiology", "Veterinary Gynaecology & Obstetrics"],
    interestTags: ["healthcare", "veterinary", "animal_care", "biology", "zoology"],
    subjectTags: ["biology", "chemistry"],
    skillTags: ["animal_surgery", "veterinary_diagnostics", "disease_prevention", "animal_handling"],
    workStyleTags: ["veterinary_hospital", "wildlife_park", "farms", "laboratory"]
  },
  {
    course_id: "MED-UG-BSCNURSING",
    name: "Bachelor of Science in Nursing",
    course_name: "Bachelor of Science in Nursing",
    shortName: "B.Sc Nursing",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Nursing Sciences & Patient Care",
    qualification: "12th",
    stream: "Science",
    duration: "4 Years (8 Semesters with Clinical Postings)",
    description: "Comprehensive professional healthcare degree preparing certified graduate nurses for clinical bedside care, critical care management, community health nursing, and medical administration.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology and English with minimum 45% aggregate (40% for reserved categories). Admission through State Nursing Counseling / NEET where applicable.",
    programmeType: "degree",
    entranceExam: "State Nursing Entrance / Merit / NEET",
    verification_status: "VERIFIED",
    careerOptions: ["Registered Staff Nurse", "Critical Care / ICU Nurse", "Community Health Officer (CHO)", "Nursing Educator / Tutor", "Hospital Clinical Coordinator", "International Healthcare Nurse"],
    subjects: ["Applied Anatomy & Physiology", "Applied Microbiology", "Nursing Foundations", "Pharmacology", "Medical Surgical Nursing", "Community Health Nursing", "Child Health / Paediatric Nursing", "Mental Health Nursing", "Midwifery & Obstetrical Nursing", "Nursing Research & Statistics"],
    interestTags: ["healthcare", "nursing", "patient_care", "biology", "hospital_care"],
    subjectTags: ["biology", "chemistry"],
    skillTags: ["patient_care", "vital_monitoring", "medication_administration", "wound_care", "empathy"],
    workStyleTags: ["hospital", "intensive_care", "community_center", "clinic"]
  },
  {
    course_id: "MED-UG-BPT",
    name: "Bachelor of Physiotherapy",
    course_name: "Bachelor of Physiotherapy",
    shortName: "BPT",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Physiotherapy & Physical Rehabilitation",
    qualification: "12th",
    stream: "Science",
    duration: "4.5 Years (4 Years Academic + 6 Months Internship)",
    description: "Professional medical and rehabilitation degree qualifying therapists to treat musculoskeletal, neurological, cardiothoracic, and sports movement disorders using physical therapies and exercises.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology and English. Admission conducted through state medical/paramedical admission committees.",
    programmeType: "degree",
    entranceExam: "State Paramedical Admission Committee Merit / Entrance",
    verification_status: "VERIFIED",
    careerOptions: ["Physiotherapist", "Sports Rehabilitation Specialist", "Orthopaedic Physical Therapist", "Neurological Rehabilitation Therapist", "Ergonomics Consultant", "Cardiopulmonary Rehab Specialist"],
    subjects: ["Human Anatomy", "Human Physiology", "Biochemistry", "Biomechanics & Kinesiology", "Exercise Therapy", "Electrotherapy", "Orthopaedics & Traumatology", "General Medicine & Surgery", "Physiotherapy in Orthopaedic & Sports Conditions", "Physiotherapy in Neurological Conditions", "Community Rehabilitation"],
    interestTags: ["healthcare", "physiotherapy", "sports_rehabilitation", "human_body", "anatomy"],
    subjectTags: ["biology", "physics"],
    skillTags: ["manual_therapy", "exercise_prescription", "mobility_assessment", "pain_management", "biomechanics"],
    workStyleTags: ["rehabilitation_center", "sports_clinic", "hospital", "private_practice"]
  },
  {
    course_id: "MED-UG-BPHARM",
    name: "Bachelor of Pharmacy",
    course_name: "Bachelor of Pharmacy",
    shortName: "B.Pharm",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Pharmaceutical Sciences & Drug Formulation",
    qualification: "12th",
    stream: "Science",
    duration: "4 Years (8 Semesters)",
    description: "Core professional pharmaceutical degree approved by the Pharmacy Council of India (PCI). Focuses on drug discovery, synthesis, formulation, dosage design, pharmacology, and drug quality control.",
    eligibility: "12th Standard Science with Physics and Chemistry along with Mathematics or Biology (PCM/PCB). Admission in Gujarat through ACPC with GUJCET.",
    programmeType: "degree",
    entranceExam: "GUJCET / State Pharmacy Entrance",
    verification_status: "VERIFIED",
    careerOptions: ["Registered Pharmacist", "Pharmaceutical Formulation Scientist", "Quality Assurance / Quality Control Analyst", "Regulatory Affairs Specialist", "Clinical Research Associate", "Medical Marketing Representative"],
    subjects: ["Human Anatomy & Physiology", "Pharmaceutical Analysis", "Pharmaceutics", "Pharmaceutical Inorganic Chemistry", "Pharmaceutical Organic Chemistry", "Medicinal Chemistry", "Pharmacology", "Pharmacognosy & Phytochemistry", "Biopharmaceutics & Pharmacokinetics", "Pharmaceutical Biotechnology", "Industrial Pharmacy"],
    interestTags: ["healthcare", "pharmacy", "chemistry", "medicine_formulation", "biology"],
    subjectTags: ["chemistry", "biology", "mathematics"],
    skillTags: ["drug_formulation", "chemical_analysis", "spectroscopy", "quality_control", "pharmacovigilance"],
    workStyleTags: ["pharmaceutical_industry", "research_lab", "hospital_pharmacy", "corporate"]
  },
  {
    course_id: "MED-UG-BOPTOM",
    name: "Bachelor of Optometry",
    course_name: "Bachelor of Optometry",
    shortName: "Bachelor of Optometry",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Ophthalmic Science & Vision Care",
    qualification: "12th",
    stream: "Science",
    duration: "4 Years (3 Years Academic + 1-Year Clinical Internship)",
    description: "Specialized eye and vision care degree training optometrists in diagnosing refractive errors, prescribing optical corrections, contact lens fitting, binocular vision therapy, and screening ocular pathology.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology/Mathematics and English. Admission based on state paramedical admission.",
    programmeType: "degree",
    entranceExam: "State Paramedical Merit / Institute Entrance",
    verification_status: "VERIFIED",
    careerOptions: ["Optometrist", "Vision Care Specialist", "Contact Lens Consultant", "Refractive Surgery Coordinator", "Low Vision Specialist", "Optical Center Manager"],
    subjects: ["Geometrical & Physical Optics", "Anatomy of Eye & Physiology", "Ocular Biochemistry & Microbiology", "Visual Optics", "Optometric Optics", "Ocular Diseases", "Clinical Examination of Visual System", "Contact Lenses", "Binocular Vision & Orthoptics", "Low Vision Aids"],
    interestTags: ["healthcare", "optometry", "vision_care", "ophthalmology", "physics"],
    subjectTags: ["physics", "biology"],
    skillTags: ["refraction", "slit_lamp_examination", "contact_lens_fitting", "visual_acuity_testing"],
    workStyleTags: ["eye_hospital", "vision_clinic", "optical_chains"]
  },
  {
    course_id: "MED-UG-BSCMLT",
    name: "Bachelor of Science in Medical Laboratory Technology",
    course_name: "Bachelor of Science in Medical Laboratory Technology",
    shortName: "B.Sc MLT",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Clinical Pathology & Diagnostic Laboratory Science",
    qualification: "12th",
    stream: "Science",
    duration: "3 to 4 Years (including Practical Clinical Postings)",
    description: "Allied health science degree educating medical laboratory technologists in clinical biochemistry, diagnostic haematology, medical microbiology, histopathology, molecular testing, and laboratory quality control.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology (PCB). Admission through state paramedical committees or direct university merit.",
    programmeType: "degree",
    entranceExam: "State Paramedical Merit / University Entrance",
    verification_status: "VERIFIED",
    careerOptions: ["Medical Lab Technologist (MLT)", "Clinical Pathology Technician", "Blood Bank Specialist", "Molecular Diagnostics Analyst", "Lab Quality Control Supervisor", "Research Lab Assistant"],
    subjects: ["Human Anatomy & Physiology", "Clinical Biochemistry", "Haematology & Blood Banking", "Medical Microbiology & Serology", "Histopathology & Cytopathology", "Immunology & Molecular Biology", "Diagnostic Lab Equipment & Automation", "Laboratory Management & Quality Assurance"],
    interestTags: ["healthcare", "medical_lab", "pathology", "diagnostics", "biology", "chemistry"],
    subjectTags: ["biology", "chemistry"],
    skillTags: ["blood_testing", "microscopy", "biochemical_assays", "cell_analysis", "lab_automation"],
    workStyleTags: ["diagnostic_laboratory", "hospital_lab", "blood_bank", "research_center"]
  },
  {
    course_id: "MED-UG-BSCRIT",
    name: "Bachelor of Science in Radiology & Medical Imaging Technology",
    course_name: "Bachelor of Science in Radiology & Medical Imaging Technology",
    shortName: "B.Sc Radiology & Medical Imaging Technology",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Radiological Physics & Medical Imaging",
    qualification: "12th",
    stream: "Science",
    duration: "3 to 4 Years (including Clinical Radiology Internship)",
    description: "Professional imaging technology degree providing training in X-Ray radiography, Computed Tomography (CT), Magnetic Resonance Imaging (MRI), Ultrasonography (USG), and Nuclear Medicine radiation safety.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology/Mathematics. Admission through state paramedical merit.",
    programmeType: "degree",
    entranceExam: "State Paramedical Merit",
    verification_status: "VERIFIED",
    careerOptions: ["Radiologic Technologist (Radiographer)", "CT Scan Specialist", "MRI Technologist", "Ultrasound Assistant", "Radiation Safety Officer Assistant", "Medical Imaging Consultant"],
    subjects: ["Human Anatomy & Radiographic Anatomy", "Radiation Physics & Safety", "Conventional Radiography & Positioning", "Special Radiographic Procedures & Contrast Media", "Computed Tomography (CT) Principles & Protocols", "Magnetic Resonance Imaging (MRI) Techniques", "Ultrasound & Doppler Imaging", "Nuclear Medicine Basics", "PACS & Digital Imaging Quality Control"],
    interestTags: ["healthcare", "radiology", "imaging", "physics", "diagnostics"],
    subjectTags: ["physics", "biology"],
    skillTags: ["radiography", "ct_scan_operation", "mri_operation", "radiation_protection", "image_processing"],
    workStyleTags: ["hospital_radiology", "imaging_center", "diagnostic_clinic"]
  },
  {
    course_id: "MED-UG-BSCOTT",
    name: "Bachelor of Science in Operation Theatre Technology",
    course_name: "Bachelor of Science in Operation Theatre Technology",
    shortName: "B.Sc Operation Theatre Technology (OTT)",
    course_level: "Undergraduate",
    level: "undergraduate",
    category: "Medical & Healthcare",
    field_of_study: "Surgical Technology & Anaesthesia Support",
    qualification: "12th",
    stream: "Science",
    duration: "3 to 4 Years (including Clinical Surgical Postings)",
    description: "Degree programme training specialized operation theatre technologists in managing surgical suites, sterilisation protocols, surgical instrumentation, anaesthesia machine monitoring, and intraoperative patient support.",
    eligibility: "12th Standard Science with Physics, Chemistry, Biology (PCB). Admission based on state paramedical admissions or university merit.",
    programmeType: "degree",
    entranceExam: "State Paramedical Merit",
    verification_status: "VERIFIED",
    careerOptions: ["Operation Theatre Technologist (OTT)", "Anaesthesia Technologist", "Surgical Suite Coordinator", "Central Sterile Services (CSSD) Officer", "Critical Care Support Specialist"],
    subjects: ["Applied Anatomy & Surgical Pathology", "Physiology & Pharmacology for Anaesthesia", "Principles of Asepsis & Sterilization (CSSD)", "Surgical Equipment & Instrumentation", "Anaesthesia Equipment & Monitoring", "Surgical Procedures & Assisting Techniques", "Emergency & Critical Care in OT", "Patient Safety & Infection Control in Surgery"],
    interestTags: ["healthcare", "surgery", "operation_theatre", "anaesthesia", "patient_care"],
    subjectTags: ["biology"],
    skillTags: ["surgical_instrumentation", "sterile_technique", "anaesthesia_machine_setup", "intraoperative_monitoring"],
    workStyleTags: ["hospital_operation_theatre", "emergency_suite", "surgical_center"]
  },

  // ==========================================
  // 2. MEDICAL POSTGRADUATE PROGRAMMES (After Medical UG)
  // ==========================================
  {
    course_id: "MED-PG-MD",
    name: "Doctor of Medicine",
    course_name: "Doctor of Medicine",
    shortName: "MD",
    course_level: "Postgraduate",
    level: "postgraduate",
    category: "Medical & Healthcare",
    field_of_study: "Postgraduate Clinical Medicine Specialization",
    qualification: "12th",
    stream: "Science",
    duration: "3 Years Post-MBBS",
    description: "Advanced postgraduate medical master's degree pursued after MBBS. Provides deep specialization in non-surgical medical fields such as General Medicine, Paediatrics, Pathology, Radiodiagnosis, Anaesthesiology, and Dermatology.",
    eligibility: "MBBS degree recognized by the National Medical Commission (NMC) with completed 1-year rotatory internship. Admission via NEET-PG / INI-CET national entrance examination.",
    programmeType: "degree",
    entranceExam: "NEET-PG / INI-CET",
    verification_status: "VERIFIED",
    careerOptions: ["Consultant Specialist Physician", "Assistant Professor / Medical Faculty", "Super-Specialty DM Fellow", "Clinical Research Director"],
    subjects: ["Advanced Clinical Pathology", "Specialized Diagnostic Protocols", "Pharmacotherapeutics", "Evidence-Based Clinical Practice", "Medical Research Methodology & Thesis"],
    interestTags: ["healthcare", "clinical_medicine", "specialization", "higher_education"],
    subjectTags: ["biology"],
    skillTags: ["advanced_diagnosis", "specialized_treatment", "medical_research"],
    workStyleTags: ["specialty_hospital", "medical_college", "advanced_clinic"]
  },
  {
    course_id: "MED-PG-MS",
    name: "Master of Surgery",
    course_name: "Master of Surgery",
    shortName: "MS",
    course_level: "Postgraduate",
    level: "postgraduate",
    category: "Medical & Healthcare",
    field_of_study: "Postgraduate Surgical Specialization",
    qualification: "12th",
    stream: "Science",
    duration: "3 Years Post-MBBS",
    description: "Postgraduate surgical specialization degree completed after MBBS. Trains surgeons in specialized operative interventions across General Surgery, Orthopaedics, Ophthalmology, ENT (Otorhinolaryngology), and Obstetrics & Gynaecology.",
    eligibility: "MBBS degree from an NMC-recognized institution and completed rotatory internship. Admission through NEET-PG / INI-CET examination.",
    programmeType: "degree",
    entranceExam: "NEET-PG / INI-CET",
    verification_status: "VERIFIED",
    careerOptions: ["Consultant Surgeon", "Surgical Specialist", "Medical College Faculty", "Super-Specialty M.Ch Fellow"],
    subjects: ["Surgical Anatomy & Operative Surgery", "Pre- and Post-operative Management", "Trauma & Emergency Surgery", "Minimally Invasive / Laparoscopic Surgery", "Surgical Research & Dissertation"],
    interestTags: ["healthcare", "surgery", "specialization", "higher_education"],
    subjectTags: ["biology"],
    skillTags: ["surgical_procedures", "operative_precision", "critical_decision_making"],
    workStyleTags: ["surgical_theatre", "tertiary_hospital", "medical_college"]
  },
  {
    course_id: "MED-PG-MDS",
    name: "Master of Dental Surgery",
    course_name: "Master of Dental Surgery",
    shortName: "MDS",
    course_level: "Postgraduate",
    level: "postgraduate",
    category: "Medical & Healthcare",
    field_of_study: "Postgraduate Dental Specialization",
    qualification: "12th",
    stream: "Science",
    duration: "3 Years Post-BDS",
    description: "Postgraduate master's degree in specialized dentistry disciplines including Orthodontics, Oral & Maxillofacial Surgery, Prosthodontics, Periodontics, and Conservative Dentistry & Endodontics.",
    eligibility: "BDS degree recognized by the Dental Council of India (DCI) and completed 1-year internship. Admission via NEET-MDS.",
    programmeType: "degree",
    entranceExam: "NEET-MDS",
    verification_status: "VERIFIED",
    careerOptions: ["Consultant Orthodontist / Endodontist / Oral Surgeon", "Dental College Professor", "Advanced Dental Clinic Director"],
    subjects: ["Applied Basic Dental Sciences", "Specialty Dental Diagnostics & Therapeutics", "Advanced Dental Materials & Technology", "Clinical Case Presentations & Thesis"],
    interestTags: ["healthcare", "dentistry", "specialization", "higher_education"],
    subjectTags: ["biology"],
    skillTags: ["advanced_dental_surgery", "orthodontic_alignment", "endodontics"],
    workStyleTags: ["specialty_dental_center", "dental_college", "hospital"]
  },

  // ==========================================
  // 3. HEALTHCARE DIPLOMA & CERTIFICATES AFTER 10TH
  // ==========================================
  {
    course_id: "MED-DIP-DMLT",
    name: "Diploma in Medical Laboratory Technology",
    course_name: "Diploma in Medical Laboratory Technology",
    shortName: "DMLT",
    course_level: "Diploma",
    level: "after10",
    category: "Medical & Healthcare",
    field_of_study: "Diagnostic Laboratory Assistance",
    qualification: "10th",
    stream: "General",
    duration: "Typical duration: 1–2 years",
    description: "Practical technical training related to biological samples, diagnostic testing, routine specimen processing, haematology counters, urine analysis, and laboratory equipment handling.",
    eligibility: "Eligibility varies by programme and institution. Typically Class 10 (SSC) pass from a recognized board. Admission may be based on institute/state rules, merit or direct application. Check the specific institute for current requirements.",
    programmeType: "diploma",
    entranceExam: "State / Institute Merit or Direct Application (No NEET required)",
    verification_status: "VERIFIED",
    careerOptions: ["Junior Lab Assistant", "Sample Collection Specialist / Phlebotomist", "Diagnostic Clinic Assistant", "Pathology Lab Technician Assistant"],
    subjects: ["Basic Laboratory Safety & Disinfection", "Blood Sample Collection & Handling", "Routine Clinical Pathology", "Basic Haematology & Urinalysis", "Maintenance of Diagnostic Lab Equipment"],
    interestTags: ["healthcare", "medical_lab", "diagnostics", "laboratory", "biology"],
    subjectTags: ["biology", "chemistry"],
    skillTags: ["sample_collection", "microscope_operation", "lab_safety", "specimen_preparation"],
    workStyleTags: ["diagnostic_center", "clinic", "pathology_lab"]
  },
  {
    course_id: "MED-DIP-XRAY",
    name: "Diploma in X-Ray / Radiology Technology",
    course_name: "Diploma in X-Ray / Radiology Technology",
    shortName: "Diploma in X-Ray / Radiology Technology",
    course_level: "Diploma",
    level: "after10",
    category: "Medical & Healthcare",
    field_of_study: "Radiography & Imaging Assistance",
    qualification: "10th",
    stream: "General",
    duration: "Typical duration: 1–2 years",
    description: "Practical technical training related to diagnostic imaging equipment such as X-ray systems, darkroom/CR cassette processing, radiation protection barriers, and patient positioning for radiographs.",
    eligibility: "Eligibility varies by programme and institution. Typically Class 10 (SSC) pass. Admission may be based on institute/state rules, merit or direct application. Check the specific institute for current requirements.",
    programmeType: "diploma",
    entranceExam: "State / Institute Merit or Direct Application (No NEET required)",
    verification_status: "VERIFIED",
    careerOptions: ["Junior X-Ray Technician", "Radiography Assistant", "Darkroom / Digital Processing Assistant", "Imaging Center Technician"],
    subjects: ["Basic Anatomy & Radiographic Positioning", "Fundamentals of X-Ray Physics & Safety", "Operation of Radiography Units", "Radiation Protection Techniques", "Image Processing & Film Handling"],
    interestTags: ["healthcare", "radiology", "imaging", "xray"],
    subjectTags: ["physics", "biology"],
    skillTags: ["patient_positioning", "xray_machine_operation", "radiation_safety"],
    workStyleTags: ["hospital_radiology", "imaging_center", "clinic"]
  },
  {
    course_id: "MED-DIP-OTT",
    name: "Diploma in Operation Theatre Technology",
    course_name: "Diploma in Operation Theatre Technology",
    shortName: "Diploma in Operation Theatre Technology (OTT)",
    course_level: "Diploma",
    level: "after10",
    category: "Medical & Healthcare",
    field_of_study: "Operation Theatre & Sterilisation Support",
    qualification: "10th",
    stream: "General",
    duration: "Typical duration: 1–2 years",
    description: "Practical training related to operation theatre preparation, sterilization of surgical instruments, maintaining antiseptic conditions, and assisting surgical and anaesthesia medical teams.",
    eligibility: "Eligibility varies by programme and institution. Typically Class 10 (SSC) pass. Admission may be based on institute/state rules, merit or direct application. Check the specific institute for current requirements.",
    programmeType: "diploma",
    entranceExam: "State / Institute Merit or Direct Application (No NEET required)",
    verification_status: "VERIFIED",
    careerOptions: ["Operation Theatre Assistant (OTA)", "Sterilization (CSSD) Assistant", "Surgical Ward Assistant", "Hospital Theatre Support"],
    subjects: ["Operation Theatre Protocols & Hygiene", "Sterilisation Techniques (Autoclaving & ETO)", "Surgical Trays & Instrument Care", "Basic Anaesthesia Machine Support", "Infection Control Measures"],
    interestTags: ["healthcare", "surgery", "operation_theatre", "patient_care"],
    subjectTags: ["biology"],
    skillTags: ["instrument_sterilization", "theatre_sanitization", "surgical_tray_preparation"],
    workStyleTags: ["operation_theatre", "hospital", "daycare_surgery"]
  },
  {
    course_id: "MED-DIP-NURSE-AIDE",
    name: "Diploma in Nursing Care Assistant / Nurse Aide",
    course_name: "Diploma in Nursing Care Assistant / Nurse Aide",
    shortName: "Nursing Care Assistant / Nurse Aide",
    course_level: "Diploma",
    level: "after10",
    category: "Medical & Healthcare",
    field_of_study: "Bedside Patient Care & Healthcare Support",
    qualification: "10th",
    stream: "General",
    duration: "Typical duration: 1–2 years (or 3–6 months for certificate courses)",
    description: "Practical vocational training for basic patient-care support, hygiene assistance, bed-making, vital sign monitoring, nutrition delivery, and helping registered nurses in hospital wards and elderly care homes.",
    eligibility: "Eligibility varies by programme and institution. Typically Class 10 (SSC) pass. Admission may be based on institute/state rules, merit or direct application. Check the specific institute for current requirements.",
    programmeType: "diploma",
    entranceExam: "Direct Application / Institute Merit (No NEET required)",
    verification_status: "VERIFIED",
    careerOptions: ["Nursing Care Assistant (NCA)", "Patient Care Aide", "Geriatric / Home Healthcare Assistant", "Hospital Ward Assistant"],
    subjects: ["Basic Human Anatomy & Physiology", "Fundamentals of Patient Hygiene & Bed Care", "Vital Signs Recording (BP, Pulse, Temperature)", "First Aid & Emergency Response Basics", "Communication & Patient Empathy"],
    interestTags: ["healthcare", "nursing", "patient_care", "elderly_care", "helping_people"],
    subjectTags: ["biology"],
    skillTags: ["vital_recording", "patient_mobility_support", "hygiene_care", "compassion"],
    workStyleTags: ["hospital_ward", "nursing_home", "home_healthcare", "clinic"]
  },
  {
    course_id: "MED-DIP-DIALYSIS",
    name: "Diploma in Dialysis Technology",
    course_name: "Diploma in Dialysis Technology",
    shortName: "Diploma in Dialysis Technology",
    course_level: "Diploma",
    level: "after10",
    category: "Medical & Healthcare",
    field_of_study: "Renal Care & Dialysis Machine Operation",
    qualification: "10th",
    stream: "General",
    duration: "Typical duration: 1–2 years",
    description: "Hands-on vocational training related to dialysis equipment setup, dialyzer reprocessing, fluid line preparation, and patient-care support in clinical renal care and haemodialysis units.",
    eligibility: "Eligibility varies by programme and institution. Typically Class 10 (SSC) pass. Admission may be based on institute/state rules, merit or direct application. Check the specific institute for current requirements.",
    programmeType: "diploma",
    entranceExam: "Direct Application / Institute Merit (No NEET required)",
    verification_status: "VERIFIED",
    careerOptions: ["Dialysis Assistant", "Haemodialysis Unit Technician Assistant", "Renal Care Clinic Helper", "Dialyzer Reprocessing Assistant"],
    subjects: ["Basics of Renal Anatomy & Kidney Functions", "Principles of Haemodialysis & Peritoneal Dialysis", "Dialysis Machine Setup & Tubing Assembly", "Dialyzer Priming & Reprocessing", "Patient Monitoring During Dialysis Sessions"],
    interestTags: ["healthcare", "dialysis", "renal_care", "medical_devices"],
    subjectTags: ["biology", "physics"],
    skillTags: ["dialysis_equipment_setup", "dialyzer_reprocessing", "fluid_balance_monitoring"],
    workStyleTags: ["dialysis_center", "renal_ward", "hospital"]
  }
];

const medicalPathways = [
  {
    title: "After 10th → Healthcare Diploma & Technical Certifications",
    qualificationName: "10th",
    description: "These are healthcare-support and technical pathways that may be available after Class 10. Admission, duration and eligibility vary by institute and state.",
    steps: [
      "Complete Class 10 (SSC) secondary education",
      "Choose a specialized healthcare diploma (DMLT, X-Ray Tech, OTT, Nursing Care Assistant, or Dialysis Tech)",
      "Complete 1–2 years of practical hospital & diagnostic training",
      "Gain direct employment as a clinical assistant, technician aide, or support caregiver in hospitals and diagnostic clinics",
      "Optionally pursue advanced paramedical certifications for career progression"
    ]
  },
  {
    title: "12th Science (PCB) → Medical Undergraduate (MBBS / BDS / AYUSH / Allied Health)",
    qualificationName: "12th",
    description: "Core professional medical and healthcare education pathway leading to registered clinical practice, hospital careers, and specialized master's qualifications.",
    steps: [
      "Complete 12th Standard Science with Physics, Chemistry, and Biology (PCB)",
      "Appear for NEET-UG or relevant state paramedical admission processes",
      "Enrol in recognized UG medical/allied programme: MBBS, BDS, BHMS, B.Sc Nursing, BPT, B.Pharm, B.Sc MLT, B.Sc Radiology, or B.Sc OTT",
      "Complete academic course along with compulsory hospital clinical rotatory internship",
      "Obtain council registration (NMC / DCI / State Councils) to practice or advance to postgraduate specialization (MD / MS / MDS)"
    ]
  }
];

async function runUpsert() {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/futurepath";
    console.log("Connecting to MongoDB:", mongoUri);
    await mongoose.connect(mongoUri);

    console.log("Connected. Upserting Medical & Healthcare Courses...");
    let count = 0;

    for (const item of medicalCourses) {
      await Course.findOneAndUpdate(
        {
          $or: [
            { course_id: item.course_id },
            { name: item.name },
            { course_name: item.course_name }
          ]
        },
        { $set: item },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      count++;
      console.log(`- Upserted: [${item.shortName}] ${item.name} (${item.course_level} - ${item.qualification})`);
    }

    // Upsert Medical Pathways
    const qual10 = await Qualification.findOne({ name: "10th" });
    const qual12 = await Qualification.findOne({ name: "12th" });
    const streamSci = await Stream.findOne({ name: "Science" });

    if (qual10) {
      await Pathway.findOneAndUpdate(
        { title: medicalPathways[0].title },
        {
          $set: {
            title: medicalPathways[0].title,
            qualification: qual10._id,
            stream: streamSci ? streamSci._id : undefined,
            description: medicalPathways[0].description,
            steps: medicalPathways[0].steps,
            isActive: true
          }
        },
        { upsert: true, new: true }
      );
      console.log(`- Upserted Pathway: ${medicalPathways[0].title}`);
    }

    if (qual12 && streamSci) {
      await Pathway.findOneAndUpdate(
        { title: medicalPathways[1].title },
        {
          $set: {
            title: medicalPathways[1].title,
            qualification: qual12._id,
            stream: streamSci._id,
            description: medicalPathways[1].description,
            steps: medicalPathways[1].steps,
            isActive: true
          }
        },
        { upsert: true, new: true }
      );
      console.log(`- Upserted Pathway: ${medicalPathways[1].title}`);
    }

    const totalCourses = await Course.countDocuments();
    const medCourses = await Course.countDocuments({ category: "Medical & Healthcare" });
    console.log("\n==================================================");
    console.log(`Total Courses in Database now: ${totalCourses}`);
    console.log(`Medical & Healthcare Courses in Database: ${medCourses}`);
    console.log("==================================================");

    if (require.main === module) {
      process.exit(0);
    }
  } catch (err) {
    console.error("Error during upsert:", err);
    if (require.main === module) {
      process.exit(1);
    }
    throw err;
  }
}

if (require.main === module) {
  runUpsert();
}

module.exports = { medicalCourses, medicalPathways, runUpsert };
