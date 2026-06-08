const Appointment = require("../models/appointment.model");

const createAppointment = async (req, res) => {
const { doctor, appointmentDate, reason } = req.body;

const appointment = await Appointment.create({
    patient: req.user._id,
    doctor,
    appointmentDate,
    reason,
});

res.status(201).json(appointment);
};

const getAppointments = async (req, res) => {
let appointments;

if (req.user.role === "patient") {
    appointments = await Appointment.find({ patient: req.user._id }).populate("doctor", "name email");
} else if (req.user.role === "doctor") {
    appointments = await Appointment.find({ doctor: req.user._id }).populate("patient", "name email");
} else {
    appointments = await Appointment.find()
    .populate("doctor", "name email")
    .populate("patient", "name email");
}

res.json(appointments);
};

const updateAppointmentStatus = async (req, res) => {
const appointment = await Appointment.findById(req.params.id);
if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
}

appointment.status = req.body.status || appointment.status;
const updated = await appointment.save();
res.json(updated);
};

module.exports = { createAppointment, getAppointments, updateAppointmentStatus };