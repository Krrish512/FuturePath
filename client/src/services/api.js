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

    // Master Entities
    getQualifications: () => fetchAPI("/qualifications"),
    getStreams: (qualId) => fetchAPI(`/streams${qualId ? `?qualification=${qualId}` : ""}`),
    getPathways: () => fetchAPI("/pathways"),
    getCourses: () => fetchAPI("/courses"),
    getInstitutions: () => fetchAPI("/institutions"),
    getCareers: () => fetchAPI("/careers"),
    getCities: () => fetchAPI("/cities"),

    // Authentication
    register: (data) => mutateAPI("/auth/register", "POST", data),
    login: (data) => mutateAPI("/auth/login", "POST", data),
    getProfile: () => fetchAPI("/auth/me", true),
    updateProfile: (data) => mutateAPI("/auth/profile", "PUT", data, true),

    // Admin
    getAdminStats: () => fetchAPI("/auth/admin/stats", true),
    getAdminUsers: () => fetchAPI("/auth/admin/users", true),
    deleteUser: (id) => mutateAPI(`/auth/admin/users/${id}`, "DELETE", null, true),

    // Live / External Education Updates
    getEducationUpdates: () => fetchAPI("/updates"),
    refreshEducationUpdates: () => mutateAPI("/updates/refresh", "POST"),
};
