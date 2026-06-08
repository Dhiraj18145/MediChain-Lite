const Prescription = require("../models/prescription.model");

const createPrescription = async (req, res) => {
const { patient, diagnosis, medicines, notes } = req.body;

const prescription = await Prescription.create({
    doctor: req.user._id,
    patient,
    diagnosis,
    medicines,
    notes,
});

res.status(201).json(prescription);
};

const getMyPrescriptions = async (req, res) => {
let prescriptions;

if (req.user.role === "patient") {
    prescriptions = await Prescription.find({ patient: req.user._id })
    .populate("doctor", "name email")
    .sort({ createdAt: -1 });
} else if (req.user.role === "doctor") {
    prescriptions = await Prescription.find({ doctor: req.user._id })
    .populate("patient", "name email")
    .sort({ createdAt: -1 });
} else {
    prescriptions = await Prescription.find()
    .populate("doctor", "name email")
    .populate("patient", "name email")
    .sort({ createdAt: -1 });
}

res.json(prescriptions);
};

module.exports = { createPrescription, getMyPrescriptions }