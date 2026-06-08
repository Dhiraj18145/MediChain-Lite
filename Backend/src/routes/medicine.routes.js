const express = require("express");
const router = express.Router();

const {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicine.controller");


const { protect } = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router
  .route("/")
  .get(protect, getMedicines)
  .post(protect, authorizeRoles("admin"), addMedicine);

router
  .route("/:id")
  .put(protect, authorizeRoles("admin"), updateMedicine)
  .delete(protect, authorizeRoles("admin"), deleteMedicine);

module.exports = router;