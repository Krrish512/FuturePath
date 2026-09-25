const API_BASE_URL = "http://localhost:5000/api";

/**
 * Get stored auth token from localStorage
 */
function getToken() {
    return localStorage.getItem("futurepath_token");
}

/**
 * Helper to perform HTTP GET requests
 */
async function fetchAPI(endpoint, requiresAuth = false) {
    try {
        const headers = {};
        if (requiresAuth) {
            const token = getToken();
            if (token) headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
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

/**
 * Helper to perform HTTP POST/PUT/DELETE requests
 */
async function mutateAPI(endpoint, method = "POST", body = null, requiresAuth = false) {
    try {
        const headers = { "Content-Type": "application/json" };
        if (requiresAuth) {
            const token = getToken();
            if (token) headers["Authorization"] = `Bearer ${token}`;
        }

        const config = { method, headers };
        if (body) config.body = JSON.stringify(body);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || `HTTP Error ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Error on ${method} ${endpoint}:`, error);
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

    // Universities
    getUniversities: (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        return fetchAPI(`/universities${qs ? `?${qs}` : ""}`);
    },
    createUniversity: (data) => mutateAPI("/universities", "POST", data, true),
    updateUniversity: (id, data) => mutateAPI(`/universities/${id}`, "PUT", data, true),
    deleteUniversity: (id) => mutateAPI(`/universities/${id}`, "DELETE", null, true),

    // Courses
    getCourses: (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        return fetchAPI(`/courses${qs ? `?${qs}` : ""}`);
    },
    getCourse: (id) => fetchAPI(`/courses/${id}`),
    createCourse: (data) => mutateAPI("/courses", "POST", data, true),
    updateCourse: (id, data) => mutateAPI(`/courses/${id}`, "PUT", data, true),
    deleteCourse: (id) => mutateAPI(`/courses/${id}`, "DELETE", null, true),

    // Curriculum
    getCurriculum: (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        return fetchAPI(`/curriculum${qs ? `?${qs}` : ""}`);
    },
    createCurriculum: (data) => mutateAPI("/curriculum", "POST", data, true),
    updateCurriculum: (id, data) => mutateAPI(`/curriculum/${id}`, "PUT", data, true),
    deleteCurriculum: (id) => mutateAPI(`/curriculum/${id}`, "DELETE", null, true),

    // Institutions
    getInstitutions: (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        return fetchAPI(`/institutions${qs ? `?${qs}` : ""}`);
    },
    createInstitution: (data) => mutateAPI("/institutions", "POST", data, true),
    updateInstitution: (id, data) => mutateAPI(`/institutions/${id}`, "PUT", data, true),
    deleteInstitution: (id) => mutateAPI(`/institutions/${id}`, "DELETE", null, true),

    // Master Entities
    getQualifications: () => fetchAPI("/qualifications"),
    getStreams: (qualId) => fetchAPI(`/streams${qualId ? `?qualification=${qualId}` : ""}`),
    getPathways: () => fetchAPI("/pathways"),
    createPathway: (data) => mutateAPI("/pathways", "POST", data, true),
    updatePathway: (id, data) => mutateAPI(`/pathways/${id}`, "PUT", data, true),
    deletePathway: (id) => mutateAPI(`/pathways/${id}`, "DELETE", null, true),

    getCareers: () => fetchAPI("/careers"),
    createCareer: (data) => mutateAPI("/careers", "POST", data, true),
    updateCareer: (id, data) => mutateAPI(`/careers/${id}`, "PUT", data, true),
    deleteCareer: (id) => mutateAPI(`/careers/${id}`, "DELETE", null, true),

    getCities: () => fetchAPI("/cities"),
    createCity: (data) => mutateAPI("/cities", "POST", data, true),
    deleteCity: (id) => mutateAPI(`/cities/${id}`, "DELETE", null, true),

    // Authentication
    register: (data) => mutateAPI("/auth/register", "POST", data),
    login: (data) => mutateAPI("/auth/login", "POST", data),
    getProfile: () => fetchAPI("/auth/me", true),
    updateProfile: (data) => mutateAPI("/auth/profile", "PUT", data, true),

    // Admin & Analytics & Reports
    getAdminStats: () => fetchAPI("/auth/admin/stats", true),
    getAdminUsers: () => fetchAPI("/auth/admin/users", true),
    deleteUser: (id) => mutateAPI(`/auth/admin/users/${id}`, "DELETE", null, true),
    getAnalytics: () => fetchAPI("/analytics/dashboard"),
    generateReport: (data) => mutateAPI("/reports/generate", "POST", data),
};
