const User = require("../models/User");
const { generateToken } = require("../middleware/auth");

/**
 * POST /api/auth/register
 * Register a new student account
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, qualification, interests } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // Create new user (role defaults to 'student')
    const user = await User.create({
      name,
      email,
      password,
      qualification: qualification || "",
      interests: interests || [],
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        qualification: user.qualification,
        interests: user.interests,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

/**
 * POST /api/auth/login
 * Authenticate user and return token
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        qualification: user.qualification,
        interests: user.interests,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

/**
 * GET /api/auth/me
 * Get current logged-in user profile
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        qualification: user.qualification,
        interests: user.interests,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

/**
 * PUT /api/auth/profile
 * Update user profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, qualification, interests } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (qualification !== undefined) updateData.qualification = qualification;
    if (interests !== undefined) updateData.interests = interests;

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        qualification: user.qualification,
        interests: user.interests,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

/**
 * GET /api/auth/admin/stats
 * Admin dashboard statistics
 */
exports.getAdminStats = async (req, res) => {
  try {
    const User = require("../models/User");
    const Course = require("../models/Course");
    const Institution = require("../models/Institution");
    const Career = require("../models/Career");
    const Pathway = require("../models/Pathway");
    const Qualification = require("../models/Qualification");
    const Stream = require("../models/Stream");
    const City = require("../models/City");

    const [
      totalUsers,
      totalStudents,
      totalAdmins,
      totalCourses,
      totalInstitutions,
      totalCareers,
      totalPathways,
      totalQualifications,
      totalStreams,
      totalCities,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "admin" }),
      Course.countDocuments(),
      Institution.countDocuments(),
      Career.countDocuments(),
      Pathway.countDocuments(),
      Qualification.countDocuments(),
      Stream.countDocuments(),
      City.countDocuments(),
    ]);

    // Recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role createdAt");

    res.json({
      success: true,
      stats: {
        users: { total: totalUsers, students: totalStudents, admins: totalAdmins },
        content: {
          courses: totalCourses,
          institutions: totalInstitutions,
          careers: totalCareers,
          pathways: totalPathways,
          qualifications: totalQualifications,
          streams: totalStreams,
          cities: totalCities,
        },
      },
      recentUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin stats",
      error: error.message,
    });
  }
};

/**
 * GET /api/auth/admin/users
 * Get all users (admin only)
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("name email role qualification interests createdAt");

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/auth/admin/users/:id
 * Delete a user (admin only)
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own admin account",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
