const Medicine = require("../models/medicine.model");

const addMedicine = async (req, res) => {
  const medicine = await Medicine.create(req.body);
  res.status(201).json(medicine);
};

const getMedicines = async (req, res) => {
  const medicines = await Medicine.find().sort({ createdAt: -1 });
  res.json(medicines);
};

const updateMedicine = async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);

  if (!medicine) {
    return res.status(404).json({ message: "Medicine not found" });
  }

  Object.assign(medicine, req.body);
  const updatedMedicine = await medicine.save();
  res.json(updatedMedicine);
};

const deleteMedicine = async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);

  if (!medicine) {
    return res.status(404).json({ message: "Medicine not found" });
  }

  await medicine.deleteOne();
  res.json({ message: "Medicine deleted successfully" });
};

module.exports = {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
};