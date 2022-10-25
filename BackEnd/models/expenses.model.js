const mongoose = require("mongoose");

const expenses = mongoose.model(
  "expenses",
  new mongoose.Schema({
    amount: {
      type: String
  },
  dateSpent: {
       type: Date
  },
  purpose: {
      type: String
  },
  category: {
      type: String
  },
  createdby:{
      type:String
  },
  lastupdateddate:{
      type: Date
  },
  status: {
      type: String
  }
  }, { timestamps: true })
  
);

module.exports = expenses;