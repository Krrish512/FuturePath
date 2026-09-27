const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const University = require("../models/University");
const Course = require("../models/Course");
const Curriculum = require("../models/Curriculum");
const Qualification = require("../models/Qualification");
const Stream = require("../models/Stream");
const City = require("../models/City");
const Pathway = require("../models/Pathway");
const Institution = require("../models/Institution");
const Career = require("../models/Career");
const User = require("../models/User");

const parseCsv = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.warn(`CSV file not found: ${filePath}`);
    return [];
  }
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().replace(/^"|"$/g, ""));
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    // Simple CSV parser handling quotes
    const line = lines[i];
    const values = [];
    let inQuotes = false;
    let currentValue = "";

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"' && (j === 0 || line[j - 1] !== "\\")) {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(currentValue.trim().replace(/^"|"$/g, ""));
        currentValue = "";
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim().replace(/^"|"$/g, ""));

    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || "";
    });
    records.push(record);
  }
  return records;
};

const seedDatabase = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/futurepath";
    console.log("Connecting to MongoDB for Master Seeding:", mongoUri);
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully.");

    // Clear existing collections safely
    console.log("Clearing old collections...");
    await Promise.all([
      University.deleteMany({}),
      Course.deleteMany({}),
      Curriculum.deleteMany({}),
      Qualification.deleteMany({}),
      Stream.deleteMany({}),
      City.deleteMany({}),
      Pathway.deleteMany({}),
      Institution.deleteMany({}),
      Career.deleteMany({}),
      User.deleteMany({}),
    ]);
    console.log("Collections cleared.");

    const workspaceRoot = path.resolve(__dirname, "../../");

    // 1. Seed Universities from Universities.csv
    const uniCsvPath = path.join(workspaceRoot, "Universities.csv");
    const universitiesData = parseCsv(uniCsvPath);
    console.log(
      `Importing ${universitiesData.length} Universities from CSV...`,
    );
    const createdUniversities = await University.insertMany(
      universitiesData.map((u) => ({
        university_id: u.university_id,
        university_name: u.university_name,
        abbreviation: u.abbreviation,
        location: u.location,
        state: u.state || "Gujarat",
        type: u.type,
        official_website: u.official_website,
        established_year: u.established_year,
      })),
    );

    // 2. Seed Courses from Courses.csv
    const coursesCsvPath = path.join(workspaceRoot, "Courses.csv");
    const coursesData = parseCsv(coursesCsvPath);
    console.log(`Importing ${coursesData.length} Courses from CSV...`);
    const courseDocuments = coursesData.map((c) => {
      // Determine stream & qualification based on course level / field
      let qualification = "12th";
      let stream = "General";
      if (c.course_level === "Postgraduate") {
        qualification = "12th"; // or Graduate
      }
      if (
        c.field_of_study.includes("Engineering") ||
        c.field_of_study.includes("Science") ||
        c.field_of_study.includes("Chemical") ||
        c.field_of_study.includes("Physical") ||
        c.field_of_study.includes("Biological") ||
        c.field_of_study.includes("Mathematical")
      ) {
        stream = "Science";
      } else if (
        c.field_of_study.includes("Commerce") ||
        c.field_of_study.includes("Management")
      ) {
        stream = "Commerce";
      } else if (
        c.field_of_study.includes("Humanities") ||
        c.field_of_study.includes("Arts")
      ) {
        stream = "Arts";
      }

      return {
        course_id: c.course_id,
        name: c.course_name,
        course_name: c.course_name,
        university_id: c.university_id,
        university_name: c.university_name,
        course_level: c.course_level,
        field_of_study: c.field_of_study,
        duration: c.duration,
        eligibility: c.eligibility,
        official_source_url: c.official_source_url,
        verification_status: c.verification_status || "VERIFIED",
        last_verified: c.last_verified,
        qualification,
        stream,
        description: `${c.course_name} offered under ${c.university_name}. Focuses on comprehensive ${c.field_of_study} education and industry-aligned competencies.`,
        careerOptions: [
          "Software Engineer",
          "Business Analyst",
          "Data Specialist",
          "Domain Consultant",
        ],
        subjects: [
          "Core Fundamentals",
          "Applied Discipline Studies",
          "Practical Lab & Project",
          "Professional Development",
        ],
      };
    });
    const createdCourses = await Course.insertMany(courseDocuments);

    // 3. Seed Curriculum from Curriculum.csv
    const currCsvPath = path.join(workspaceRoot, "Curriculum.csv");
    const currData = parseCsv(currCsvPath);
    console.log(`Importing ${currData.length} Curriculum records from CSV...`);
    await Curriculum.insertMany(
      currData.map((curr) => ({
        curriculum_id: curr.curriculum_id,
        university_id: curr.university_id,
        university_name: curr.university_name,
        course_id: curr.course_id,
        course_name: curr.course_name,
        academic_year: curr.academic_year,
        semester_number: Number(curr.semester_number),
        semester_name: curr.semester_name,
        subject_code: curr.subject_code,
        subject_name: curr.subject_name,
        subject_type: curr.subject_type,
        credits: curr.credits,
        theory_practical: curr.theory_practical,
        official_source_url: curr.official_source_url,
        verification_status: curr.verification_status || "VERIFIED",
        last_verified: curr.last_verified,
      })),
    );

    // 4. Seed Qualifications & Streams
    console.log("Seeding Qualifications and Streams...");
    const qual10th = await Qualification.create({
      name: "10th",
      description: "Secondary School Certificate (SSC / 10th Standard).",
    });
    const qual12th = await Qualification.create({
      name: "12th",
      description: "Higher Secondary Certificate (HSC / 12th Standard).",
    });

    const streamScience = await Stream.create({
      name: "Science",
      qualification: qual12th._id,
      description:
        "Physics, Chemistry, Mathematics (PCM) and Biology (PCB) preparing for engineering, tech, and medicine.",
    });
    const streamCommerce = await Stream.create({
      name: "Commerce",
      qualification: qual12th._id,
      description:
        "Accounting, Business Studies, Economics, and Statistics preparing for management and finance.",
    });
    const streamArts = await Stream.create({
      name: "Arts",
      qualification: qual12th._id,
      description: "Humanities, Psychology, Sociology, and Literature.",
    });

    // 5. Seed Gujarat Cities
    console.log("Seeding Cities...");
    const cityAhmedabad = await City.create({
      name: "Ahmedabad",
      state: "Gujarat",
    });
    const citySurat = await City.create({ name: "Surat", state: "Gujarat" });
    const cityVadodara = await City.create({
      name: "Vadodara",
      state: "Gujarat",
    });
    const cityAnand = await City.create({
      name: "Anand / Vallabh Vidyanagar",
      state: "Gujarat",
    });
    const cityRajkot = await City.create({ name: "Rajkot", state: "Gujarat" });
    const cityGandhinagar = await City.create({
      name: "Gandhinagar",
      state: "Gujarat",
    });

    // 6. Seed Gujarat Institutions (Verified)
    console.log("Seeding Verified Institutions...");
    const cseCourses = createdCourses.filter(
      (c) =>
        c.name.includes("Computer") ||
        c.name.includes("BCA") ||
        c.name.includes("IT"),
    );
    const bcomCourses = createdCourses.filter(
      (c) => c.name.includes("Commerce") || c.name.includes("B.Com"),
    );

    await Institution.create([
      {
        name: "Gujarat University Campus & Affiliated Departments",
        city: cityAhmedabad._id,
        state: "Gujarat",
        type: "University",
        affiliation: "Gujarat University (GU)",
        address: "Navrangpura, Ahmedabad – 380009",
        website: "https://www.gujaratuniversity.ac.in",
        contactNumber: "+91-79-26301341",
        coursesOffered: cseCourses.slice(0, 5).map((c) => c._id),
      },
      {
        name: "Veer Narmad South Gujarat University Departmental Campus",
        city: citySurat._id,
        state: "Gujarat",
        type: "University",
        affiliation: "Veer Narmad South Gujarat University (VNSGU)",
        address: "University Campus, Udhna-Magdalla Road, Surat – 395007",
        website: "https://vnsgu.ac.in",
        contactNumber: "+91-261-2227141",
        coursesOffered: cseCourses.slice(0, 5).map((c) => c._id),
      },
      {
        name: "Sardar Patel University Campus & Constituent Institutes",
        city: cityAnand._id,
        state: "Gujarat",
        type: "University",
        affiliation: "Sardar Patel University (SPU)",
        address: "Vallabh Vidyanagar – 388120, Gujarat",
        website: "https://www.spuvvn.edu",
        contactNumber: "+91-2692-226801",
        coursesOffered: cseCourses.slice(0, 5).map((c) => c._id),
      },
      {
        name: "Sarvajanik University Main Campus",
        city: citySurat._id,
        state: "Gujarat",
        type: "University",
        affiliation: "Sarvajanik University (SU)",
        address: "Sarvajanik College Campus, Athwalines, Surat – 395001",
        website: "https://www.sarvajanikuniversity.ac.in",
        contactNumber: "+91-261-2240146",
        coursesOffered: cseCourses.slice(0, 5).map((c) => c._id),
      },
      {
        name: "Sardar Vallabhbhai National Institute of Technology (SVNIT)",
        city: citySurat._id,
        state: "Gujarat",
        type: "Institute",
        affiliation: "Ministry of Education (Institute of National Importance)",
        address: "Ichchhanath, Surat – 395007, Gujarat",
        website: "https://www.svnit.ac.in",
        contactNumber: "+91-261-2259571",
        coursesOffered: cseCourses.slice(0, 5).map((c) => c._id),
      },
    ]);

    // 7. Seed Pathways (Roadmaps)
    console.log("Seeding Pathways...");
    await Pathway.create([
      {
        title: "10th to Polytechnic Diploma → Degree Engineering (D2D)",
        qualification: qual10th._id,
        stream: streamScience._id,
        description:
          "Direct technical pathway from 10th board exams to Diploma, followed by direct 2nd-year lateral entry into B.Tech degree.",
        steps: [
          "Complete 10th Standard (SSC) with good marks in Science and Mathematics",
          "Apply for ACPDC Diploma Admission in Gujarat (Computer / IT / Mechanical)",
          "Complete 3-Year Diploma in Engineering with a strong CGPA",
          "Apply for D2D admission directly into 2nd year of B.E. / B.Tech",
          "Complete 3 years of Degree Engineering and graduate as an Engineer",
        ],
      },
      {
        title:
          "12th Science (PCM) → Engineering / Computing Degree → Tech Careers",
        qualification: qual12th._id,
        stream: streamScience._id,
        description:
          "Traditional path for technology innovation, software development, AI, and systems engineering.",
        steps: [
          "Choose 12th Science with Physics, Chemistry, and Mathematics (PCM)",
          "Prepare for Entrance Exams: GUJCET (State) and JEE Main (National)",
          "Participate in ACPC / JoSAA counselling and join B.Tech CSE / AI / IT",
          "Learn data structures, full-stack development, and complete industry internships",
          "Graduate and join top tech companies as a Software Development Engineer",
        ],
      },
      {
        title:
          "12th (Any Stream) → BCA (Honours) NEP → MCA / Software Engineering",
        qualification: qual12th._id,
        stream: streamCommerce._id,
        description:
          "Accessible, high-growth technology roadmap for Science, Commerce, and Arts students.",
        steps: [
          "Complete 12th Standard with English and Maths/Statistics/Computer",
          "Enrol in 4-Year BCA (Honours) under NEP 2020 at GU, VNSGU, SPU, or SU",
          "Master modern web technologies, databases, cloud architecture, and algorithms",
          "Optionally pursue MCA (2 Years) or join high-growth tech startups directly",
          "Advance to Senior Full Stack Engineer or Solutions Architect",
        ],
      },
      {
        title: "12th Commerce → B.Com / BBA → CA / MBA / Corporate Finance",
        qualification: qual12th._id,
        stream: streamCommerce._id,
        description:
          "Business leadership and finance roadmap from higher secondary to corporate executive.",
        steps: [
          "Complete 12th Standard in Commerce stream with Accountancy & Economics",
          "Enrol in B.Com (Honours) or BBA in top Gujarat universities",
          "Appear for CMAT / CAT or CA Foundation / Intermediate examinations",
          "Complete corporate internships in financial analysis or management",
          "Graduate as a Financial Analyst, Chartered Accountant, or Business Manager",
        ],
      },
    ]);

    // 8. Seed Careers
    console.log("Seeding Careers...");
    await Career.create([
      {
        title: "Full Stack Software Engineer",
        description:
          "Designs, develops, and deploys scalable web applications, REST APIs, and microservices.",
        salaryRange: "₹4,50,000 - ₹18,00,000 / year",
        skills: [
          "JavaScript",
          "React",
          "Node.js",
          "MongoDB",
          "Data Structures",
          "System Design",
        ],
        courses: cseCourses.slice(0, 4).map((c) => c._id),
      },
      {
        title: "Data Scientist & AI Specialist",
        description:
          "Builds predictive machine learning models, statistical analyses, and data pipelines.",
        salaryRange: "₹6,00,000 - ₹24,00,000 / year",
        skills: [
          "Python",
          "Machine Learning",
          "SQL",
          "Deep Learning",
          "Data Visualization",
        ],
        courses: cseCourses.slice(0, 4).map((c) => c._id),
      },
      {
        title: "Financial Analyst & Portfolio Consultant",
        description:
          "Evaluates financial data, conducts market valuation, and optimizes corporate investments.",
        salaryRange: "₹4,00,000 - ₹15,00,000 / year",
        skills: [
          "Financial Modeling",
          "Corporate Accounting",
          "Excel",
          "Taxation",
          "Valuation",
        ],
        courses: bcomCourses.slice(0, 3).map((c) => c._id),
      },
    ]);

    // 9. Seed Users (Student and Admin)
    console.log("Seeding Users...");
    await User.create([
      {
        name: "Admin User",
        email: "admin@futurepath.edu",
        password: "adminpassword123",
        role: "admin",
        qualification: "12th",
        stream: "Science",
      },
      {
        name: "Patel",
        email: "student@futurepath.edu",
        password: "studentpassword123",
        role: "student",
        qualification: "12th",
        stream: "Commerce",
      },
    ]);

    console.log("\n==============================================");
    console.log("MASTER SEEDING COMPLETED SUCCESSFULLY!");
    console.log(`- Universities: ${createdUniversities.length}`);
    console.log(`- Courses: ${createdCourses.length}`);
    console.log(`- Curriculum Records: ${currData.length}`);
    console.log("==============================================");

    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedDatabase();
