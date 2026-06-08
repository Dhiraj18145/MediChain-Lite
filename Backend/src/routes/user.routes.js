const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
} = require("../controllers/user.controller");

const { protect } = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.get("/", protect, authorizeRoles("admin", "doctor", "patient"), getAllUsers);

module.exports = router;
