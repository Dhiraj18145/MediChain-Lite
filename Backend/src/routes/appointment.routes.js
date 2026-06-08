const express = require("express");
const router = express.Router();
const { createAppointment, getAppointments, updateAppointmentStatus } = require("../controllers/appointment.controller");
const { protect } = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.get("/", protect, getAppointments);
router.post("/", protect, authorizeRoles("patient"), createAppointment);
router.put("/:id", protect, authorizeRoles("doctor", "admin"), updateAppointmentStatus);

module.exports = router;