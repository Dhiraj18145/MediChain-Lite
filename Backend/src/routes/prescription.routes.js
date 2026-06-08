const express = require("express");
const router = express.Router();
const { createPrescription, getMyPrescriptions } = require("../controllers/prescription.controller");
const { protect } = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.get("/", protect, getMyPrescriptions);
router.post("/", protect, authorizeRoles("doctor"), createPrescription);

module.exports = router;