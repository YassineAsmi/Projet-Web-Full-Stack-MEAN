const db = require("../models");
const Client = db.client;

// Create and Save a new Client
exports.create = (req, res) => {
    // Validate request
    if (!req.body.last_name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a Client
    const client = new Client({
      last_name: req.body.last_name,
      name: req.body.name,
      tel: req.body.tel,
      email: req.body.email,
      address: req.body.address
    });
    // Save Client in the database
    Client
      .create(client)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Client."
        });
      });
  };
// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
    const last_name = req.query.last_name;
    var condition = last_name ? { last_name: { $regex: new RegExp(last_name), $options: "i" } } : {};
  
    Client.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Clients."
        });
      });
  };

// Find a single Client with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Client.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Client with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Client with id=" + id });
      });
  };

// Update a Client by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Client with id=${id}. Maybe Client was not found!`
          });
        } else res.send({ message: "Client was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Client with id=" + id
        });
      });
  };
// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Client.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
          });
        } else {
          res.send({
            message: "Client was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Client with id=" + id
        });
      });
  };
