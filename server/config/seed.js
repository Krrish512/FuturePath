const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Qualification = require("../models/Qualification");
const Stream = require("../models/Stream");
const City = require("../models/City");
const Course = require("../models/Course");
const Pathway = require("../models/Pathway");
const Institution = require("../models/Institution");
const Career = require("../models/Career");
const User = require("../models/User");

const seedDatabase = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/futurepath";
        console.log("Connecting to MongoDB:", mongoUri);
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected for seeding.");

        // Clear existing collections
        console.log("Clearing existing data...");
        await Promise.all([
            Qualification.deleteMany({}),
            Stream.deleteMany({}),
            City.deleteMany({}),
            Course.deleteMany({}),
            Pathway.deleteMany({}),
            Institution.deleteMany({}),
            Career.deleteMany({}),
            User.deleteMany({})
        ]);
        console.log("Existing data cleared.");

        // 1. Seed Qualifications
        console.log("Seeding Qualifications...");
        const qual10th = await Qualification.create({
            name: "10th",
            description: "Students who have completed secondary school examination (SSC / 10th Boards)."
        });

        const qual12th = await Qualification.create({
            name: "12th",
            description: "Students who have completed higher secondary certificate examination (HSC / 12th Boards)."
        });

        // 2. Seed Streams
        console.log("Seeding Streams...");
        const streamScience = await Stream.create({
            name: "Science",
            qualification: qual12th._id,
            description: "Covers Physics, Chemistry, Mathematics (PCM) and Biology (PCB) preparing for engineering, medical, and research fields."
        });

        const streamCommerce = await Stream.create({
            name: "Commerce",
            qualification: qual12th._id,
            description: "Focuses on Accounting, Economics, Business Studies, and Finance preparing for business, management, and CA."
        });

        const streamArts = await Stream.create({
            name: "Arts",
            qualification: qual12th._id,
            description: "Humanities and social sciences including History, Psychology, Sociology, Literature, and Political Science."
        });

        // 3. Seed Cities
        console.log("Seeding Cities...");
        const cityAhmedabad = await City.create({ name: "Ahmedabad", state: "Gujarat" });
        const cityVadodara = await City.create({ name: "Vadodara", state: "Gujarat" });
        const citySurat = await City.create({ name: "Surat", state: "Gujarat" });
        const cityRajkot = await City.create({ name: "Rajkot", state: "Gujarat" });
        const cityGandhinagar = await City.create({ name: "Gandhinagar", state: "Gujarat" });

        // 4. Seed Courses
        console.log("Seeding Courses...");
        const courseDiplomaCE = await Course.create({
            name: "Diploma in Computer Engineering",
            qualification: "10th",
            stream: "General",
            duration: "3 Years",
            description: "Practical technical diploma covering fundamental computer hardware, programming, and networking concepts.",
            eligibility: "10th Standard pass with minimum 35% and Science/Maths subjects",
            careerOptions: ["Junior Software Developer", "Network Technician", "Hardware Support Engineer"],
            subjects: ["C Programming", "Digital Electronics", "Computer Networks", "DBMS", "Operating Systems"]
        });

        const courseDiplomaME = await Course.create({
            name: "Diploma in Mechanical Engineering",
            qualification: "10th",
            stream: "General",
            duration: "3 Years",
            description: "Foundational engineering diploma dealing with machinery design, manufacturing, and mechanics.",
            eligibility: "10th Standard pass with Science and Maths",
            careerOptions: ["Junior Mechanical Engineer", "CAD Designer", "Maintenance Technician"],
            subjects: ["Engineering Mechanics", "Thermodynamics", "Manufacturing Processes", "CAD/CAM"]
        });

        const courseBCA = await Course.create({
            name: "Bachelor of Computer Applications (BCA)",
            qualification: "12th",
            stream: "General",
            duration: "3 Years",
            description: "Undergraduate degree focusing on modern computer applications, software engineering, databases, and full-stack web development.",
            eligibility: "12th Standard pass in any stream (Science/Commerce/Arts) with English and Mathematics or Statistics or Computer",
            careerOptions: ["Full Stack Developer", "Software Engineer", "Web Developer", "Database Administrator"],
            subjects: ["C++", "Java", "Python", "Data Structures", "Advanced Web Designing", "DBMS", "Software Engineering"]
        });

        const courseBTechCSE = await Course.create({
            name: "B.Tech in Computer Science and Engineering",
            qualification: "12th",
            stream: "Science",
            duration: "4 Years",
            description: "Comprehensive 4-year undergraduate engineering program covering computer hardware, architecture, advanced algorithms, and cloud systems.",
            eligibility: "12th Science with Physics, Chemistry, and Mathematics (PCM) + GUJCET / JEE Main scores",
            careerOptions: ["Software Development Engineer", "Cloud Architect", "AI/ML Engineer", "System Architect"],
            subjects: ["Data Structures & Algorithms", "Theory of Computation", "Computer Networks", "Compiler Design", "Cloud Computing"]
        });

        const courseBCom = await Course.create({
            name: "Bachelor of Commerce (B.Com)",
            qualification: "12th",
            stream: "Commerce",
            duration: "3 Years",
            description: "Undergraduate degree in business principles, financial accounting, banking, corporate taxation, and business law.",
            eligibility: "12th Standard pass in Commerce stream",
            careerOptions: ["Accountant", "Tax Consultant", "Financial Analyst", "Audit Assistant"],
            subjects: ["Financial Accounting", "Corporate Law", "Business Economics", "Income Tax", "Auditing"]
        });

        const courseBBA = await Course.create({
            name: "Bachelor of Business Administration (BBA)",
            qualification: "12th",
            stream: "Commerce",
            duration: "3 Years",
            description: "Leadership and management degree developing skills in marketing, human resources, organizational strategy, and entrepreneurship.",
            eligibility: "12th Standard pass from any stream with English",
            careerOptions: ["Business Development Manager", "Marketing Executive", "HR Specialist", "Entrepreneur"],
            subjects: ["Principles of Management", "Marketing Management", "Organizational Behavior", "Financial Management"]
        });

        const courseBA = await Course.create({
            name: "Bachelor of Arts (BA)",
            qualification: "12th",
            stream: "Arts",
            duration: "3 Years",
            description: "Undergraduate degree in humanities with specializations in Literature, Psychology, History, and Sociology.",
            eligibility: "12th Standard pass in Arts / any stream",
            careerOptions: ["Content Writer", "Civil Services Aspirant", "Public Relations Specialist", "Journalist"],
            subjects: ["English Literature", "Psychology", "Sociology", "Political Science"]
        });

        const courseMBBS = await Course.create({
            name: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
            qualification: "12th",
            stream: "Science",
            duration: "5.5 Years",
            description: "Professional medical degree to become a registered physician, covering human anatomy, pathology, surgery, and clinical medicine.",
            eligibility: "12th Science with PCB + Qualifying NEET-UG score",
            careerOptions: ["Medical Doctor", "Physician", "Medical Officer", "Clinical Researcher"],
            subjects: ["Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "General Medicine", "Surgery"]
        });

        // 5. Seed Pathways (Roadmaps)
        console.log("Seeding Pathways...");
        await Pathway.create([
            {
                title: "10th to Polytechnic Diploma → Degree Engineering (D2D)",
                qualification: qual10th._id,
                stream: streamScience._id,
                description: "Direct technical pathway from 10th board exams to Diploma, followed by direct 2nd-year lateral entry into B.Tech degree.",
                steps: [
                    "Complete 10th Standard (SSC) with good marks in Science and Mathematics",
                    "Apply for ACPDC Diploma Admission in Gujarat (e.g. Computer / Mechanical / Civil)",
                    "Complete 3-Year Diploma in Engineering with a strong CGPA",
                    "Apply for D2D (Diploma to Degree) admission directly into 2nd year of B.E. / B.Tech",
                    "Complete 3 years of Degree Engineering and graduate as a qualified engineer"
                ]
            },
            {
                title: "12th Science (PCM) → Engineering Degree → Tech Careers",
                qualification: qual12th._id,
                stream: streamScience._id,
                description: "The traditional path for students passionate about technology, programming, and hardware innovation.",
                steps: [
                    "Choose 12th Science with Physics, Chemistry, and Mathematics (PCM)",
                    "Prepare for Entrance Exams: GUJCET (State Engineering) and JEE Main / Advanced (National)",
                    "Participate in ACPC Counselling and secure admission in B.Tech / B.E. Computer Engineering or IT",
                    "Learn core computer science concepts, build real-world web/mobile projects, and do internships",
                    "Graduate and join top tech companies as a Software Development Engineer (SDE)"
                ]
            },
            {
                title: "12th Science (PCB) → Medical Entrance → Healthcare Professional",
                qualification: qual12th._id,
                stream: streamScience._id,
                description: "Dedicated pathway to becoming a Doctor, Dentist, Pharmacist, or Paramedical Specialist.",
                steps: [
                    "Choose 12th Science with Physics, Chemistry, and Biology (PCB)",
                    "Prepare intensively and appear for the NEET-UG entrance exam",
                    "Secure admission in MBBS / BDS / BAMS / BHMS based on merit score",
                    "Complete 4.5 to 5 years of rigorous academic coursework followed by a 1-year mandatory rotatory internship",
                    "Register with the Medical Council of India (MCI) and practice or pursue MD/MS specialization"
                ]
            },
            {
                title: "12th Commerce → B.Com / BBA → Chartered Accountancy (CA) / Finance",
                qualification: qual12th._id,
                stream: streamCommerce._id,
                description: "Structured pathway for students aiming for top-tier corporate finance, accounting, and business leadership roles.",
                steps: [
                    "Complete 12th Commerce with focus on Accounts, Statistics, and Economics",
                    "Register for ICAI CA Foundation exam or enroll in B.Com / BBA at a recognized university",
                    "Clear CA Intermediate exams and complete 2 to 3 years of practical articleship training",
                    "Clear CA Final examinations and earn the prestigious Chartered Accountant credential",
                    "Join Big 4 accounting firms, multinational corporations, or establish an independent audit practice"
                ]
            },
            {
                title: "12th Arts → BA / Law / Design → Civil Services & Creative Careers",
                qualification: qual12th._id,
                stream: streamArts._id,
                description: "Flexible pathway leading to Public Administration, Judicial Services, Journalism, and Design.",
                steps: [
                    "Complete 12th Arts with humanities subjects",
                    "Enroll in a 3-Year BA program (Political Science/History) or 5-Year Integrated BA-LLB Law degree",
                    "Build strong analytical reading, writing, and general awareness skills",
                    "Appear for competitive exams such as UPSC Civil Services, GPSC, CLAT, or design entrance exams",
                    "Serve as a Civil Servant (IAS/IPS/GAS Officer), practicing Advocate, or Creative Professional"
                ]
            },
            {
                title: "12th Any Stream → BCA / B.Sc IT → Full-Stack Software Developer",
                qualification: qual12th._id,
                stream: streamCommerce._id,
                description: "The most accessible and practical route for any student to enter the thriving IT and software industry.",
                steps: [
                    "Complete 12th Standard from Science, Commerce, or Arts with English",
                    "Enroll in a 3-Year Bachelor of Computer Applications (BCA) program",
                    "Master core programming: C++, Java, JavaScript, DBMS, and Web Technologies (MERN Stack)",
                    "Build dynamic portfolio websites, practical capstone projects, and participate in hackathons",
                    "Get campus placed or apply for Full-Stack Developer / Frontend Developer positions"
                ]
            }
        ]);

        // 6. Seed Careers
        console.log("Seeding Careers...");
        await Career.create([
            {
                title: "Full-Stack Web Developer",
                description: "Architects and develops end-to-end web applications including responsive frontends, RESTful APIs, and database schemas.",
                requiredSkills: ["JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git"],
                salaryRange: "₹4,00,000 - ₹14,00,000 per annum",
                jobRoles: ["Frontend Developer", "Backend Developer", "MERN Stack Developer", "API Specialist"],
                relatedCourses: [courseBCA._id, courseBTechCSE._id, courseDiplomaCE._id]
            },
            {
                title: "Data Scientist & AI Specialist",
                description: "Leverages machine learning algorithms, statistical analysis, and deep learning to extract actionable insights from big data.",
                requiredSkills: ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow", "Statistics"],
                salaryRange: "₹6,00,000 - ₹20,00,000 per annum",
                jobRoles: ["Data Scientist", "Machine Learning Engineer", "BI Analyst", "Data Engineer"],
                relatedCourses: [courseBTechCSE._id, courseBCA._id]
            },
            {
                title: "Chartered Accountant (CA)",
                description: "Expert financial professional handling corporate auditing, tax compliance, financial planning, and forensic accounting.",
                requiredSkills: ["Financial Accounting", "Corporate Taxation", "Auditing", "Financial Modeling", "GST Law"],
                salaryRange: "₹7,00,000 - ₹25,00,000 per annum",
                jobRoles: ["Statutory Auditor", "Tax Consultant", "Chief Financial Officer (CFO)", "Investment Advisor"],
                relatedCourses: [courseBCom._id, courseBBA._id]
            },
            {
                title: "Medical Doctor / Surgeon",
                description: "Licensed healthcare professional diagnosed with diagnosing illnesses, prescribing treatments, performing surgical procedures, and saving lives.",
                requiredSkills: ["Clinical Diagnosis", "Patient Care", "Human Anatomy", "Medical Ethics", "Surgical Skills"],
                salaryRange: "₹8,00,000 - ₹30,00,000 per annum",
                jobRoles: ["General Physician", "Surgeon", "Medical Officer", "Specialist Consultant"],
                relatedCourses: [courseMBBS._id]
            },
            {
                title: "UI/UX & Graphic Designer",
                description: "Creates intuitive, aesthetically pleasing user interfaces and graphic assets for modern web and mobile applications.",
                requiredSkills: ["Figma", "Adobe XD", "Wireframing", "User Research", "Color Theory", "Prototyping"],
                salaryRange: "₹3,50,000 - ₹12,00,000 per annum",
                jobRoles: ["UI/UX Designer", "Product Designer", "Visual Designer", "Interaction Designer"],
                relatedCourses: [courseBCA._id, courseBA._id]
            }
        ]);

        // 7. Seed Institutions
        console.log("Seeding Institutions...");
        await Institution.create([
            {
                name: "Ahmedabad Institute of Technology (AIT)",
                city: cityAhmedabad._id,
                type: "College",
                affiliation: "Gujarat Technological University (GTU)",
                address: "Gota-Ognaj Road, Gota, Ahmedabad, Gujarat 382481",
                website: "https://www.aitindia.in",
                contactNumber: "079-27660251",
                coursesOffered: [courseBTechCSE._id, courseBCA._id]
            },
            {
                name: "Gujarat University",
                city: cityAhmedabad._id,
                type: "University",
                affiliation: "UGC / State University",
                address: "Navrangpura, Ahmedabad, Gujarat 380009",
                website: "https://www.gujaratuniversity.ac.in",
                contactNumber: "079-26301341",
                coursesOffered: [courseBCA._id, courseBCom._id, courseBA._id, courseBBA._id]
            },
            {
                name: "The Maharaja Sayajirao University of Baroda (MSU)",
                city: cityVadodara._id,
                type: "University",
                affiliation: "UGC / State University (NAAC A+)",
                address: "Pratapgunj, Vadodara, Gujarat 390002",
                website: "https://www.msubaroda.ac.in",
                contactNumber: "0265-2795555",
                coursesOffered: [courseBTechCSE._id, courseBCom._id, courseBA._id, courseBCA._id]
            },
            {
                name: "Government Polytechnic Ahmedabad",
                city: cityAhmedabad._id,
                type: "Polytechnic",
                affiliation: "Gujarat Technological University (GTU) / TEB",
                address: "Panjrapole Cross Road, Ambawadi, Ahmedabad, Gujarat 380015",
                website: "https://www.gpahmedabad.ac.in",
                contactNumber: "079-26305516",
                coursesOffered: [courseDiplomaCE._id, courseDiplomaME._id]
            },
            {
                name: "B.J. Medical College & Civil Hospital",
                city: cityAhmedabad._id,
                type: "College",
                affiliation: "Gujarat University / NMC",
                address: "Asarwa, Ahmedabad, Gujarat 380016",
                website: "https://www.bjmcabd.edu.in",
                contactNumber: "079-22680074",
                coursesOffered: [courseMBBS._id]
            },
            {
                name: "Veer Narmad South Gujarat University (VNSGU)",
                city: citySurat._id,
                type: "University",
                affiliation: "UGC / State University",
                address: "University Road, Surat, Gujarat 395007",
                website: "https://www.vnsgu.ac.in",
                contactNumber: "0261-2227141",
                coursesOffered: [courseBCA._id, courseBCom._id, courseBBA._id]
            }
        ]);

        console.log("\n=======================================================");
        console.log("  DATABASE SEEDING COMPLETED SUCCESSFULLY!");
        console.log("  Real-world guidance data for 10th & 12th is ready.");
        console.log("=======================================================\n");

        // Seed default admin user
        console.log("Creating default admin user...");
        await User.create({
            name: "Admin",
            email: "admin@futurepath.com",
            password: "admin123",
            role: "admin"
        });
        console.log("Admin user created: admin@futurepath.com / admin123");

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
