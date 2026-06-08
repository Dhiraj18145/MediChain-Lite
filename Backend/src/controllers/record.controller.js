const MedicalRecord = require("../models/medicalRecord.model");

const uploadRecord = async (req, res) => {
const record = await MedicalRecord.create({
    patient: req.body.patient,
    doctor: req.user._id,
    title: req.body.title,
    description: req.body.description,
    file: req.file ? req.file.filename : "",
});

res.status(201).json(record);
};

const getRecords = async (req, res) => {
let records;

if (req.user.role === "patient") {
    records = await MedicalRecord.find({ patient: req.user._id })
    .populate("doctor", "name email");
} else if (req.user.role === "doctor") {
    records = await MedicalRecord.find({ doctor: req.user._id })
    .populate("patient", "name email");
} else {
    records = await MedicalRecord.find()
    .populate("doctor", "name email")
    .populate("patient", "name email");
}

res.json(records);
};
module.exports = { uploadRecord, getRecords };