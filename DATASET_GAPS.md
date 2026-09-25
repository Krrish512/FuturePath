# FuturePath Dataset Gaps & Roadmap

This document outlines known gaps, pending university syllabus releases, and planned expansions for subsequent dataset phases.

---

## 1. Curriculum Gaps (Under NEP 2020 Rollout)

### A. Higher Semester Curriculum (Semesters 5 to 8)
- **Status:** In Progress across Gujarat State Universities.
- **Details:** With the phased introduction of the National Education Policy (NEP 2020) Four-Year Undergraduate Programme (FYUGP) framework starting from AY 2023-24, universities have published formal subject structures primarily for Semesters 1 through 4. Semesters 5 through 8 (comprising advanced electives, on-the-job training (OJT), and research dissertations) are released progressively as student batches advance.
- **Action Plan:** Monitor official syllabus portals quarterly for newly gazetted NEP semester syllabi.

### B. Specialized / Postgraduate Subjects
- **Status:** Course-level metadata fully verified (`duration`, `eligibility`, `level`, `field_of_study`); detailed semester subject mapping prioritized for core UG tracks in Phase 1.
- **Action Plan:** In Phase 2, expand detailed semester-by-semester subject rows for PG programmes (MCA, M.Sc IT, MBA, M.Com) across all four universities.

---

## 2. Institution & Affiliation Mapping (Phase 1B)
- **Status:** `Institutions.csv` and `Course_Institution.csv` schemas initialized with clean headers.
- **Details:** Direct college affiliations (e.g. government colleges, grant-in-aid colleges, self-financed institutes under GU, VNSGU, SPU, KSV) will be populated during Phase 1B along with approved seat intake and ACPC admission quotas.
- **Action Plan:** Map affiliated colleges and intake numbers using ACPC Gujarat and university college registers.

---

## 3. Poly-Technic Diploma & Vocational Programs
- **Status:** Identified for future phase expansion.
- **Details:** B.Voc and Polytechnic Diploma courses (administered via ACPDC) will be structured in Phase 2 for students transitioning post-10th standard.
