const stocksController = require('../controllers/stocks.controller');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();
    // Set up routes
    router.get('/', stocksController.getstocks)
    router.post('/', stocksController.create);
    router.post('/:id', stocksController.updatstocks)
    app.use('/api/stocks', router);
};