const db = require("../models");
const Distributor = db.distributor;

// Create and Save a new Distributor
exports.create = (req, res) => {
    // Validate request
    if (!req.body.last_name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Distributor
    const distributor = new Distributor({
        last_name: req.body.last_name,
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address
    });
    // Save Distributor in the database
    Distributor
        .create(distributor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Distributor."
            });
        });
};
// Retrieve all Distributors from the database.
exports.findAll = (req, res) => {
    const last_name = req.query.last_name;
    var condition = last_name ? { last_name: { $regex: new RegExp(last_name), $options: "i" } } : {};

    Distributor.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Distributors."
            });
        });
};

// Find a single Distributor with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Distributor.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Distributor with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Distributor with id=" + id });
        });
};

// Update a Distributor by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Distributor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Distributor with id=${id}. Maybe Distributor was not found!`
                });
            } else res.send({ message: "Distributor was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Distributor with id=" + id
            });
        });
};
// Delete a Distributor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Distributor.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Distributor with id=${id}. Maybe Distributor was not found!`
                });
            } else {
                res.send({
                    message: "Distributor was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Distributor with id=" + id
            });
        });
};