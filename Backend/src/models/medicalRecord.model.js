const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
{
    patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },
    title: {
    type: String,
    required: true,
    },
    description: String,
    file: String,
},
{ timestamps: true }
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);