/**
 * External Education Data Service
 * 
 * Integrates with official government data sources for live education updates.
 * Features:
 *   - data.gov.in integration with timeout & error handling
 *   - Curated official government educational notification portals (ACPC, GSEB, AICTE, UGC, NTA, NSP)
 *   - In-memory cache with TTL (30 minutes)
 *   - Graceful fallback and clear status indicators
 */

// In-memory cache for external data
let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Official verified government education portals & notification channels
 */
const OFFICIAL_PORTALS = [
  {
    id: "portal-acpc",
    title: "ACPC Gujarat (Admission Committee for Professional Courses)",
    category: "Admissions",
    description: "Centralized counselling & admissions for Engineering, Pharmacy, MBA, MCA, and Polytechnic in Gujarat.",
    authority: "Government of Gujarat",
    url: "https://acpc.gujarat.gov.in",
    badge: "Gujarat State",
    featured: true
  },
  {
    id: "portal-gseb",
    title: "GSEB (Gujarat Secondary and Higher Secondary Education Board)",
    category: "Examinations",
    description: "Official 10th (SSC) & 12th (HSC) board results, timetable notifications, syllabus updates and circulars.",
    authority: "Education Dept, Gujarat",
    url: "https://www.gseb.org",
    badge: "Board Official",
    featured: true
  },
  {
    id: "portal-nsp",
    title: "National Scholarship Portal (NSP - MoE)",
    category: "Scholarships",
    description: "Single-window digital platform for Central, UGC, AICTE, and State scholarship schemes for students.",
    authority: "Ministry of Electronics & IT / Ministry of Education",
    url: "https://scholarships.gov.in",
    badge: "Financial Aid",
    featured: true
  },
  {
    id: "portal-nta",
    title: "National Testing Agency (NTA)",
    category: "Entrance Exams",
    description: "Official examination portal for JEE Main, NEET UG, CUET UG/PG, CMAT, and GPAT.",
    authority: "Ministry of Education, Govt of India",
    url: "https://nta.ac.in",
    badge: "National Exams",
    featured: true
  },
  {
    id: "portal-aicte",
    title: "AICTE Portal (All India Council for Technical Education)",
    category: "Accreditation",
    description: "Approved technical colleges, syllabus standards, Pragati & Saksham scholarship guidelines.",
    authority: "Statutory Body, Govt of India",
    url: "https://www.aicte-india.org",
    badge: "Technical Ed",
    featured: false
  },
  {
    id: "portal-ugc",
    title: "UGC (University Grants Commission) e-Samadhan",
    category: "Higher Education",
    description: "University recognitions, autonomous college listings, student grievance redressing, and NEP guidelines.",
    authority: "Govt of India",
    url: "https://www.ugc.gov.in",
    badge: "Universities",
    featured: false
  },
  {
    id: "portal-mysy",
    title: "MYSY (Mukhyamantri Yuva Swavalamban Yojana)",
    category: "Scholarships",
    description: "Higher education fee assistance & hostel subsidies for bright students across Gujarat.",
    authority: "KCG / Education Dept, Gujarat",
    url: "https://mysy.guj.nic.in",
    badge: "Gujarat Aid",
    featured: true
  },
  {
    id: "portal-digilocker",
    title: "DigiLocker NAD (National Academic Depository)",
    category: "Digital Services",
    description: "Access official digital marksheets, degrees, and certificates verified directly by issuing boards and universities.",
    authority: "Digital India initiative",
    url: "https://www.digilocker.gov.in",
    badge: "Govt Verified",
    featured: false
  }
];

/**
 * Check if cached data is still valid
 */
function isCacheValid() {
  if (!cachedData || !cacheTimestamp) return false;
  return (Date.now() - cacheTimestamp) < CACHE_DURATION_MS;
}

/**
 * Fetch education updates from data.gov.in
 */
async function fetchFromDataGovIn(apiKey) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const url = `https://api.data.gov.in/resource/9115b836-1f0b-4137-a673-12706eeb8e19?api-key=${apiKey}&format=json&limit=10`;

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "Accept": "application/json" },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`data.gov.in responded with status ${response.status}`);
    }

    const data = await response.json();
    return {
      source: "data.gov.in",
      sourceUrl: "https://data.gov.in",
      raw: data,
    };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("External API request timed out (8s)");
    }
    throw error;
  }
}

/**
 * Transform raw external data into standardized update format
 */
function transformToUpdates(rawResult) {
  if (!rawResult || !rawResult.raw) return [];

  const updates = [];

  if (rawResult.source === "data.gov.in" && rawResult.raw.records) {
    rawResult.raw.records.forEach((record, index) => {
      updates.push({
        id: `dgov-${index}`,
        title: record.institute_name || record.title || `Education Dataset Record ${index + 1}`,
        category: "Government Data",
        description: record.state
          ? `Accredited institution record from ${record.state}, ${record.district || ""}`
          : "Official government education dataset entry",
        date: new Date().toISOString().split("T")[0],
        source: "data.gov.in",
        sourceUrl: "https://data.gov.in",
      });
    });
  }

  return updates;
}

/**
 * Main function to get education updates
 */
async function getEducationUpdates() {
  const apiKey = process.env.DATA_GOV_IN_API_KEY;

  // Base response with official verified portals always available
  const baseResult = {
    officialPortals: OFFICIAL_PORTALS,
    totalPortals: OFFICIAL_PORTALS.length,
    timestamp: new Date().toISOString(),
  };

  // If no API key is configured, return official portals with clear configuration notice
  if (!apiKey) {
    return {
      success: true,
      configured: false,
      message: "Live data.gov.in API key not configured. Official verified education portals and government notice channels are active.",
      updates: [],
      ...baseResult,
      source: "Official Verified Government Channels",
      cachedAt: null,
    };
  }

  // Return cached data if still valid
  if (isCacheValid()) {
    return {
      success: true,
      configured: true,
      updates: cachedData,
      ...baseResult,
      source: "data.gov.in",
      cachedAt: new Date(cacheTimestamp).toISOString(),
      fromCache: true,
    };
  }

  // Fetch fresh data
  try {
    const rawResult = await fetchFromDataGovIn(apiKey);
    const updates = transformToUpdates(rawResult);

    // Update cache
    cachedData = updates;
    cacheTimestamp = Date.now();

    return {
      success: true,
      configured: true,
      updates,
      ...baseResult,
      source: "data.gov.in",
      cachedAt: new Date(cacheTimestamp).toISOString(),
      fromCache: false,
    };
  } catch (error) {
    console.error("External data fetch failed:", error.message);

    if (cachedData) {
      return {
        success: true,
        configured: true,
        updates: cachedData,
        ...baseResult,
        source: "data.gov.in",
        cachedAt: new Date(cacheTimestamp).toISOString(),
        fromCache: true,
        warning: "Using cached data. Live fetch failed: " + error.message,
      };
    }

    return {
      success: true,
      configured: true,
      message: "Unable to fetch live updates from data.gov.in: " + error.message,
      updates: [],
      ...baseResult,
      source: "Official Verified Government Channels",
      cachedAt: null,
    };
  }
}

/**
 * Clear the in-memory cache
 */
function clearCache() {
  cachedData = null;
  cacheTimestamp = null;
}

module.exports = {
  getEducationUpdates,
  clearCache,
  OFFICIAL_PORTALS
};
