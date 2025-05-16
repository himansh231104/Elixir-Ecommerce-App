const express = require("express");
const router = express.Router();
const {
  registerUser,
  deleteUser,
  loginUser,
  getUserProfile,
  updateUserProfile, 
  getUsers,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/", protect, admin, getUsers);

router.post("/register", registerUser);
router.delete("/:id", protect, admin, deleteUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile); // Protected Route
router.put("/profile", protect, updateUserProfile);

module.exports = router;
