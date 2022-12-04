const mongoose = require("mongoose");

const distributors = mongoose.model(
    "distributors",
    new mongoose.Schema({
        last_name: String,
        name: String,
        tel: Number,
        address: String
    }, { timestamps: true })

);

module.exports = distributors;