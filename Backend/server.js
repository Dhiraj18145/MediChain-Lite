const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/error.middleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/users", require("./src/routes/user.routes"));
app.use("/api/medicines", require("./src/routes/medicine.routes"));
app.use("/api/prescriptions", require("./src/routes/prescription.routes"));
app.use("/api/records", require("./src/routes/record.routes"));
app.use("/api/appointments", require("./src/routes/appointment.routes"));

app.get("/", (req, res) => {
res.send("MediChain Lite API is running...");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
