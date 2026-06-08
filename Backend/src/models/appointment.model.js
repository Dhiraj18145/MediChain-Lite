const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
{
    patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    appointmentDate: {
    type: Date,
    required: true,
    },
    reason: String,
    status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending",
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
