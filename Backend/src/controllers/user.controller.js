const User = require("../models/user.model");

const getMyProfile = async (req, res) => {
const user = await User.findById(req.user._id).select("-password");
res.json(user);
};

const updateMyProfile = async (req, res) => {
const user = await User.findById(req.user._id);

if (!user) {
    return res.status(404).json({ message: "User not found" });
}

user.name = req.body.name || user.name;
user.age = req.body.age || user.age;
user.gender = req.body.gender || user.gender;
user.phone = req.body.phone || user.phone;
user.address = req.body.address || user.address;
user.specialization = req.body.specialization || user.specialization;

const updatedUser = await user.save();
res.json(updatedUser);
};

const getAllUsers = async (req, res) => {
  let users;

  if (req.user.role === "admin") {
    users = await User.find().select("-password");
  } else if (req.user.role === "doctor") {
    users = await User.find({ role: "patient" }).select("-password");
  } else {
    users = await User.find({ role: "doctor" }).select("-password");
  }

  res.json(users);
};

module.exports = { getMyProfile, updateMyProfile, getAllUsers };
