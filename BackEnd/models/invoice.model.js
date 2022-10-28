const mongoose = require("mongoose");
const invoices = mongoose.model(
    "invoice",
    new mongoose.Schema({
        dueDate: Date,
        currency: String,
        items: [{ itemName: String, unitPrice: String, quantity: String, discount: String }],
        rates: String,
        vat: Number,
        total: Number,
        subTotal: Number,
        notes: String,
        status: String,
        invoiceNumber: String,
        type: String,
        creator: [String],
        totalAmountReceived: Number,
        client: { last_name: String, name: String, tel: String, email: String, address: String },
        paymentRecords: [{ amountPaid: Number, datePaid: Date, paymentMethod: String, note: String, paidBy: String }],
        createdAt: {
            type: Date,
            default: new Date()
        }
    })
);

module.exports = invoices;