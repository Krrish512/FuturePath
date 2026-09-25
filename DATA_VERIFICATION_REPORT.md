# FuturePath Data Verification Report

## Overview
This report tracks the audit and expansion of the Gujarat Education Master Dataset for the FuturePath Portal across all project phases.

---

## Phase 1 — Course & Curriculum Expansion

### 1. Dataset Scale Summary
- **Number of courses before:** 0 (Initial Master CSV creation)
- **Number of courses after:** 48
- **Number of new courses added:** 48
- **Number of curriculum rows before:** 0
- **Number of curriculum rows after:** 58
- **Number of new curriculum rows added:** 58

### 2. Courses by University
| University ID | University Name | Courses Count | Curriculum Rows |
|---|---|---|---|
| `UNI001` | Gujarat University (GU) | 12 | 19 |
| `UNI002` | Veer Narmad South Gujarat University (VNSGU) | 12 | 10 |
| `UNI003` | Sardar Patel University (SPU) | 11 | 19 |
| `UNI004` | Kadi Sarva Vishwavidyalaya (KSV) | 13 | 10 |
| **Total** | **4 Universities** | **48** | **58** |

### 3. Courses by Level
- **Undergraduate (UG):** 32 courses
- **Postgraduate (PG):** 14 courses
- **Integrated (UG+PG):** 2 courses

### 4. Verification Status Distribution
| Status | Courses Count | Curriculum Count |
|---|---|---|
| `VERIFIED` | 48 (100%) | 58 (100%) |
| `PARTIALLY_VERIFIED` | 0 (0%) | 0 (0%) |
| `NOT_VERIFIED` | 0 (0%) | 0 (0%) |

### 5. Missing / In-Progress Data Gaps
- **Missing Upper Semester Curriculum:** 
  - For 4-Year NEP FYUGP degrees (BCA Honours, B.Com, BBA), Semesters 5 to 8 will be officially rolled out and published by the respective universities as the current NEP cohort advances.
  - Courses with detailed Sem 1–2 curriculum mapped: VNSGU BCA (Honours), GU BCA (Honours), GU B.Com NEP, GU BBA NEP, SPU BCA NEP, SPU B.Sc NEP, SPU B.Com NEP, KSV BCA NEP.
  - Non-curriculum mapped courses (e.g. specialized PG/UG courses) currently have course-level metadata verified and will receive detailed subject lists in subsequent curriculum releases.
- **Missing Eligibility / Duration:**
  - **Zero missing:** All 48 course records have 100% verified duration and eligibility directly referenced from official university ordinances, admission guidelines, and syllabus PDFs.

### 6. Official Sources Used
1. **Veer Narmad South Gujarat University (VNSGU):**
   - Official Portal: [https://vnsgu.ac.in](https://vnsgu.ac.in)
   - Syllabus Repository: [https://vnsgu.ac.in/syllabus](https://vnsgu.ac.in/syllabus)
2. **Gujarat University (GU):**
   - Official Portal: [https://www.gujaratuniversity.ac.in](https://www.gujaratuniversity.ac.in)
   - NEP Syllabus Portal: [https://www.gujaratuniversity.ac.in/nepsyllabus](https://www.gujaratuniversity.ac.in/nepsyllabus)
3. **Sardar Patel University (SPU):**
   - Official Portal: [https://www.spuvvn.edu](https://www.spuvvn.edu)
   - NEP Syllabi Section: [https://www.spuvvn.edu/students_corner/syllabi/](https://www.spuvvn.edu/students_corner/syllabi/)
4. **Kadi Sarva Vishwavidyalaya (KSV):**
   - Official Portal: [https://ksv.ac.in](https://ksv.ac.in)
   - Academic & NEP Schemes: [https://ksv.ac.in/nep-syallabus](https://ksv.ac.in/nep-syallabus)

---

## Data Integrity Compliance Checklist
- [x] All course IDs are stable and sequential (`COURSE001` to `COURSE048`).
- [x] All curriculum IDs are sequential (`CURR001` to `CURR058`).
- [x] Zero duplicate course records (`university_id` + normalized `course_name`).
- [x] Zero duplicate curriculum records (`university_id` + `course_id` + `academic_year` + `semester_number` + `subject_code` + `subject_name`).
- [x] Strict adherence to official university terminology (Major, Minor, MDC, AEC, SEC, VAC, IKS).
- [x] UTF-8 RFC 4180 CSV compliance validated programmatically with zero errors.
