const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
{
    doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    diagnosis: {
    type: String,
    required: true,
    },
    medicines: [
    {
        medicineName: String,
        dosage: String,
        timing: String,
        duration: String,
    },
    ],
    notes: String,
},
{ timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);