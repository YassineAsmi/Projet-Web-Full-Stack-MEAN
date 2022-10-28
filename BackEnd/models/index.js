const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.client = require("./client.model");
db.distributor = require("./distributor.model");
db.expenses = require("./expenses.model");
db.stocks = require("./stocks.model");
db.invoices = require("./invoice.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;