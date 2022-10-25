const expensesController = require('../controllers/expenses.controller');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();
    // Set up routes
    router.get('/', expensesController.getexpensess)
    router.post('/', expensesController.create);
    router.post('/:id', expensesController.updateexpenses)
    router.post('/approve/:id',expensesController.approveexpenses)
    router.get('/:id', expensesController.editexpenses)
    router.get('/:itemsCount', expensesController.getitemexpenses)
    router.delete('/:id', expensesController.rejectexpenses)

    app.use('/api/expenses', router);
};