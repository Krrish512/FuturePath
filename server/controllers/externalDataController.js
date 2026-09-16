const { getEducationUpdates, clearCache } = require("../services/externalDataService");

/**
 * @desc   Get live / external education updates and official notifications
 * @route  GET /api/updates
 * @access Public
 */
exports.getUpdates = async (req, res) => {
    try {
        const result = await getEducationUpdates();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching education updates:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve education updates",
            error: error.message
        });
    }
};

/**
 * @desc   Clear cache and force refresh external updates
 * @route  POST /api/updates/refresh
 * @access Public / Admin
 */
exports.refreshUpdates = async (req, res) => {
    try {
        clearCache();
        const result = await getEducationUpdates();
        res.status(200).json({
            success: true,
            message: "External data cache refreshed successfully",
            data: result
        });
    } catch (error) {
        console.error("Error refreshing education updates:", error);
        res.status(500).json({
            success: false,
            message: "Failed to refresh education updates",
            error: error.message
        });
    }
};
