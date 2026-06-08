const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
const { name, email, password, role } = req.body;

const userExists = await User.findOne({ email });
if (userExists) {
    return res.status(400).json({ message: "User already exists" });
}

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "patient",
});

res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
});
};

const loginUser = async (req, res) => {
const { email, password } = req.body;

const user = await User.findOne({ email });
if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
return res.status(400).json({ message: "Invalid credentials" });
}

res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
});
};

module.exports = { registerUser, loginUser }