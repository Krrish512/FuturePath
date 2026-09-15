# FuturePath – Student Education & Career Guidance Portal

> **BCA Semester 5 Advanced Web Designing (AWD) Project**  
> A practical, responsive, database-driven full-stack education and career guidance portal empowering students after 10th and 12th standards.

---

## 1. Project Overview

**FuturePath** is designed to solve a fundamental dilemma faced by secondary (10th) and higher secondary (12th) students across Gujarat and India: **"What can I do next?"**

The portal bridges the gap between completed schooling and future career goals by providing:
- Step-by-step educational roadmaps from secondary school to professional careers.
- Degree and diploma program eligibility, duration, and curriculum details.
- Realistic career insights with salary projections and required skills.
- Verified colleges, universities, and polytechnics across Gujarat.
- An interactive rule-based career aptitude assessment quiz.
- Side-by-side degree comparison matrices and personalized shortlists.

---

## 2. Key Objectives

1. **Rule-Based Decision Support**: Deliver structured, deterministic guidance for 10th pass students and 12th Science, Commerce, and Arts streams.
2. **Normalized Data Modeling**: Demonstrate strong relational database design in MongoDB using Mongoose schema references (`ObjectId`) and population (`populate()`).
3. **Single-Page Application (SPA)**: Provide a fluid, modern user experience using React.js, Vite, and custom Vanilla CSS with dark glassmorphism aesthetics.
4. **Offline Persistence**: Enable students to bookmark and compare educational targets using browser `localStorage`.
5. **Viva & Demo Readiness**: Build a transparent, explainable codebase following industry-standard REST API conventions.

---

## 3. Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | React 19 + Vite 8 | Single Page Application (SPA), React Hooks |
| **Styling** | Vanilla CSS 3 | Custom design system, CSS Variables, Glassmorphism, Responsive Grid |
| **Typography** | Google Fonts | *Outfit* (Headings) & *Plus Jakarta Sans* (Body) |
| **Backend** | Node.js + Express 5 | RESTful API Architecture, JSON middleware, CORS |
| **Database** | MongoDB + Mongoose 9 | Document database, Referential modeling with `ObjectId` & `populate()` |
| **Environment** | Dotenv | Configuration management via `.env` |

---

## 4. System Architecture & Relational Data Flow

```
+-------------------------------------------------------------------+
|                        Student Browser                            |
|               React 19 + Vite + Vanilla CSS SPA                  |
+-------------------------------------------------------------------+
                                  │
                                  │ HTTP JSON Requests (CORS)
                                  ▼
+-------------------------------------------------------------------+
|                   Express.js 5 RESTful Backend                    |
|       Routes -> Controllers -> Mongoose Middleware / Models       |
+-------------------------------------------------------------------+
                                  │
                                  │ Mongoose ODM Queries
                                  ▼
+-------------------------------------------------------------------+
|                          MongoDB Database                         |
|                                                                   |
|   [Qualification] ──── (1:N) ────► [Stream]                      |
|          │                            │                           |
|          ▼ (1:N)                      ▼ (1:N)                     |
|      [Pathway] ◄──────────────────────┘                           |
|                                                                   |
|   [Course] ◄─── (N:N) ─── [Institution] ─── (N:1) ───► [City]     |
|      ▲                                                            |
|      └─── (N:N) ─── [Career]                                      |
+-------------------------------------------------------------------+
```

---

## 5. Main Modules & Features

### A. Backend Master Modules
- **Qualification Module** (`/api/qualifications`): Master levels (`10th`, `12th`) with unique constraints.
- **Stream Module** (`/api/streams`): Academic streams (`Science`, `Commerce`, `Arts`) linked via `ObjectId` to Qualifications.
- **Pathway Module** (`/api/pathways`): Multi-step sequential roadmap milestones linked to Qualification and Stream.
- **City Module** (`/api/cities`): Geographic lookup directory (`Ahmedabad`, `Vadodara`, `Surat`, `Rajkot`, `Gandhinagar`).
- **Course Module** (`/api/courses`): Degrees and diplomas (`BCA`, `B.Tech`, `B.Com`, `BBA`, `BA`, `MBBS`, `Diploma`).
- **Institution Module** (`/api/institutions`): Colleges and universities referencing City and Courses Offered.
- **Career Module** (`/api/careers`): Industry professions with skill chips, salary ranges, and qualifying course relations.
- **Guidance Aggregator Engine** (`/api/guidance` & `/api/guidance/summary`): BFF (Backend-For-Frontend) endpoint assembling full roadmaps in a single query.

### B. Frontend Student Experience
- **Interactive Guidance Explorer**: 2-step decision wizard (10th/12th + Stream picker).
- **Career Aptitude Decision Quiz**: 5-question personality/interest quiz with scoring engine and 1-click guidance transition.
- **Side-by-Side Degree Comparison Matrix**: Compares up to 3 courses simultaneously across duration, eligibility, subjects, and careers.
- **Personalized Student Shortlist**: Bookmarking tool with persistent `localStorage` synchronization.
- **Real-Time Live Search Bar**: Multi-field instant keyword search across all catalogs.
- **City & Institution Filter Pills**: Real-time filtering of colleges by location and institution type.
- **Guidance FAQ & Help Center**: Categorized accordions answering critical admission & eligibility questions.

---

## 6. Project Directory Structure

```
FuturePath/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── AptitudeQuiz.jsx        # 5-question career assessment quiz
│   │   │   ├── BookmarksView.jsx       # Student shortlist management view
│   │   │   ├── CareerCard.jsx          # Career opportunity card
│   │   │   ├── CompareFloatingBar.jsx  # Active comparison floating bar
│   │   │   ├── CompareModal.jsx        # Side-by-side course comparison table
│   │   │   ├── CourseCard.jsx          # Degree/Diploma card
│   │   │   ├── FAQView.jsx             # Categorized accordion FAQ help center
│   │   │   ├── Footer.jsx              # Responsive academic portal footer
│   │   │   ├── GuidanceWizard.jsx      # 2-step decision guidance wizard
│   │   │   ├── Hero.jsx                # Hero banner with live counters
│   │   │   ├── InstitutionCard.jsx     # College & university card
│   │   │   ├── Navbar.jsx              # Sticky header with navigation & badges
│   │   │   └── PathwayCard.jsx         # Milestone timeline roadmap card
│   │   ├── hooks/
│   │   │   └── useBookmarks.js         # localStorage bookmark persistence hook
│   │   ├── services/
│   │   │   └── api.js                  # Centralized HTTP API client
│   │   ├── App.jsx                     # Main root application orchestrator
│   │   ├── index.css                   # Custom Vanilla CSS design system
│   │   └── main.jsx                    # React entrypoint
│   ├── index.html                      # HTML template with Google Fonts & SEO
│   ├── package.json                    # Client dependencies & scripts
│   └── vite.config.js                  # Vite configuration
│
├── server/                     # Backend API (Node.js + Express 5 + MongoDB)
│   ├── config/
│   │   ├── database.js                 # Mongoose connection configuration
│   │   └── seed.js                     # Realistic Gujarat/India academic seeder
│   ├── controllers/            # Controller logic for all 8 resources
│   │   ├── careerController.js
│   │   ├── cityController.js
│   │   ├── courseController.js
│   │   ├── guidanceController.js
│   │   ├── institutionController.js
│   │   ├── pathwayController.js
│   │   ├── qualificationController.js
│   │   └── streamController.js
│   ├── models/                 # Mongoose Schemas & Models
│   │   ├── Career.js
│   │   ├── City.js
│   │   ├── Course.js
│   │   ├── Institution.js
│   │   ├── Pathway.js
│   │   ├── Qualification.js
│   │   └── Stream.js
│   ├── routes/                 # Express REST Endpoints
│   │   ├── careerRoutes.js
│   │   ├── cityRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── guidanceRoutes.js
│   │   ├── institutionRoutes.js
│   │   ├── pathwayRoutes.js
│   │   ├── qualificationRoutes.js
│   │   └── streamRoutes.js
│   ├── .env                    # Environment variables (PORT, MONGODB_URI)
│   ├── package.json            # Server dependencies & scripts
│   └── server.js               # Main Express server entrypoint
│
└── README.md                   # Full Project Documentation
```

---

## 7. Prerequisites & Environment Setup

### Prerequisites
- **Node.js**: `v18.x` or higher (Recommended: LTS v20+)
- **npm**: `v9.x` or higher
- **MongoDB Community Server**: Running locally on port `27017` (or MongoDB Atlas connection string)

### Backend Environment Configuration
The backend requires a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/futurepath
```

---

## 8. Installation & Running Guide

### Step 1: Install Dependencies

Open two terminal windows or run sequentially:

```bash
# 1. Install Backend Dependencies
cd D:\FuturePath\server
npm install

# 2. Install Frontend Dependencies
cd D:\FuturePath\client
npm install
```

### Step 2: Seed the Database with Realistic Data

Populate MongoDB with verified qualifications, streams, roadmaps, degrees, colleges, and career trajectories:

```bash
cd D:\FuturePath\server
npm run seed
```

*Expected output:*
```text
Connecting to MongoDB: mongodb://127.0.0.1:27017/futurepath
MongoDB connected for seeding.
Clearing existing data...
Seeding Qualifications...
Seeding Streams...
Seeding Cities...
Seeding Courses...
Seeding Pathways...
Seeding Careers...
Seeding Institutions...
DATABASE SEEDING COMPLETED SUCCESSFULLY!
```

### Step 3: Start the Backend Server

```bash
cd D:\FuturePath\server
npm start
```
*Server starts on `http://localhost:5000` (MongoDB Connected).*

### Step 4: Start the Frontend Application

```bash
cd D:\FuturePath\client
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 9. REST API Reference

**Base URL**: `http://localhost:5000/api`

| Endpoint | Method | Description |
|---|---|---|
| `/health` | `GET` | API Health check & uptime status |
| `/guidance/summary` | `GET` | Aggregated portal metrics (counts of roadmaps, courses, colleges, careers) |
| `/guidance?qualification=...&stream=...` | `GET` | Aggregated roadmap guidance engine |
| `/qualifications` | `GET`, `POST` | Get all or create qualification (10th/12th) |
| `/qualifications/:id` | `GET`, `PUT`, `DELETE` | Single qualification CRUD |
| `/streams` | `GET`, `POST` | Get all streams (supports `?qualification=ID`) or create stream |
| `/streams/:id` | `GET`, `PUT`, `DELETE` | Single stream CRUD (with populated qualification) |
| `/pathways` | `GET`, `POST` | Get all roadmaps or create pathway |
| `/pathways/:id` | `GET`, `PUT`, `DELETE` | Single pathway CRUD (double-populates qualification & stream) |
| `/courses` | `GET`, `POST` | Get all degree/diploma programs or create course |
| `/courses/:id` | `GET`, `PUT`, `DELETE` | Single course CRUD |
| `/careers` | `GET`, `POST` | Get all career profiles or create career |
| `/careers/:id` | `GET`, `PUT`, `DELETE` | Single career CRUD (with populated related courses) |
| `/institutions` | `GET`, `POST` | Get all colleges/universities or create institution |
| `/institutions/:id` | `GET`, `PUT`, `DELETE` | Single institution CRUD (populates city and courses offered) |
| `/cities` | `GET`, `POST` | Get all cities or create city |
| `/cities/:id` | `GET`, `PUT`, `DELETE` | Single city CRUD |

---

## 10. Student User Workflows

1. **Category Selection**: Student arrives on Home page, views real-time portal statistics, and clicks *"I Passed 10th"* or *"I Passed 12th"*.
2. **Interactive Stream Explorer**:
   - For **10th Pass**: Immediately shows Polytechnic Diploma options, ITI, D2D Engineering roadmaps, and Diploma programs in Ahmedabad/Gujarat.
   - For **12th Pass**: Student selects stream (`Science`, `Commerce`, `Arts`, `All`).
3. **Multi-Tab Evaluation**:
   - **Roadmaps Tab**: Explores chronological milestone progressions (e.g. 10th → Diploma → D2D Degree → SDE).
   - **Degree Programs Tab**: Inspects course durations, eligibility rules, and subjects.
   - **Career Opportunities Tab**: Reviews salary projections, in-demand skills, and job roles.
   - **Colleges Tab**: Filters institutions by city (*Ahmedabad*, *Vadodara*, *Surat*) and type (*College*, *University*, *Polytechnic*).
4. **Interactive Career Quiz**: Confused students take the 5-question aptitude assessment to find their percentage alignment match and jump directly to recommended roadmaps.
5. **Course Comparison**: Student selects 2-3 degrees (e.g. *BCA vs B.Tech CSE*) to compare eligibility and subjects side-by-side.
6. **Shortlisting**: Student clicks `⭐ Save` on desired roadmaps and colleges to maintain a personalized plan in the `⭐ Shortlist` tab.

---

## 11. Viva & Examination Defense Notes (AWD BCA Sem 5)

### Q1: Why use Mongoose `populate()` instead of embedding all documents?
> **Answer**: Embedding leads to large, redundant, and inconsistent data. By keeping normalized collections (`Qualification`, `Stream`, `City`, `Course`) and referencing them via `mongoose.Schema.Types.ObjectId`, we maintain relational integrity (e.g., updating a Course title updates it across all Colleges and Careers referencing it). Mongoose `.populate()` performs referenced document joins seamlessly.

### Q2: How does the Guidance Engine (`/api/guidance`) work?
> **Answer**: It implements the **Backend-For-Frontend (BFF)** pattern. Instead of the React frontend initiating 5 separate HTTP calls to fetch qualifications, streams, pathways, courses, and institutions, `/api/guidance` executes parallel database queries on the server and returns a single optimized JSON payload, eliminating network latency.

### Q3: Why is Vanilla CSS used instead of TailwindCSS/Bootstrap?
> **Answer**: Vanilla CSS provides complete architectural control over design tokens (CSS custom properties), bespoke glassmorphism backdrop filters, custom scrollbars, and keyframe micro-animations without external framework bloat or build configuration overhead.

### Q4: How is student shortlisting persisted without user login?
> **Answer**: Through a custom React hook (`useBookmarks.js`) that encapsulates browser `localStorage` synchronization with `useState` and `useEffect`. Bookmarks persist across sessions and tab reloads automatically.

---

## 12. Troubleshooting & Common Questions

- **Error: `connect ECONNREFUSED 127.0.0.1:27017`**:
  - *Cause*: MongoDB service is not running.
  - *Fix*: Start MongoDB via Windows Services or run `net start MongoDB` in an administrator terminal.
- **Error: `EADDRINUSE: address already in use :::5000`**:
  - *Cause*: An existing Node.js instance is occupying port 5000.
  - *Fix*: Run `Get-NetTCPConnection -LocalPort 5000` and kill the associated PID, or restart the terminal.
- **Cross-Origin Request Blocked (CORS)**:
  - *Cause*: Express server missing CORS middleware.
  - *Fix*: `server.js` includes `cors()` middleware configured to accept client requests from `http://localhost:5173`.

---

## 13. Future Enhancements

- Student Authentication (JWT + bcryptjs) for cross-device cloud bookmark syncing.
- Admin CMS Dashboard for managing courses and institutions with role-based access control.
- PDF Roadmap Export enabling students to download personalized career roadmaps.

---

## 14. Project Credits

- **Project Name**: FuturePath – Student Education & Career Guidance Portal
- **Academic Level**: BCA Semester 5
- **Subject**: Advanced Web Designing (AWD)
- **Year**: 2026