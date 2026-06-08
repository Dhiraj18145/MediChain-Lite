const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
{
    name: {
    type: String,
    required: true,
    },
    company: String,
    stock: {
    type: Number,
    default: 0,
    },
    price: Number,
    description: String,
},
{ timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);