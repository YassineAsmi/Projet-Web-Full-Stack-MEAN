const mongoose = require("mongoose");
const InvoiceModel = require("../models/invoice.model");


exports.getInvoicesByUser = async(req, res) => {
    try {
        const invoices = await InvoiceModel.find({ creator: req.params.name });

        res.status(200).json({ data: invoices });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getTotalCount = async(req, res) => {
    console.log('count', req.params.count)

    try {
        // const invoices = await InvoiceModel.find({ creator: searchQuery });
        const totalCount = await InvoiceModel.countDocuments({ creator: req.parmas.count });

        res.status(200).json(totalCount);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getInvoices = async(req, res) => {
    try {
        const allInvoices = await InvoiceModel.find({}).sort({ _id: -1 })

        res.status(200).json(allInvoices)
    } catch (error) {
        res.status(409).json(error.message)

    }
};
exports.createInvoice = (req, res) => {
    const invoice = req.body

    const newInvoice = new InvoiceModel(invoice)

    try {
        newInvoice.save()
        res.status(201).json(newInvoice)
    } catch (error) {
        res.status(409).json(error.message)
    }
};
exports.getInvoice = async(req, res) => {
    const { id } = req.params;

    try {
        const invoice = await InvoiceModel.findById(id);

        res.status(200).json(invoice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.updateInvoice = async(req, res) => {
    const { id: _id } = req.params
    const invoice = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(_id, {...invoice, _id }, { new: true })

    res.json(updatedInvoice)
}

exports.deleteInvoice = (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No invoice with that id')

    InvoiceModel.findByIdAndRemove(id)

    res.json({ message: 'Invoice deleted successfully' })
}