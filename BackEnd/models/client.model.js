const mongoose = require("mongoose");

const clients = mongoose.model(
  "clients",
  new mongoose.Schema({
    last_name: String,
    name: String,
    tel: Number,
    adresse: String
  }, { timestamps: true })
  
);

module.exports = clients;