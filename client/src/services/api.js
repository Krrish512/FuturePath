const API_BASE_URL = "http://localhost:5000/api";

/**
 * Helper to perform HTTP GET requests
 */
async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || `HTTP Error ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Error on ${endpoint}:`, error);
        throw error;
    }
}

export const api = {
    // Guidance & Overview
    getSummary: () => fetchAPI("/guidance/summary"),
    getGuidance: (qualification, stream) => {
        let url = `/guidance?qualification=${encodeURIComponent(qualification)}`;
        if (stream && stream !== "All") {
            url += `&stream=${encodeURIComponent(stream)}`;
        }
        return fetchAPI(url);
    },

    // Master Entities
    getQualifications: () => fetchAPI("/qualifications"),
    getStreams: (qualId) => fetchAPI(`/streams${qualId ? `?qualification=${qualId}` : ""}`),
    getPathways: () => fetchAPI("/pathways"),
    getCourses: () => fetchAPI("/courses"),
    getInstitutions: () => fetchAPI("/institutions"),
    getCareers: () => fetchAPI("/careers"),
    getCities: () => fetchAPI("/cities")
};
