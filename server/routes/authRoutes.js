const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  getAdminStats,
  getAllUsers,
  deleteUser,
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (requires login)
router.get("/me", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Admin-only routes
router.get("/admin/stats", protect, adminOnly, getAdminStats);
router.get("/admin/users", protect, adminOnly, getAllUsers);
router.delete("/admin/users/:id", protect, adminOnly, deleteUser);

module.exports = router;
