const mongoose = require("mongoose");

const stocks = mongoose.model(
    "stocks",
    new mongoose.Schema({
        total: {
            type: String
        },
        category: {
            type: String
        },
        updatedby: {
            type: String
        },
        /*lastupdateddate: {
            type: Date
        },*/
        status: {
            type: String
        }
    }, { timestamps: true })

);

module.exports = stocks;