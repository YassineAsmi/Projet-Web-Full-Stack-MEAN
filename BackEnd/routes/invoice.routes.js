const invoiceController = require('../controllers/invoice.controller');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();

    router.get('/count/:count', invoiceController.getTotalCount) // problem
    router.get('/:id', invoiceController.getInvoice)
    router.get('/user/:name', invoiceController.getInvoicesByUser)
    router.post('/', invoiceController.createInvoice)
    router.patch('/:id', invoiceController.updateInvoice)
    router.delete('/:id', invoiceController.deleteInvoice)


    app.use('/api/invoice', router);
};