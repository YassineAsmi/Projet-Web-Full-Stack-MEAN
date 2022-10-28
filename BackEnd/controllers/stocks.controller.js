//const { stocks } = require("../models");
const stock = require("../models/stocks.model");
const Stocks = stock.stocks;

//create and save a new stocks
exports.create = (req, res) => {
    let Mystock = new stock(req.body);
    Mystock.save()
        .then(game => {
            res.status(200).json({ 'Mystock': 'stock has been added successfully' + Mystock });
        })
        .catch(err => {
            res.status(400).send("An error has occurred. Unable to add stock to database.");
        });
};
exports.getstocks = (req, res) => {
    stock.find(function(err, Mstock) {
        if (err) {
            res.json(err);
        } else {
            res.json(Mstock);
        }
    });
};
exports.updatstocks = (req, res) => {
    stock.findById(req.params.id, function(err, Mstock) {
        if (!Mstock)
            console.log('Could not load document');
        else {
            Mstock.total = req.body.total;
            Mstock.category = req.body.category;
            Mstock.updatedby = req.body.updatedby;
            Mstock.status = req.body.status;

            Mstock.save().then(Mstock => {
                    res.json('Update complete');
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
};