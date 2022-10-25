const distributors = require("../controllers/distributor.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });


    var router = require("express").Router();

    // Create a new distributor
    router.post("/", distributors.create);

    // Retrieve all distributors
    router.get("/", distributors.findAll);

    // Retrieve a single distributor with id
    router.get("/:id", distributors.findOne);

    // Update a distributor with id
    router.put("/:id", distributors.update);

    // Delete a distributor with id
    router.delete("/:id", distributors.delete);
    
    app.use('/api/distributors', router);
};